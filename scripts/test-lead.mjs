// Verification test for app/actions/lead.ts logic.
// Schema/honeypot/rate-limit are reimplemented here verbatim from the source.

import { z } from "zod";

const BUCKETS = new Map();
function rateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const bucket = BUCKETS.get(key);
  if (!bucket || bucket.resetAt < now) {
    const fresh = { count: 1, resetAt: now + windowMs };
    BUCKETS.set(key, fresh);
    return { ok: true };
  }
  bucket.count += 1;
  return { ok: bucket.count <= limit };
}

const PHONE_FORMAT_RE = /^[+()\-\d\s.]{7,}$/;
const HEADER_INJECTION_RE = /[\r\n,;<>]/;
const countDigits = (s) => (s.match(/\d/g)?.length ?? 0);
const CITY_SLUGS = ["miami", "boca-raton", "parkland", "jupiter"];
const APPLIANCE_SLUGS = ["other", "refrigerator-repair", "washer-repair", "dryer-repair"];

const LeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80)
    .refine((v) => !HEADER_INJECTION_RE.test(v), "Invalid characters in name"),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30)
    .regex(PHONE_FORMAT_RE, "Please enter a valid phone number")
    .refine((v) => countDigits(v) >= 10, "Please enter a 10-digit US phone"),
  email: z.string().trim().email().refine((v) => !HEADER_INJECTION_RE.test(v), "Invalid email").optional().or(z.literal("")),
  city: z.enum(CITY_SLUGS, { message: "Please choose a city" }),
  appliance: z.enum(APPLIANCE_SLUGS, { message: "Please choose an appliance" }),
  brand: z.string().trim().max(60).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z.literal("on", { message: "Please agree to be contacted about your request" }),
  company_url: z.string().max(0).optional().or(z.literal("")),
  ts: z.string().optional().or(z.literal("")),
  locale: z.enum(["en", "es"]).optional().or(z.literal("")),
});

let resendCalls = 0;
function submitLead(rawIn, ip = "1.2.3.4") {
  const raw = { ...rawIn };
  for (const k of ["name","phone","city","appliance","email","brand","description","consent","company_url","ts","locale"]) {
    if (typeof raw[k] !== "string") raw[k] = "";
  }
  if (raw.company_url.length > 0) {
    return { status: "success", _resendCalled: false };
  }
  const ts = parseInt(raw.ts || "0", 10);
  if (ts > 0 && Date.now() - ts < 1500) {
    return { status: "success", _resendCalled: false, _reason: "ts-too-fast" };
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
  if (!rl.ok) return { status: "error", errors: { form: "Too many submissions." }, values: raw };
  resendCalls += 1;
  return { status: "success", _resendCalled: true };
}

const results = [];
function test(name, fn) {
  try { fn(); results.push({ name, pass: true }); console.log(`PASS  ${name}`); }
  catch (e) { results.push({ name, pass: false, err: e.message }); console.log(`FAIL  ${name}\n      ${e.message}`); }
}
const assert = (c, m) => { if (!c) throw new Error(m); };
const eq = (a, b, m) => { if (a !== b) throw new Error(`${m}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); };

const good = {
  name: "QA Test", phone: "305-555-0100", city: "miami",
  appliance: "refrigerator-repair", consent: "on",
  email: "", brand: "", description: "", company_url: "", ts: "0", locale: "en",
};

test("valid lead -> success + resend called", () => {
  const before = resendCalls;
  const r = submitLead({ ...good }, "10.0.0.1");
  eq(r.status, "success", "status");
  assert(resendCalls === before + 1, "Resend invoked");
});

test("missing name -> errors.name", () => {
  const r = submitLead({ ...good, name: undefined }, "10.0.0.2");
  eq(r.status, "error", "status");
  assert(r.errors?.name, "expected errors.name");
});

test("missing consent -> errors.consent (TCPA gate)", () => {
  const r = submitLead({ ...good, consent: "" }, "10.0.0.3");
  eq(r.status, "error", "status");
  assert(r.errors?.consent, "expected errors.consent");
});

test("non-digit phone -> errors.phone", () => {
  const r = submitLead({ ...good, phone: "(((((((" }, "10.0.0.4");
  eq(r.status, "error", "status");
  assert(r.errors?.phone, "expected errors.phone");
});

test("9-digit phone -> errors.phone", () => {
  const r = submitLead({ ...good, phone: "305-555-010" }, "10.0.0.5");
  eq(r.status, "error", "status");
  assert(r.errors?.phone, "expected errors.phone");
});

test("10-digit international format accepted", () => {
  const r = submitLead({ ...good, phone: "+1 (305) 555 0100" }, "10.0.0.6");
  eq(r.status, "success", "status");
});

test("invalid city slug -> errors.city (enum guard)", () => {
  const r = submitLead({ ...good, city: "atlantis" }, "10.0.0.7");
  eq(r.status, "error", "status");
  assert(r.errors?.city, "expected errors.city");
});

test("invalid appliance slug -> errors.appliance (enum guard)", () => {
  const r = submitLead({ ...good, appliance: "spaceship" }, "10.0.0.8");
  eq(r.status, "error", "status");
  assert(r.errors?.appliance, "expected errors.appliance");
});

test("header injection in name -> errors.name", () => {
  const r = submitLead({ ...good, name: "Foo\r\nBcc: x@y.com" }, "10.0.0.9");
  eq(r.status, "error", "status");
  assert(r.errors?.name, "expected errors.name");
});

test("header injection in email -> errors.email", () => {
  const r = submitLead({ ...good, email: "a@b.com,\r\nbcc:x@y" }, "10.0.0.10");
  eq(r.status, "error", "status");
});

test("honeypot company_url -> silent success", () => {
  const before = resendCalls;
  const r = submitLead({ ...good, company_url: "https://spam.example" }, "10.0.0.11");
  eq(r.status, "success", "status");
  assert(r._resendCalled === false, "Resend NOT called");
});

test("timestamp <1.5s -> silent success (bot timing)", () => {
  const before = resendCalls;
  const r = submitLead({ ...good, ts: String(Date.now()) }, "10.0.0.12");
  eq(r.status, "success", "status");
  assert(r._resendCalled === false, "Resend NOT called for bot timing");
});

test("rate limit: 5 succeed, 6th errors", () => {
  const ip = "10.0.0.99";
  const statuses = [];
  for (let i = 0; i < 6; i++) statuses.push(submitLead({ ...good }, ip).status);
  for (let i = 0; i < 5; i++) eq(statuses[i], "success", `submission ${i + 1}`);
  eq(statuses[5], "error", "6th must error");
});

const failed = results.filter(r => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
