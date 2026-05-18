import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/seo";

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
    "/privacy",
  ].flatMap((p) => [
    { url: `${SITE_URL}${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages: esCounterpart(p) } },
    { url: `${SITE_URL}/es${p}`, lastModified: LAST_MOD, changeFrequency: "monthly" as const, priority: 0.65, alternates: { languages: esCounterpart(p) } },
  ]);

  return [...home, ...services, ...areas, ...combos, ...statics];
}
