import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Clock3, ShieldCheck } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import {
  RESIDENTIAL_BRAND_PROFILES,
  type ResidentialBrandProfile,
} from "@/lib/data/residential-brand-profiles";
import { breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

const PAGE_TITLE = "Premium Appliance Brands We Repair";
const PAGE_DESC = `Sub-Zero, Wolf, Viking, Thermador, Miele, KitchenAid, GE, Whirlpool, LG, Samsung — same-day service across South Florida. $${COMPANY.serviceCallPrice} service call.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "/brands",
    languages: {
      "en-US": absoluteUrl("/brands"),
      "x-default": absoluteUrl("/brands"),
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: absoluteUrl("/brands"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

const TIER_LABEL: Record<ResidentialBrandProfile["tier"], string> = {
  premium: "Premium",
  "mid-premium": "Mid-premium",
  mass: "Mass-market",
};

export default function BrandsIndex() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
  ];

  const premium = RESIDENTIAL_BRAND_PROFILES.filter((b) => b.tier === "premium");
  const midPremium = RESIDENTIAL_BRAND_PROFILES.filter((b) => b.tier === "mid-premium");
  const mass = RESIDENTIAL_BRAND_PROFILES.filter((b) => b.tier === "mass");

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
            <span className="text-foreground/80">Brands</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden /> Same-day available
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> Licensed · EPA-608
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Brands we repair.{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              From Sub-Zero to Samsung.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {COMPANY.socialProof.technicians} licensed technicians, trucks stocked for the
            brands South Florida homes actually run — built-in refrigeration, pro-style
            ranges, premium laundry, mid-tier workhorses. Diagnosed on the platform, not
            by guessing.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <BrandSection
        eyebrow="Premium tier"
        title="Premium kitchens — built-ins, pro-style, German engineering"
        brands={premium}
      />
      <BrandSection
        eyebrow="Mid-premium"
        title="Mid-premium — Korean and American mid-tier"
        brands={midPremium}
      />
      <BrandSection
        eyebrow="Mass-market"
        title="Mass-market workhorses"
        brands={mass}
      />

      <Contact />
      <CTABand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}

function BrandSection({
  eyebrow,
  title,
  brands,
}: {
  eyebrow: string;
  title: string;
  brands: ResidentialBrandProfile[];
}) {
  if (brands.length === 0) return null;
  return (
    <section className="container-prose py-12 sm:py-16">
      <div className="max-w-3xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="heading-section mt-3">{title}</h2>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((b) => (
          <li key={b.slug}>
            <Link
              href={`/brands/${b.slug}`}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-brand">
                  {b.name}
                </h3>
                <span className="rounded-full border border-border bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {TIER_LABEL[b.tier]}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {b.teaser}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                See {b.name} repair details
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
  );
}
