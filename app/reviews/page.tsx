import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote, ShieldCheck } from "lucide-react";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { REVIEWS, REVIEW_AGGREGATE } from "@/data/reviews";
import { COMPANY } from "@/data/company";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Customer Reviews — 4.79★ / 871 · Berne Appliance Repair";
const PAGE_DESCRIPTION =
  "Real customer reviews for Berne Appliance Repair across South Florida — 4.79-star average across 871 verified reviews. Read what homeowners say about our techs.";

// EN-only page (no /es/reviews mirror). The footer/llms.txt reference /reviews;
// this page resolves that link and gives the brand a dedicated E-E-A-T review
// hub instead of a 404.
export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/reviews",
    languages: {
      "en-US": absoluteUrl("/reviews"),
      "x-default": absoluteUrl("/reviews"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/reviews" }),
};

export default function ReviewsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews" },
  ];

  return (
    <>
      {/* Hero / aggregate */}
      <section className="border-b border-border/60">
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Reviews</span>
          </nav>

          <span className="eyebrow">What our customers say</span>
          <h1 className="heading-hero mt-3 max-w-3xl">
            {REVIEW_AGGREGATE.ratingValue}★ across {REVIEW_AGGREGATE.reviewCount} reviews.
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div
              role="img"
              className="flex items-center gap-1"
              aria-label={`${REVIEW_AGGREGATE.ratingValue} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-6 fill-brand text-brand" aria-hidden />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{REVIEW_AGGREGATE.ratingValue} average</span>{" "}
              · {REVIEW_AGGREGATE.reviewCount} verified reviews
            </div>
          </div>

          {/* Honest attribution — the aggregate is the Berne network's pool
              (Berne Appliance Repair / Berne Repair DBAs), not a single-listing
              invented number. */}
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            This rating reflects verified customer reviews across the Berne family of
            appliance-repair companies in South Florida — the same technicians, the same
            standards, whether the listing reads Berne Appliance Repair or Berne Repair.
            Below is a selection of recent reviews left by homeowners across Miami-Dade,
            Broward, and Palm Beach.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-xs font-medium text-foreground/80">
            <ShieldCheck className="size-4 text-brand" aria-hidden />
            Licensed &amp; insured · {COMPANY.socialProof.warranty}
          </div>
        </div>
      </section>

      {/* Review grid */}
      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={`${r.author}-${r.datePublished}`}
              className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6"
            >
              <Quote className="size-6 text-brand/70" aria-hidden />
              <blockquote className="text-base leading-relaxed text-foreground/90">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.author}</div>
                  {r.location ? (
                    <div className="text-xs text-muted-foreground">{r.location}</div>
                  ) : null}
                </div>
                <div
                  role="img"
                  className="flex items-center gap-0.5"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-brand text-brand" aria-hidden />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Contact />
      <CTABand />

      {/* Breadcrumb only — the canonical LocalBusiness node (with its
          aggregateRating + Review nodes) is already emitted sitewide from the
          root layout, so we do NOT duplicate an aggregateRating node here. */}
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
