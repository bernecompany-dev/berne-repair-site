/**
 * Static search index for berne-repair.com.
 *
 * Built at compile time from the same data sources the rest of the site uses
 * (services, cities, brands, blog articles). No runtime DB query — the search
 * route just filters this array in-memory on every request.
 *
 * Each entry has:
 *   - kind   — surfaces a small "type" badge in the results list
 *   - title  — primary headline (3× weight in scoring)
 *   - slug   — used for substring matches against URL shape (2× weight)
 *   - text   — short description/excerpt (1× weight)
 *   - url    — the destination URL (EN root; for ES we re-prefix at render time)
 *   - tags   — extra keyword bag (1× weight) for cross-cutting matches
 */

import { ARTICLES } from "@/lib/blog/articles";
import { CITIES } from "@/data/cities";
import { SERVICES } from "@/data/services";
import { BRANDS } from "@/data/brands";
import { RESIDENTIAL_BRAND_PROFILES } from "@/lib/data/residential-brand-profiles";

export type SearchKind =
  | "service"
  | "city"
  | "brand"
  | "article"
  | "page";

export type SearchEntry = {
  kind: SearchKind;
  title: string;
  slug: string;
  text: string;
  url: string;
  tags?: string[];
};

export type SearchHit = SearchEntry & { score: number };

const STATIC_PAGES: SearchEntry[] = [
  {
    kind: "page",
    title: "Home",
    slug: "/",
    text: "Premium appliance repair across South Florida. Sub-Zero, Wolf, Viking, Thermador, Miele specialists.",
    url: "/",
    tags: ["home", "main", "berne"],
  },
  {
    kind: "page",
    title: "Service Areas",
    slug: "/areas",
    text: "Miami-Dade, Broward, and Palm Beach service area map — where Berne technicians work day to day.",
    url: "/areas",
    tags: ["areas", "coverage", "service area"],
  },
  {
    kind: "page",
    title: "All Services",
    slug: "/services",
    text: "Every appliance Berne services — refrigerator, washer, dryer, dishwasher, oven, microwave, ice maker, wine cooler.",
    url: "/services",
    tags: ["services"],
  },
  {
    kind: "page",
    title: "Brands We Service",
    slug: "/brands",
    text: "Premium and mid-premium brand profiles: Sub-Zero, Wolf, Viking, Thermador, Miele, KitchenAid, GE, LG, Samsung, Whirlpool.",
    url: "/brands",
    tags: ["brands"],
  },
  {
    kind: "page",
    title: "About Berne Appliance Repair",
    slug: "/about",
    text: "Family-run South Florida appliance repair shop — 11+ years, 18 technicians, EPA-608 certified, licensed and insured.",
    url: "/about",
    tags: ["about", "family", "team"],
  },
  {
    kind: "page",
    title: "Our Team",
    slug: "/team",
    text: "Meet the 18 technicians who run dispatch — EPA-608 universal, factory-trained on Sub-Zero, Wolf, Miele and more.",
    url: "/team",
    tags: ["team", "technicians"],
  },
  {
    kind: "page",
    title: "Credentials",
    slug: "/credentials",
    text: "Florida technician license, EPA Section 608, DBA, insurance, workers' comp exemption, MSA World membership.",
    url: "/credentials",
    tags: ["license", "insurance", "epa", "credentials"],
  },
  {
    kind: "page",
    title: "Contact Dispatch",
    slug: "/contact",
    text: "Call dispatch, request service, or book online — $59 service call applied to the repair.",
    url: "/contact",
    tags: ["contact", "phone", "dispatch"],
  },
  {
    kind: "page",
    title: "Request Dispatch",
    slug: "/request-dispatch",
    text: "Tell us about the appliance and we'll dispatch a technician — same-day across Miami, Broward, and Palm Beach.",
    url: "/request-dispatch",
    tags: ["dispatch", "booking", "appointment"],
  },
  {
    kind: "page",
    title: "Blog — Field Notes",
    slug: "/blog",
    text: "Repair guides and field notes from working technicians: Sub-Zero, Wolf, Viking, Thermador, Miele, and more.",
    url: "/blog",
    tags: ["blog", "guides"],
  },
];

let cached: SearchEntry[] | null = null;

