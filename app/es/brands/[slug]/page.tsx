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
import { StatsStrip } from "@/components/sections/stats-strip";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { BrandGallery } from "@/components/sections/brand-gallery";
import { LgAuthorizedBanner } from "@/components/sections/lg-authorized";
import { getBrandPhotos } from "@/lib/data/brand-photos";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { SERVICE_BY_SLUG } from "@/data/services";
import { CITIES } from "@/data/cities";
import {
  RESIDENTIAL_BRAND_PROFILES,
  getResidentialBrand,
  type ResidentialBrandProfile,
} from "@/lib/data/residential-brand-profiles";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  SITE_URL,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

const TIER_BADGE: Record<ResidentialBrandProfile["tier"], string> = {
  premium: "Tier premium",
  "mid-premium": "Mid-premium",
  mass: "Mass-market",
};

// Only brands with a real Spanish localization get an /es page — the
// 2026-06-11 EN-only brand hubs (Liebherr, Dacor, Fisher & Paykel, Gaggenau,
// Bertazzoni, Monogram) are excluded so the /es lane never serves English
// fallback content under an es-US hreflang.
export function generateStaticParams() {
  return RESIDENTIAL_BRAND_PROFILES.filter((b) => b.es).map((b) => ({ slug: b.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getResidentialBrand(slug);
  if (!brand || !brand.es) return {};
  const es = brand.es;
  return {
    // Absolute: the dictionary titles already run 55–60ch ("Reparación X ·
    // Sur de Florida · $59 Service Call") — the layout suffix pushed them to
    // 78–82ch. Same absolute pattern as the ES service hubs (round-2).
    title: { absolute: es?.metaTitle ?? brand.metaTitle },
    description: es?.metaDescription ?? brand.metaDescription,
    alternates: {
      canonical: `/es/brands/${brand.slug}`,
      languages: {
        "en-US": absoluteUrl(`/brands/${brand.slug}`),
        "es-US": absoluteUrl(`/es/brands/${brand.slug}`),
        "x-default": absoluteUrl(`/brands/${brand.slug}`),
      },
    },
    openGraph: {
      title: es?.metaTitle ?? brand.metaTitle,
      description: es?.metaDescription ?? brand.metaDescription,
      url: absoluteUrl(`/es/brands/${brand.slug}`),
      type: "website",
      locale: "es_US",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BrandPageES({ params }: PageProps) {
  const { slug } = await params;
  const brand = getResidentialBrand(slug);
  // EN-only brands have no /es page (see generateStaticParams note).
  if (!brand || !brand.es) notFound();

  // Filter out service slugs without /services routes (stove/cooktop) —
  // prevents 404 internal links.
  const relatedServices = brand.relatedServices.filter((s) => SERVICE_BY_SLUG[s.slug]);

  // Fall back to EN content if ES not provided
  const v = brand.es ?? {
    teaser: brand.teaser,
    metaTitle: brand.metaTitle,
    metaDescription: brand.metaDescription,
    about: brand.about,
    equipment: brand.equipment,
    failureModes: brand.failureModes,
    whyBerne: brand.whyBerne,
    serviceArea: brand.serviceArea,
    faqs: brand.faqs,
  };

  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Marcas", href: "/es/brands" },
    { name: brand.name, href: `/es/brands/${brand.slug}` },
  ];

  // Only link sibling brands that themselves have an /es page.
  const related = RESIDENTIAL_BRAND_PROFILES.filter(
    (b) => b.slug !== brand.slug && b.es,
  ).slice(0, 4);

  const serviceId = absoluteUrl(`/es/brands/${brand.slug}#service-${brand.slug}`);
  const businessId = absoluteUrl("/#business");
  const brandPhotos = getBrandPhotos(brand.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: `Reparación ${brand.name}`,
    serviceType: `Reparación de electrodomésticos ${brand.name}`,
    description: v.metaDescription,
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
    url: absoluteUrl(`/es/brands/${brand.slug}`),
    // Mismas fotos de campo que la página EN (lote 2026-07-24).
    ...(brandPhotos.length
      ? {
          image: brandPhotos.map((p) =>
            absoluteUrl(`/images/brands/${brand.slug}/${p.file}`),
          ),
        }
      : {}),
    inLanguage: "es-US",
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `Diagnóstico de $${COMPANY.serviceCallPrice} — abonado a la reparación`,
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
    url: `${SITE_URL}/es/brands/${brand.slug}`,
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
            <Link href="/es" className="hover:text-foreground">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <Link href="/es/brands" className="hover:text-foreground">
              Marcas
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{brand.name}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />Diagnóstico ${COMPANY.serviceCallPrice} — abonado a la reparación
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden /> El mismo día disponible
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> {TIER_BADGE[brand.tier]}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Reparación {brand.name}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              en el sur de Florida.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {v.teaser}
          </p>

          <div className="mt-9">
            <CTARow size="lg" locale="es" />
          </div>
        </div>
      </section>

      {/* Prueba social — mismo patrón que las plantillas de servicio/área */}
      <StatsStrip locale="es" />

      {/* Autorización de fábrica LG — solo hub LG (credencial 2026-07-24) */}
      {brand.slug === "lg" ? <LgAuthorizedBanner locale="es" /> : null}

      {/* About */}
      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div>
            <span className="eyebrow">Acerca de {brand.name}</span>
            <h2 className="heading-section mt-3">Cómo abordamos {brand.name}.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {v.about}
            </p>
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-card/50 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">
              Cobertura Sur de Florida
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Miami-Dade, Broward y Palm Beach. Despacho el mismo día en llamadas {brand.name} cuando el scheduling lo permite.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-foreground/90">
              <li className="flex items-center gap-2">
                <Clock3 className="size-4 text-brand" aria-hidden /> Despacho el mismo día
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand" aria-hidden /> Licenciados y asegurados · EPA-608
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-brand" aria-hidden /> Garantía 90 días labor y partes
              </li>
            </ul>
            <div className="mt-5">
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:brightness-110"
              >
                Llame {COMPANY.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Equipment / Models */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Modelos {brand.name} que atendemos</span>
            <h2 className="heading-section mt-3">
              Series de modelos y plataformas que cubrimos.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Las series que las casas del Sur de Florida realmente corren — generaciones actuales y previas.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {v.equipment.map((e) => (
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
          <span className="eyebrow">Lo que vemos en la plataforma</span>
          <h2 className="heading-section mt-3">
            Modos de falla {brand.name} que reparamos.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Documentados de tickets reales — no un brochure.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {v.failureModes.map((f) => (
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
              <span className="eyebrow">Por qué Berne</span>
              <h2 className="heading-section mt-3">
                Por qué Berne para {brand.name}.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {v.whyBerne}
            </p>
          </div>
        </div>
      </section>

      {/* Galería de fotos de campo — mismas fotos que la página EN, lazy */}
      <BrandGallery brandSlug={brand.slug} brandName={brand.name} locale="es" />

      {/* Related services */}
      {relatedServices.length ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Servicios relacionados</span>
            <h2 className="heading-section mt-3">
              Reparación {brand.name} — por tipo de electrodoméstico.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Atendemos {brand.name} en estas categorías.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/es/services/${s.slug}`}
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
              <span className="eyebrow">Área de servicio</span>
              <h2 className="heading-section mt-3">Cobertura Sur de Florida.</h2>
            </div>
            <div>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {v.serviceArea}
              </p>
              <div className="mt-6">
                <Link
                  href="/es/areas"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
                >
                  Ver todas las áreas de servicio del Sur de Florida
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={v.faqs}
        title={`Reparación ${brand.name} — preguntas frecuentes`}
      />

      {/* Related brands */}
      {related.length ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Otras marcas</span>
            <h2 className="heading-section mt-3">
              Otras marcas premium que atendemos.
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/es/brands/${b.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="text-base font-semibold text-foreground group-hover:text-brand">
                    {b.name}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {b.es?.teaser ?? b.teaser}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/es/brands"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
            >
              Ver todas las marcas que atendemos
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}

      <Contact defaultAppliance={brand.slug} locale="es" />
      <CTABand locale="es" />

      <JsonLd
        data={[
          serviceJsonLd,
          brandJsonLd,
          faqJsonLd(v.faqs, "es"),
          breadcrumbJsonLd(crumbs),
        ]}
      />
    </>
  );
}
