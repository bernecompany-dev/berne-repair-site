// Verification test for app/actions/lead.ts logic.
// Schema/honeypot/rate-limit are reimplemented here verbatim from the source so
// the action's pure logic can be exercised without Next's request scope. Any
// drift between this file and app/actions/lead.ts is a test bug.

import { z } from "zod";

// ---- rate limiter (lib/rate-limit.ts) ----
const BUCKETS = new Map();
function rateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const bucket = BUCKETS.get(key);
  if (!bucket || bucket.resetAt < now) {
    const fresh = { count: 1, resetAt: now + windowMs };
    BUCKETS.set(key, fresh);
    return { ok: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }
  bucket.count += 1;
  return { ok: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count), resetAt: bucket.resetAt };
}

// ---- schema (app/actions/lead.ts, current version) ----
const PHONE_FORMAT_RE = /^[+()\-\d\s.]{7,}$/;
const countDigits = (s) => (s.match(/\d/g)?.length ?? 0);

const LeadSchema = z.object({
  name: z.string({ required_error: "Please enter your name" })
    .trim().min(2, "Please enter your name").max(80),
  phone: z.string({ required_error: "Please enter a valid phone number" })
    .trim().min(7, "Please enter a valid phone number").max(30)
    .regex(PHONE_FORMAT_RE, "Please enter a valid phone number")
    .refine((v) => countDigits(v) >= 10, "Please enter a 10-digit US phone"),
  email: z.string().trim().email().optional().or(z.literal("")),
  city: z.string({ required_error: "Please choose a city" }).trim().min(1, "Please choose a city"),
  appliance: z.string({ required_error: "Please choose an appliance" }).trim().min(1, "Please choose an appliance"),
  brand: z.string().trim().max(60).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

let resendCalls = 0;

function submitLead(rawIn, ip = "1.2.3.4") {
  // Match the action: defensively coerce undefined → "" so zod min() catches it
  const raw = { ...rawIn };
  for (const k of ["name", "phone", "city", "appliance", "email", "brand", "description", "website"]) {
    if (typeof raw[k] !== "string") raw[k] = "";
  }
  // Honeypot first — silent success, never reveals server-side validation to bots.
  if (raw.website.length > 0) {
    return { status: "success", message: "Thanks — we'll be in touch shortly.", _resendCalled: false };
  }
  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors, values: raw };
  }
  const rl = rateLimit({ key: `lead:${ip}`, limit: 5, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return { status: "error", errors: { form: "Too many submissions." }, values: raw };
  }
  resendCalls += 1;
  return { status: "success", message: "Thanks — we'll call you shortly to confirm a time.", _resendCalled: true };
}

// ---- runner ----
const results = [];
function test(name, fn) {
  try { fn(); results.push({ name, pass: true }); console.log(`PASS  ${name}`); }
  catch (e) { results.push({ name, pass: false, err: e.message }); console.log(`FAIL  ${name}\n      ${e.message}`); }
}
function assert(c, m) { if (!c) throw new Error(m); }
function eq(a, b, m) { if (a !== b) throw new Error(`${m}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); }

const goodPayload = {
  name: "QA Test", phone: "305-555-0100", city: "miami",
  appliance: "refrigerator-repair", email: "", brand: "", description: "", website: "",
};

test("valid lead -> success + resend called", () => {
  const before = resendCalls;
  const r = submitLead({ ...goodPayload }, "10.0.0.1");
  eq(r.status, "success", "status");
  assert(resendCalls === before + 1, "Resend invoked");
});

test("missing name -> friendly errors.name (not 'Required')", () => {
  const r = submitLead({ ...goodPayload, name: undefined }, "10.0.0.2");
  eq(r.status, "error", "status");
  assert(r.errors?.name === "Please enter your name", `wanted friendly msg, got ${r.errors?.name}`);
});

test("non-digit phone -> errors.phone", () => {
  const r = submitLead({ ...goodPayload, phone: "(((((((" }, "10.0.0.3a");
  eq(r.status, "error", "status");
  assert(r.errors?.phone, "expected errors.phone");
});

test("9-digit phone -> errors.phone (new 10-digit refine)", () => {
  const r = submitLead({ ...goodPayload, phone: "305-555-010" }, "10.0.0.3b");
  eq(r.status, "error", "status");
  assert(r.errors?.phone, "expected errors.phone");
});

test("10-digit international format accepted", () => {
  const r = submitLead({ ...goodPayload, phone: "+1 (305) 555 0100" }, "10.0.0.3c");
  eq(r.status, "success", "status");
});

test("honeypot BEFORE schema -> silent success even with bad data, NO resend", () => {
  const before = resendCalls;
  const r = submitLead({
    name: "", phone: "x", city: "", appliance: "",
    email: "garbage", brand: "", description: "", website: "https://spam.example",
  }, "10.0.0.4");
  eq(r.status, "success", "status");
  assert(resendCalls === before, "Resend NOT called");
  assert(r._resendCalled === false, "honeypot branch reached");
});

test("rate limit: 5 succeed, 6th errors", () => {
  const ip = "10.0.0.99";
  const statuses = [];
  for (let i = 0; i < 6; i++) statuses.push(submitLead({ ...goodPayload }, ip).status);
  for (let i = 0; i < 5; i++) eq(statuses[i], "success", `submission ${i + 1}`);
  eq(statuses[5], "error", "6th must error");
});

test("missing city -> friendly errors.city", () => {
  const r = submitLead({ ...goodPayload, city: undefined }, "10.0.0.5");
  eq(r.status, "error", "status");
  assert(r.errors?.city === "Please choose a city", `got ${r.errors?.city}`);
});

test("missing appliance -> friendly errors.appliance", () => {
  const r = submitLead({ ...goodPayload, appliance: undefined }, "10.0.0.6");
  eq(r.status, "error", "status");
  assert(r.errors?.appliance === "Please choose an appliance", `got ${r.errors?.appliance}`);
});

test("description over max -> error", () => {
  const r = submitLead({ ...goodPayload, description: "x".repeat(2001) }, "10.0.0.7");
  eq(r.status, "error", "status");
});

const failed = results.filter(r => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
