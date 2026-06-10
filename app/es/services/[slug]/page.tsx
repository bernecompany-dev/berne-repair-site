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
import { SERVICES, SERVICE_BY_SLUG } from "@/data/services";
import { CITIES } from "@/data/cities";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS_ES, SERVICE_FAQS_ES } from "@/data/faqs";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { SERVICE_HERO_IMAGES } from "@/lib/service-images";
import { servicePersonalCopy } from "@/lib/personal-copy";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  if (!service) return {};
  const title = `${service.name} en el sur de Florida · Visita técnica $${COMPANY.serviceCallPrice}`;
  return {
    title,
    description: service.description,
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
      description: service.description,
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

  const faqs = [...(SERVICE_FAQS_ES[service.slug] ?? []), ...GENERAL_FAQS_ES.slice(0, 5)];
  const heroImages = SERVICE_HERO_IMAGES[service.slug];
  const personal = servicePersonalCopy(service, "es");
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Servicios", href: "/es#services" },
    { name: service.name, href: `/es/services/${service.slug}` },
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
            <span className="text-foreground/80">{service.name}</span>
          </nav>

          <div className={heroImages ? "grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]" : ""}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                  <BadgeDollarSign className="size-3.5" aria-hidden />
                  Visita técnica ${COMPANY.serviceCallPrice}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                  <Clock3 className="size-3.5 text-brand" aria-hidden />
                  Disponible el mismo día
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                  <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                  Garantía 90 días
                </span>
              </div>

              <h1 className="heading-hero mt-6 max-w-3xl">
                {service.name}
                <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
                  en el sur de Florida.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {service.longDescription}
              </p>

              <div className="mt-9">
                <CTARow size="lg" locale="es" />
              </div>
            </div>

            {heroImages ? (
              <div className="mt-8 lg:mt-0">
                <Carousel images={heroImages} aspectClass="aspect-[4/5]" priority />
              </div>
            ) : null}
          </div>
        </div>
      </section>

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
            {service.commonIssues.map((issue) => (
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
            <span className="eyebrow">Marcas de {service.shortName.toLowerCase()} que reparamos</span>
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
          <h2 className="heading-section mt-3">{service.name} en su ciudad.</h2>
          <p className="mt-4 text-muted-foreground">
            {service.seoNoun} el mismo día en toda nuestra área.
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
                <div className="text-sm font-semibold">{service.shortName} en {city.name}</div>
                <div className="text-xs text-muted-foreground">Condado de {city.county}</div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <FAQSection faqs={faqs} title={`${service.name} — preguntas frecuentes`} />
      <Contact defaultAppliance={service.slug} locale="es" />
      <CTABand locale="es" />

      <JsonLd data={[serviceJsonLd(service), faqJsonLd(faqs), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
