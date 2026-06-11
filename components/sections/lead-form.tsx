"use client";

import { useActionState, useId, useState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Send, ShieldCheck, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { submitLead } from "@/app/actions/lead";
import { initialLeadState } from "@/lib/lead-types";
import { COMPANY } from "@/data/company";
import { CITIES } from "@/data/cities";
import { SERVICES } from "@/data/services";
import { BRANDS } from "@/data/brands";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function LeadForm({
  defaultCity,
  defaultAppliance,
  defaultBrand,
  locale = "en",
}: {
  defaultCity?: string;
  defaultAppliance?: string;
  /** Prefills the free-text brand field (e.g. on /brands/[slug] pages). */
  defaultBrand?: string;
  locale?: Locale;
}) {
  const [state, action] = useActionState(submitLead, initialLeadState);
  const d = getDictionary(locale).leadForm;
  const formId = useId();
  const [renderedAt, setRenderedAt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setRenderedAt(String(Date.now()));
  }, []);

  // Fire GA4 `generate_lead` once, only after the server action resolves with
  // a delivered lead (status === "success"). Uses the same window.gtag transport
  // as the rest of the site (loaded via <GoogleAnalytics> in app/layout.tsx).
  useEffect(() => {
    if (state.status !== "success") return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    try {
      window.gtag("event", "generate_lead", {
        form: "lead_form",
        locale,
      });
    } catch {
      /* swallow analytics errors */
    }
  }, [state.status, locale]);

  // Focus management: the form is noValidate, so server-side validation errors
  // arrive after a round-trip with no native focus/scroll. Move focus to the
  // first invalid field (focus() scrolls it into view on every browser).
  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  // On success the whole form is swapped for a thank-you card; without this,
  // focus drops to <body> and screen readers announce nothing.
  useEffect(() => {
    if (state.status !== "success") return;
    successHeadingRef.current?.focus();
  }, [state.status]);

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  if (state.status === "success") {
    return (
      <div role="status" className="surface-card flex flex-col items-start gap-4 p-8 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 ref={successHeadingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">{d.success}</h3>
        <p className="text-muted-foreground">{state.message}</p>
        <p className="text-sm text-muted-foreground">
          {d.needFaster}{" "}
          <a href={`tel:${COMPANY.phone.tel}`} className="font-semibold text-brand hover:underline">
            {COMPANY.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const errId = (field: string) => (errors[field] ? `${formId}-${field}-err` : undefined);

  return (
    <form ref={formRef} action={action} className="surface-card p-6 sm:p-8" noValidate aria-labelledby={`${formId}-title`}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="ts" value={renderedAt} />

      <div className="mb-6 flex flex-col gap-1.5">
        <h3 id={`${formId}-title`} className="text-2xl font-semibold tracking-tight">{d.title}</h3>
        <p className="text-sm text-muted-foreground">{d.subtitle}</p>
      </div>

      {"form" in errors && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive" role="alert">
          <AlertTriangle className="size-4 shrink-0" aria-hidden />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${formId}-name`} label={d.fields.name} error={errors.name} errId={errId("name")}>
          <input
            id={`${formId}-name`}
            type="text" name="name" autoComplete="name"
            defaultValue={values.name} required
            aria-invalid={!!errors.name}
            aria-describedby={errId("name")}
            className={inputCls(errors.name)}
          />
        </Field>
        <Field id={`${formId}-phone`} label={d.fields.phone} error={errors.phone} errId={errId("phone")}>
          <input
            id={`${formId}-phone`}
            type="tel" name="phone" autoComplete="tel" inputMode="tel"
            defaultValue={values.phone} required
            aria-invalid={!!errors.phone}
            aria-describedby={errId("phone")}
            className={inputCls(errors.phone)}
            placeholder="(754) 000-0000"
          />
        </Field>
        <Field id={`${formId}-email`} label={d.fields.emailOptional} error={errors.email} errId={errId("email")}>
          <input
            id={`${formId}-email`}
            type="email" name="email" autoComplete="email"
            defaultValue={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={errId("email")}
            className={inputCls(errors.email)}
            placeholder="you@example.com"
          />
        </Field>
        <Field id={`${formId}-city`} label={d.fields.city} error={errors.city} errId={errId("city")}>
          <select
            id={`${formId}-city`}
            name="city"
            defaultValue={values.city ?? defaultCity ?? ""}
            aria-invalid={!!errors.city}
            aria-describedby={errId("city")}
            className={inputCls(errors.city)}
          >
            <option value="">{d.fields.cityPlaceholder}</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name} ({c.county})</option>
            ))}
          </select>
        </Field>
        <Field id={`${formId}-appliance`} label={d.fields.appliance} error={errors.appliance} errId={errId("appliance")}>
          <select
            id={`${formId}-appliance`}
            name="appliance"
            defaultValue={values.appliance ?? defaultAppliance ?? ""}
            aria-invalid={!!errors.appliance}
            aria-describedby={errId("appliance")}
            className={inputCls(errors.appliance)}
          >
            <option value="">{d.fields.appliancePlaceholder}</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.shortName}</option>
            ))}
            <option value="other">{d.fields.other}</option>
          </select>
        </Field>
      </div>

      <details
        open={defaultBrand ? true : undefined}
        className="group mt-4 rounded-xl border border-border bg-background/30 open:bg-background/50"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-foreground/90 hover:text-foreground">
          <span>{d.fields.detailsToggle}</span>
          <span className="text-xs text-muted-foreground transition-transform group-open:rotate-180" aria-hidden>▾</span>
        </summary>
        <div className="space-y-4 px-4 pb-4 pt-1">
          <Field id={`${formId}-brand`} label={d.fields.brandOptional} error={errors.brand} errId={errId("brand")}>
            <input
              id={`${formId}-brand`}
              type="text" name="brand" list={`${formId}-brands`}
              autoComplete="off"
              defaultValue={values.brand ?? defaultBrand}
              className={inputCls(errors.brand)}
              placeholder={d.fields.brandPlaceholder}
            />
            <datalist id={`${formId}-brands`}>
              {BRANDS.map((b) => <option key={b} value={b} />)}
            </datalist>
          </Field>
          <Field id={`${formId}-description`} label={d.fields.description} error={errors.description} errId={errId("description")}>
            <textarea
              id={`${formId}-description`}
              name="description" rows={4}
              defaultValue={values.description}
              aria-invalid={!!errors.description}
              aria-describedby={errId("description")}
              className={cn(inputCls(errors.description), "min-h-28 resize-y")}
              placeholder={d.fields.descriptionPlaceholder}
            />
          </Field>
        </div>
      </details>

      {/* TCPA explicit consent — required, unchecked by default (regulator requirement). */}
      <label className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4 cursor-pointer hover:bg-background/60">
        <input
          type="checkbox"
          name="consent"
          required
          defaultChecked={values.consent === "on"}
          aria-invalid={!!errors.consent}
          aria-describedby={errId("consent")}
          className="mt-0.5 size-4 rounded border-border accent-brand"
        />
        <span className="text-xs leading-relaxed text-muted-foreground">
          {d.consentLabel}
        </span>
      </label>
      {errors.consent && (
        <span id={errId("consent")} className="mt-1.5 block text-xs text-destructive">{errors.consent}</span>
      )}

      {/* Honeypot — hidden from users, visible to dumb bots */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label>
          Company URL
          <input type="text" name="company_url" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitBtn submit={d.submit} sending={d.sending} />
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-brand" aria-hidden />
          {d.privacy}{" "}
          <a href={locale === "es" ? "/es/privacy" : "/privacy"} className="underline-offset-2 hover:underline">
            {d.privacyLink}
          </a>
        </p>
      </div>
    </form>
  );
}

function SubmitBtn({ submit, sending }: { submit: string; sending: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-brand-foreground shadow-[0_0_0_1px_oklch(1_0_0/0.08),0_10px_30px_-10px_var(--brand-glow)] transition-[transform,box-shadow,filter] hover:-translate-y-px hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden />
          {sending}
        </>
      ) : (
        <>
          <Send className="size-4" aria-hidden />
          {submit}
        </>
      )}
    </button>
  );
}

function Field({
  id,
  label,
  error,
  errId,
  children,
  className,
}: {
  id?: string;
  label: string;
  error?: string;
  errId?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)} htmlFor={id}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error ? (
        <span id={errId} className="mt-1.5 block text-xs text-destructive">{error}</span>
      ) : null}
    </label>
  );
}

function inputCls(hasError?: string) {
  return cn(
    "block w-full rounded-xl border bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors",
    hasError ? "border-destructive/60 focus:border-destructive" : "border-border focus:border-brand",
    "focus:ring-2 focus:ring-brand/30",
  );
}
