import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  MapPin,
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  ArrowRight,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { ServiceMapEmbed } from "@/components/sections/service-map-embed";
import { PersonalNote } from "@/components/site/personal-note";
import { StatsStrip } from "@/components/sections/stats-strip";
import { cityPersonalCopy } from "@/lib/personal-copy";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { CITIES, CITY_BY_SLUG } from "@/data/cities";
import { SERVICES } from "@/data/services";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS } from "@/data/faqs";
import { cityJsonLd, faqJsonLd, breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getComboUnique } from "@/lib/data/combo-unique";

// Same haversine pattern as /services/[slug]/[city]/. Used to rank
// nearby city hubs by geo-distance (not array order from data/cities.ts)
// so the "Nearby cities we serve" block surfaces the actually-closest
// neighbors first.
function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ city: string }> };

/**
 * Hand-tuned SERP snippet for the single highest-value city hub (CTR pass
 * 2026-06-09). Title is `absolute` (skips the " · Berne Appliance Repair"
 * template) to fit ~60 chars. Every other city keeps the programmatic
 * template — do not mass-edit.
 */
const CITY_META_OVERRIDES: Record<string, { title: string; description: string }> = {
  miami: {
    title: "Appliance Repair Miami, FL — Same-Day Service · $59 Call",
    description:
      "Same-day appliance repair anywhere in Miami — Brickell to Little Havana. $59 service call, 18 licensed techs, 90-day warranty. Call by noon, fixed today.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) return {};
  const override = CITY_META_OVERRIDES[slug];
  const title = override?.title ?? `Appliance Repair in ${city.name} · $${COMPANY.serviceCallPrice} Service Call`;
  const description =
    override?.description ??
    `Same-day appliance repair in ${city.name}, ${city.county} County. $${COMPANY.serviceCallPrice} service call. ${COMPANY.socialProof.technicians} licensed technicians. Sub-Zero, Wolf, Viking, Bosch and every major brand.`;
  return {
    title: override ? { absolute: title } : title,
    description,
    alternates: {
      canonical: `/areas/${city.slug}`,
      languages: {
        "en-US": absoluteUrl(`/areas/${city.slug}`),
        "es-US": absoluteUrl(`/es/areas/${city.slug}`),
        "x-default": absoluteUrl(`/areas/${city.slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/areas/${city.slug}`),
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Areas", href: "/areas" },
    { name: city.name, href: `/areas/${city.slug}` },
  ];
  const personal = cityPersonalCopy(city);

  // Rank nearby cities: same-county neighbors first (county-locality matters
  // for service-area SEO and user intent — someone in Aventura looks for
  // Sunny Isles, not for West Palm), then global haversine distance as
  // tie-breaker / fallback when county runs out.
  const nearbyCities = [...CITIES]
    .filter((c) => c.slug !== city.slug)
    .map((c) => ({
      c,
      d: haversineKm(city.geo, c.geo),
      sameCounty: c.county === city.county,
    }))
    .sort((a, b) => {
      if (a.sameCounty !== b.sameCounty) return a.sameCounty ? -1 : 1;
      return a.d - b.d;
    })
    .slice(0, 6)
    .map((x) => x.c);

  const cityFaqs = [
    {
      question: `Do you really cover all of ${city.name}?`,
      answer: `Yes — including ${city.neighborhoods.slice(0, 3).join(", ")} and surrounding neighborhoods, ZIP codes ${city.zips.slice(0, 4).join(", ")}${city.zips.length > 4 ? ", and more" : ""}.`,
    },
    {
      question: `What's the soonest you can get someone to ${city.name}?`,
      answer: `Most ${city.name} jobs are scheduled within an hour of your call. Call before noon and we can usually be at your door the same day.`,
    },
    ...GENERAL_FAQS.slice(0, 6),
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
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/areas" className="hover:text-foreground">Areas</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{city.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <MapPin className="size-3.5" aria-hidden />
              {city.name}, {city.county} County
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden />
              ${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden />
              Same-day in {city.name}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Appliance Repair in
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {city.name}, FL.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {COMPANY.socialProof.technicians} licensed technicians serving {city.name} every day —
            from {city.neighborhoods.slice(0, 2).join(" and ")} to every block in between. Trucks
            stocked for Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch and every major brand.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      {/* Services available in this city */}
      <section className="container-prose py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Services in {city.name}</span>
          <h2 className="heading-section mt-3">
            Every major appliance, repaired in {city.name}.
          </h2>
        </div>

        {/* Crawl-budget discipline (2026-06-15): link each service to its
            combo URL only when that combo is uniquified (index,follow);
            otherwise link to the service hub (/services/[slug]), which is
            indexable. Keeps internal links off the noindex templated tail. */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const comboIndexable = Boolean(getComboUnique(service.slug, city.slug));
            const href = comboIndexable
              ? `/services/${service.slug}/${city.slug}`
              : `/services/${service.slug}`;
            return (
              <Link
                key={service.slug}
                href={href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-card/70"
              >
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {city.name}
                </div>
                <h3 className="text-base font-semibold tracking-tight">
                  {service.name}
                </h3>
                <div className="mt-auto inline-flex items-center gap-1.5 text-xs text-brand">
                  Same-day available
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <span className="eyebrow">Neighborhoods we cover</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Every corner of {city.name}.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                ZIP codes: {city.zips.join(" · ")}
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

      {/* Nearby cities we also serve — same-county neighbors first, then by
          distance. Cross-links between /areas/[city]/ hubs improve crawl
          paths and surface real coverage to users on the city page. */}
      {nearbyCities.length > 0 ? (
        <section className="container-prose py-16">
          <div className="max-w-2xl">
            <span className="eyebrow">Nearby cities we also serve</span>
            <h2 className="heading-section mt-3">
              {city.county} County coverage around {city.name}.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Same-day appliance repair across the cities closest to{" "}
              {city.name}. Trucks dispatched from the same routes serve all
              of {city.county} County.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyCities.map((nc) => (
              <li key={nc.slug}>
                <Link
                  href={`/areas/${nc.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div>
                    <div className="text-sm font-semibold">
                      Appliance Repair in {nc.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {nc.county} County
                    </div>
                  </div>
                  <ArrowRight
                    className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <PersonalNote {...personal} />

      {/* Real service-call footprint around this city — pin swarm of completed
          jobs (neighborhood-level for privacy). Lazy-loaded (IntersectionObserver
          + dynamic maplibre import) so it never touches LCP. Links to the full
          interactive /service-map. */}
      <section className="container-prose py-16">
        <div className="max-w-2xl">
          <span className="eyebrow">Real jobs near {city.name}</span>
          <h2 className="heading-section mt-3">
            Where we&apos;ve actually worked around {city.name}.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each dot is a completed appliance repair, offset to the neighborhood
            level for customer privacy — no exact addresses. Pan and zoom to see
            the density of service calls across {city.name} and nearby{" "}
            {city.county} County.
          </p>
        </div>
        <div className="mt-8">
          <ServiceMapEmbed center={[city.geo.lng, city.geo.lat]} zoom={11} />
        </div>
        <Link
          href="/service-map"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
        >
          See the full South Florida service map
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      <StatsStrip />

      {/* Trust strip */}
      <section className="container-prose py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock3, label: "Same-day in " + city.name, body: "Most jobs scheduled within an hour." },
            { icon: ShieldCheck, label: "Licensed & insured", body: COMPANY.socialProof.warranty + "." },
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

      <FAQSection faqs={cityFaqs} title={`${city.name} — questions we get`} />
      <Contact defaultCity={city.slug} />
      <CTABand />

      <JsonLd
        data={[cityJsonLd(city), faqJsonLd(cityFaqs), breadcrumbJsonLd(crumbs)]}
      />
    </>
  );
}
