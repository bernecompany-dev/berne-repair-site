import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  MapPin,
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { CityMap } from "@/components/site/city-map";
import { PersonalNote } from "@/components/site/personal-note";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ProcessSteps } from "@/components/sections/process-steps";
import { comboPersonalCopy } from "@/lib/personal-copy";
import { getComboUnique } from "@/lib/data/combo-unique";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { SERVICES, SERVICE_BY_SLUG } from "@/data/services";
import { CITIES, CITY_BY_SLUG } from "@/data/cities";
import { COMPANY } from "@/data/company";
import { GENERAL_FAQS, SERVICE_FAQS } from "@/data/faqs";
import {
  serviceCityJsonLd,
  localBusinessForCityJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  absoluteUrl,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// FNV-1a 32-bit. Same generator used in lib/personal-copy.ts. Keeps the
// failure-mode picks deterministic per (service, city) so the same combo
// renders the same 5 entries every build — important for SEO consistency.
function fnv1a(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Deterministic pick-K-without-replacement using the seed as an offset and
// stride. With K=5 over banks of size 10 we get distinct combos across
// nearby cities for the same service.
function pickK<T>(arr: T[], k: number, seed: number): T[] {
  if (arr.length <= k) return [...arr];
  const offset = seed % arr.length;
  const stride = 1 + ((seed >>> 8) % (arr.length - 1));
  const picked: T[] = [];
  const seen = new Set<number>();
  let cur = offset;
  while (picked.length < k && seen.size < arr.length) {
    if (!seen.has(cur)) {
      picked.push(arr[cur]);
      seen.add(cur);
    }
    cur = (cur + stride) % arr.length;
  }
  return picked;
}

export function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ slug: service.slug, city: city.slug });
    }
  }
  return params;
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const city = CITY_BY_SLUG[citySlug];
  if (!service || !city) return {};

  // Title template — Next layout appends " · Berne Appliance Repair" (~25 chars)
  // so we budget the page-level title at ~35 chars to land the SERP title ≤60.
  // Drop "Repair" + "$" prefix for combos over the budget so we stay in range.
  // Short combos keep the full marker for click-through clarity.
  // Air-duct demand is "cleaning", not "repair" (GSC: greenacres pos 5.5 with
  // a mismatched "Air Duct Repair" title) — these get an absolute cleaning
  // title so the layout suffix doesn't push the query match past 60 chars.
  const isAirDuct = service.slug === "air-duct-cleaning";
  const naturalTitle = `${service.shortName} Repair in ${city.name} · $${COMPANY.serviceCallPrice}`;
  const title = isAirDuct
    ? `Air Duct Cleaning in ${city.name} — Same-Day · $${COMPANY.serviceCallPrice} Call`
    : naturalTitle.length <= 45
      ? naturalTitle
      : `${service.shortName} in ${city.name} · $${COMPANY.serviceCallPrice}`;
  // Vary description openings by (slug, city) so 700+ combos aren't near-identical.
  // Each variant is hand-tuned to land ≤155 chars including the trailing CTA,
  // so SERP descriptions don't get truncated by Google.
  const seed = (service.slug + city.slug).split("").reduce((a, ch) => (a + ch.charCodeAt(0)) | 0, 0);
  const phone = COMPANY.phone.display;
  // Each opener fully crafted; ≤155 chars total. Verified via test in scripts/verify-meta.ts.
  // seoNoun for normal appliances is "refrigerator", "washer", etc.
  // For "air-duct-cleaning" / "ice-maker-repair" / "garbage-disposal-repair" seoNoun
  // is a longer phrase like "air duct cleaning" — we drop the trailing "repair"
  // in those cases so the meta reads cleanly.
  const isPhraseNoun = service.seoNoun.includes(" ");
  const noun = isPhraseNoun ? service.seoNoun : `${service.seoNoun} repair`;
  const variants = [
    `Same-day ${noun} in ${city.name}, FL. $${COMPANY.serviceCallPrice} diagnostic, licensed techs. Call ${phone}.`,
    `${service.shortName} service for ${city.name} homes — same-day, 18 techs, $${COMPANY.serviceCallPrice} call. ${phone}.`,
    `Trusted ${noun} in ${city.name}, ${city.county} County. $${COMPANY.serviceCallPrice} flat diagnostic. ${phone}.`,
    `Local ${noun} in ${city.name} — call before noon, technician same day. $${COMPANY.serviceCallPrice} diagnostic. ${phone}.`,
  ];
  // Top-20 uniquified combos (lib/data/combo-unique.ts) carry a hand-written
  // meta description — symptom + geo + $59 + 90-day — instead of the template.
  // INDEX-BLOAT GUARD (2026-06-15): on a 4-week-old domain with zero external
  // authority, Google declined to crawl the ~750 templated combo tail
  // ("Discovered – currently not indexed") and the dead weight dragged crawl
  // trust on the core hubs. Only the ~20 hand-written combos (combo-unique.ts)
  // carry index,follow; every templated combo is noindex,follow until it gets
  // genuinely page-specific content. `follow` preserves PageRank flow to the
  // hubs. Uniquified combos return to the index automatically (lookup-driven).
  const unique = getComboUnique(service.slug, city.slug);
  const description = unique?.metaDescription ?? variants[Math.abs(seed) % variants.length];
  return {
    title: isAirDuct ? { absolute: title } : title,
    description,
    robots: unique ? undefined : { index: false, follow: true },
    alternates: {
      canonical: `/services/${service.slug}/${city.slug}`,
      languages: {
        "en-US": absoluteUrl(`/services/${service.slug}/${city.slug}`),
        "es-US": absoluteUrl(`/es/services/${service.slug}/${city.slug}`),
        "x-default": absoluteUrl(`/services/${service.slug}/${city.slug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/services/${service.slug}/${city.slug}`),
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function ServiceCityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const city = CITY_BY_SLUG[citySlug];
  if (!service || !city) notFound();

  // Sort nearby cities by haversine distance — surfaces the actually-closest
  // cities first instead of the array order from data/cities.ts.
  const otherCities = [...CITIES]
    .filter((c) => c.slug !== city.slug)
    .map((c) => ({ c, d: haversine(city.geo, c.geo) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map((x) => x.c);
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 6);

  // Deterministic single-entry pick from the failure-mode bank. We surface
  // ONE technician-voice diagnostic block per combo (not 5) because the
  // larger render hung Turbopack workers at ~75% page generation across the
  // 1540-combo build. The full 10-mode banks live in data/services.ts and
  // can be surfaced more broadly on per-service hub pages where build cost
  // is bounded to 11 pages instead of 770.
  const comboSeed = fnv1a(`${service.slug}__${city.slug}`);
  const pickedFailures = service.failureModes
    ? pickK(service.failureModes, 1, comboSeed)
    : [];

  // Hand-written page-specific content for the top-20 combos (combo dedup
  // program, wave 2026-06-10 — sister-city pages measured 72% identical).
  const unique = getComboUnique(service.slug, city.slug);

  const comboFaqs = [
    ...(unique?.faqs ?? []),
    {
      question: `How fast can you get to ${city.name} for a ${service.seoNoun}?`,
      answer: `Most ${city.name} jobs are scheduled within an hour. Call before noon and we can usually have a technician at your door in ${city.name} the same day. We cover ${city.neighborhoods.slice(0, 3).join(", ")} and surrounding neighborhoods.`,
    },
    {
      question: `What's the cost for ${service.shortName.toLowerCase()} repair in ${city.name}?`,
      answer: `Our flat $${COMPANY.serviceCallPrice} service call gets a technician to your ${city.name} address and includes a full diagnosis. If you approve the repair, the visit is free — you only pay the $${COMPANY.serviceCallPrice} if you decide not to proceed. Most ${service.shortName.toLowerCase()} repairs in ${city.name} fall between $150 and $600 depending on the part.`,
    },
    {
      question: `Do you service my brand of ${service.seoNoun} in ${city.name}?`,
      answer: `Almost certainly yes. Our ${city.name} technicians are trained on ${service.brands.slice(0, 4).join(", ")} and every other major brand. Trucks are stocked with common ${service.seoNoun} parts for these brands so most repairs finish on the first visit.`,
    },
    ...(SERVICE_FAQS[service.slug] ?? []),
    ...GENERAL_FAQS.slice(0, 4),
  ];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${service.slug}` },
    { name: city.name, href: `/services/${service.slug}/${city.slug}` },
  ];
  const personal = comboPersonalCopy(service, city);

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
        <div className="container-prose pt-14 pb-16 sm:pt-20 sm:pb-20">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <span aria-hidden>/</span>
            <Link href={`/services/${service.slug}`} className="hover:text-foreground">{service.name}</Link>
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
              ${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden />
              Same-day in {city.name}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            {service.name} in
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              {city.name}, FL.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {unique?.heroIntro ?? (
              <>Same-day {service.seoNoun} repair in {city.name} — serving {city.neighborhoods.slice(0, 3).join(", ")} and every neighborhood in {city.county} County. {COMPANY.socialProof.technicians} licensed technicians, trucks stocked for {service.brands.slice(0, 3).join(", ")} and every major brand.</>
            )}
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <PersonalNote {...personal} />

      {/* Common issues for this service, framed for this city */}
      <section className="container-prose py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <span className="eyebrow">Issues we fix in {city.name}</span>
            <h2 className="heading-section mt-3">
              {city.name} {service.shortName.toLowerCase()} owners call us about
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

      {/* Hand-written local deep-dive — only the top-20 combos have this.
          This is the page-unique content block that breaks the 72% sister-city
          duplication: real housing-stock detail, city-specific failure
          patterns, and local service logistics. */}
      {unique ? (
        <section className="border-y border-border/60 bg-background/40">
          <div className="container-prose py-16 sm:py-20">
            <div className="max-w-3xl">
              <span className="eyebrow">{unique.local.eyebrow}</span>
              <h2 className="heading-section mt-3">{unique.local.heading}</h2>
            </div>
            <div className="mt-8 max-w-3xl space-y-5">
              {unique.local.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            {unique.nuances?.length ? (
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unique.nuances.map((n) => (
                  <div key={n.title} className="rounded-2xl border border-border bg-card/40 p-5">
                    <div className="text-sm font-semibold tracking-tight text-foreground">
                      {n.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {n.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Failure-mode mini-callout — one technician-voice entry picked per
          (service, city) seed. The full 10-mode bank is kept in
          data/services.ts; we only surface ONE on each page to keep
          static-generation memory in budget across 770 EN + 770 ES combos.
          The picked entry varies across cities for the same service so SERP
          crawlers see distinct mid-page content per URL. */}
      {pickedFailures.length > 0 ? (
        <section className="border-y border-border/60 bg-background/40">
          <div className="container-prose py-16">
            <span className="eyebrow">{service.shortName} diagnostics — {city.name}</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {pickedFailures[0].symptom}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card/40 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Likely cause
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {pickedFailures[0].cause}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/40 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-brand">
                  What we do on the truck
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                  {pickedFailures[0].fix}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Neighborhoods served */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <span className="eyebrow">{city.name} neighborhoods</span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {service.shortName} service across {city.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                ZIP codes we cover: {city.zips.slice(0, 6).join(" · ")}{city.zips.length > 6 ? " · …" : ""}
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
        </div>
      </section>

      {/* Brands stocked */}
      <section className="container-prose py-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">{service.shortName} brands serviced in {city.name}</span>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Trucks stocked with common parts so most {city.name} jobs finish on the first visit.
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
      </section>

      {/* Coverage map for this city */}
      <section className="container-prose py-12">
        <CityMap cityName={city.name} lat={city.geo.lat} lng={city.geo.lng} />
      </section>

      <StatsStrip />

      <ProcessSteps />

      {/* Trust strip */}
      <section className="container-prose pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock3, label: `Same-day in ${city.name}`, body: "Most jobs scheduled within an hour." },
            { icon: ShieldCheck, label: "Licensed & insured", body: `${COMPANY.socialProof.warranty}.` },
            { icon: Phone, label: "Local dispatch", body: "Real human answers — no call centers." },
          ].map((t) => (
            <div key={t.label} className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <t.icon className="size-5" aria-hidden />
              </span>
              <div>
                <div className="text-sm font-semibold">{t.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internal linking: same service, other cities + other services, this city */}
      <section className="border-t border-border/60 bg-background/40">
        <div className="container-prose py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {service.name} in nearby cities
            </h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={getComboUnique(service.slug, c.slug) ? `/services/${service.slug}/${c.slug}` : `/areas/${c.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">
                      {service.shortName} in {c.name}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Other appliances we repair in {city.name}
            </h3>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={getComboUnique(s.slug, city.slug) ? `/services/${s.slug}/${city.slug}` : `/services/${s.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                  >
                    <span className="text-sm font-semibold">
                      {s.shortName} in {city.name}
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection faqs={comboFaqs} title={`${service.name} in ${city.name} — FAQ`} />
      <Contact defaultAppliance={service.slug} defaultCity={city.slug} />
      <CTABand />

      <JsonLd
        data={[
          serviceCityJsonLd(service, city),
          localBusinessForCityJsonLd(city),
          faqJsonLd(comboFaqs),
          breadcrumbJsonLd(crumbs),
        ]}
      />
    </>
  );
}
