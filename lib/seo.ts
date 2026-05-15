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

/** Approximate primary service-area centroid (Miami metro). */
const PRIMARY_GEO = { lat: 25.9, lng: -80.2 };

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

/** Public photo references for the business — both team and on-the-job shots. */
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

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE_URL,
    name: COMPANY.legalName,
    alternateName: COMPANY.dbaNames,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "ProfessionalService", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: COMPANY.legalName,
    alternateName: COMPANY.dbaNames,
    url: SITE_URL,
    telephone: COMPANY.phone.tel,
    email: COMPANY.email.public,
    image: PHOTO_URLS,
    photo: PHOTO_OBJECTS,
    logo: absoluteUrl("/og.png"),
    priceRange: `$${COMPANY.serviceCallPrice}+`,
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
    foundingDate: `${new Date().getFullYear() - COMPANY.socialProof.yearsInBusiness}`,
    numberOfEmployees: COMPANY.socialProof.technicians,
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
      geoRadius: 100000, // 100km — covers all of South Florida
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
      name: m.name,
      jobTitle: m.role,
      image: absoluteUrl(m.photo),
      knowsAbout: m.specialty.split("·").map((s) => s.trim()),
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
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: CITIES.map((c) => c.name),
    description: service.longDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `${COMPANY.serviceCallPrice} service call — applied toward the repair`,
      availability: "https://schema.org/InStock",
    },
    brand: service.brands.map((b) => ({ "@type": "Brand", name: b })),
    aggregateRating: AGGREGATE,
  };
}

export function cityJsonLd(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    name: `${COMPANY.legalName} — ${city.name}`,
    parentOrganization: { "@id": BUSINESS_ID },
    telephone: COMPANY.phone.tel,
    url: absoluteUrl(`/areas/${city.slug}`),
    priceRange: `$${COMPANY.serviceCallPrice}+`,
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
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    aggregateRating: AGGREGATE,
  };
}

export function serviceCityJsonLd(service: Service, city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${city.name}`,
    serviceType: service.name,
    provider: {
      "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
      name: `${COMPANY.legalName} — ${city.name}`,
      telephone: COMPANY.phone.tel,
      priceRange: `$${COMPANY.serviceCallPrice}+`,
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
      parentOrganization: { "@id": BUSINESS_ID },
    },
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    description: `${service.longDescription} Serving ${city.name} and surrounding ${city.county} County.`,
    url: absoluteUrl(`/services/${service.slug}/${city.slug}`),
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `${COMPANY.serviceCallPrice} service call — applied toward the repair`,
      areaServed: { "@type": "City", name: city.name },
    },
    brand: service.brands.map((b) => ({ "@type": "Brand", name: b })),
    aggregateRating: AGGREGATE,
  };
}

export function faqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export type Crumb = { name: string; href: string };

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
