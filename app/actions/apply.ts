"use server";

import { Resend } from "resend";
import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { COMPANY } from "@/data/company";
import { rateLimit, globalRateLimit } from "@/lib/rate-limit";
import type { LeadFormState } from "@/lib/lead-types";

/**
 * Job-application form handler for /careers (+ /es/careers).
 *
 * Mirrors app/actions/lead.ts (honeypot, time-trap, rate limits, Resend) but
 * is a SEPARATE pipeline on purpose:
 *   - subject prefix "ТРУДОУСТРОЙСТВО" (vs "ЗАКАЗ") so Eugene can filter
 *     applications apart from customer leads in Gmail;
 *   - NO ad-platform conversion events fire on submit (a job application is
 *     not a lead — firing generate_lead here would pollute lead metrics).
 */

const PHONE_FORMAT_RE = /^[+()\-\d\s.]{7,}$/;
const HEADER_INJECTION_RE = /[\r\n,;<>]/;
const countDigits = (s: string) => (s.match(/\d/g)?.length ?? 0);

type Lang = "en" | "es";

const FIELD_M = {
  en: {
    nameRequired: "Please enter your name",
    nameInvalid: "Invalid characters in name",
    phoneInvalid: "Please enter a valid phone number",
    phoneDigits: "Please enter a 10-digit US phone",
    emailInvalid: "Invalid email",
    cityRequired: "Please enter your city",
    experienceRequired: "Please tell us a little about your experience",
    consent: "Please agree to be contacted about your application",
  },
  es: {
    nameRequired: "Por favor ingrese su nombre",
    nameInvalid: "Caracteres no válidos en el nombre",
    phoneInvalid: "Ingrese un número de teléfono válido",
    phoneDigits: "Ingrese un teléfono válido de 10 dígitos (EE. UU.)",
    emailInvalid: "Correo electrónico no válido",
    cityRequired: "Por favor ingrese su ciudad",
    experienceRequired: "Cuéntenos un poco sobre su experiencia",
    consent: "Por favor acepte ser contactado sobre su solicitud",
  },
} as const;

const makeApplySchema = (lang: Lang) => {
  const f = FIELD_M[lang];
  return z.object({
    name: z.string().trim().min(2, f.nameRequired).max(80)
      .refine((v) => !HEADER_INJECTION_RE.test(v), f.nameInvalid),
    phone: z.string().trim().min(7, f.phoneInvalid).max(30)
      .regex(PHONE_FORMAT_RE, f.phoneInvalid)
      .refine((v) => countDigits(v) >= 10, f.phoneDigits),
    email: z
      .string()
      .trim()
      .email(f.emailInvalid)
      .refine((v) => !HEADER_INJECTION_RE.test(v), f.emailInvalid)
      .optional()
      .or(z.literal("")),
    city: z.string().trim().min(2, f.cityRequired).max(80),
    experience: z.string().trim().min(10, f.experienceRequired).max(3000),
    consent: z.literal("on", { message: f.consent }),
    /** Honeypot — must stay empty; bots fill it. */
    company_url: z.string().max(0).optional().or(z.literal("")),
    /** Time-since-render check (bots submit in <1.5s). */
    ts: z.string().optional().or(z.literal("")),
    locale: z.enum(["en", "es"]).optional().or(z.literal("")),
  });
};

const APPLY_SCHEMAS: Record<Lang, ReturnType<typeof makeApplySchema>> = {
  en: makeApplySchema("en"),
  es: makeApplySchema("es"),
};

const M = {
  en: {
    success: "Thanks — your application is in. We'll call you back.",
    successHoneypot: "Thanks — we'll be in touch shortly.",
    tooMany: `Too many submissions. Please call us at ${COMPANY.phone.display}`,
    sendFail: `Couldn't send. Please call ${COMPANY.phone.display}.`,
    configError: `Server configuration error. Please call us directly at ${COMPANY.phone.display}.`,
  },
  es: {
    success: "Recibido — su solicitud fue enviada. Le llamaremos.",
    successHoneypot: "Recibido — le contactaremos pronto.",
    tooMany: `Demasiados envíos. Por favor llame al ${COMPANY.phone.display}`,
    sendFail: `No se pudo enviar. Por favor llame al ${COMPANY.phone.display}.`,
    configError: `Error de configuración del servidor. Por favor llame directamente al ${COMPANY.phone.display}.`,
  },
} as const;

function pickIp(h: Headers): string {
  const vercel = h.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]?.trim() || "unknown";
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return h.get("x-real-ip") || "unknown";
}

