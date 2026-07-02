"use server";

import { Resend } from "resend";
import { headers } from "next/headers";
import { z } from "zod";
import { COMPANY } from "@/data/company";
import { CITIES, CITY_BY_SLUG } from "@/data/cities";
import { SERVICES, SERVICE_BY_SLUG } from "@/data/services";
import { rateLimit, globalRateLimit } from "@/lib/rate-limit";
import type { LeadFormState } from "@/lib/lead-types";

// NOTE: do NOT re-export initialLeadState from this "use server" file.
// Server-action modules can ONLY export async functions; consts/objects
// (even type-erased ones) blow up the action loader. Initial state lives
// in lib/lead-types.ts.

const PHONE_FORMAT_RE = /^[+()\-\d\s.]{7,}$/;
const HEADER_INJECTION_RE = /[\r\n,;<>]/;
const countDigits = (s: string) => (s.match(/\d/g)?.length ?? 0);

const CITY_SLUGS = ["", ...CITIES.map((c) => c.slug)] as [string, ...string[]];
const APPLIANCE_SLUGS = ["", "other", ...SERVICES.map((s) => s.slug)] as [string, ...string[]];

type Lang = "en" | "es";

// Field-level validation messages, localized to match the form-level `M` map
// below (ES tone: usted, consistent with locales/es.ts).
const FIELD_M = {
  en: {
    nameRequired: "Please enter your name",
    nameInvalid: "Invalid characters in name",
    phoneInvalid: "Please enter a valid phone number",
    phoneDigits: "Please enter a 10-digit US phone",
    emailInvalid: "Invalid email",
    consent: "Please agree to be contacted about your request",
  },
  es: {
    nameRequired: "Por favor ingrese su nombre",
    nameInvalid: "Caracteres no válidos en el nombre",
    phoneInvalid: "Ingrese un número de teléfono válido",
    phoneDigits: "Ingrese un teléfono válido de 10 dígitos (EE. UU.)",
    emailInvalid: "Correo electrónico no válido",
    // Mirrors locales/es.ts leadForm.consentError.
    consent: "Por favor acepte ser contactado sobre su solicitud",
  },
} as const;

const makeLeadSchema = (lang: Lang) => {
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
    city: z.enum(CITY_SLUGS).optional().or(z.literal("")),
    appliance: z.enum(APPLIANCE_SLUGS).optional().or(z.literal("")),
    brand: z.string().trim().max(60).optional().or(z.literal("")),
    description: z.string().trim().max(2000).optional().or(z.literal("")),
    /** TCPA: explicit opt-in for calls/SMS. Required to submit. */
    consent: z.literal("on", { message: f.consent }),
    /** Honeypot — name chosen to look plausible to bots. Must stay empty. */
    company_url: z.string().max(0).optional().or(z.literal("")),
    /** Time-since-render check (bots fill forms in <2s). Soft validation. */
    ts: z.string().optional().or(z.literal("")),
    /** Marketing attribution summary (utm/gclid/referrer) from lib/attribution.ts. */
    attrib: z.string().trim().max(600).optional().or(z.literal("")),
    locale: z.enum(["en", "es"]).optional().or(z.literal("")),
  });
};

// Built once per locale — schemas are static apart from message strings.
const LEAD_SCHEMAS: Record<Lang, ReturnType<typeof makeLeadSchema>> = {
  en: makeLeadSchema("en"),
  es: makeLeadSchema("es"),
};
const M = {
  en: {
    successCallback: "Thanks — we'll call you shortly to confirm a time.",
    successHoneypot: "Thanks — we'll be in touch shortly.",
    tooMany: `Too many submissions. Please call us at ${COMPANY.phone.display}`,
    sendFail: `Couldn't send. Please call ${COMPANY.phone.display}.`,
    configError: `Server configuration error. Please call us directly at ${COMPANY.phone.display}.`,
  },
  es: {
    successCallback: "Recibido — le llamaremos pronto para confirmar la hora.",
    successHoneypot: "Recibido — le contactaremos pronto.",
    tooMany: `Demasiados envíos. Por favor llame al ${COMPANY.phone.display}`,
    sendFail: `No se pudo enviar. Por favor llame al ${COMPANY.phone.display}.`,
    configError: `Error de configuración del servidor. Por favor llame directamente al ${COMPANY.phone.display}.`,
  },
} as const;

