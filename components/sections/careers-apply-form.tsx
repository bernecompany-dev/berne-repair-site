"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Send, ShieldCheck, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { submitApplication } from "@/app/actions/apply";
import { initialLeadState } from "@/lib/lead-types";
import { COMPANY } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Careers application form — /careers renders the bilingual (EN + RU)
 * variant, /es/careers the Spanish one. Separate from LeadForm on purpose:
 * different action (subject "ТРУДОУСТРОЙСТВО"), different fields, and NO
 * ad-conversion events on submit.
 */

type Variant = "bilingual" | "es";

const L: Record<Variant, {
  title: string;
  subtitle: string;
  name: string;
  phone: string;
  city: string;
  cityPlaceholder: string;
  experience: string;
  experiencePlaceholder: string;
  email: string;
  consent: string;
  submit: string;
  sending: string;
  successTitle: string;
  needFaster: string;
}> = {
  bilingual: {
    title: "Apply / Откликнуться",
    subtitle:
      "Fill in the form and we'll call you back. · Заполните форму — мы перезвоним.",
    name: "Name / Имя",
    phone: "Phone / Телефон",
    city: "City / Город",
    cityPlaceholder: "Miami, Hollywood, Boca Raton…",
    experience: "Experience / Опыт работы",
    experiencePlaceholder:
      "What have you repaired, for how long, which brands? · Что чинили, сколько лет, какие бренды?",
    email: "Email (optional / необязательно)",
    consent:
      "I agree to be contacted about my application by phone, text, or email. · Согласен(на) на связь по поводу отклика по телефону, SMS или email.",
    submit: "Send application / Отправить",
    sending: "Sending…",
    successTitle: "Application sent / Отклик отправлен",
    needFaster: "Want to talk right away? Call · Хотите сразу поговорить? Звоните",
  },
  es: {
    title: "Postularse",
    subtitle: "Complete el formulario y le llamaremos.",
    name: "Nombre",
    phone: "Teléfono",
    city: "Ciudad",
    cityPlaceholder: "Miami, Hollywood, Boca Raton…",
    experience: "Experiencia",
    experiencePlaceholder: "¿Qué ha reparado, cuánto tiempo, qué marcas?",
    email: "Correo electrónico (opcional)",
    consent:
      "Acepto ser contactado sobre mi solicitud por teléfono, mensaje de texto o correo electrónico.",
    submit: "Enviar solicitud",
    sending: "Enviando…",
    successTitle: "Solicitud enviada",
    needFaster: "¿Quiere hablar ahora? Llame al",
  },
};

export function CareersApplyForm({ variant = "bilingual" }: { variant?: Variant }) {
  const [state, action] = useActionState(submitApplication, initialLeadState);
  const t = L[variant];
  const formId = useId();
  const [renderedAt, setRenderedAt] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setRenderedAt(String(Date.now()));
  }, []);

  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

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
        <h3 ref={successHeadingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight outline-none">
          {t.successTitle}
        </h3>
        <p className="text-muted-foreground">{state.message}</p>
        <p className="text-sm text-muted-foreground">
          {t.needFaster}{" "}
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
      <input type="hidden" name="locale" value={variant === "es" ? "es" : "en"} />
      <input type="hidden" name="ts" value={renderedAt} />

      <div className="mb-6 flex flex-col gap-1.5">
        <h3 id={`${formId}-title`} className="text-2xl font-semibold tracking-tight">{t.title}</h3>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      {"form" in errors && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive" role="alert">
          <AlertTriangle className="size-4 shrink-0" aria-hidden />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${formId}-name`} label={t.name} error={errors.name} errId={errId("name")}>
          <input
            id={`${formId}-name`}
            type="text" name="name" autoComplete="name"
            defaultValue={values.name} required
            aria-invalid={!!errors.name}
            aria-describedby={errId("name")}
            className={inputCls(errors.name)}
          />
        </Field>
        <Field id={`${formId}-phone`} label={t.phone} error={errors.phone} errId={errId("phone")}>
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
        <Field id={`${formId}-city`} label={t.city} error={errors.city} errId={errId("city")}>
          <input
            id={`${formId}-city`}
            type="text" name="city" autoComplete="address-level2"
            defaultValue={values.city} required
            aria-invalid={!!errors.city}
            aria-describedby={errId("city")}
            className={inputCls(errors.city)}
            placeholder={t.cityPlaceholder}
          />
        </Field>
        <Field id={`${formId}-email`} label={t.email} error={errors.email} errId={errId("email")}>
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
      </div>

      <div className="mt-4">
        <Field id={`${formId}-experience`} label={t.experience} error={errors.experience} errId={errId("experience")}>
          <textarea
            id={`${formId}-experience`}
            name="experience" rows={5} required
            defaultValue={values.experience}
            aria-invalid={!!errors.experience}
            aria-describedby={errId("experience")}
            className={cn(inputCls(errors.experience), "min-h-32 resize-y")}
            placeholder={t.experiencePlaceholder}
          />
        </Field>
      </div>

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
          {t.consent}
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
        <SubmitBtn submit={t.submit} sending={t.sending} />
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-brand" aria-hidden />
          <span>{COMPANY.email.public}</span>
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
