import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  MapPin,
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { CityMap } from "@/components/site/city-map";
import { PersonalNote } from "@/components/site/personal-note";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ProcessSteps } from "@/components/sections/process-steps";
import { comboPersonalCopy } from "@/lib/personal-copy";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { SERVICES, SERVICE_BY_SLUG } from "@/data/services";
import { CITIES, CITY_BY_SLUG } from "@/data/cities";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS, SERVICE_FAQS } from "@/data/faqs";
import {
  serviceCityJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  absoluteUrl,
} from "@/lib/seo";

export function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ slug: service.slug, city: city.slug });
    }
  }
  return params;
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const city = CITY_BY_SLUG[citySlug];
  if (!service || !city) return {};

  const title = `${service.name} in ${city.name}, FL · $${COMPANY.serviceCallPrice} Service Call`;
  // Vary description openings by (slug, city) so 700+ combos aren't near-identical.
  const seed = (service.slug + city.slug).split("").reduce((a, ch) => (a + ch.charCodeAt(0)) | 0, 0);
  const openers = [
    `Same-day ${service.seoNoun} repair in ${city.name}, ${city.county} County.`,
    `${service.name} for ${city.name} homes and businesses — same-day available.`,
    `Trusted ${service.seoNoun} service across ${city.name} and the ${city.county} County area.`,
    `Local ${service.shortName.toLowerCase()} repair in ${city.name} — call before noon, technician same day.`,
  ];
  const opener = openers[Math.abs(seed) % openers.length];
  const brandList = service.brands.slice(0, 4).join(", ");
  const description = `${opener} $${COMPANY.serviceCallPrice} service call. Licensed & insured. ${brandList} and every major brand. Call ${COMPANY.phone.display}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}/${city.slug}`,
      languages: {
        "en-US": absoluteUrl(`/services/${service.slug}/${city.slug}`),
        "es-US": absoluteUrl(`/es/services/${service.slug}/${city.slug}`),
        "x-default": absoluteUrl(`/services/${service.slug}/${city.slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/services/${service.slug}/${city.slug}`),
      type: "website",
    },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const city = CITY_BY_SLUG[citySlug];
  if (!service || !city) notFound();

  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 6);
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);

  const comboFaqs = [
    {
      question: `How fast can you get to ${city.name} for a ${service.seoNoun}?`,
      answer: `Most ${city.name} jobs are scheduled within an hour. Call before noon and we can usually have a technician at your door in ${city.name} the same day. We cover ${city.neighborhoods.slice(0, 3).join(", ")} and surrounding neighborhoods.`,
    },
    {
      question: `What's the cost for ${service.shortName.toLowerCase()} repair in ${city.name}?`,
      answer: `Our flat $${COMPANY.serviceCallPrice} service call gets a technician to your ${city.name} address and includes a full diagnosis. If you approve the repair, that $${COMPANY.serviceCallPrice} is applied toward the total. Most ${service.shortName.toLowerCase()} repairs in ${city.name} fall between $150 and $600 depending on the part.`,
    },
    {
      question: `Do you service my brand of ${service.seoNoun} in ${city.name}?`,
      answer: `Almost certainly yes. Our ${city.name} technicians are trained on ${service.brands.slice(0, 4).join(", ")} and every other major brand. Trucks are stocked with common ${service.seoNoun} parts for these brands so most repairs finish on the first visit.`,
    },
    ...(SERVICE_FAQS[service.slug] ?? []),
    ...GENERAL_FAQS.slice(0, 4),
  ];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: service.name, href: `/services/${service.slug}` },
    { name: city.name, href: `/services/${service.slug}/${city.slug}` },
  ];
  const personal = comboPersonalCopy(service, city);

  return (
    <>
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
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/#services" className="hover:text-foreground">Services</Link>
            <span aria-hidden>/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-foreground">{service.name}</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{city.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <MapPin className="size-3.5" aria-hidden />
              {city.name}, {city.county} County
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden />
              ${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden />
              Same-day in {city.name}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            {service.name} in
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {city.name}, FL.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Same-day {service.seoNoun} repair in {city.name} — serving {city.neighborhoods.slice(0, 3).join(", ")} and every neighborhood in {city.county} County. {COMPANY.socialProof.technicians} licensed technicians, trucks stocked for {service.brands.slice(0, 3).join(", ")} and every major brand.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <PersonalNote {...personal} />

      {/* Common issues for this service, framed for this city */}
      <section className="container-prose py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">Issues we fix in {city.name}</span>
            <h2 className="heading-section mt-3">
              {city.name} {service.shortName.toLowerCase()} owners call us about
            </h2>
            <p className="mt-4 text-muted-foreground">
              We diagnose on the first visit and quote the repair before any work starts.
            </p>
            <div className="mt-6">
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
              >
                <Phone className="size-4 text-brand" aria-hidden />
                Call {COMPANY.phone.display}
              </a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.commonIssues.map((issue) => (
              <li
                key={issue}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/90">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Neighborhoods served */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <span className="eyebrow">{city.name} neighborhoods</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {service.shortName} service across {city.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                ZIP codes we cover: {city.zips.slice(0, 6).join(" · ")}{city.zips.length > 6 ? " · …" : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 self-start">
              {city.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm font-medium text-foreground/85"
                >
                  <MapPin className="size-3.5 text-brand" aria-hidden />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands stocked */}
      <section className="container-prose py-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">{service.shortName} brands serviced in {city.name}</span>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Trucks stocked with common parts so most {city.name} jobs finish on the first visit.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
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

      {/* Coverage map for this city */}
      <section className="container-prose py-12">
        <CityMap cityName={city.name} lat={city.geo.lat} lng={city.geo.lng} />
      </section>

      <StatsStrip />

      <ProcessSteps />

      {/* Trust strip */}
      <section className="container-prose pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock3, label: `Same-day in ${city.name}`, body: "Most jobs scheduled within an hour." },
            { icon: ShieldCheck, label: "Licensed & insured", body: `${COMPANY.socialProof.warranty}.` },
            { icon: Phone, label: "Local dispatch", body: "Real human answers — no call centers." },
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

      {/* Internal linking: same service, other cities + other services, this city */}
      <section className="border-t border-border/60 bg-background/40">
        <div className="container-prose py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {service.name} in nearby cities
            </h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/services/${service.slug}/${c.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">
                      {service.shortName} in {c.name}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Other appliances we repair in {city.name}
            </h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/${city.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">
                      {s.shortName} in {city.name}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection faqs={comboFaqs} title={`${service.name} in ${city.name} — FAQ`} />
      <Contact defaultAppliance={service.slug} defaultCity={city.slug} />
      <CTABand />

      <JsonLd
        data={[
          serviceCityJsonLd(service, city),
          faqJsonLd(comboFaqs),
          breadcrumbJsonLd(crumbs),
        ]}
      />
    </>
  );
}
