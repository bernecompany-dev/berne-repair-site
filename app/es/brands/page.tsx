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

const PAGE_TITLE = "Marcas premium de electrodomésticos";
const PAGE_DESC = `Sub-Zero, Wolf, Viking, Thermador, Miele, KitchenAid, GE, Whirlpool, LG, Samsung — servicio el mismo día en el Sur de Florida. $${COMPANY.serviceCallPrice} service call.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: {
    canonical: "/es/brands",
    languages: {
      "en-US": absoluteUrl("/brands"),
      "es-US": absoluteUrl("/es/brands"),
      "x-default": absoluteUrl("/brands"),
    },
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: absoluteUrl("/es/brands"),
    type: "website",
    locale: "es_US",
    images: [DEFAULT_OG_IMAGE],
  },
};

const TIER_LABEL: Record<ResidentialBrandProfile["tier"], string> = {
  premium: "Premium",
  "mid-premium": "Mid-premium",
  mass: "Mass-market",
};

export default function BrandsIndexES() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Marcas", href: "/es/brands" },
  ];

  // Only brands with a real Spanish localization — EN-only hubs (2026-06-11
  // wave) have no /es page and must not be linked from here.
  const localized = RESIDENTIAL_BRAND_PROFILES.filter((b) => b.es);
  const premium = localized.filter((b) => b.tier === "premium");
  const midPremium = localized.filter((b) => b.tier === "mid-premium");
  const mass = localized.filter((b) => b.tier === "mass");

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
            <Link href="/es" className="hover:text-foreground">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Marcas</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden /> El mismo día
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> Licenciados · EPA-608
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Marcas que reparamos.{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              De Sub-Zero a Samsung.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {COMPANY.socialProof.technicians} técnicos licenciados, camiones surtidos para las marcas que las casas del Sur de Florida realmente corren — refrigeración built-in, estufas pro-style, lavandería premium, workhorses mid-tier. Diagnosticados en la plataforma, no por adivinar.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <BrandSection
        eyebrow="Tier premium"
        title="Cocinas premium — built-ins, pro-style, ingeniería alemana"
        brands={premium}
      />
      <BrandSection
        eyebrow="Mid-premium"
        title="Mid-premium — coreanas y americanas mid-tier"
        brands={midPremium}
      />
      <BrandSection
        eyebrow="Mass-market"
        title="Workhorses mass-market"
        brands={mass}
      />

      <Contact locale="es" />
      <CTABand locale="es" />

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
              href={`/es/brands/${b.slug}`}
              className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-brand">
                  {b.name}
                </h3>
                <span className="rounded-full border border-border bg-tint/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {TIER_LABEL[b.tier]}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {b.es?.teaser ?? b.teaser}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                Ver detalles {b.name}
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