export async function submitApplication(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  for (const k of [
    "name", "phone", "email", "city", "experience",
    "consent", "company_url", "ts", "locale",
  ]) {
    if (typeof raw[k] !== "string") raw[k] = "";
  }
  const lang: Lang = raw.locale === "es" ? "es" : "en";
  const msg = M[lang];

  // Honeypot first — humans never see the field.
  if (raw.company_url.length > 0) {
    return { status: "success", message: msg.successHoneypot, delivered: false };
  }
  const ts = parseInt(raw.ts || "0", 10);
  if (ts > 0 && Date.now() - ts < 1500) {
    console.warn(
      "[apply] anti-bot timer tripped (<1.5s after render) — application NOT delivered. Recover from logs:",
      raw.name || "(no name)", raw.phone || "(no phone)", raw.city || "(no city)",
    );
    return { status: "success", message: msg.successHoneypot, delivered: false };
  }

  const parsed = APPLY_SCHEMAS[lang].safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors, values: raw };
  }

  // Per-IP first, short-circuit before touching the global counter
  // (same DoS reasoning as lead.ts).
  const h = await headers();
  const ip = pickIp(h);
  const rl = rateLimit({ key: `apply:${ip}`, limit: 3, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return { status: "error", errors: { form: msg.tooMany }, values: raw };
  }
  const globalRl = globalRateLimit({ limit: 60, windowMs: 60 * 60_000 });
  if (!globalRl.ok) {
    return { status: "error", errors: { form: msg.tooMany }, values: raw };
  }

  const { name, phone, email, city, experience } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Berne Appliance Repair Leads <onboarding@resend.dev>";
  const to = process.env.LEAD_TO_EMAIL ?? COMPANY.email.leads;

  if (!apiKey) {
    console.error(
      "[apply] RESEND_API_KEY missing — careers form is BROKEN. Application from",
      raw.name || "(no name)", raw.phone || "(no phone)", "was NOT delivered.",
    );
    return { status: "error", errors: { form: msg.configError }, values: raw };
  }

  const resend = new Resend(apiKey);
  const applicationId = randomUUID();
  const submittedAt = new Date().toISOString();
  const phone10 = phone.replace(/\D/g, "").slice(-10);
  // Gmail-filterable prefix — Eugene sorts applications by "ТРУДОУСТРОЙСТВО".
  const subject = `ТРУДОУСТРОЙСТВО — ${name} · ${city}`;
  const html = renderApplicationEmail({
    name, phone, email, city, experience, locale: lang,
    applicationId, submittedAt, phone10,
  });

  try {
    const replyTo = email ? [email, COMPANY.email.leads] : [COMPANY.email.leads];
    const result = await resend.emails.send({ from, to, replyTo, subject, html });
    if (result.error || !result.data?.id) {
      console.error("[apply] resend error:", result.error ?? "missing message id", "| application_id:", applicationId, "| applicant:", name, phone);
      return { status: "error", errors: { form: msg.sendFail }, values: raw };
    }
  } catch (err) {
    console.error("[apply] resend threw:", err, "| application_id:", applicationId, "| applicant:", name, phone);
    return { status: "error", errors: { form: msg.sendFail }, values: raw };
  }

  return { status: "success", message: msg.success, delivered: true, leadId: applicationId };
}

function renderApplicationEmail(p: {
  name: string;
  phone: string;
  email?: string;
  city: string;
  experience: string;
  locale: Lang;
  applicationId: string;
  submittedAt: string;
  phone10: string;
}) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#666;width:150px;vertical-align:top">${label}</td><td style="padding:8px 12px;font-weight:600;white-space:pre-wrap">${escape(value)}</td></tr>`
      : "";
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0f1a;color:#e6e6e6;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#10172a;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.06)">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#7aa2ff">Job application${p.locale === "es" ? " (ES)" : ""}</div>
        <div style="font-size:20px;font-weight:600;margin-top:4px">Berne · careers page · berne-repair.com</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e6e6e6">
        ${row("Application ID", p.applicationId)}
        ${row("Submitted (UTC)", p.submittedAt)}
        ${row("Name", p.name)}
        ${row("Phone", p.phone)}
        ${row("Phone 10", p.phone10)}
        ${row("Email", p.email)}
        ${row("City", p.city)}
        ${row("Experience", p.experience)}
        ${row("Language", p.locale.toUpperCase())}
      </table>
      <div style="padding:14px 24px;border-top:1px solid rgba(255,255,255,.06);color:#7a8aa3;font-size:12px">
        Reply directly to this email to respond to the applicant.
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