function pickIp(h: Headers): string {
  // Vercel sets x-vercel-forwarded-for to the immediate client IP — not spoofable.
  const vercel = h.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]?.trim() || "unknown";
  // Fallback: take the *last* hop in x-forwarded-for (closest to our edge).
  const xff = h.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return h.get("x-real-ip") || "unknown";
}

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData.entries()) as Record<string, string>;
  for (const k of [
    "name", "phone", "city", "appliance", "email", "brand",
    "description", "consent", "company_url", "ts", "locale", "attrib",
  ]) {
    if (typeof raw[k] !== "string") raw[k] = "";
  }
  const lang: Lang = raw.locale === "es" ? "es" : "en";
  const msg = M[lang];

  // Honeypot check first — bots reveal themselves; humans never see this field.
  if (raw.company_url.length > 0) {
    return { status: "success", message: msg.successHoneypot };
  }
  // Soft bot check: form rendered in <1.5s means likely a script.
  // Browser autofill users can legitimately be this fast, so log enough to
  // recover the lead from Vercel logs (mirrors the missing-API-key path).
  const ts = parseInt(raw.ts || "0", 10);
  if (ts > 0 && Date.now() - ts < 1500) {
    console.warn(
      "[lead] anti-bot timer tripped (<1.5s after render) — lead NOT delivered. " +
      "Recover from logs:",
      raw.name || "(no name)", raw.phone || "(no phone)", raw.city || "(no city)",
    );
    return { status: "success", message: msg.successHoneypot };
  }

  const parsed = LEAD_SCHEMAS[lang].safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors, values: raw };
  }

  // Rate limits — per-IP plus a global circuit breaker for distributed floods.
  const h = await headers();
  const ip = pickIp(h);
  // Per-IP check FIRST and short-circuit: requests already blocked per-IP
  // must NOT increment the global counter, otherwise a single IP can burn
  // the global budget (60/h) and lock the form for everyone (cheap DoS).
  const rl = rateLimit({ key: `lead:${ip}`, limit: 5, windowMs: 10 * 60_000 });
  if (!rl.ok) {
    return {
      status: "error",
      errors: { form: msg.tooMany },
      values: raw,
    };
  }
  const globalRl = globalRateLimit({ limit: 60, windowMs: 60 * 60_000 });
  if (!globalRl.ok) {
    return {
      status: "error",
      errors: { form: msg.tooMany },
      values: raw,
    };
  }

  const { name, phone, email, brand, description } = parsed.data;
  // Header-injection chars stripped: the value lands in an HTML email row.
  const attrib = (parsed.data.attrib ?? "").replace(/[\r\n<>]/g, "").slice(0, 600);
  const city = parsed.data.city ?? "";
  const appliance = parsed.data.appliance ?? "";
  const cityName = city ? CITY_BY_SLUG[city]?.name ?? city : "—";
  const applianceName = appliance ? SERVICE_BY_SLUG[appliance]?.name ?? appliance : "—";

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Berne Appliance Repair Leads <onboarding@resend.dev>";
  const to = process.env.LEAD_TO_EMAIL ?? COMPANY.email.leads;

  if (!apiKey) {
    // Loud-fail: surface a real error to ops + a graceful message to the user.
    // Previously this silently returned success, hiding broken lead capture.
    console.error(
      "[lead] RESEND_API_KEY missing — lead form is BROKEN. " +
      "Lead from", raw.name || "(no name)", raw.phone || "(no phone)", "was NOT delivered.",
    );
    return {
      status: "error",
      errors: { form: msg.configError },
      values: raw,
    };
  }

  const resend = new Resend(apiKey);
  // Subject prefix unified across all 3 Berne sites: "ЗАКАЗ" so Eugene can
  // filter/sort leads in Gmail regardless of which site they came from.
  const subject = `ЗАКАЗ — ${name} · ${cityName} · ${applianceName}`;
  const html = renderLeadEmail({
    name, phone, email, cityName, applianceName, brand, description, locale: lang,
    attrib,
  });

  try {
    const replyTo = email
      ? [email, COMPANY.email.leads]
      : [COMPANY.email.leads];
    const result = await resend.emails.send({ from, to, replyTo, subject, html });
    if (result.error) {
      // Include contact fields so the lead is recoverable from Vercel logs
      // (same pattern as the anti-bot / missing-key paths above).
      console.error("[lead] resend error:", result.error, "| lead:", name, phone);
      return { status: "error", errors: { form: msg.sendFail }, values: raw };
    }
  } catch (err) {
    console.error("[lead] resend threw:", err, "| lead:", name, phone);
    return { status: "error", errors: { form: msg.sendFail }, values: raw };
  }

  return { status: "success", message: msg.successCallback };
}

function renderLeadEmail(p: {
  name: string;
  phone: string;
  email?: string;
  cityName: string;
  applianceName: string;
  brand?: string;
  description?: string;
  locale: Lang;
  attrib?: string;
}) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#666;width:140px">${label}</td><td style="padding:8px 12px;font-weight:600">${escape(value)}</td></tr>`
      : "";
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0f1a;color:#e6e6e6;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#10172a;border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden">
      <div style="padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.06)">
        <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#7aa2ff">New lead${p.locale === "es" ? " (ES)" : ""}</div>
        <div style="font-size:20px;font-weight:600;margin-top:4px">Berne Appliance Repair · website</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e6e6e6">
        ${row("Name", p.name)}
        ${row("Phone", p.phone)}
        ${row("Email", p.email)}
        ${row("City", p.cityName)}
        ${row("Appliance", p.applianceName)}
        ${row("Brand", p.brand)}
        ${row("Description", p.description)}
        ${row("Source", p.attrib)}
        ${row("Language", p.locale.toUpperCase())}
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
