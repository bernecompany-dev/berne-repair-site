import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { HIGHEND_SERVICES } from "@/data/highend";
import { CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/seo";
import { publishedArticles } from "@/lib/blog/articles";
import { RESIDENTIAL_BRAND_PROFILES } from "@/lib/data/residential-brand-profiles";
import { getComboUnique } from "@/lib/data/combo-unique";
import { BRAND_CITY_SLUGS } from "@/lib/data/brand-city-content";
import { BRAND_SERVICE_SLUGS } from "@/lib/data/brand-service-content";
import { BRAND_COMPARISON_SLUGS } from "@/lib/data/brand-comparisons";
import { TEAM } from "@/data/team";
import { BACK_OFFICE } from "@/data/team-bios";

/**
 * Hourly ISR — matches /blog and /blog/[slug]. The blog drip publishes
 * future-dated posts via revalidation (publishedArticles(new Date()) is
 * re-evaluated on each regeneration), so the sitemap must pick up newly
 * published posts on the same cadence instead of staying frozen at the
 * last deploy.
 */
export const revalidate = 3600;

/**
 * Static last-modified date — bump intentionally when content meaningfully
 * changes. Avoids every-build churn that Google treats as low-signal noise.
 */
const LAST_MOD = new Date("2026-05-18");

/**
 * Reworked layers, wave 2026-06-10: top-20 uniquified combos (hand-written
 * content + meta descriptions) and the whole /es tree (real Spanish rewrite).
 */
const REWORKED_MOD = new Date("2026-06-10");

/**
 * Content wave 2026-06-11: 6 new brand hubs (Liebherr, Dacor, Fisher &
 * Paykel, Gaggenau, Bertazzoni, Monogram), 3 brand×service pages, and the
 * Thermador customer-service guide. All EN-only.
 */
const CONTENT_WAVE_MOD = new Date("2026-06-11");

function bothLocales(path: string) {
  return {
    "en-US": `${SITE_URL}${path}`,
    "es-US": `${SITE_URL}/es${path === "/" ? "" : path}`,
    "x-default": `${SITE_URL}${path}`,
  };
}
function esCounterpart(path: string) {
  return {
    "en-US": `${SITE_URL}${path}`,
    "es-US": `${SITE_URL}/es${path === "/" ? "" : path}`,
    "x-default": `${SITE_URL}${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: bothLocales("/") },
    },
    {
      url: `${SITE_URL}/es`,
      lastModified: REWORKED_MOD,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: bothLocales("/") },
    },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.flatMap((s) => {
    const p = `/services/${s.slug}`;
    return [
      { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.9, alternates: { languages: esCounterpart(p) } },
      { url: `${SITE_URL}/es${p}`, lastModified: REWORKED_MOD, changeFrequency: "monthly" as const, priority: 0.85, alternates: { languages: esCounterpart(p) } },
    ];
  });

  // High-end specialty service pages — hand-authored static routes (EN + ES),
  // OUTSIDE the SERVICES array so they never spawn city combos. Both locales
  // are real, indexable pages (full Spanish), so each advertises the reciprocal
  // hreflang. lastmod = the launch wave so Google re-crawls the new cluster.
  const HIGHEND_MOD = new Date("2026-06-29");
  const highEndServices: MetadataRoute.Sitemap = HIGHEND_SERVICES.flatMap((s) => {
    const p = `/services/${s.slug}`;
    return [
      { url: `${SITE_URL}${p}`, lastModified: HIGHEND_MOD, changeFrequency: "monthly" as const, priority: 0.85, alternates: { languages: esCounterpart(p) } },
      { url: `${SITE_URL}/es${p}`, lastModified: HIGHEND_MOD, changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages: esCounterpart(p) } },
    ];
  });

  // Resources hub + the Luxury Appliance Repair Cost Guide data asset (EN + ES,
  // reciprocal hreflang). New link-magnet cluster — launch-dated lastmod so
  // Google re-crawls it.
  const RESOURCES_MOD = new Date("2026-06-29");
  const resources: MetadataRoute.Sitemap = [
    "/resources",
    "/resources/luxury-appliance-repair-cost-guide",
  ].flatMap((p) => [
    { url: `${SITE_URL}${p}`, lastModified: RESOURCES_MOD, changeFrequency: "monthly" as const, priority: 0.85, alternates: { languages: esCounterpart(p) } },
    { url: `${SITE_URL}/es${p}`, lastModified: RESOURCES_MOD, changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages: esCounterpart(p) } },
  ]);

  const areas: MetadataRoute.Sitemap = CITIES.flatMap((c) => {
    const p = `/areas/${c.slug}`;
    return [
      { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.9, alternates: { languages: esCounterpart(p) } },
      { url: `${SITE_URL}/es${p}`, lastModified: REWORKED_MOD, changeFrequency: "monthly" as const, priority: 0.85, alternates: { languages: esCounterpart(p) } },
    ];
  });

  // INDEX-BLOAT DE-BLOAT (2026-06-15): the sitemap previously listed all
  // ~1540 combo URLs (770 EN + 770 ES). On a 4-week-old domain with no
  // external authority, Google declined to crawl that templated tail and the
  // dead weight dragged crawl trust on the core hubs. The combo route now
  // serves noindex,follow on every templated combo (EN tail + the entire ES
  // layer), so the sitemap must only advertise the URLs that are actually
  // indexable: the ~20 hand-written EN combos (combo-unique.ts). Their ES
  // counterparts stay out — the ES combo layer is templated and noindex.
  // As more combos get uniquified, they re-enter the sitemap automatically
  // via the same getComboUnique() lookup.
  const combos: MetadataRoute.Sitemap = [];
  for (const s of SERVICES) {
    for (const c of CITIES) {
      if (!getComboUnique(s.slug, c.slug)) continue;
      const p = `/services/${s.slug}/${c.slug}`;
      combos.push({
        url: `${SITE_URL}${p}`,
        lastModified: REWORKED_MOD,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Static pages with a real /es mirror in the app/es route tree.
  const statics: MetadataRoute.Sitemap = [
    "/areas",
    "/team",
    "/about",
    "/careers",
    "/request-dispatch",
    "/credentials",
    "/privacy",
    "/terms",
    "/cookies",
  ].flatMap((p) => [
    { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages: esCounterpart(p) } },
    { url: `${SITE_URL}/es${p}`, lastModified: REWORKED_MOD, changeFrequency: "monthly" as const, priority: 0.65, alternates: { languages: esCounterpart(p) } },
  ]);
  // EN-only statics — /es/contact and /es/family do not exist (404). The old
  // unconditional flatMap put both dead /es URLs into the sitemap with
  // matching phantom es-US hreflang alternates.
  const staticsEnOnly: MetadataRoute.Sitemap = ["/contact", "/family", "/reviews", "/service-map"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: LAST_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: {
      languages: {
        "en-US": `${SITE_URL}${p}`,
        "x-default": `${SITE_URL}${p}`,
      },
    },
  }));

  // Premium residential brand pages — EN + ES hubs (the /es/brands lane is
  // live and indexable; it was missing from the sitemap and the EN side
  // lacked the reciprocal es-US hreflang until 2026-06-10).
  const brandsIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/brands`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: { languages: esCounterpart("/brands") },
    },
    {
      url: `${SITE_URL}/es/brands`,
      lastModified: REWORKED_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: esCounterpart("/brands") },
    },
  ];
  const brandPages: MetadataRoute.Sitemap = RESIDENTIAL_BRAND_PROFILES.flatMap((b) => {
    const p = `/brands/${b.slug}`;
    // EN-only brands (2026-06-11 wave, no `es` localization): no /es URL,
    // en+x-default alternates only, fresher lastmod.
    if (!b.es) {
      return [
        {
          url: `${SITE_URL}${p}`,
          lastModified: CONTENT_WAVE_MOD,
          changeFrequency: "monthly" as const,
          priority: 0.8,
          alternates: {
            languages: {
              "en-US": `${SITE_URL}${p}`,
              "x-default": `${SITE_URL}${p}`,
            },
          },
        },
      ];
    }
    return [
      { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages: esCounterpart(p) } },
      { url: `${SITE_URL}/es${p}`, lastModified: REWORKED_MOD, changeFrequency: "monthly" as const, priority: 0.75, alternates: { languages: esCounterpart(p) } },
    ];
  });

  // Brand × city landing pages (premium lane: original 5×3 metro grid +
  // the 2026-06-25 luxury wave of brand × affluent-neighborhood pages).
  // lastModified bumped to the luxury wave so the new pages don't advertise
  // a stale lastmod and Google re-crawls the cluster.
  const brandCityPages: MetadataRoute.Sitemap = BRAND_CITY_SLUGS.map(({ brand, city }) => ({
    url: `${SITE_URL}/brands/${brand}/${city}`,
    lastModified: new Date("2026-06-25"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Brand × service landing pages + the Thermador customer-service guide —
  // 2026-06-11 content wave. EN-only.
  const brandServicePages: MetadataRoute.Sitemap = [
    ...BRAND_SERVICE_SLUGS.map(({ brand, service }) => `/brands/${brand}/${service}`),
    "/brands/thermador/service-guide",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: CONTENT_WAVE_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Premium brand comparison pages — long-form informational content
  // ("Sub-Zero vs Viking", "Wolf vs Thermador vs Viking", etc.). English only.
  const compareIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/compare`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];
  const comparePages: MetadataRoute.Sitemap = BRAND_COMPARISON_SLUGS.map(
    (slug) => ({
      url: `${SITE_URL}/compare/${slug}`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = publishedArticles().map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: a.updatedAt ?? a.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const teamBios: MetadataRoute.Sitemap = [
    ...TEAM.map((t) => t.slug),
    ...BACK_OFFICE.map((b) => b.slug),
  ].map((slug) => ({
    url: `${SITE_URL}/team/${slug}`,
    lastModified: LAST_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...home,
    ...services,
    ...highEndServices,
    ...resources,
    ...areas,
    ...combos,
    ...statics,
    ...staticsEnOnly,
    ...brandsIndex,
    ...brandPages,
    ...brandCityPages,
    ...brandServicePages,
    ...compareIndex,
    ...comparePages,
    ...blogIndex,
    ...blogPosts,
    ...teamBios,
  ];
}
