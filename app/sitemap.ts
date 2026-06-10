import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/seo";
import { publishedArticles } from "@/lib/blog/articles";
import { RESIDENTIAL_BRAND_SLUGS } from "@/lib/data/residential-brand-profiles";
import { BRAND_COMPARISON_SLUGS } from "@/lib/data/brand-comparisons";
import { TEAM } from "@/data/team";
import { BACK_OFFICE } from "@/data/team-bios";

/**
 * Static last-modified date — bump intentionally when content meaningfully
 * changes. Avoids every-build churn that Google treats as low-signal noise.
 */
const LAST_MOD = new Date("2026-05-18");

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
      lastModified: LAST_MOD,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: bothLocales("/") },
    },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.flatMap((s) => {
    const p = `/services/${s.slug}`;
    return [
      { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.9, alternates: { languages: esCounterpart(p) } },
      { url: `${SITE_URL}/es${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.85, alternates: { languages: esCounterpart(p) } },
    ];
  });

  const areas: MetadataRoute.Sitemap = CITIES.flatMap((c) => {
    const p = `/areas/${c.slug}`;
    return [
      { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.9, alternates: { languages: esCounterpart(p) } },
      { url: `${SITE_URL}/es${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.85, alternates: { languages: esCounterpart(p) } },
    ];
  });

  const combos: MetadataRoute.Sitemap = [];
  for (const s of SERVICES) {
    for (const c of CITIES) {
      const p = `/services/${s.slug}/${c.slug}`;
      combos.push({
        url: `${SITE_URL}${p}`,
        lastModified: LAST_MOD,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: esCounterpart(p) },
      });
      combos.push({
        url: `${SITE_URL}/es${p}`,
        lastModified: LAST_MOD,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: { languages: esCounterpart(p) },
      });
    }
  }

  const statics: MetadataRoute.Sitemap = [
    "/areas",
    "/team",
    "/about",
    "/contact",
    "/careers",
    "/request-dispatch",
    "/credentials",
    "/family",
    "/privacy",
    "/terms",
    "/cookies",
  ].flatMap((p) => [
    { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages: esCounterpart(p) } },
    { url: `${SITE_URL}/es${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.65, alternates: { languages: esCounterpart(p) } },
  ]);

  // Premium residential brand pages — English only for now.
  const brandsIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/brands`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
  const brandPages: MetadataRoute.Sitemap = RESIDENTIAL_BRAND_SLUGS.map((slug) => ({
    url: `${SITE_URL}/brands/${slug}`,
    lastModified: LAST_MOD,
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
    ...areas,
    ...combos,
    ...statics,
    ...brandsIndex,
    ...brandPages,
    ...compareIndex,
    ...comparePages,
    ...blogIndex,
    ...blogPosts,
    ...teamBios,
  ];
}
