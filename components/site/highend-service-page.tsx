import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  CheckCircle2,
  ArrowRight,
  Wrench,
  Stethoscope,
  Newspaper,
} from "lucide-react";
import { PersonalNote } from "@/components/site/personal-note";
import { CTARow } from "@/components/site/cta-row";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import {
  highEndServiceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import type { HighEndService } from "@/data/highend/types";

type Locale = "en" | "es";

const T = {
  en: {
    sameDay: "White-glove priority",
    warranty: "90-day warranty",
    home: "Home",
    services: "Services",
    issuesEyebrow: "What we see most",
    issuesHeading: "Sound familiar?",
    issuesLede:
      "We diagnose on the first visit and quote the repair before any work starts.",
    call: "Call",
    brandsEyebrow: (n: string) => `${n} brands we service`,
    brandsLede: "Senior techs, OEM parts, and a careful hand in a fine home.",
    relatedEyebrow: "More luxury home services",
    relatedHeading: "Related repairs we handle.",
    relatedLede:
      "One call, one company for the high-end equipment in your home.",
    allServices: "All repair services",
    costGuide: "Luxury repair cost guide & repair-or-replace calculator",
    articleEyebrow: "From our service desk",
    articleHeading: "Read before you call.",
    read: "Read the guide",
    faqSuffix: "— questions we get",
  },
  es: {
    sameDay: "Servicio prioritario",
    warranty: "Garantía 90 días",
    home: "Inicio",
    services: "Servicios",
    issuesEyebrow: "Lo que más vemos",
    issuesHeading: "¿Le suena familiar?",
    issuesLede:
      "Diagnosticamos en la primera visita y cotizamos antes de empezar a trabajar.",
    call: "Llamar",
    brandsEyebrow: (n: string) => `Marcas de ${n} que reparamos`,
    brandsLede:
      "Técnicos senior, piezas OEM y mano cuidadosa en una casa de lujo.",
    relatedEyebrow: "Más servicios para el hogar de lujo",
    relatedHeading: "Reparaciones relacionadas que hacemos.",
    relatedLede:
      "Una llamada, una sola compañía para el equipo de alta gama de su hogar.",
    allServices: "Todos los servicios",
    costGuide: "Guía de costos de reparación de lujo y calculadora reparar-o-reemplazar",
    articleEyebrow: "Desde nuestro taller",
    articleHeading: "Lea antes de llamar.",
    read: "Leer la guía",
    faqSuffix: "— preguntas frecuentes",
  },
} as const;

export function HighEndServicePage({
  service,
  locale = "en",
}: {
  service: HighEndService;
  locale?: Locale;
}) {
  const t = T[locale];
  const v =
    locale === "es"
      ? {
          name: service.es.name,
          shortName: service.es.shortName,
          heroLede: service.es.heroLede,
          longDescription: service.es.longDescription,
          ownerNote: service.es.ownerNote,
          diagnosisTitle: service.es.diagnosisTitle,
          diagnosisIntro: service.es.diagnosisIntro,
          commonIssues: service.es.commonIssues,
          failureModes: service.es.failureModes,
          faqs: service.es.faqs,
        }
      : {
          name: service.name,
          shortName: service.shortName,
          heroLede: service.heroLede,
          longDescription: service.longDescription,
          ownerNote: service.ownerNote,
          diagnosisTitle: service.diagnosisTitle,
          diagnosisIntro: service.diagnosisIntro,
          commonIssues: service.commonIssues,
          failureModes: service.failureModes,
          faqs: service.faqs,
        };

  const base = locale === "es" ? "/es" : "";
  const servicesHref = locale === "es" ? "/es/services" : "/services";
  const localizeHref = (href: string) =>
    locale === "es" ? `/es${href}` : href;

  const crumbs = [
    { name: t.home, href: locale === "es" ? "/es" : "/" },
    { name: t.services, href: locale === "es" ? "/es#services" : "/services" },
    { name: v.name, href: `${base}/services/${service.slug}` },
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
        <div className="container-prose pt-14 pb-16 sm:pt-20 sm:pb-20">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href={crumbs[0].href} className="hover:text-foreground">
              {t.home}
            </Link>
            <span aria-hidden>/</span>
            <Link href={servicesHref} className="hover:text-foreground">
              {t.services}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{v.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />
              {locale === "es"
                ? `Diagnóstico $${COMPANY.serviceCallPrice}, abonado a la reparación`
                : `$${COMPANY.serviceCallPrice} diagnostic, credited to repair`}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden />
              {t.sameDay}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              {t.warranty}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-3xl">
            {v.name}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {v.heroLede}
            </span>
          </h1>

          <div className="mt-7">
            <CTARow size="lg" locale={locale} />
          </div>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {v.longDescription}
          </p>
        </div>
      </section>

      <StatsStrip locale={locale} />

      <PersonalNote {...v.ownerNote} />

      {/* Common issues */}
      <section className="container-prose py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">{t.issuesEyebrow}</span>
            <h2 className="heading-section mt-3">{t.issuesHeading}</h2>
            <p className="mt-4 text-muted-foreground">{t.issuesLede}</p>
            <div className="mt-6">
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                <Phone className="size-4 text-brand" aria-hidden />
                {t.call} {COMPANY.phone.display}
              </a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {v.commonIssues.map((issue) => (
              <li
                key={issue}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4"
              >
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-brand"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-foreground/90">
                  {issue}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps locale={locale} />

      {/* Deep diagnosis: symptom -> cause -> fix bank (the unique authored content) */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-20 sm:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Stethoscope className="mr-1.5 inline size-3.5" aria-hidden />
              {locale === "es" ? "Diagnóstico real" : "Real diagnostics"}
            </span>
            <h2 className="heading-section mt-3">{v.diagnosisTitle}</h2>
            <p className="mt-4 text-muted-foreground">{v.diagnosisIntro}</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {v.failureModes.map((fm) => (
              <div
                key={fm.symptom}
                className="rounded-2xl border border-border bg-card/40 p-6"
              >
                <div className="flex items-start gap-2">
                  <Wrench
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden
                  />
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {fm.symptom}
                  </h3>
                </div>
                <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      {locale === "es" ? "Causa" : "Likely cause"}
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{fm.cause}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      {locale === "es" ? "Reparación" : "What we do"}
                    </dt>
                    <dd className="mt-1 text-foreground/90">{fm.fix}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="container-prose py-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">{t.brandsEyebrow(v.shortName)}</span>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {t.brandsLede}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {service.brands.map((brand) => (
            <div
              key={brand}
              className="flex h-14 items-center justify-center rounded-xl border border-border bg-card/40 px-3 text-center"
            >
              <span className="truncate text-sm font-semibold tracking-tight text-foreground/85">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Related luxury services + hub link */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">{t.relatedEyebrow}</span>
            <h2 className="heading-section mt-3">{t.relatedHeading}</h2>
            <p className="mt-4 text-muted-foreground">{t.relatedLede}</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.related.map((r) => (
              <Link
                key={r.href}
                href={localizeHref(r.href)}
                className="group flex h-full flex-col gap-2 rounded-xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-brand">
                    {r.label}
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {r.blurb}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href={servicesHref} className="text-brand hover:underline">
              {t.allServices} →
            </Link>
            <Link
              href={localizeHref("/resources/luxury-appliance-repair-cost-guide")}
              className="text-brand hover:underline"
            >
              {t.costGuide} →
            </Link>
          </p>
        </div>
      </section>

      {/* Paired blog article (article <-> service link) */}
      <section className="container-prose py-16">
        <div className="rounded-3xl border border-brand/30 bg-brand/[0.06] p-6 sm:p-8">
          <span className="eyebrow">
            <Newspaper className="mr-1.5 inline size-3.5" aria-hidden />
            {t.articleEyebrow}
          </span>
          <h2 className="heading-section mt-3">{t.articleHeading}</h2>
          <Link
            href={`/blog/${service.article.slug}`}
            className="group mt-6 flex flex-col gap-2 rounded-2xl border border-border bg-card/50 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/70 sm:p-6"
          >
            <span className="text-base font-semibold tracking-tight text-foreground group-hover:text-brand">
              {service.article.title}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {service.article.description}
            </span>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              {t.read}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </div>
      </section>

      <FAQSection faqs={v.faqs} title={`${v.name} ${t.faqSuffix}`} />
      <Contact locale={locale} />
      <CTABand locale={locale} />

      <JsonLd
        data={[
          highEndServiceJsonLd({
            slug: service.slug,
            name: v.name,
            description: v.longDescription,
            brands: service.brands,
            locale,
          }),
          faqJsonLd(v.faqs, locale),
          breadcrumbJsonLd(crumbs),
        ]}
      />
    </>
  );
}
