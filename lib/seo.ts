import { COMPANY } from "@/data/company";
import { CITIES, type City } from "@/data/cities";
import { SERVICES, type Service } from "@/data/services";
import { BRANDS } from "@/data/brands";
import { REVIEWS, REVIEW_AGGREGATE } from "@/data/reviews";
import { TEAM } from "@/data/team";
import type { FAQ } from "@/data/faqs";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

const BUSINESS_ID = absoluteUrl("/#business");
const ORG_ID = absoluteUrl("/#organization");

/** Primary service-area centroid, shifted slightly north to cover Jupiter. */
const PRIMARY_GEO = { lat: 26.1, lng: -80.15 };
/** Founding year — verifiable, doesn't drift each Jan 1. */
const FOUNDING_YEAR = "2022";

/**
 * External profiles for entity disambiguation. Fill these in as each
 * profile goes live. Empty strings are filtered out at serialization.
 */
const SAME_AS: string[] = [
  // "https://www.google.com/maps/place/?q=place_id:XXXX",
  // "https://www.yelp.com/biz/berne-repair",
  // "https://www.facebook.com/BerneRepair",
  // "https://www.bbb.org/us/fl/...",
  // "https://www.instagram.com/bernerepair",
  // "https://nextdoor.com/pages/berne-repair-...",
].filter(Boolean);

const AGGREGATE = {
  "@type": "AggregateRating",
  ...REVIEW_AGGREGATE,
};

const REVIEW_NODES = REVIEWS.map((r) => ({
  "@type": "Review",
  reviewRating: {
    "@type": "Rating",
    ratingValue: r.rating,
    bestRating: 5,
    worstRating: 1,
  },
  author: { "@type": "Person", name: r.author },
  reviewBody: r.quote,
  datePublished: r.datePublished,
  ...(r.location ? { locationCreated: { "@type": "Place", name: `${r.location}, FL` } } : {}),
  itemReviewed: { "@id": BUSINESS_ID },
}));

const PHOTO_PATHS = [
  "/images/team/evgenii-knyazev.webp",
  "/images/team/refat-bekirov.webp",
  "/images/team/akhmed-osmanov.webp",
  "/images/team/andrei-lavrov.webp",
  "/images/team/dzmitrii-kitou.webp",
  "/images/team/mike.webp",
  "/images/services/refrigerator-repair/1.webp",
  "/images/services/refrigerator-repair/2.webp",
  "/images/services/washer-repair/1.webp",
  "/images/services/washer-repair/4.webp",
  "/images/services/dryer-repair/1.webp",
  "/images/services/oven-repair/1.webp",
  "/images/services/dishwasher-repair/1.webp",
  "/images/services/air-duct-cleaning/1.webp",
];
const PHOTO_URLS = PHOTO_PATHS.map((p) => absoluteUrl(p));
const PHOTO_OBJECTS = PHOTO_PATHS.map((p) => ({
  "@type": "ImageObject",
  contentUrl: absoluteUrl(p),
  url: absoluteUrl(p),
}));

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY.legalName,
    alternateName: COMPANY.dbaNames,
    url: SITE_URL,
    logo: absoluteUrl("/og.png"),
    sameAs: SAME_AS,
    subOrganization: { "@id": BUSINESS_ID },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE_URL,
    name: COMPANY.legalName,
    alternateName: COMPANY.dbaNames,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: ["en-US", "es-US"],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "ProfessionalService"],
    "@id": BUSINESS_ID,
    name: COMPANY.legalName,
    alternateName: COMPANY.dbaNames,
    url: SITE_URL,
    telephone: COMPANY.phone.tel,
    email: COMPANY.email.public,
    image: PHOTO_URLS,
    photo: PHOTO_OBJECTS,
    logo: absoluteUrl("/og.png"),
    priceRange: `$${COMPANY.serviceCallPrice}-$800`,
    paymentAccepted: ["Cash", "Credit Card", "Apple Pay", "Google Pay", "Zelle"],
    currenciesAccepted: "USD",
    knowsLanguage: ["en", "es"],
    knowsAbout: [
      ...SERVICES.map((s) => s.name),
      ...BRANDS.slice(0, 12),
      "Same-day appliance repair",
      "Commercial appliance repair",
      "Built-in refrigerator service",
    ],
    slogan: COMPANY.tagline,
    foundingDate: FOUNDING_YEAR,
    numberOfEmployees: TEAM.length,
    address: {
      "@type": "PostalAddress",
      addressRegion: COMPANY.address.region,
      addressCountry: COMPANY.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: PRIMARY_GEO.lat,
      longitude: PRIMARY_GEO.lng,
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: PRIMARY_GEO.lat,
        longitude: PRIMARY_GEO.lng,
      },
      geoRadius: 130000, // meters — covers Homestead in the south to Jupiter in the north
    },
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: c.name,
        addressRegion: "FL",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: c.geo.lat,
        longitude: c.geo.lng,
      },
    })),
    openingHoursSpecification: COMPANY.hours.structured.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    aggregateRating: AGGREGATE,
    review: REVIEW_NODES,
    employee: TEAM.map((m) => ({
      "@type": "Person",
      "@id": absoluteUrl(`/team#${m.slug}`),
      name: m.name,
      jobTitle: m.role,
      image: absoluteUrl(m.photo),
      knowsAbout: m.specialty.split("·").map((s) => s.trim()),
      worksFor: { "@id": BUSINESS_ID },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Appliance Repair Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
    sameAs: SAME_AS,
  };
}

export function serviceJsonLd(service: Service, locale: "en" | "es" = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: CITIES.map((c) => c.name),
    description: service.longDescription,
    url: absoluteUrl(
      locale === "es" ? `/es/services/${service.slug}` : `/services/${service.slug}`,
    ),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `${COMPANY.serviceCallPrice} service call — applied toward the repair`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: COMPANY.serviceCallPrice,
        maxPrice: 800,
        priceCurrency: "USD",
      },
    },
    brand: service.brands.map((b) => ({ "@type": "Brand", name: b })),
  };
}

