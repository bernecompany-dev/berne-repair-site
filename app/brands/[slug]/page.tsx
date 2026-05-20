import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { CTARow } from "@/components/site/cta-row";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { CITIES } from "@/data/cities";
import {
  RESIDENTIAL_BRAND_PROFILES,
  RESIDENTIAL_BRAND_SLUGS,
  getResidentialBrand,
  type ResidentialBrandProfile,
} from "@/lib/data/residential-brand-profiles";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  SITE_URL,
} from "@/lib/seo";

const TIER_BADGE: Record<ResidentialBrandProfile["tier"], string> = {
  premium: "Premium tier",
  "mid-premium": "Mid-premium",
  mass: "Mass-market",
};

export function generateStaticParams() {
  return RESIDENTIAL_BRAND_SLUGS.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getResidentialBrand(slug);
  if (!brand) return {};
  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    alternates: {
      canonical: `/brands/${brand.slug}`,
      languages: {
        "en-US": absoluteUrl(`/brands/${brand.slug}`),
        "x-default": absoluteUrl(`/brands/${brand.slug}`),
      },
    },
    openGraph: {
      title: brand.metaTitle,
      description: brand.metaDescription,
      url: absoluteUrl(`/brands/${brand.slug}`),
      type: "website",
    },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = getResidentialBrand(slug);
  if (!brand) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${brand.slug}` },
  ];

  const related = RESIDENTIAL_BRAND_PROFILES.filter((b) => b.slug !== brand.slug).slice(0, 4);

  // Service @id used by the page-level Service JSON-LD. Provider = global
  // LocalBusiness via @id reference (resolved by layout's localBusinessJsonLd).
  const serviceId = absoluteUrl(`/brands/${brand.slug}#service-${brand.slug}`);
  const businessId = absoluteUrl("/#business");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: `${brand.name} Appliance Repair`,
    serviceType: `${brand.name} appliance repair`,
    description: brand.metaDescription,
    provider: { "@id": businessId },
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: c.name,
        addressRegion: "FL",
        addressCountry: "US",
      },
    })),
    brand: {
      "@type": "Brand",
      name: brand.name,
      alternateName: brand.manufacturer,
      ...(brand.hq
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: brand.hq,
            },
          }
        : {}),
    },
    url: absoluteUrl(`/brands/${brand.slug}`),
    inLanguage: "en-US",
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `$${COMPANY.serviceCallPrice} service call — applied toward the repair`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: COMPANY.serviceCallPrice,
        maxPrice: 900,
        priceCurrency: "USD",
      },
    },
  };

  const brandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    alternateName: brand.manufacturer,
    ...(brand.hq
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: brand.hq,
          },
        }
      : {}),
    url: `${SITE_URL}/brands/${brand.slug}`,
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
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/brands" className="hover:text-foreground">
              Brands
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{brand.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden /> Same-day available
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> {TIER_BADGE[brand.tier]}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            {brand.name} repair
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              across South Florida.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {brand.teaser}
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <span className="eyebrow">About {brand.name}</span>
            <h2 className="heading-section mt-3">How we approach {brand.name}.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {brand.about}
            </p>
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-card/50 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">
              South Florida coverage
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Miami-Dade, Broward & Palm Beach. Same-day dispatch on {brand.name} calls
              when scheduling allows.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-foreground/90">
              <li className="flex items-center gap-2">
                <Clock3 className="size-4 text-brand" aria-hidden /> Same-day dispatch
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand" aria-hidden /> Licensed &amp; insured · EPA-608
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-brand" aria-hidden /> 90-day labor &amp; parts warranty
              </li>
            </ul>
            <div className="mt-5">
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:brightness-110"
              >
                Call {COMPANY.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Equipment / Models */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">{brand.name} models we service</span>
            <h2 className="heading-section mt-3">
              Model series and platforms we cover.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The series South Florida homes actually run — current and previous
              generations.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {brand.equipment.map((e) => (
              <div
                key={e.series}
                className="rounded-2xl border border-border bg-card/40 p-5"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Wrench className="size-4" aria-hidden />
                  </span>
                  <div className="text-sm font-semibold leading-tight text-foreground">
                    {e.series}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Failure modes */}
      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">What we see on the platform</span>
          <h2 className="heading-section mt-3">
            Common {brand.name} failure modes we repair.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Documented from real service tickets — not a brochure.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {brand.failureModes.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card/40 p-5"
            >
              <div className="text-base font-semibold tracking-tight text-foreground">
                {f.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Berne */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <span className="eyebrow">Why Berne</span>
              <h2 className="heading-section mt-3">
                Why Berne for {brand.name}.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {brand.whyBerne}
            </p>
          </div>
        </div>
      </section>

      {/* Related services */}
      {brand.relatedServices.length ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Related services</span>
            <h2 className="heading-section mt-3">
              {brand.name} repair — by appliance type.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We service {brand.name} across these appliance categories.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brand.relatedServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="text-sm font-semibold text-foreground">
                    {brand.name} {s.label}
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

      {/* Service area */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <span className="eyebrow">Service area</span>
              <h2 className="heading-section mt-3">South Florida coverage.</h2>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {brand.serviceArea}
              </p>
              <div className="mt-6">
                <Link
                  href="/areas"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
                >
                  See all South Florida service areas
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={brand.faqs}
        title={`${brand.name} repair — questions we get`}
      />

      {/* Related brands */}
      {related.length ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Other brands</span>
            <h2 className="heading-section mt-3">
              Other premium brands we service.
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/brands/${b.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="text-base font-semibold text-foreground group-hover:text-brand">
                    {b.name}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {b.teaser}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
            >
              See all brands we service
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}

      <Contact defaultAppliance={brand.slug} />
      <CTABand />

      <JsonLd
        data={[
          serviceJsonLd,
          brandJsonLd,
          faqJsonLd(brand.faqs),
          breadcrumbJsonLd(crumbs),
        ]}
      />
    </>
  );
}
