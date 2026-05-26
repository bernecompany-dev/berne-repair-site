import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Scale, ShieldCheck } from "lucide-react";

import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { BRAND_COMPARISONS } from "@/lib/data/brand-comparisons";
import { breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

const PAGE_TITLE = "Premium Appliance Brand Comparisons";
const PAGE_DESC =
  "Sub-Zero vs Viking, Wolf vs Thermador, Miele vs Bosch — premium appliance brand comparisons written by a South Florida service shop that fixes all of them.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "/compare",
    languages: {
      "en-US": absoluteUrl("/compare"),
      "x-default": absoluteUrl("/compare"),
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: absoluteUrl("/compare"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function CompareIndex() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
  ];

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
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Compare</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Scale className="size-3.5" aria-hidden /> Honest brand
              comparisons
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden /> $
              {COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> We
              service every brand we compare
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Brand comparisons.{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Sub-Zero vs Viking. Wolf vs Thermador. The honest version.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Premium appliance brand comparisons written by a working service
            shop. We don&apos;t sell appliances, we don&apos;t earn referral
            fees, and we service every brand we compare. Built from real field
            tickets, not marketing copy.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Comparisons available</span>
          <h2 className="heading-section mt-3">
            {BRAND_COMPARISONS.length} brand comparisons — and counting.
          </h2>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_COMPARISONS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/compare/${c.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <div className="text-lg font-semibold tracking-tight text-foreground group-hover:text-brand">
                  {c.h1.replace(/ — .*/, "")}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.teaser}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                  Read the full comparison
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

      <Contact />
      <CTABand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
