import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Clock3,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import { CTARow } from "@/components/site/cta-row";
import { StatsStrip } from "@/components/sections/stats-strip";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { BrandSpecialistsBlock } from "@/components/sections/brand-specialists";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { CITIES } from "@/data/cities";
import type { ResidentialBrandProfile } from "@/lib/data/residential-brand-profiles";
import type { BrandServiceContent } from "@/lib/data/brand-service-content";
import { getCitiesForBrand } from "@/lib/data/brand-city-content";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

/**
 * Brand × service landing — rendered by /brands/[slug]/[city] when the second
 * segment matches the brand-service registry (see brand-service-content.ts).
 * Mirrors the brand-city template's visual language; content is fully
 * hand-written per page.
 */
export function BrandServiceLanding({
  brand,
  content,
}: {
  brand: ResidentialBrandProfile;
  content: BrandServiceContent;
}) {
  const path = `/brands/${brand.slug}/${content.service}`;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${brand.slug}` },
    { name: content.serviceLabel, href: path },
  ];

  const cityPages = getCitiesForBrand(brand.slug);

  const businessId = absoluteUrl("/#business");
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    name: `${brand.name} ${content.serviceLabel}`,
    serviceType: `${brand.name} ${content.serviceLabel.toLowerCase()}`,
    description: content.metaDescription,
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
    },
    url: absoluteUrl(path),
    inLanguage: "en-US",
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `$${COMPANY.serviceCallPrice} service call — free with repair`,
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
            <span className="text-foreground/80">{content.serviceLabel}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />
              ${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Star className="size-3.5 text-brand" aria-hidden />
              4.79 · 871 verified reviews
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden />
              Same-day available
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              90-day warranty
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            {brand.name} {content.h1Lead}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {content.h1Accent}
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

      {/* Hand-written deep-dive sections */}
      {content.sections.map((s, i) => (
        <section
          key={s.heading}
          className={
            i % 2 === 0
              ? "container-prose py-16 sm:py-20"
              : "border-y border-border/60 bg-background/40"
          }
        >
          <div className={i % 2 === 0 ? "" : "container-prose py-16 sm:py-20"}>
            <div className="max-w-3xl">
              <span className="eyebrow">{s.eyebrow}</span>
              <h2 className="heading-section mt-3">{s.heading}</h2>
            </div>
            <div className="mt-8 max-w-3xl space-y-5">
              {s.paragraphs.map((p, j) => (
                <p key={j} className="text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Failure modes — service-specific bank */}
      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">From real service tickets</span>
          <h2 className="heading-section mt-3">
            {brand.name} {content.serviceLabel.toLowerCase()} — failures we see.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Documented from the platform, not a brochure.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {content.failureModes.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/40 p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Wrench className="size-4" aria-hidden />
                </span>
                <div className="text-base font-semibold leading-tight tracking-tight text-foreground">
                  {f.title}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost table */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">What it costs</span>
            <h2 className="heading-section mt-3">
              Typical {brand.name} {content.serviceLabel.toLowerCase()} costs.
            </h2>
          </div>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card/40">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-5 py-4 font-semibold">Repair</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Typical range</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {content.costRows.map((r) => (
                  <tr key={r.job} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-4 font-semibold text-foreground">{r.job}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-brand font-semibold">
                      {r.range}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {content.costNote}
          </p>
        </div>
      </section>

      {/* Specialists for this brand */}
      <BrandSpecialistsBlock brandSlug={brand.slug} brandName={brand.name} />

      {/* Internal links: brand hub, service hub, brand×city pages */}
      <section className="border-t border-border/60 bg-background/40">
        <div className="container-prose grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              More {brand.name} resources
            </h3>
            <ul className="mt-5 grid gap-2">
              <li>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <span className="text-sm font-semibold">
                    {brand.name} repair — the full platform guide
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                </Link>
              </li>
              <li>
                <Link
                  href={`/services/${content.serviceHubSlug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <span className="text-sm font-semibold">
                    {content.serviceHubLabel} — all brands, South Florida
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            </ul>
          </div>
          {cityPages.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {brand.name} repair near you
              </h3>
              <ul className="mt-5 grid gap-2">
                {cityPages.map((c) => (
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
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <FAQSection
        faqs={content.faqs}
        title={`${brand.name} ${content.serviceLabel.toLowerCase()} — questions we get`}
      />

      <Contact defaultBrand={brand.name} />
      <CTABand />

      <JsonLd data={[serviceJsonLd, faqJsonLd(content.faqs), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
