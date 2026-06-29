import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ShieldCheck, Clock3, BadgeDollarSign, CheckCircle2, ArrowRight } from "lucide-react";
import { Carousel } from "@/components/site/carousel";
import { PersonalNote } from "@/components/site/personal-note";
import { SERVICE_HERO_IMAGES } from "@/lib/service-images";
import { servicePersonalCopy } from "@/lib/personal-copy";
import { CTARow } from "@/components/site/cta-row";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { SERVICES, SERVICE_BY_SLUG } from "@/data/services";
import { HIGHEND_SERVICE_BY_SLUG } from "@/data/highend";
import { CITIES } from "@/data/cities";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS, SERVICE_FAQS } from "@/data/faqs";
import { serviceJsonLd, faqJsonLd, breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { getBrandComparison } from "@/lib/data/brand-comparisons";
import { BRAND_SERVICE_PAGES } from "@/lib/data/brand-service-content";
import { getResidentialBrand } from "@/lib/data/residential-brand-profiles";
import { getComboUnique } from "@/lib/data/combo-unique";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

/**
 * Hand-tuned SERP snippets for the 5 highest-traffic service hubs ONLY
 * (CTR pass 2026-06-09). Titles are `absolute` (bypass the " · Berne
 * Appliance Repair" layout template) to stay under ~60 chars — the templated
 * default truncates at ~78 in SERPs. Descriptions lead with the symptom the
 * searcher typed, then the $59 / same-day / 90-day-warranty hooks, <155
 * chars. Other long-tail hubs (microwave, garbage disposal, …) intentionally
 * keep the programmatic template — do not mass-edit. Ice maker added
 * 2026-06-10: the templated default ran 77 chars.
 */
const META_OVERRIDES: Record<string, { title: string; description: string }> = {
  "refrigerator-repair": {
    title: "Sub-Zero & Built-In Refrigerator Repair · South Florida",
    description:
      "White-glove repair of Sub-Zero, Viking & Thermador built-in refrigerators in Miami's finest homes. EPA-608 specialists, 90-day warranty, $59 diagnostic credited.",
  },
  "washer-repair": {
    title: "Luxury Washer Repair — Miele & Bosch · South Florida",
    description:
      "Factory-trained repair of Miele, Bosch & Speed Queen washers across Miami's affluent homes. Precision diagnostics, 90-day warranty, $59 diagnostic credited to repair.",
  },
  "dryer-repair": {
    title: "High-End Dryer Repair — Miele & Bosch · South Florida",
    description:
      "Specialist repair of Miele & Bosch heat-pump and premium vented dryers in South Florida's luxury homes. White-glove service, 90-day warranty, $59 diagnostic credited.",
  },
  "dishwasher-repair": {
    title: "Miele & Bosch Dishwasher Repair · South Florida",
    description:
      "Senior-tech repair of Miele, Bosch & Thermador panel-ready dishwashers in Miami's finest kitchens. Cabinetry-safe service, 90-day warranty, $59 diagnostic credited.",
  },
  "oven-repair": {
    title: "Wolf, Viking & Thermador Oven Repair · South Florida",
    description:
      "Factory-trained repair of Wolf, Viking, Thermador & La Cornue ranges and ovens in South Florida's luxury kitchens. White-glove care, 90-day warranty, $59 diagnostic.",
  },
  "ice-maker-repair": {
    title: "Sub-Zero & Scotsman Ice Maker Repair · South Florida",
    description:
      "Specialist repair of Sub-Zero, Scotsman & U-Line built-in ice makers in Miami's premium homes. EPA-608 sealed-system work, 90-day warranty, $59 diagnostic credited.",
  },
  "microwave-repair": {
    title: "Built-In & Drawer Microwave Repair · South Florida",
    description:
      "Senior-tech repair of Wolf, Sharp & Thermador built-in and drawer microwaves in South Florida's luxury kitchens. White-glove service, 90-day warranty, $59 diagnostic.",
  },
  "air-duct-cleaning": {
    title: "Air Duct & Dryer Vent Cleaning · South Florida",
    description:
      "HEPA negative-pressure duct and dryer-vent cleaning for South Florida's finest homes. Photo-documented, licensed techs, $59 diagnostic credited. Cleaner air, less risk.",
  },
  "garbage-disposal-repair": {
    title: "InSinkErator Garbage Disposal Repair · South Florida",
    description:
      "Repair and quiet-mount replacement of InSinkErator & Waste King disposals in Miami's luxury kitchens. Cabinetry-safe, 90-day warranty, $59 diagnostic credited to repair.",
  },
  "range-hood-repair": {
    title: "Wolf & Vent-A-Hood Range Hood Repair · South Florida",
    description:
      "Senior-tech repair of Wolf, Viking, Thermador & Vent-A-Hood range hoods in South Florida's luxury kitchens. Proprietary boards handled, 90-day warranty, $59 diagnostic.",
  },
  "wine-cooler-repair": {
    title: "Sub-Zero & EuroCave Wine Cooler Repair · South Florida",
    description:
      "Specialist repair of Sub-Zero, EuroCave & Marvel wine columns protecting Miami's finest collections. EPA-608 sealed-system work, 90-day warranty, $59 diagnostic credited.",
  },
};

/**
 * Brand comparison guides relevant to a service hub. Internal-link rescue for
 * the /compare cluster (previously orphaned) — only the three hubs whose
 * appliance category matches a written comparison get a block.
 */
const COMPARE_GUIDES: Record<string, string[]> = {
  "refrigerator-repair": [
    "sub-zero-vs-viking",
    "sub-zero-vs-thermador",
    "sub-zero-bi-36-vs-bi-48",
  ],
  "oven-repair": ["wolf-vs-thermador-vs-viking", "wolf-vs-blue-star"],
  "dishwasher-repair": ["miele-vs-bosch"],
};

/**
 * Reciprocal internal links: standard service hubs → the hand-authored
 * high-end specialty pages (data/highend/*). Keyed by the standard hub slug,
 * values are high-end slugs that share an appliance category, so the new
 * luxury pages aren't only reachable from /services but also from the most
 * relevant existing hubs.
 */
const RELATED_HIGHEND: Record<string, string[]> = {
  "oven-repair": ["warming-drawer-repair", "coffee-machine-repair"],
  "wine-cooler-repair": ["coffee-machine-repair", "warming-drawer-repair"],
  "refrigerator-repair": ["cold-plunge-repair"],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  if (!service) return {};
  const override = META_OVERRIDES[slug];
  const title =
    override?.title ?? `${service.name} — White-Glove Service · South Florida`;
  const description = override?.description ?? service.description;
  return {
    title: override ? { absolute: title } : title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
      languages: {
        "en-US": absoluteUrl(`/services/${service.slug}`),
        "es-US": absoluteUrl(`/es/services/${service.slug}`),
        "x-default": absoluteUrl(`/services/${service.slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/services/${service.slug}`),
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  if (!service) notFound();

  const faqs = [...(SERVICE_FAQS[service.slug] ?? []), ...GENERAL_FAQS.slice(0, 5)];
  const heroImages = SERVICE_HERO_IMAGES[service.slug];
  const personal = servicePersonalCopy(service);
  const compareGuides = (COMPARE_GUIDES[service.slug] ?? [])
    .map((s) => getBrandComparison(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  // Brand × service deep dives that belong under this hub
  // (e.g. /brands/sub-zero/ice-maker-repair under /services/ice-maker-repair).
  const brandServicePages = BRAND_SERVICE_PAGES.filter(
    (p) => p.serviceHubSlug === service.slug,
  ).map((p) => ({ ...p, brandName: getResidentialBrand(p.brand)?.name ?? p.brand }));
  const relatedHighEnd = (RELATED_HIGHEND[service.slug] ?? [])
    .map((s) => HIGHEND_SERVICE_BY_SLUG[s])
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
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
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{service.name}</span>
          </nav>

          <div className={heroImages ? "grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]" : ""}>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                  <BadgeDollarSign className="size-3.5" aria-hidden />
                  ${COMPANY.serviceCallPrice} diagnostic · credited
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                  <Clock3 className="size-3.5 text-brand" aria-hidden />
                  Factory-trained · white-glove
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                  <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                  90-day warranty
                </span>
              </div>

              <h1 className="heading-hero mt-6 max-w-3xl">
                {service.name}
                <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
                  across South Florida.
                </span>
              </h1>

              {/* CTA above the teaser — on 844px mobile viewports the long
                  hub teaser pushed the call CTA below the fold (CRO audit
                  2026-06-10 F3). Call affordance now lands directly under
                  the H1. */}
              <div className="mt-7">
                <CTARow size="lg" />
              </div>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {service.longDescription}
              </p>

              {["refrigerator-repair", "washer-repair", "dryer-repair", "dishwasher-repair", "oven-repair"].includes(service.slug) ? (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground/85">
                  Running commercial-grade equipment — walk-in coolers, ice
                  machines, restaurant ranges, commercial laundry?{" "}
                  <a
                    href="https://www.berne-commercial.com/"
                    rel="noopener"
                    className="text-brand hover:underline"
                  >
                    Berne Commercial Repair
                  </a>{" "}
                  handles restaurants, production facilities, hotels and
                  property management across South Florida.
                </p>
              ) : null}
            </div>

            {heroImages ? (
              <div className="mt-8 lg:mt-0">
                <Carousel images={heroImages} aspectClass="aspect-[4/5]" priority />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <StatsStrip />

      <PersonalNote {...personal} />

      {/* Common issues */}
      <section className="container-prose py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">Common issues we fix</span>
            <h2 className="heading-section mt-3">
              Sound familiar?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We diagnose on the first visit and quote the repair before any work starts.
            </p>
            <div className="mt-6">
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                <Phone className="size-4 text-brand" aria-hidden />
                Call {COMPANY.phone.display}
              </a>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.commonIssues.map((issue) => (
              <li
                key={issue}
                className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/90">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps />

      {/* Brands for this service */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-14">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="eyebrow">{service.shortName} brands we service</span>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Trucks stocked with common parts for the brands below.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {service.brands.map((brand) => (
              <div
                key={brand}
                className="flex h-14 items-center justify-center rounded-xl border border-border bg-card/40 px-3 text-center"
              >
                <span className="truncate text-sm font-semibold tracking-tight text-foreground/85">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand comparison guides (refrigeration / ranges / dishwashers only) */}
      {compareGuides.length > 0 ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">Choosing between brands?</span>
            <h2 className="heading-section mt-3">
              Comparison guides from our service desk.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Written from real repair tickets — no affiliate links, we don&apos;t
              sell appliances.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {compareGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/compare/${g.slug}`}
                className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card/40 p-4 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <span className="text-sm font-semibold leading-snug text-foreground/90">
                  {g.h1}
                </span>
                <ArrowRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            <Link href="/compare" className="text-brand hover:underline">
              All brand comparison guides →
            </Link>
          </p>
        </section>
      ) : null}

      {/* Brand-specific deep dives under this hub (2026-06-11 layer) */}
      {brandServicePages.length > 0 ? (
        <section className="border-y border-border/60 bg-background/40">
          <div className="container-prose py-16 sm:py-20">
            <div className="max-w-2xl">
              <span className="eyebrow">Brand specialists</span>
              <h2 className="heading-section mt-3">
                {service.shortName} — brand-specific guides.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Premium platforms get dedicated pages: failure banks from real
                tickets, honest cost ranges, and how we diagnose.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {brandServicePages.map((p) => (
                <Link
                  key={`${p.brand}/${p.service}`}
                  href={`/brands/${p.brand}/${p.service}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card/40 p-4 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div>
                    <div className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-brand">
                      {p.brandName} {p.serviceLabel.toLowerCase()} — the platform guide
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {p.metaDescription}
                    </p>
                  </div>
                  <ArrowRight
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Areas served for this service */}
      <section className="container-prose py-20 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Cities we cover</span>
          <h2 className="heading-section mt-3">
            {service.name} in your city.
          </h2>
          <p className="mt-4 text-muted-foreground">
            White-glove {service.seoNoun} service across South Florida's most affluent neighborhoods.
          </p>
        </div>

        {/* Crawl-budget discipline (2026-06-15): on a young domain we don't
            spray ~64 links to templated, noindex combo pages from every
            service hub — that dilutes PageRank across the duplicate tail
            instead of concentrating it on indexable pages. A city links to its
            combo URL only when that combo is uniquified (index,follow);
            otherwise it links to the city's area hub (/areas/[city]), which is
            indexable. Net effect: internal links point only at pages Google
            will actually index. */}
        <div className="mt-10 grid grid-cols-2 gap-2 lg:grid-cols-3">
          {CITIES.map((city) => {
            const comboIndexable = Boolean(getComboUnique(service.slug, city.slug));
            const href = comboIndexable
              ? `/services/${service.slug}/${city.slug}`
              : `/areas/${city.slug}`;
            return (
              <Link
                key={city.slug}
                href={href}
                className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {service.shortName} in {city.name}
                  </div>
                  <div className="hidden text-xs text-muted-foreground sm:block">{city.county} County</div>
                </div>
                <ArrowRight
                  className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Reciprocal links to the high-end specialty pages in this category */}
      {relatedHighEnd.length > 0 ? (
        <section className="container-prose py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">High-end & specialty</span>
            <h2 className="heading-section mt-3">
              Luxury equipment in this category.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Same senior techs, dedicated pages for the specialty equipment in
              high-end South Florida kitchens and homes.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {relatedHighEnd.map((h) => (
              <Link
                key={h.slug}
                href={`/services/${h.slug}`}
                className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card/40 p-4 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <div>
                  <div className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-brand">
                    {h.name}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {h.cardDescription}
                  </p>
                </div>
                <ArrowRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <FAQSection faqs={faqs} title={`${service.name} — questions we get`} />
      <Contact defaultAppliance={service.slug} />
      <CTABand />

      <JsonLd
        data={[serviceJsonLd(service), faqJsonLd(faqs), breadcrumbJsonLd(crumbs)]}
      />
    </>
  );
}
