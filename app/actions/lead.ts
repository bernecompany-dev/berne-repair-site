"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { z } from "zod";
import { COMPANY } from "@/data/company";
import { CITY_BY_SLUG } from "@/data/cities";
import { SERVICE_BY_SLUG } from "@/data/services";
import { rateLimit } from "@/lib/rate-limit";
import type { LeadFormState } from "@/lib/lead-types";

const PHONE_FORMAT_RE = /^[+()\-\d\s.]{7,}$/;
const countDigits = (s: string) => (s.match(/\d/g)?.length ?? 0);

// Note: undefined fields are coerced to "" before parsing, so .min() catches "missing".
const LeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(30)
    .regex(PHONE_FORMAT_RE, "Please enter a valid phone number")
    .refine((v) => countDigits(v) >= 10, "Please enter a 10-digit US phone"),
  email: z.string().trim().email().optional().or(z.literal("")),
  city: z.string().trim().min(1, "Please choose a city"),
  appliance: z.string().trim().min(1, "Please choose an appliance"),
  brand: z.string().trim().max(60).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — bots fill all fields, humans never see this one
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  // FormData always yields strings, but defend against tampered submissions
  // (programmatic POST omitting a field) so zod returns our friendly messages.
  for (const k of ["name", "phone", "city", "appliance", "email", "brand", "description", "website"]) {
    if (typeof raw[k] !== "string") raw[k] = "";
  }

  // Honeypot first — silently "succeed" so bots can't even learn the form is server-validated.
  if (typeof raw.website === "string" && raw.website.length > 0) {
    return { status: "success", message: "Thanks — we'll be in touch shortly." };
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors, values: raw };
  }

  // Per-IP rate limit: 5 submissions / 10 minutes
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";
  const rl = rateLimit({ key: `lead:${ip}`, limit: 5, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return {
      status: "error",
      errors: { form: "Too many submissions. Please call us at " + COMPANY.phone.display },
      values: raw,
    };
  }

  const { name, phone, email, city, appliance, brand, description } = parsed.data;

  const cityName = CITY_BY_SLUG[city]?.name ?? city;
  const applianceName = SERVICE_BY_SLUG[appliance]?.name ?? appliance;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Berne Repair Leads <onboarding@resend.dev>";
  const to = process.env.LEAD_TO_EMAIL ?? COMPANY.email.leads;

  if (!apiKey) {
    // Dev fallback — log the lead so the user can still test the form locally
    console.warn("[lead] RESEND_API_KEY missing — lead not sent. Payload:", {
      name, phone, email, city: cityName, appliance: applianceName, brand, description, ip,
    });
    return {
      status: "success",
      message: "Thanks — we'll call you shortly.",
    };
  }

  const resend = new Resend(apiKey);
  const subject = `New lead: ${name} · ${cityName} · ${applianceName}`;

  const html = renderLeadEmail({
    name, phone, email, cityName, applianceName, brand, description, ip,
  });

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject,
      html,
    });
    if (result.error) {
      console.error("[lead] resend error:", result.error);
      return {
        status: "error",
        errors: { form: `Couldn't send. Please call ${COMPANY.phone.display}.` },
        values: raw,
      };
    }
  } catch (err) {
    console.error("[lead] resend threw:", err);
    return {
      status: "error",
      errors: { form: `Couldn't send. Please call ${COMPANY.phone.display}.` },
      values: raw,
    };
  }

  return {
    status: "success",
    message: "Thanks — we'll call you shortly to confirm a time.",
  };
}

function renderLeadEmail(p: {
  name: string;
  phone: string;
  email?: string;
  cityName: string;
  applianceName: string;
  brand?: string;
  description?: string;
  ip: string;
}) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#666;width:140px">${label}</td><td style="padding:8px 12px;font-weight:600">${escape(value)}</td></tr>`
      : "";
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0f1a;color:#e6e6e6;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#10172a;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.06)">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#7aa2ff">New lead</div>
        <div style="font-size:20px;font-weight:600;margin-top:4px">Berne Repair · website</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e6e6e6">
        ${row("Name", p.name)}
        ${row("Phone", p.phone)}
        ${row("Email", p.email)}
        ${row("City", p.cityName)}
        ${row("Appliance", p.applianceName)}
        ${row("Brand", p.brand)}
        ${row("Description", p.description)}
        ${row("IP", p.ip)}
      </table>
      <div style="padding:14px 24px;border-top:1px solid rgba(255,255,255,.06);color:#7a8aa3;font-size:12px">
        Reply directly to this email to respond to the customer.
      </div>
    </div>
  </div>`;
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
