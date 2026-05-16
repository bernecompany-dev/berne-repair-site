import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { "es-US": `${SITE_URL}/es` } },
    },
    {
      url: `${SITE_URL}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: { "en-US": `${SITE_URL}/` } },
    },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.flatMap((s) => [
    {
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages: { "es-US": `${SITE_URL}/es/services/${s.slug}` } },
    },
    {
      url: `${SITE_URL}/es/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: { languages: { "en-US": `${SITE_URL}/services/${s.slug}` } },
    },
  ]);

  const areas: MetadataRoute.Sitemap = CITIES.flatMap((c) => [
    {
      url: `${SITE_URL}/areas/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: { languages: { "es-US": `${SITE_URL}/es/areas/${c.slug}` } },
    },
    {
      url: `${SITE_URL}/es/areas/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: { languages: { "en-US": `${SITE_URL}/areas/${c.slug}` } },
    },
  ]);

  const combos: MetadataRoute.Sitemap = [];
  for (const s of SERVICES) {
    for (const c of CITIES) {
      combos.push({
        url: `${SITE_URL}/services/${s.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: { "es-US": `${SITE_URL}/es/services/${s.slug}/${c.slug}` } },
      });
      combos.push({
        url: `${SITE_URL}/es/services/${s.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: { languages: { "en-US": `${SITE_URL}/services/${s.slug}/${c.slug}` } },
      });
    }
  }

  // Static index/team
  const indexes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7,
      alternates: { languages: { "es-US": `${SITE_URL}/es/areas` } } },
    { url: `${SITE_URL}/es/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.65,
      alternates: { languages: { "en-US": `${SITE_URL}/areas` } } },
    { url: `${SITE_URL}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7,
      alternates: { languages: { "es-US": `${SITE_URL}/es/team` } } },
    { url: `${SITE_URL}/es/team`, lastModified: now, changeFrequency: "monthly", priority: 0.65,
      alternates: { languages: { "en-US": `${SITE_URL}/team` } } },
  ];

  return [...home, ...services, ...areas, ...combos, ...indexes];
}
