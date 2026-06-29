import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HighEndServicePage } from "@/components/site/highend-service-page";
import { HIGHEND_SERVICE_BY_SLUG } from "@/data/highend";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

const SLUG = "pool-heater-repair";

export async function generateMetadata(): Promise<Metadata> {
  const service = HIGHEND_SERVICE_BY_SLUG[SLUG];
  if (!service) return {};
  const title = service.metaTitle;
  const description = service.metaDescription;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/services/${SLUG}`,
      languages: {
        "en-US": absoluteUrl(`/services/${SLUG}`),
        "es-US": absoluteUrl(`/es/services/${SLUG}`),
        "x-default": absoluteUrl(`/services/${SLUG}`),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/services/${SLUG}`),
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function Page() {
  const service = HIGHEND_SERVICE_BY_SLUG[SLUG];
  if (!service) notFound();
  return <HighEndServicePage service={service} locale="en" />;
}
