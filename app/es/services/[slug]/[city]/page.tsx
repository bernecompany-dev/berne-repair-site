import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone, MapPin, Clock3, BadgeDollarSign, CheckCircle2, ArrowRight,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { CityMap } from "@/components/site/city-map";
import { PersonalNote } from "@/components/site/personal-note";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { SERVICES, SERVICE_BY_SLUG, localizedService } from "@/data/services";
import { CITIES, CITY_BY_SLUG } from "@/data/cities";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS_ES, SERVICE_FAQS_ES } from "@/data/faqs";
import { serviceCityJsonLd, localBusinessForCityJsonLd, faqJsonLd, breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { comboPersonalCopy } from "@/lib/personal-copy";

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of SERVICES) for (const city of CITIES) params.push({ slug: service.slug, city: city.slug });
  return params;
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const city = CITY_BY_SLUG[citySlug];
  if (!service || !city) return {};
  // Real Spanish titles — "Refrigerator en Miami" Spanglish was flagged in the
  // 2026-06-10 techseo audit. Budget mirrors the EN combo template (~45 chars
  // before the layout suffix).
  const naturalTitle = `Reparación de ${service.es.shortName} en ${city.name} · $${COMPANY.serviceCallPrice}`;
  const title = naturalTitle.length <= 52
    ? naturalTitle
    : `${service.es.shortName} en ${city.name} · $${COMPANY.serviceCallPrice}`;
  // "limpieza de ductos" already carries its own action noun — don't prefix
  // "Reparación de" onto it.
  const esNounPhrase = service.es.seoNoun.includes("limpieza")
    ? service.es.seoNoun
    : `reparación de ${service.es.seoNoun}`;
  const description = `${esNounPhrase.charAt(0).toUpperCase()}${esNounPhrase.slice(1)} el mismo día en ${city.name}, condado de ${city.county}. Visita técnica $${COMPANY.serviceCallPrice}. Con licencia y seguro. Llame al ${COMPANY.phone.display}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/es/services/${service.slug}/${city.slug}`,
      languages: {
        "en-US": absoluteUrl(`/services/${service.slug}/${city.slug}`),
        "es-US": absoluteUrl(`/es/services/${service.slug}/${city.slug}`),
        "x-default": absoluteUrl(`/services/${service.slug}/${city.slug}`),
      },
    },
    openGraph: { title, description, url: absoluteUrl(`/es/services/${service.slug}/${city.slug}`), type: "website", locale: "es_US", images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function ServiceCityPageES({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const city = CITY_BY_SLUG[citySlug];
  if (!service || !city) notFound();

  // Spanish display view of the service — name/shortName/seoNoun/commonIssues
  // all translated. The original `service` keeps slugs + brands for routing.
  const sv = localizedService(service, "es");
  const articleNoun = `${service.es.gender === "f" ? "una" : "un"} ${sv.seoNoun}`;

  const otherCities = [...CITIES]
    .filter((c) => c.slug !== city.slug)
    .map((c) => ({ c, d: haversine(city.geo, c.geo) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map((x) => x.c);
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);

  const comboFaqs = [
    {
      question: `¿Qué tan rápido pueden llegar a ${city.name} para reparar ${articleNoun}?`,
      answer: `La mayoría de los trabajos en ${city.name} se programan en menos de una hora. Llame antes del mediodía y normalmente tenemos un técnico en su puerta el mismo día. Cubrimos ${city.neighborhoods.slice(0, 3).join(", ")} y barrios cercanos.`,
    },
    {
      question: `¿Cuánto cuesta la reparación de ${sv.seoNoun} en ${city.name}?`,
      answer: `Nuestra visita técnica fija de $${COMPANY.serviceCallPrice} lleva al técnico a su dirección en ${city.name} e incluye un diagnóstico completo. Si aprueba la reparación, esos $${COMPANY.serviceCallPrice} se aplican al total. La mayoría de reparaciones de ${sv.seoNoun} cuestan entre $150 y $600 dependiendo de la pieza.`,
    },
    {
      question: `¿Reparan mi marca de ${sv.seoNoun} en ${city.name}?`,
      answer: `Casi seguro que sí. Nuestros técnicos en ${city.name} están entrenados en ${service.brands.slice(0, 4).join(", ")} y todas las marcas principales. Llevamos piezas comunes en el camión para terminar en la primera visita.`,
    },
    ...(SERVICE_FAQS_ES[service.slug] ?? []),
    ...GENERAL_FAQS_ES.slice(0, 4),
  ];

  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Servicios", href: "/es#services" },
    { name: sv.name, href: `/es/services/${service.slug}` },
    { name: city.name, href: `/es/services/${service.slug}/${city.slug}` },
  ];
  const personal = comboPersonalCopy(service, city, "es");

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)" }}
        />
        <div className="container-prose pt-14 pb-16 sm:pt-20 sm:pb-20">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/es" className="hover:text-foreground">Inicio</Link>
            <span aria-hidden>/</span>
            <Link href="/es#services" className="hover:text-foreground">Servicios</Link>
            <span aria-hidden>/</span>
            <Link href={`/es/services/${service.slug}`} className="hover:text-foreground">{sv.name}</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{city.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <MapPin className="size-3.5" aria-hidden /> {city.name}, condado de {city.county}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden /> Visita técnica ${COMPANY.serviceCallPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden /> El mismo día en {city.name}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            {sv.name} en
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {city.name}, FL.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {sv.name} el mismo día en {city.name} — sirviendo a {city.neighborhoods.slice(0, 3).join(", ")} y cada barrio del condado de {city.county}. {COMPANY.socialProof.technicians} técnicos con licencia, camiones equipados para {service.brands.slice(0, 3).join(", ")} y todas las marcas principales.
          </p>

          <div className="mt-9"><CTARow size="lg" locale="es" /></div>
        </div>
      </section>

      <PersonalNote {...personal} />

      <section className="container-prose py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">Problemas que reparamos en {city.name}</span>
            <h2 className="heading-section mt-3">
              Lo que nos cuentan los dueños de {sv.seoNoun} en {city.name}
            </h2>
            <p className="mt-4 text-muted-foreground">
              Diagnosticamos en la primera visita y cotizamos antes de empezar a trabajar.
            </p>
            <div className="mt-6">
              <a href={`tel:${COMPANY.phone.tel}`}
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

      <section className="container-prose py-12">
        <CityMap cityName={city.name} lat={city.geo.lat} lng={city.geo.lng} />
      </section>

      <StatsStrip locale="es" />
      <ProcessSteps locale="es" />

      <section className="border-t border-border/60 bg-background/40">
        <div className="container-prose py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{sv.name} en ciudades cercanas</h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/es/services/${service.slug}/${c.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">{sv.shortName} en {c.name}</span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Otros electrodomésticos en {city.name}</h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/es/services/${s.slug}/${city.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">{s.es.shortName} en {city.name}</span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection faqs={comboFaqs} title={`${sv.name} en ${city.name} — preguntas frecuentes`} />
      <Contact defaultAppliance={service.slug} defaultCity={city.slug} locale="es" />
      <CTABand locale="es" />

      {/* locale="es" sets inLanguage es-US; city-level LocalBusiness matches
          the EN combo template (was missing — techseo audit 2026-06-10 §3c) */}
      <JsonLd data={[serviceCityJsonLd(service, city, "es"), localBusinessForCityJsonLd(city, "es"), faqJsonLd(comboFaqs, "es"), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
