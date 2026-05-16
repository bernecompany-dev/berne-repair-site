import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin, ShieldCheck, Clock3, BadgeDollarSign, ArrowRight } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { CityMap } from "@/components/site/city-map";
import { PersonalNote } from "@/components/site/personal-note";
import { StatsStrip } from "@/components/sections/stats-strip";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { CITIES, CITY_BY_SLUG } from "@/data/cities";
import { SERVICES } from "@/data/services";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS } from "@/data/faqs";
import { cityJsonLd, faqJsonLd, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { cityPersonalCopy } from "@/lib/personal-copy";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) return {};
  const title = `Reparación de Electrodomésticos en ${city.name} · Visita técnica $${COMPANY.serviceCallPrice}`;
  const description = `Reparación de electrodomésticos el mismo día en ${city.name}, condado de ${city.county}. Visita técnica $${COMPANY.serviceCallPrice}. ${COMPANY.socialProof.technicians} técnicos con licencia. Sub-Zero, Wolf, Viking, Bosch y todas las marcas principales.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/es/areas/${city.slug}`,
      languages: {
        "en-US": absoluteUrl(`/areas/${city.slug}`),
        "es-US": absoluteUrl(`/es/areas/${city.slug}`),
        "x-default": absoluteUrl(`/areas/${city.slug}`),
      },
    },
    openGraph: { title, description, url: absoluteUrl(`/es/areas/${city.slug}`), type: "website", locale: "es_US" },
  };
}

export default async function CityPageES({ params }: Props) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();

  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Áreas", href: "/es#areas" },
    { name: city.name, href: `/es/areas/${city.slug}` },
  ];
  const personal = cityPersonalCopy(city, "es");

  const cityFaqs = [
    {
      question: `¿De verdad cubren todo ${city.name}?`,
      answer: `Sí — incluyendo ${city.neighborhoods.slice(0, 3).join(", ")} y barrios cercanos, ZIPs ${city.zips.slice(0, 4).join(", ")}${city.zips.length > 4 ? ", y más" : ""}.`,
    },
    {
      question: `¿Qué tan rápido pueden llegar a ${city.name}?`,
      answer: `La mayoría de los trabajos en ${city.name} se programan en menos de una hora. Llame antes del mediodía y normalmente tenemos un técnico en su puerta el mismo día.`,
    },
    ...GENERAL_FAQS.slice(0, 6),
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)" }}
        />
        <div className="container-prose pt-14 pb-16 sm:pt-20 sm:pb-20">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/es" className="hover:text-foreground">Inicio</Link>
            <span aria-hidden>/</span>
            <Link href="/es#areas" className="hover:text-foreground">Áreas</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{city.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <MapPin className="size-3.5" aria-hidden /> {city.name}, condado de {city.county}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden /> Visita técnica ${COMPANY.serviceCallPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden /> El mismo día en {city.name}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Reparación de Electrodomésticos en
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {city.name}, FL.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {COMPANY.socialProof.technicians} técnicos con licencia atendiendo {city.name} todos los días — desde {city.neighborhoods.slice(0, 2).join(" y ")} hasta cada cuadra intermedia. Camiones equipados para Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch y todas las marcas principales.
          </p>

          <div className="mt-9"><CTARow size="lg" locale="es" /></div>
        </div>
      </section>

      <PersonalNote {...personal} />

      <section className="container-prose py-16">
        <CityMap cityName={city.name} lat={city.geo.lat} lng={city.geo.lng} />
      </section>

      <StatsStrip />

      <section className="container-prose py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock3, label: `El mismo día en ${city.name}`, body: "La mayoría de los trabajos en menos de una hora." },
            { icon: ShieldCheck, label: "Con licencia y asegurados", body: COMPANY.socialProof.warranty + "." },
            { icon: Phone, label: "Despacho local", body: "Una persona real contesta — no centros de llamadas." },
          ].map((t) => (
            <div key={t.label} className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <t.icon className="size-5" aria-hidden />
              </span>
              <div>
                <div className="text-sm font-semibold">{t.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Servicios en {city.name}</span>
          <h2 className="heading-section mt-3">
            Todos los electrodomésticos, reparados en {city.name}.
          </h2>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <Link key={service.slug}
              href={`/es/services/${service.slug}/${city.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-card/70"
            >
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{city.name}</div>
              <h3 className="text-base font-semibold tracking-tight">{service.name}</h3>
              <div className="mt-auto inline-flex items-center gap-1.5 text-xs text-brand">
                Disponible el mismo día
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FAQSection faqs={cityFaqs} title={`${city.name} — preguntas frecuentes`} />
      <Contact defaultCity={city.slug} locale="es" />
      <CTABand locale="es" />

      <JsonLd data={[cityJsonLd(city), faqJsonLd(cityFaqs), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
