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

export function LeadForm({ defaultCity, defaultAppliance }: { defaultCity?: string; defaultAppliance?: string }) {
  const [state, action] = useActionState(submitLead, initialLeadState);

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  if (state.status === "success") {
    return (
      <div className="surface-card flex flex-col items-start gap-4 p-8 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <CheckCircle2 className="size-6" aria-hidden />
        </span>
        <h3 className="text-2xl font-semibold tracking-tight">Got it — talk soon.</h3>
        <p className="text-muted-foreground">{state.message}</p>
        <p className="text-sm text-muted-foreground">
          Need us faster? Call{" "}
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
        <h3 className="text-2xl font-semibold tracking-tight">Get a free quote</h3>
        <p className="text-sm text-muted-foreground">
          Fill in the basics — we'll call back within minutes during open hours.
        </p>
      </div>

      {"form" in errors && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="size-4 shrink-0" aria-hidden />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <input
            type="text"
            name="name"
            autoComplete="name"
            defaultValue={values.name}
            required
            className={inputCls(errors.name)}
            placeholder="Maria Reyes"
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            defaultValue={values.phone}
            required
            className={inputCls(errors.phone)}
            placeholder="(305) 555-0123"
          />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={values.email}
            className={inputCls(errors.email)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="City" error={errors.city}>
          <select
            name="city"
            defaultValue={values.city ?? defaultCity ?? ""}
            required
            className={inputCls(errors.city)}
          >
            <option value="" disabled>Select your city</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name} ({c.county})</option>
            ))}
          </select>
        </Field>
        <Field label="Appliance" error={errors.appliance}>
          <select
            name="appliance"
            defaultValue={values.appliance ?? defaultAppliance ?? ""}
            required
            className={inputCls(errors.appliance)}
          >
            <option value="" disabled>What needs fixing?</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.shortName}</option>
            ))}
            <option value="other">Other / not sure</option>
          </select>
        </Field>
        <Field label="Brand (optional)" error={errors.brand}>
          <input
            type="text"
            name="brand"
            list="brands-list"
            defaultValue={values.brand}
            className={inputCls(errors.brand)}
            placeholder="Sub-Zero, LG, Bosch…"
          />
          <datalist id="brands-list">
            {BRANDS.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </Field>
      </div>

      <Field label="What's going on? (optional)" error={errors.description} className="mt-4">
        <textarea
          name="description"
          rows={4}
          defaultValue={values.description}
          className={cn(inputCls(errors.description), "min-h-28 resize-y")}
          placeholder="Sub-Zero stopped cooling overnight. Freezer side still cold."
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
        <SubmitBtn />
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-brand" aria-hidden />
          We don't share or sell your info.
        </p>
      </div>
    </form>
  );
}

function SubmitBtn() {
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
          Sending…
        </>
      ) : (
        <>
          <Send className="size-4" aria-hidden />
          Request a callback
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
