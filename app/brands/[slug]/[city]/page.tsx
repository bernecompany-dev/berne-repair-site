import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeDollarSign,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";

import { CTARow } from "@/components/site/cta-row";
import { StatsStrip } from "@/components/sections/stats-strip";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { CITY_BY_SLUG } from "@/data/cities";
import { SERVICE_BY_SLUG } from "@/data/services";
import { getResidentialBrand } from "@/lib/data/residential-brand-profiles";
import {
  BRAND_CITY_SLUGS,
  getBrandCityContent,
  getCitiesForBrand,
} from "@/lib/data/brand-city-content";
import {
  BRAND_SERVICE_SLUGS,
  getBrandServiceContent,
} from "@/lib/data/brand-service-content";
import { BrandServiceLanding } from "@/components/sections/brand-service-landing";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

/**
 * Brand × city landing pages — 15 hand-curated combinations only
 * ({Sub-Zero, Wolf, Viking, Thermador, Miele} × {Miami, Fort Lauderdale,
 * Boca Raton}) — PLUS the brand × service layer (2026-06-11):
 * /brands/sub-zero/ice-maker-repair, /brands/miele/washer-repair,
 * /brands/wolf/range-repair. The second segment is checked against the
 * brand-service registry first, then the city registry. dynamicParams=false
 * keeps every other pair a 404 instead of spawning a phantom programmatic
 * layer (site is fully static).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...BRAND_CITY_SLUGS.map(({ brand, city }) => ({ slug: brand, city })),
    ...BRAND_SERVICE_SLUGS.map(({ brand, service }) => ({ slug: brand, city: service })),
  ];
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const svc = getBrandServiceContent(slug, citySlug);
  if (svc) {
    const path = `/brands/${slug}/${svc.service}`;
    return {
      // Absolute — hand-budgeted ≤60 chars including brand; the layout
      // template suffix would push them past SERP truncation.
      title: { absolute: svc.metaTitle },
      description: svc.metaDescription,
      alternates: {
        canonical: path,
        languages: {
          "en-US": absoluteUrl(path),
          "x-default": absoluteUrl(path),
        },
      },
      openGraph: {
        title: svc.metaTitle,
        description: svc.metaDescription,
        url: absoluteUrl(path),
        type: "website",
        images: [DEFAULT_OG_IMAGE],
      },
    };
  }
  const content = getBrandCityContent(slug, citySlug);
  if (!content) return {};
  return {
    // Absolute — these titles are hand-budgeted ≤60 chars including brand;
    // the layout template suffix would push them past SERP truncation.
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: {
      canonical: `/brands/${slug}/${citySlug}`,
      languages: {
        "en-US": absoluteUrl(`/brands/${slug}/${citySlug}`),
        "x-default": absoluteUrl(`/brands/${slug}/${citySlug}`),
      },
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: absoluteUrl(`/brands/${slug}/${citySlug}`),
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/** Deterministic per-city slice of the brand failure-mode bank so the three
 *  city pages of one brand never render identical blocks (combo-dedup rule). */
function cityFailureSlice<T>(modes: T[], citySlug: string, count = 4): T[] {
  const order = ["miami", "fort-lauderdale", "boca-raton"];
  const idx = Math.max(0, order.indexOf(citySlug));
  const offset = idx * 3;
  const out: T[] = [];
  for (let i = 0; i < Math.min(count, modes.length); i++) {
    out.push(modes[(offset + i) % modes.length]);
  }
  return out;
}

