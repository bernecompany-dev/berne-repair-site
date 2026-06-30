import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ShieldCheck, Clock3, BadgeDollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Carousel } from "@/components/site/carousel";
import { PersonalNote } from "@/components/site/personal-note";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { QuickAnswer } from "@/components/site/quick-answer";
import { QUICK_ANSWERS } from "@/data/quick-answers";
import { SERVICES, SERVICE_BY_SLUG, localizedService } from "@/data/services";
import { HIGHEND_SERVICE_BY_SLUG } from "@/data/highend";
import { CITIES } from "@/data/cities";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS_ES, SERVICE_FAQS_ES } from "@/data/faqs";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { SERVICE_HERO_IMAGES } from "@/lib/service-images";
import { servicePersonalCopy } from "@/lib/personal-copy";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/** Reciprocal ES links: standard hubs → high-end specialty pages (same map as EN). */
const RELATED_HIGHEND: Record<string, string[]> = {
  "oven-repair": ["warming-drawer-repair", "coffee-machine-repair"],
  "wine-cooler-repair": ["coffee-machine-repair", "warming-drawer-repair"],
  "refrigerator-repair": ["cold-plunge-repair"],
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  if (!service) return {};
  // Absolute — the layout "%s · Berne Appliance Repair" suffix pushed these
  // hubs to 75-88ch ("Reparación de Trituradores de Basura en el sur de
  // Florida · $59 · Berne…"). Keyword + geo + price stays ≤59ch on every slug.
  const title = `${service.es.name} · Sur de Florida`;
  return {
    title: { absolute: title },
    description: service.es.description,
    alternates: {
      canonical: `/es/services/${service.slug}`,
      languages: {
        "en-US": absoluteUrl(`/services/${service.slug}`),
        "es-US": absoluteUrl(`/es/services/${service.slug}`),
        "x-default": absoluteUrl(`/services/${service.slug}`),
      },
    },
    openGraph: {
      title,
      description: service.es.description,
      url: absoluteUrl(`/es/services/${service.slug}`),
      type: "website",
      locale: "es_US",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ServicePageES({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  if (!service) notFound();

  // Spanish display view — name/shortName/seoNoun/commonIssues translated.
  const sv = localizedService(service, "es");
  const faqs = [...(SERVICE_FAQS_ES[service.slug] ?? []), ...GENERAL_FAQS_ES.slice(0, 5)];
  const quick = QUICK_ANSWERS[service.slug]?.es ?? null;
  const heroImages = SERVICE_HERO_IMAGES[service.slug];
  const personal = servicePersonalCopy(service, "es");
  const relatedHighEnd = (RELATED_HIGHEND[service.slug] ?? [])
    .map((s) => HIGHEND_SERVICE_BY_SLUG[s])
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Servicios", href: "/es#services" },
    { name: sv.name, href: `/es/services/${service.slug}` },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)" }}
        />
        <div className="container-prose pt-14 pb-16 sm:pt-20 sm:pb-20">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/es" className="hover:text-foreground">Inicio</Link>
            <span aria-hidden>/</span>
            <Link href="/es#services" className="hover:text-foreground">Servicios</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{sv.name}</span>
          </nav>

          <div className={heroImages ? "grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]" : ""}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                  <BadgeDollarSign className="size-3.5" aria-hidden />
                  Diagnóstico ${COMPANY.serviceCallPrice} · abonado
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                  <Clock3 className="size-3.5 text-brand" aria-hidden />
                  Formados de fábrica · guante blanco
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                  <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                  Garantía 90 días
                </span>
              </div>

              <h1 className="heading-hero mt-6 max-w-3xl">
                {sv.name}
                <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
                  en el sur de Florida.
                </span>
              </h1>

              {/* CTA above the teaser — same F3 fold fix as the EN hub */}
              <div className="mt-7">
                <CTARow size="lg" locale="es" />
              </div>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {sv.longDescription}
              </p>
            </div>

            {heroImages ? (
              <div className="mt-8 lg:mt-0">
                <Carousel images={heroImages} aspectClass="aspect-[4/5]" priority />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {quick ? <QuickAnswer data={quick} locale="es" /> : null}

      <StatsStrip locale="es" />
      <PersonalNote {...personal} />

      <section className="container-prose py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">Problemas comunes</span>
            <h2 className="heading-section mt-3">¿Le suena familiar?</h2>
            <p className="mt-4 text-muted-foreground">
              Diagnosticamos en la primera visita y cotizamos antes de empezar a trabajar.
            </p>
            <div className="mt-6">
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                <Phone className="size-4 text-brand" aria-hidden />
                Llamar {COMPANY.phone.display}
              </a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {sv.commonIssues.map((issue) => (
              <li key={issue} className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/90">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps locale="es" />

      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-14">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="eyebrow">Marcas de {sv.seoNoun} que reparamos</span>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Camiones equipados con piezas comunes para terminar en la primera visita.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {service.brands.map((brand) => (
              <div key={brand} className="flex h-14 items-center justify-center rounded-xl border border-border bg-card/40 px-3 text-center">
                <span className="truncate text-sm font-semibold tracking-tight text-foreground/85">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Ciudades que cubrimos</span>
          <h2 className="heading-section mt-3">{sv.name} en su ciudad.</h2>
          <p className="mt-4 text-muted-foreground">
            Servicio de guante blanco en los barrios más exclusivos del sur de Florida.
          </p>
        </div>

        <div className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/es/services/${service.slug}/${city.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
            >
              <div>
                <div className="text-sm font-semibold">{sv.shortName} en {city.name}</div>
                <div className="text-xs text-muted-foreground">Condado de {city.county}</div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      {/* Enlaces recíprocos a las páginas especializadas de alta gama */}
      {relatedHighEnd.length > 0 ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">Alta gama y especializados</span>
            <h2 className="heading-section mt-3">
              Equipo de lujo en esta categoría.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Los mismos técnicos senior, con páginas dedicadas para el equipo
              especializado de las cocinas y hogares de lujo del sur de Florida.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {relatedHighEnd.map((h) => (
              <Link
                key={h.slug}
                href={`/es/services/${h.slug}`}
                className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card/40 p-4 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <div>
                  <div className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-brand">
                    {h.es.name}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {h.es.metaDescription}
                  </p>
                </div>
                <ArrowRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <FAQSection faqs={faqs} title={`${sv.name} — preguntas frecuentes`} />
      <Contact defaultAppliance={service.slug} locale="es" />
      <CTABand locale="es" />

      <JsonLd data={[serviceJsonLd(service, "es"), faqJsonLd(quick ? [...quick.qa, ...faqs] : faqs, "es"), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
