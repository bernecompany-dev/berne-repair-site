import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Scale,
  Sparkles,
  Users,
} from "lucide-react";

import { CTARow } from "@/components/site/cta-row";
import { FAQSection } from "@/components/sections/faq";
import { InlineCta } from "@/components/sections/inline-cta";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import {
  BRAND_COMPARISONS,
  BRAND_COMPARISON_SLUGS,
  getBrandComparison,
} from "@/lib/data/brand-comparisons";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

export function generateStaticParams() {
  return BRAND_COMPARISON_SLUGS.map((slug) => ({ slug }));
}

// Authored/refresh dates for the luxury comparison cluster. Static constants —
// the comparison data carries no per-item date; these feed Article schema
// (datePublished is required for rich-result eligibility).
const COMPARE_PUBLISHED = "2026-06-11";
const COMPARE_MODIFIED = "2026-06-29";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getBrandComparison(slug);
  if (!comparison) return {};
  return {
    // Absolute — metaTitle already carries "· Berne"; the layout template
    // would append " · Berne Appliance Repair" a second time.
    title: { absolute: comparison.metaTitle },
    description: comparison.metaDescription,
    alternates: {
      canonical: `/compare/${comparison.slug}`,
      languages: {
        "en-US": absoluteUrl(`/compare/${comparison.slug}`),
        "x-default": absoluteUrl(`/compare/${comparison.slug}`),
      },
    },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: absoluteUrl(`/compare/${comparison.slug}`),
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const c = getBrandComparison(slug);
  if (!c) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: c.h1.replace(/ — .*/, ""), href: `/compare/${c.slug}` },
  ];

  const otherComparisons = BRAND_COMPARISONS.filter(
    (other) => other.slug !== c.slug,
  ).slice(0, 4);

  // "Wolf, Thermador and Viking" — for the early-CTA copy below the TL;DR.
  const brandNames = c.brands.map((b) => b.name);
  const brandList =
    brandNames.length > 1
      ? `${brandNames.slice(0, -1).join(", ")} and ${brandNames[brandNames.length - 1]}`
      : brandNames[0];

  const pageUrl = absoluteUrl(`/compare/${c.slug}`);
  const orgId = absoluteUrl("/#organization");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: c.h1.slice(0, 110),
    alternativeHeadline: c.metaTitle,
    description: c.metaDescription,
    image: `${SITE_URL}/opengraph-image`,
    // Article rich-result eligibility requires datePublished; dateModified
    // signals freshness. The comparison set has no per-item date, so use the
    // cluster's authored/refresh dates as static constants.
    datePublished: COMPARE_PUBLISHED,
    dateModified: COMPARE_MODIFIED,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    inLanguage: "en-US",
    // author/publisher point at the Organization node (/#organization, emitted
    // in layout.tsx). Do NOT reuse /#business here — that @id is typed
    // [HomeAndConstructionBusiness, ProfessionalService] in the layout, so
    // re-declaring it as "Organization" creates a conflicting @type on one @id.
    author: {
      "@type": "Organization",
      "@id": orgId,
      name: COMPANY.legalName,
    },
    publisher: {
      "@type": "Organization",
      "@id": orgId,
      name: COMPANY.legalName,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    about: c.brands.map((b) => ({
      "@type": "Brand",
      name: b.name,
      ...(b.hq
        ? {
            address: {
              "@type": "PostalAddress",
              addressLocality: b.hq,
            },
          }
        : {}),
      ...(b.brandSlug ? { url: absoluteUrl(`/brands/${b.brandSlug}`) } : {}),
    })),
  };

  // FAQ JSON-LD needs the {question, answer} shape — already matches FAQ type.
  const faqLd = faqJsonLd(c.faqs);

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
            <Link href="/compare" className="hover:text-foreground">
              Compare
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">
              {c.h1.replace(/ — .*/, "")}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Scale className="size-3.5" aria-hidden /> Brand comparison
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden /> $
              {COMPANY.serviceCallPrice} diagnostic, credited to repair
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> We
              service both brands
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">{c.h1}</h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {c.teaser}
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      {/* TL;DR */}
      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">TL;DR</span>
            <h2 className="heading-section mt-3">The short version.</h2>
            <p className="mt-4 text-muted-foreground">
              Five-line verdict before the full breakdown. Read this if you
              don&apos;t have time for the deep dive.
            </p>
          </div>
          <ul className="grid gap-3">
            {c.tldr.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-4"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <CheckCircle2 className="size-4" aria-hidden />
                </span>
                <span className="text-base leading-relaxed text-foreground/90">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Early CTA — high-intent comparison readers shouldn't have to
            scroll the full deep dive to reach a button (lead review 06-11). */}
        <InlineCta
          className="mt-10"
          title={`Whichever you pick — we service ${brandList}.`}
          body={`Factory-trained techs, priority white-glove appointments across South Florida. $${COMPANY.serviceCallPrice} diagnostic — credited to repair.`}
        />
      </section>

      {/* Intro */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">The comparison</span>
            <h2 className="heading-section mt-3">
              Why this comparison, written by a service shop.
            </h2>
          </div>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {c.intro.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Per-brand deep dives */}
      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Brand-by-brand</span>
          <h2 className="heading-section mt-3">
            About each brand — and what we see in the field.
          </h2>
        </div>
        <div className="mt-12 grid gap-12">
          {c.brands.map((b) => (
            <article
              key={b.name}
              className="rounded-2xl border border-border bg-card/40 p-7 sm:p-10"
            >
              <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {b.name}
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {b.hq ? (
                    <span className="rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-muted-foreground">
                      HQ · {b.hq}
                    </span>
                  ) : null}
                  {b.brandSlug ? (
                    <Link
                      href={`/brands/${b.brandSlug}`}
                      className="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 font-medium text-brand hover:bg-brand/15"
                    >
                      Full {b.name} repair page →
                    </Link>
                  ) : null}
                </div>
              </header>

              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {b.about}
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand">
                    <Sparkles className="size-4" aria-hidden /> Where {b.name}{" "}
                    wins
                  </h4>
                  <ul className="mt-4 grid gap-4">
                    {b.strengths.map((s) => (
                      <li
                        key={s.title}
                        className="rounded-xl border border-border bg-card/60 p-4"
                      >
                        <div className="text-sm font-semibold text-foreground">
                          {s.title}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {s.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <Clock3 className="size-4" aria-hidden /> Common failure
                    modes
                  </h4>
                  <ul className="mt-4 grid gap-4">
                    {b.failureModes.map((f) => (
                      <li
                        key={f.title}
                        className="rounded-xl border border-border bg-card/60 p-4"
                      >
                        <div className="text-sm font-semibold text-foreground">
                          {f.title}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {f.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border/60 bg-tint/[0.03] p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Parts &amp; service economics
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.ownership}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Buyer profiles */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Which buyer picks which</span>
            <h2 className="heading-section mt-3">
              Buyer profiles — and our honest recommendation.
            </h2>
            <p className="mt-4 text-muted-foreground">
              No platform is universally better; the right pick depends on how
              you cook, how long you&apos;ll keep the appliance, and what the
              rest of the kitchen looks like.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {c.buyerProfiles.map((p) => (
              <li
                key={p.headline}
                className="rounded-2xl border border-border bg-card/40 p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Users className="size-4" aria-hidden />
                  </span>
                  <div>
                    <div className="text-base font-semibold text-foreground">
                      {p.headline}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.recommendation}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cost of ownership */}
      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">Cost of ownership</span>
            <h2 className="heading-section mt-3">
              What it costs to actually own each one.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {c.ownershipNotes}
          </p>
        </div>
      </section>

      {/* Berne perspective */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <span className="eyebrow">Berne&apos;s perspective</span>
              <h2 className="heading-section mt-3">
                We service both. Here&apos;s what we think.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {c.bernePerspective}
            </p>
          </div>
        </div>
      </section>

      <FAQSection faqs={c.faqs} title={`${c.h1.replace(/ — .*/, "")} — questions we get`} />

      {/* Other comparisons */}
      {otherComparisons.length ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">More comparisons</span>
            <h2 className="heading-section mt-3">
              Other premium-brand decisions we cover.
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherComparisons.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/compare/${other.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="text-base font-semibold text-foreground group-hover:text-brand">
                    {other.h1.replace(/ — .*/, "")}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {other.teaser.length > 140
                      ? `${other.teaser.slice(0, 137)}...`
                      : other.teaser}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                    Read the comparison
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Contact />
      <CTABand />

      <JsonLd
        data={[articleJsonLd, faqLd, breadcrumbJsonLd(crumbs)]}
      />
    </>
  );
}