export function cityJsonLd(city: City, locale: "en" | "es" = "en") {
  const cityPath = locale === "es" ? `/es/areas/${city.slug}` : `/areas/${city.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": absoluteUrl(`${cityPath}#place`),
    name: city.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.lat,
      longitude: city.geo.lng,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: `${city.county} County, Florida`,
    },
    url: absoluteUrl(cityPath),
  };
}

export function serviceCityJsonLd(service: Service, city: City, locale: "en" | "es" = "en") {
  const path = locale === "es"
    ? `/es/services/${service.slug}/${city.slug}`
    : `/services/${service.slug}/${city.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}`,
    serviceType: service.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: city.name },
    description: `${service.longDescription} Serving ${city.name} and surrounding ${city.county} County.`,
    url: absoluteUrl(path),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `${COMPANY.serviceCallPrice} service call — applied toward the repair`,
      areaServed: { "@type": "City", name: city.name },
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: COMPANY.serviceCallPrice,
        maxPrice: 800,
        priceCurrency: "USD",
      },
    },
    brand: service.brands.map((b) => ({ "@type": "Brand", name: b })),
  };
}

export function faqJsonLd(faqs: FAQ[], locale: "en" | "es" = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "es" ? "es-US" : "en-US",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function imageGalleryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${COMPANY.legalName} — Work Gallery`,
    description:
      "Real appliance repair and installation jobs by Berne Repair across South Florida — Sub-Zero, Wolf, Viking, Bosch, LG, Samsung and more.",
    image: PHOTO_OBJECTS,
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

/** Helper for pages to build hreflang alternates symmetrically. */
export function buildAlternates(canonicalPath: string, locale: "en" | "es") {
  const enPath = canonicalPath.replace(/^\/es/, "") || "/";
  const esPath = canonicalPath.startsWith("/es") ? canonicalPath : `/es${canonicalPath === "/" ? "" : canonicalPath}`;
  return {
    canonical: canonicalPath,
    languages: {
      "en-US": absoluteUrl(enPath),
      "es-US": absoluteUrl(esPath),
      "x-default": absoluteUrl(enPath),
    },
  };
}