export function buildIndex(): SearchEntry[] {
  if (cached) return cached;
  const entries: SearchEntry[] = [];

  // Services + service×city combos
  for (const s of SERVICES) {
    entries.push({
      kind: "service",
      title: s.name,
      slug: `/services/${s.slug}`,
      text: s.description,
      url: `/services/${s.slug}`,
      tags: [s.seoNoun, s.shortName, ...s.brands.slice(0, 6)],
    });
  }

  // Cities
  for (const c of CITIES) {
    entries.push({
      kind: "city",
      title: `${c.name} — ${c.county} County`,
      slug: `/areas/${c.slug}`,
      text: `Appliance repair in ${c.name}. Neighborhoods: ${c.neighborhoods.slice(0, 4).join(", ")}.`,
      url: `/areas/${c.slug}`,
      tags: [c.county, ...c.neighborhoods.slice(0, 5)],
    });
  }

  // Brands — residential brand profile pages
  for (const b of RESIDENTIAL_BRAND_PROFILES) {
    entries.push({
      kind: "brand",
      title: `${b.name} Repair`,
      slug: `/brands/${b.slug}`,
      text: b.teaser,
      url: `/brands/${b.slug}`,
      tags: [b.name, b.manufacturer, b.tier],
    });
  }

  // Brand mentions that don't have a profile yet — surface as service hits.
  const profiled = new Set(
    RESIDENTIAL_BRAND_PROFILES.map((b) => b.name.toLowerCase()),
  );
  for (const name of BRANDS) {
    if (!profiled.has(name.toLowerCase())) {
      entries.push({
        kind: "brand",
        title: `${name} appliance repair`,
        slug: `/brands`,
        text: `Berne technicians service ${name} appliances across South Florida.`,
        url: `/brands`,
        tags: [name],
      });
    }
  }

  // Blog articles
  for (const a of ARTICLES) {
    entries.push({
      kind: "article",
      title: a.title,
      slug: `/blog/${a.slug}`,
      text: a.description,
      url: `/blog/${a.slug}`,
      tags: [a.topic],
    });
  }

  // Static page registry
  entries.push(...STATIC_PAGES);

  cached = entries;
  return entries;
}

/**
 * Score how well a query matches an entry. Weights:
 *   title exact phrase     : +12
 *   title token match      : +6 per token
 *   slug token match       : +4 per token
 *   tag exact match        : +3 per token
 *   description match      : +1 per token
 * Each entry caps at "matches any token" — empty score => omit.
 */
export function scoreEntry(entry: SearchEntry, tokens: string[], rawQuery: string): number {
  if (tokens.length === 0) return 0;

  const titleLc = entry.title.toLowerCase();
  const slugLc = entry.slug.toLowerCase();
  const textLc = entry.text.toLowerCase();
  const tagsLc = (entry.tags ?? []).map((t) => t.toLowerCase());
  const qLc = rawQuery.toLowerCase().trim();

  let score = 0;
  if (qLc && titleLc.includes(qLc)) score += 12;
  if (qLc && slugLc.includes(qLc)) score += 4;

  for (const tok of tokens) {
    if (!tok) continue;
    if (titleLc.includes(tok)) score += 6;
    if (slugLc.includes(tok)) score += 4;
    if (tagsLc.some((t) => t === tok || t.includes(tok))) score += 3;
    if (textLc.includes(tok)) score += 1;
  }

  // Boost top-level navigation pages slightly so a single-word query that
  // matches "blog" surfaces /blog above an article that mentions the word.
  if (entry.kind === "page" && qLc && entry.title.toLowerCase() === qLc) {
    score += 4;
  }

  return score;
}

export function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .filter((t) => t.length >= 2);
}

export function search(q: string, limit = 20): SearchHit[] {
  const tokens = tokenize(q);
  if (tokens.length === 0) return [];
  const index = buildIndex();
  const scored: SearchHit[] = [];
  for (const e of index) {
    const score = scoreEntry(e, tokens, q);
    if (score > 0) scored.push({ ...e, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export function kindLabel(k: SearchKind): string {
  switch (k) {
    case "service": return "Service";
    case "city": return "Service area";
    case "brand": return "Brand";
    case "article": return "Article";
    case "page": return "Page";
  }
}

export function kindLabelEs(k: SearchKind): string {
  switch (k) {
    case "service": return "Servicio";
    case "city": return "Área de servicio";
    case "brand": return "Marca";
    case "article": return "Artículo";
    case "page": return "Página";
  }
}

/** Convert an EN URL to its /es equivalent for the Spanish results page. */
export function toEsUrl(url: string): string {
  if (url === "/") return "/es";
  if (url.startsWith("/es")) return url;
  // Blog stays on EN-only — there's no /es/blog tree today.
  if (url.startsWith("/blog")) return url;
  return `/es${url}`;
}
