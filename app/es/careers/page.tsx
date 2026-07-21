import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Phone,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  CalendarCheck,
} from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { CareersApplyForm } from "@/components/sections/careers-apply-form";
import { COMPANY } from "@/data/company";
import { TECH_ROLE, POSTING_DATE, VALID_THROUGH } from "@/data/careers";
import { breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute — brand already in the string; layout template would double it.
  title: { absolute: "Empleo: Técnico de Electrodomésticos — Sur de Florida · Berne" },
  description:
    "Berne contrata técnicos de reparación de electrodomésticos en Miami-Dade, Broward y Palm Beach. Empleo W-2, capacitación en Sub-Zero, Wolf, Viking, Miele y Thermador, trabajo estable todo el año.",
  alternates: {
    canonical: "/es/careers",
    languages: {
      "en-US": absoluteUrl("/careers"),
      "es-US": absoluteUrl("/es/careers"),
      "x-default": absoluteUrl("/careers"),
    },
  },
  openGraph: {
    title: "Empleo: Técnico de Electrodomésticos — Sur de Florida · Berne",
    description:
      "Empleo W-2, capacitación en marcas de lujo (Sub-Zero, Wolf, Viking, Miele, Thermador), trabajo estable en Miami-Dade, Broward y Palm Beach.",
    url: absoluteUrl("/es/careers"),
    type: "website",
    locale: "es_US",
    images: [DEFAULT_OG_IMAGE],
  },
};

/**
 * JobPosting schema — Spanish locale variant of the single open role.
 * Same policy as /careers: NO baseSalary (pay discussed per experience).
 */
function jobPostingJsonLdEs() {
  const countyPlace = (county: string) => ({
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: county,
      addressRegion: "FL",
      addressCountry: "US",
    },
  });

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": absoluteUrl(`/es/careers#${TECH_ROLE.slug}`),
    inLanguage: "es-US",
    title: TECH_ROLE.titleEs,
    description: `<p>${TECH_ROLE.descriptionEs}</p><h3>Requisitos</h3><ul>${TECH_ROLE.requirementsEs
      .map((r) => `<li>${r}</li>`)
      .join("")}</ul>`,
    identifier: {
      "@type": "PropertyValue",
      name: "Berne Luxury Appliance Repair",
      value: `berne-careers-${TECH_ROLE.slug}-es`,
    },
    datePosted: POSTING_DATE,
    validThrough: VALID_THROUGH,
    employmentType: TECH_ROLE.employmentType,
    industry: "Reparación de Electrodomésticos",
    occupationalCategory: "49-9031.00 Home Appliance Repairers",
    hiringOrganization: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: "Berne Luxury Appliance Repair",
      sameAs: COMPANY.url,
      logo: absoluteUrl("/og.png"),
    },
    jobLocation: [
      countyPlace("Miami-Dade County"),
      countyPlace("Broward County"),
      countyPlace("Palm Beach County"),
    ],
    applicantLocationRequirements: {
      "@type": "Country",
      name: "US",
    },
    skills: TECH_ROLE.skillsEs,
    qualifications: TECH_ROLE.requirementsEs.join("; "),
    directApply: true,
    workHours: COMPANY.hours.label,
  };
}

export default function CareersPageEs() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Empleo", href: "/es/careers" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/es" className="hover:text-foreground">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Empleo</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Briefcase className="size-3.5" aria-hidden />
              Estamos contratando
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Empleo W-2 · no 1099
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <GraduationCap className="size-3.5 text-brand" aria-hidden />
              Capacitación interna en marcas de lujo
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Técnico de electrodomésticos —{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              únete al equipo Berne.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne repara electrodomésticos en el sur de Florida desde 2015.
            Nuestros clientes tienen Sub-Zero, Wolf, Viking, Miele y Thermador — y
            esperan un técnico que proteja el piso, explique el diagnóstico y deje
            la cocina más limpia de lo que la encontró. Ese es el estándar con el
            que contratamos.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-px"
            >
              <Briefcase className="size-4" aria-hidden />
              Postúlate abajo
            </a>
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-brand/40"
            >
              <Phone className="size-4 text-brand" aria-hidden />
              {COMPANY.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* El puesto */}
      <section className="container-prose py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">El puesto</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Cómo es el trabajo.
          </h2>
        </div>

        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-foreground/90">
          <p>
            Trabajo de campo a tiempo completo en Miami-Dade, Broward y Palm
            Beach. El volumen de llamadas se mantiene todo el año — las cocinas
            del sur de Florida no descansan por temporada. El equipo son{" "}
            {COMPANY.socialProof.technicians} técnicos de planta, todos empleados
            W-2: nómina e impuestos a cargo de la empresa, sin arreglos 1099.
          </p>
          <p>
            No necesitas experiencia en Sub-Zero desde el primer día. Capacitamos
            a los técnicos en las marcas de lujo internamente — sistemas sellados,
            placas de control, los detalles que cada fabricante no pone en el
            manual. El trabajo con refrigerante sigue las reglas de la Sección 608
            de la EPA. Lo que pedimos: experiencia real en reparación o una base
            técnica sólida, licencia de conducir e inglés suficiente para explicar
            un diagnóstico al cliente. Buena parte del equipo también habla ruso.
          </p>
          <p>
            El pago se conversa según la experiencia. Cuéntanos qué has reparado y
            por cuánto tiempo — y hablamos de números.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <ShieldCheck className="size-5 text-brand" aria-hidden />,
              title: "W-2 desde el primer día",
              body: `${COMPANY.socialProof.technicians} técnicos de planta en nómina — no subcontratistas.`,
            },
            {
              icon: <GraduationCap className="size-5 text-brand" aria-hidden />,
              title: "Capacitación en marcas de lujo",
              body: "Sub-Zero, Wolf, Viking, Miele, Thermador — enseñado internamente.",
            },
            {
              icon: <CalendarCheck className="size-5 text-brand" aria-hidden />,
              title: "Trabajo estable todo el año",
              body: "Sin caídas de temporada — la agenda se mantiene llena cada mes.",
            },
            {
              icon: <MapPin className="size-5 text-brand" aria-hidden />,
              title: "Tres condados",
              body: "Territorio de servicio: Miami-Dade, Broward y Palm Beach.",
            },
          ].map((b) => (
            <li
              key={b.title}
              className="flex gap-3 rounded-2xl border border-border bg-card/40 p-5"
            >
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                {b.icon}
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-3xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Requisitos
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {TECH_ROLE.requirementsEs.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span className="text-foreground/85">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulario */}
      <section id="apply" className="border-t border-border/60 scroll-mt-20">
        <div className="container-prose py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <CareersApplyForm variant="es" />
          </div>
        </div>
      </section>

      <JsonLd data={[jobPostingJsonLdEs(), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
