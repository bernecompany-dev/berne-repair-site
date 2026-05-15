"use client";

import { useActionState } from "react";
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

export function LeadForm({
  defaultCity,
  defaultAppliance,
  locale = "en",
}: {
  defaultCity?: string;
  defaultAppliance?: string;
  locale?: Locale;
}) {
  const [state, action] = useActionState(submitLead, initialLeadState);
  const d = getDictionary(locale).leadForm;

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  if (state.status === "success") {
    return (
      <div className="surface-card flex flex-col items-start gap-4 p-8 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="text-2xl font-semibold tracking-tight">{d.success}</h3>
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

  return (
    <form action={action} className="surface-card p-6 sm:p-8" noValidate>
      <div className="mb-6 flex flex-col gap-1.5">
        <h3 className="text-2xl font-semibold tracking-tight">{d.title}</h3>
        <p className="text-sm text-muted-foreground">{d.subtitle}</p>
      </div>

      {"form" in errors && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="size-4 shrink-0" aria-hidden />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={d.fields.name} error={errors.name}>
          <input
            type="text" name="name" autoComplete="name"
            defaultValue={values.name} required
            className={inputCls(errors.name)}
            placeholder="Maria Reyes"
          />
        </Field>
        <Field label={d.fields.phone} error={errors.phone}>
          <input
            type="tel" name="phone" autoComplete="tel" inputMode="tel"
            defaultValue={values.phone} required
            className={inputCls(errors.phone)}
            placeholder="(305) 555-0123"
          />
        </Field>
        <Field label={d.fields.emailOptional} error={errors.email}>
          <input
            type="email" name="email" autoComplete="email"
            defaultValue={values.email}
            className={inputCls(errors.email)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label={d.fields.city} error={errors.city}>
          <select
            name="city"
            defaultValue={values.city ?? defaultCity ?? ""}
            required
            className={inputCls(errors.city)}
          >
            <option value="" disabled>{d.fields.cityPlaceholder}</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name} ({c.county})</option>
            ))}
          </select>
        </Field>
        <Field label={d.fields.appliance} error={errors.appliance}>
          <select
            name="appliance"
            defaultValue={values.appliance ?? defaultAppliance ?? ""}
            required
            className={inputCls(errors.appliance)}
          >
            <option value="" disabled>{d.fields.appliancePlaceholder}</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.shortName}</option>
            ))}
            <option value="other">{d.fields.other}</option>
          </select>
        </Field>
        <Field label={d.fields.brandOptional} error={errors.brand}>
          <input
            type="text" name="brand" list="brands-list"
            defaultValue={values.brand}
            className={inputCls(errors.brand)}
            placeholder={d.fields.brandPlaceholder}
          />
          <datalist id="brands-list">
            {BRANDS.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </Field>
      </div>

      <Field label={d.fields.description} error={errors.description} className="mt-4">
        <textarea
          name="description" rows={4}
          defaultValue={values.description}
          className={cn(inputCls(errors.description), "min-h-28 resize-y")}
          placeholder={d.fields.descriptionPlaceholder}
        />
      </Field>

      {/* Honeypot — hidden from users, visible to bots */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitBtn submit={d.submit} sending={d.sending} />
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-brand" aria-hidden />
          {d.privacy}
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
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 block text-xs text-destructive">{error}</span>
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
