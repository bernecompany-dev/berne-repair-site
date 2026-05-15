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

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const areas: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE_URL}/areas/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const combos: MetadataRoute.Sitemap = [];
  for (const s of SERVICES) {
    for (const c of CITIES) {
      combos.push({
        url: `${SITE_URL}/services/${s.slug}/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return [...home, ...services, ...areas, ...combos];
}