export default async function BrandCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const brand = getResidentialBrand(slug);

  // Brand × service landing (ice-maker-repair / washer-repair / range-repair)
  // — same route machinery, dedicated template + content bank.
  const svc = brand ? getBrandServiceContent(slug, citySlug) : undefined;
  if (brand && svc) {
    return <BrandServiceLanding brand={brand} content={svc} />;
  }

  const content = getBrandCityContent(slug, citySlug);
  const city = CITY_BY_SLUG[citySlug];
  if (!content || !brand || !city) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${brand.slug}` },
    { name: city.name, href: `/brands/${brand.slug}/${city.slug}` },
  ];

  const failureModes = cityFailureSlice(brand.failureModes, city.slug);
  const siblingCities = getCitiesForBrand(brand.slug).filter(
    (c) => c.city !== city.slug,
  );
  // Brand-relevant service combos in this city — only link service slugs
  // that actually exist as routes.
  const serviceCombos = brand.relatedServices
    .filter((s) => SERVICE_BY_SLUG[s.slug])
    .slice(0, 4);

  const faqs = [...content.faqs, ...brand.faqs.slice(0, 3)];

  const businessId = absoluteUrl("/#business");
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/brands/${brand.slug}/${city.slug}#service`),
    name: `${brand.name} Appliance Repair in ${city.name}`,
    serviceType: `${brand.name} appliance repair`,
    description: content.metaDescription,
    provider: { "@id": businessId },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    brand: { "@type": "Brand", name: brand.name, alternateName: brand.manufacturer },
    url: absoluteUrl(`/brands/${brand.slug}/${city.slug}`),
    inLanguage: "en-US",
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `$${COMPANY.serviceCallPrice} diagnostic — credited to repair`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: COMPANY.serviceCallPrice,
        maxPrice: 900,
        priceCurrency: "USD",
      },
    },
  };

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
            className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/brands" className="hover:text-foreground">Brands</Link>
            <span aria-hidden>/</span>
            <Link href={`/brands/${brand.slug}`} className="hover:text-foreground">
              {brand.name}
            </Link>
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
              ${COMPANY.serviceCallPrice} diagnostic — credited to repair
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Star className="size-3.5 text-brand" aria-hidden />
              4.79 · 1,373 verified reviews
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden />
              Same-day available
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            {brand.name} repair in
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {content.h1City}, FL.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {content.heroIntro}
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <StatsStrip />

      {/* City-specific deep dive */}
      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">{content.local.eyebrow}</span>
          <h2 className="heading-section mt-3">{content.local.heading}</h2>
        </div>
        <div className="mt-8 max-w-3xl space-y-5">
          {content.local.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Brand failure modes — city-rotated slice of the profile bank */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">From real service tickets</span>
            <h2 className="heading-section mt-3">
              {brand.name} failures we repair in {city.name}.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Platform-specific patterns, documented in the field — not a brochure.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {failureModes.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card/40 p-5">
                <div className="text-base font-semibold tracking-tight text-foreground">
                  {f.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href={`/brands/${brand.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
            >
              Full {brand.name} platform guide
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Neighborhoods served */}
      <section className="container-prose py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <span className="eyebrow">{city.name} coverage</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {brand.name} service across {city.name}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Licensed &amp; insured · EPA-608 · {COMPANY.socialProof.warranty}
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
      </section>

      {/* Internal links: appliance-type combos in this city + sibling cities */}
      <section className="border-t border-border/60 bg-background/40">
        <div className="container-prose py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {brand.name} repair in {city.name} — by appliance
            </h3>
            <ul className="mt-5 grid gap-2">
              {serviceCombos.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/${city.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">
                      {s.label} in {city.name}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {brand.name} repair in nearby cities
            </h3>
            <ul className="mt-5 grid gap-2">
              {siblingCities.map((c) => (
                <li key={c.city}>
                  <Link
                    href={`/brands/${brand.slug}/${c.city}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">
                      {brand.name} repair in {c.h1City}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <span className="text-sm font-semibold">
                    {brand.name} repair — all of South Florida
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={faqs}
        title={`${brand.name} repair in ${city.name} — questions we get`}
      />

      <Contact defaultBrand={brand.name} defaultCity={city.slug} />
      <CTABand />

      <JsonLd data={[serviceJsonLd, faqJsonLd(faqs), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
