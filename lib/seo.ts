import { COMPANY } from "@/data/company";
import { CITIES, type City } from "@/data/cities";
import { SERVICES, type Service } from "@/data/services";
import { BRANDS } from "@/data/brands";
import { REVIEWS, REVIEW_AGGREGATE } from "@/data/reviews";
import { TEAM, type TeamMember } from "@/data/team";
import type { FAQ } from "@/data/faqs";
import { SERVICE_IMAGE_PATHS } from "@/lib/service-images";

/**
 * Canonical site origin. Production is `https://www.berne-repair.com` —
 * every canonical / hreflang / og:url / JSON-LD URL must use the `www`
 * subdomain so Google does not record a 308 redirect on the canonical
 * itself. The Vercel project should also set NEXT_PUBLIC_SITE_URL with the
 * `www.` prefix; the literal default below is the safe fallback if the env
 * var is missing in production.
 */
// Pinned to the production www origin. A misconfigured Vercel
// NEXT_PUBLIC_SITE_URL (set to the non-www host) was overriding the default
// and making every canonical point at a URL that 308-redirects to www — the
// exact failure the comment above warns against. Hardcoding keeps canonicals
// self-referential regardless of the env var.
export const SITE_URL = "https://www.berne-repair.com";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

/**
 * Shared default Open Graph image. Resolves to Next's dynamic
 * `/opengraph-image` route (see `app/opengraph-image.tsx`). Page metadata
 * blocks that set their own `openGraph` MUST include this in their `images:`
 * array — Next.js replaces (not merges) the openGraph key when a child
 * segment defines it, so a missing `images` field would emit no og:image at
 * all.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Berne Appliance Repair — premium appliance repair across South Florida",
} as const;

const BUSINESS_ID = absoluteUrl("/#business");
const ORG_ID = absoluteUrl("/#organization");
const FOUNDER_ID = absoluteUrl("/#founder");

/** Primary service-area centroid, shifted slightly north to cover Jupiter. */
const PRIMARY_GEO = { lat: 26.1, lng: -80.15 };
/**
 * Founding year of the Berne business entity — 2015 (when the Berne family of
 * companies began serving South Florida). Aligned across all Berne domains
 * (bernerepair.com, berne-commercial.com) so the shared entity graph carries a
 * single, consistent foundingDate in schema. The "premium division launched in
 * 2022" narrative still lives in visible /about copy — that's brand history,
 * not the LocalBusiness/Organization founding date Google reads from schema.
 */
const FOUNDING_YEAR = "2015";

/**
 * External profiles for entity disambiguation. Fill these in as each
 * profile goes live. Empty strings are filtered out at serialization.
 */
const SAME_AS: string[] = [
  // Alternate canonical domains the business operates under.
  // normarepair.com removed 2026-06-12 (round-4 block 7): Norma is a separate
  // brand entity (own GBP, phone, GA4) — Eugene approved variant A
  // ("раздельные бренды"), so Berne properties no longer claim it via sameAs.
  "https://bernerepair.com/",
  "https://berne-commercial.com",
  // Social
  "https://www.tiktok.com/@berne.repair",
  "https://www.instagram.com/bernerepair/",
  "https://www.facebook.com/bernerepair",
  // LinkedIn Company Page — "Berne Appliance Repair" (created 2026-06-15).
  // Entity-resolution signal on the Berne residence brand only (variant A
  // entity split; Norma + Commercial get their own pages separately).
  "https://www.linkedin.com/company/129694214",
  // Yelp listings (per DBA / market). The Hallandale Beach "-3" listing was
  // retired 2026-05-20 — "-4" (280 reviews) is the canonical Hallandale Yelp.
  "https://www.yelp.com/biz/berne-appliance-repair-hallandale-beach-4",
  "https://www.yelp.com/biz/berne-repair-sarasota",
  "https://www.yelp.com/biz/berne-repair-fort-myers",
  // Thumbtack (the Norma profile was removed 2026-06-12 with the brand split)
  "https://www.thumbtack.com/fl/naples/appliance-repair/berne-appliance-repair-naples-fort-myers/service/566337571507380237",
  // BBB (A+ rating profile, verified 2026-05-20)
  "https://www.bbb.org/us/fl/hallandale-beach/profile/appliance-repair/berne-inc-0633-92031029",
  // Miami Shores Chamber of Commerce member listing
  "https://business.miamishores.com/list/member/berne-appliance-repair-miami-2346",
  // Google Business Profiles (share.google redirects; resolve to canonical
  // /maps/place URLs when you have time to click each)
  "https://share.google/sSDq9B0xar89bItSq",
  "https://share.google/6GQjQFqxDvYeOWZIp",
  "https://share.google/VCXebzL4hfcPcu3P5",
  "https://share.google/gH0RfcApFEEwD6zpy",
  "https://share.google/c2j6LHKohujVnmXge",
  // Citation directories — "Berne Repair" (premium) brand profiles only,
  // added 2026-06-13 sameAs-pass. Entity-resolution signals; clean canonical
  // URLs, no UTM. No Norma profiles (variant A entity split).
  "https://www.provenexpert.com/berne-repair/",
  "https://www.hotfrog.com/company/c323ccb578e34351e664254ddc21ebbf",
  "https://www.manta.com/c/m1hh69l",
  "https://www.callupcontact.com/b/businessprofile/Berne_Repair/10124996",
  "https://www.n49.com/biz/7243497/berne-repair/",
  "https://www.tupalo.co/hallandale-beach-florida/berne-repair",
  // Wikidata entity for the business (Berne Repair) — Knowledge Graph anchor.
  "https://www.wikidata.org/wiki/Q140388059",
  // LinkedIn company page.
  "https://www.linkedin.com/company/129744399",
];

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

/**
 * Verifiable credentials surfaced via Organization.hasCredential. Files are
 * served from /public/credentials/. Keep in sync with
 * components/sections/credentials-section.tsx.
 */
const HAS_CREDENTIAL = [
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: "Florida Technician License",
    recognizedBy: {
      "@type": "Organization",
      name: "Florida Department of Business and Professional Regulation",
    },
    url: absoluteUrl("/credentials/technician-license.jpg"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "EPA Section 608 Universal",
    identifier: "16-8019803514-2",
    recognizedBy: {
      "@type": "Organization",
      name: "U.S. Environmental Protection Agency",
    },
    url: absoluteUrl("/credentials/epa-certificate.pdf"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: "DBA Registration — Berne Appliance Repair",
    url: absoluteUrl("/credentials/dba-berne-appliance-repair.pdf"),
  },
  {
    "@type": "InsurancePolicy",
    name: "Certificate of Insurance",
    url: absoluteUrl("/credentials/coi.pdf"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "exemption",
    name: "Florida Workers' Compensation Exemption",
    recognizedBy: {
      "@type": "Organization",
      name: "Florida Division of Workers' Compensation",
    },
    url: absoluteUrl("/credentials/wc-exemption.pdf"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "registration",
    name: "Florida Annual Resale Certificate for Sales Tax",
    identifier: "16-8019803514-2",
    recognizedBy: {
      "@type": "Organization",
      name: "Florida Department of Revenue",
    },
    url: absoluteUrl("/credentials/florida-resale-certificate.pdf"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "registration",
    name: "IRS EIN Assignment (CP 575)",
    recognizedBy: {
      "@type": "Organization",
      name: "Internal Revenue Service",
    },
    url: absoluteUrl("/credentials/ein-cp575.pdf"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "registration",
    name: "IRS Form W-9 — Request for Taxpayer Identification Number",
    url: absoluteUrl("/credentials/w9.pdf"),
  },
  // Industry-association membership + ongoing training (added 2026-05-20).
  // MSA = Marcone Servicers Association; "MSA World" is the members' portal
  // brand. We use the formal name in recognizedBy and the familiar "MSA World"
  // in visible copy. No fabricated certifications.
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "membership",
    name: "MSA World Member",
    description:
      "Member of Marcone Servicers Association (MSA), the leading industry association for appliance service contractors in North America.",
    recognizedBy: {
      "@type": "Organization",
      name: "Marcone Servicers Association",
      url: "https://msaworld.com/",
    },
    url: "https://msaworld.com/",
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "training",
    name: "Continuous Manufacturer Training",
    description:
      "Berne technicians complete ongoing training on emerging appliance technology through MSA World coursework and OEM programs (Sub-Zero, Wolf, Miele, LG, Samsung, GE).",
    recognizedBy: {
      "@type": "Organization",
      name: "Marcone Servicers Association",
      url: "https://msaworld.com/",
    },
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "certification",
    name: "EPA 608 — Technician Certificates",
    recognizedBy: {
      "@type": "Organization",
      name: "U.S. Environmental Protection Agency",
    },
    url: absoluteUrl("/credentials/techs-epa.pdf"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "training",
    name: "Sealed-System Service Training",
    recognizedBy: {
      "@type": "Organization",
      name: "TMM Academy",
    },
    url: absoluteUrl("/credentials/sealed-system-service-certificate.jpg"),
  },
  {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "training",
    name: "Pro-Tech Appliance Training",
    recognizedBy: {
      "@type": "Organization",
      name: "Big City Appliance Repair School",
    },
    url: absoluteUrl("/credentials/pro-tech-training-certificate.jpg"),
  },
];

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
    founder: { "@id": FOUNDER_ID },
    foundingDate: FOUNDING_YEAR,
    // NOTE: aggregateRating intentionally lives ONLY on the LocalBusiness
    // node (localBusinessJsonLd) — duplicating it here doubled the review
    // markup on every page.
    hasCredential: HAS_CREDENTIAL,
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://bernerepair.com/#organization",
      name: "Berne Appliance Repair",
      url: "https://bernerepair.com/",
    },
    subOrganization: { "@id": BUSINESS_ID },
  };
}

/**
 * Per-technician Person JSON-LD with full E-E-A-T signal set:
 *   - hasCredential (EPA Section 608, FL technician license)
 *   - knowsAbout (specialty tokens + Appliance Repair)
 *   - knowsLanguage (en / ru / es)
 *   - worksFor pointer to the #business node
 *
 * Emit on /team (all members), /about (full team), and / (top 5 featured).
 */
export function personJsonLd(m: TeamMember) {
  const knowsAbout = [
    "Appliance Repair",
    ...m.specialty.split("·").map((s) => s.trim()).filter(Boolean),
  ];
  const credentials = (m.credentials ?? []).map((c) => ({
    "@type": "EducationalOccupationalCredential" as const,
    credentialCategory: c.category,
    name: c.name,
  }));
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl(`/team#person-${m.slug}`),
    name: m.name,
    image: absoluteUrl(m.photo),
    jobTitle: m.role,
    worksFor: { "@id": BUSINESS_ID },
    knowsAbout,
    url: absoluteUrl("/team"),
  };
  if (m.givenName) node.givenName = m.givenName;
  if (m.familyName) node.familyName = m.familyName;
  if (m.languages && m.languages.length > 0) node.knowsLanguage = m.languages;
  if (credentials.length > 0) node.hasCredential = credentials;
  if (m.sameAs && m.sameAs.length > 0) node.sameAs = m.sameAs;
  if (m.bio) node.description = m.bio;
  return node;
}

/**
 * Standalone Person schema for Eugene Berne, founder of the Berne
 * family of brands (Berne Appliance Repair, Berne Repair, Berne Commercial
 * Repair). Emit on the homepage only — Google stitches via @id from any
 * page that references "founder": { "@id": "...#founder" }.
 */
export function founderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: "Eugene Berne",
    alternateName: "Eugene Bernitsky",
    jobTitle: "Founder & CEO",
    worksFor: { "@id": ORG_ID },
    // Owner personal-brand site — "Eugene Bernitsky, Founder of Berne
    // Appliance Repair Network". Disambiguates the founder Person entity for
    // Google's Knowledge Graph and AI answer engines (GEO), tying the
    // berne-repair.com author byline to a single real-world expert.
    url: "https://eugenebernitsky.com/",
    sameAs: [
      "https://eugenebernitsky.com/",
      "https://bernerepair.com/",
      "https://berne-commercial.com/",
      "https://www.linkedin.com/in/eugene-bernitsky-b52763364/",
      "https://www.wikidata.org/wiki/Q140388057",
    ],
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
    // SearchAction qualifies the site for Google's sitelinks searchbox.
    // Points at the real /search route (app/search/page.tsx reads ?q=).
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
    // Canonical headcount (18 field technicians) — not TEAM.length, which is
    // the published-bio subset and excludes the owner by design.
    numberOfEmployees: COMPANY.socialProof.technicians,
    // Full HQ address — matches the visible footer NAP ("1001 N Federal Hwy").
    // Region-only PostalAddress contradicted the on-page address and weakens
    // the LocalBusiness signal.
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.hq.street,
      addressLocality: COMPANY.address.hq.city,
      addressRegion: COMPANY.address.hq.region,
      postalCode: COMPANY.address.hq.postalCode,
      addressCountry: COMPANY.address.hq.country,
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
    hasCredential: HAS_CREDENTIAL,
    sameAs: SAME_AS,
  };
}

/**
 * Build ImageObject entries for a service slug. Returns empty array when the
 * service has no photo set (ice-maker-repair, garbage-disposal-repair,
 * wine-cooler-repair) — Google ignores empty arrays cleanly.
 */
function serviceImageNodes(slug: string) {
  const paths = SERVICE_IMAGE_PATHS[slug] ?? [];
  return paths.map((p) => ({
    "@type": "ImageObject",
    contentUrl: absoluteUrl(p),
    url: absoluteUrl(p),
  }));
}

export function serviceJsonLd(service: Service, locale: "en" | "es" = "en") {
  const imageNodes = serviceImageNodes(service.slug);
  // Spanish pages emit Spanish schema text — inLanguage and visible-text
  // language must agree (techseo audit 2026-06-10 §3c).
  const name = locale === "es" ? service.es.name : service.name;
  const description = locale === "es" ? service.es.longDescription : service.longDescription;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name,
    serviceType: name,
    provider: { "@id": BUSINESS_ID },
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: "FL", addressCountry: "US" },
    })),
    description,
    url: absoluteUrl(
      locale === "es" ? `/es/services/${service.slug}` : `/services/${service.slug}`,
    ),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    ...(imageNodes.length > 0 ? { image: imageNodes } : {}),
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `${COMPANY.serviceCallPrice} service call — free with repair`,
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

/**
 * Service JSON-LD for the hand-authored high-end specialty pages
 * (data/highend/*). These are NOT in the SERVICES array, so they can't use
 * serviceJsonLd(Service). Same shape, same $59 offer + provider node, but
 * driven by plain fields. No image array (photos pending — Google ignores a
 * missing image key cleanly).
 */
export function highEndServiceJsonLd(args: {
  slug: string;
  name: string;
  description: string;
  brands: string[];
  locale?: "en" | "es";
}) {
  const locale = args.locale ?? "en";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${args.slug}#service`),
    name: args.name,
    serviceType: args.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      address: { "@type": "PostalAddress", addressLocality: c.name, addressRegion: "FL", addressCountry: "US" },
    })),
    description: args.description,
    url: absoluteUrl(
      locale === "es" ? `/es/services/${args.slug}` : `/services/${args.slug}`,
    ),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `${COMPANY.serviceCallPrice} service call — free with repair`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: COMPANY.serviceCallPrice,
        maxPrice: 800,
        priceCurrency: "USD",
      },
    },
    brand: args.brands.map((b) => ({ "@type": "Brand", name: b })),
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

/**
 * City-scoped LocalBusiness — emitted on every combo page so Google ties the
 * {City} keyword to a business node with the matching addressLocality, geo
 * coordinates, and aggregate review numbers. References the canonical
 * BUSINESS_ID via parentOrganization/sameAs so the entity graph stays unified.
 */
export function localBusinessForCityJsonLd(city: City, locale: "en" | "es" = "en") {
  const path = locale === "es" ? `/es/areas/${city.slug}` : `/areas/${city.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "ProfessionalService"],
    "@id": absoluteUrl(`${path}#localbusiness`),
    name: `${COMPANY.legalName} — ${city.name}`,
    url: absoluteUrl(path),
    telephone: COMPANY.phone.tel,
    email: COMPANY.email.public,
    priceRange: `$${COMPANY.serviceCallPrice}-$800`,
    image: PHOTO_URLS.slice(0, 6),
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: "FL",
      postalCode: city.zips[0],
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
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${city.county} County, Florida`,
      },
    },
    // aggregateRating deliberately omitted — the layout's canonical
    // LocalBusiness node already carries it on every page; repeating it on
    // this city-scoped node doubled the review markup on area pages.
    openingHoursSpecification: COMPANY.hours.structured.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    parentOrganization: { "@id": ORG_ID },
    sameAs: SAME_AS,
    hasCredential: HAS_CREDENTIAL,
  };
}

export function serviceCityJsonLd(service: Service, city: City, locale: "en" | "es" = "en") {
  const path = locale === "es"
    ? `/es/services/${service.slug}/${city.slug}`
    : `/services/${service.slug}/${city.slug}`;
  const imageNodes = serviceImageNodes(service.slug);
  const name = locale === "es"
    ? `${service.es.name} en ${city.name}`
    : `${service.name} in ${city.name}`;
  const description = locale === "es"
    ? `${service.es.longDescription} Servicio en ${city.name} y el condado de ${city.county}.`
    : `${service.longDescription} Serving ${city.name} and surrounding ${city.county} County.`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: locale === "es" ? service.es.name : service.name,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: city.name },
    description,
    url: absoluteUrl(path),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    ...(imageNodes.length > 0 ? { image: imageNodes } : {}),
    offers: {
      "@type": "Offer",
      price: COMPANY.serviceCallPrice,
      priceCurrency: "USD",
      description: `${COMPANY.serviceCallPrice} service call — free with repair`,
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

/**
 * Enriched BlogPosting payload for blog/[slug] pages. Centralizes the schema
 * so every article emits the same structured fields (alternativeHeadline,
 * articleSection, wordCount, keywords, mainEntityOfPage) without each page
 * having to spell out the shape.
 */
export function blogPostingJsonLd(args: {
  url: string;
  headline: string;
  alternativeHeadline?: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  articleSection?: string;
  wordCount?: number;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${args.url}#blogposting`,
    headline: args.headline.slice(0, 110),
    ...(args.alternativeHeadline && args.alternativeHeadline !== args.headline
      ? { alternativeHeadline: args.alternativeHeadline }
      : {}),
    description: args.description,
    image: args.image ?? absoluteUrl("/og.png"),
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": args.url,
    },
    author: {
      "@type": "Person",
      name: args.authorName,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: COMPANY.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og.png"),
      },
    },
    inLanguage: "en-US",
    ...(args.articleSection ? { articleSection: args.articleSection } : {}),
    ...(typeof args.wordCount === "number" ? { wordCount: args.wordCount } : {}),
    ...(args.keywords && args.keywords.length > 0
      ? { keywords: args.keywords.join(", ") }
      : {}),
  };
}

/**
 * HowTo schema. Steps must reflect actual procedure copy from the article —
 * fabricated steps trigger a structured-data mismatch penalty in Search
 * Console. Callers curate this from verified body content (see
 * lib/blog/howto-allowlist.ts).
 */
export type HowToStepInput = {
  name: string;
  text: string;
  url?: string;
  image?: string;
};

export function howToJsonLd(args: {
  url: string;
  name: string;
  description: string;
  totalTimeISO: string; // e.g. "PT30M"
  estimatedCostUSD?: string;
  supply?: string[];
  tool?: string[];
  steps: HowToStepInput[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${args.url}#howto`,
    name: args.name,
    description: args.description,
    totalTime: args.totalTimeISO,
    ...(args.estimatedCostUSD
      ? {
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: args.estimatedCostUSD,
          },
        }
      : {}),
    ...(args.supply && args.supply.length > 0
      ? {
          supply: args.supply.map((s) => ({
            "@type": "HowToSupply",
            name: s,
          })),
        }
      : {}),
    ...(args.tool && args.tool.length > 0
      ? {
          tool: args.tool.map((t) => ({
            "@type": "HowToTool",
            name: t,
          })),
        }
      : {}),
    step: args.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: s.url ?? `${args.url}#step${i + 1}`,
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

/**
 * Article schema for editorial / reference assets that are NOT blog posts
 * (e.g. the luxury cost guide). Distinct from blogPostingJsonLd so the asset
 * reads as a standing reference work, not a dated post. AggregateRating is
 * intentionally NOT included (it lives only on the LocalBusiness node).
 */
export function articleJsonLd(args: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl?: string;
  locale?: "en" | "es";
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${args.url}#article`,
    headline: args.headline.slice(0, 110),
    description: args.description,
    image: absoluteUrl("/og.png"),
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
    author: {
      "@type": "Person",
      name: args.authorName,
      url: args.authorUrl ?? absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: COMPANY.legalName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/og.png") },
    },
    inLanguage: args.locale === "es" ? "es-US" : "en-US",
    ...(args.keywords && args.keywords.length > 0
      ? { keywords: args.keywords.join(", ") }
      : {}),
  };
}

/**
 * Dataset schema — declares the cost guide's tables as a citable dataset, the
 * structured signal that makes a data asset attractive to LLMs and search.
 */
export function datasetJsonLd(args: {
  url: string;
  name: string;
  description: string;
  dateModified: string;
  locale?: "en" | "es";
  keywords?: string[];
  variables?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${args.url}#dataset`,
    name: args.name,
    description: args.description,
    url: args.url,
    dateModified: args.dateModified,
    isAccessibleForFree: true,
    inLanguage: args.locale === "es" ? "es-US" : "en-US",
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@id": ORG_ID, "@type": "Organization", name: COMPANY.legalName },
    publisher: { "@id": ORG_ID },
    ...(args.keywords && args.keywords.length > 0
      ? { keywords: args.keywords }
      : {}),
    ...(args.variables && args.variables.length > 0
      ? {
          variableMeasured: args.variables.map((v) => ({
            "@type": "PropertyValue",
            name: v,
          })),
        }
      : {}),
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
      "Real appliance repair and installation jobs by Berne Appliance Repair across South Florida — Sub-Zero, Wolf, Viking, Bosch, LG, Samsung and more.",
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

/**
 * Per-page Open Graph block. Next.js REPLACES (not merges) the `openGraph`
 * metadata key, so any page that omits it inherits the ROOT layout's block —
 * including `og:url` pointing at the homepage and the generic home og:title
 * (round-3 audit found 37 such pages). Every page that sets its own
 * title/description should pass them through here so og:url stays
 * self-referential and siteName/locale are never lost.
 */
export function pageOpenGraph(args: {
  title: string;
  description: string;
  /** Canonical path of the page, e.g. "/about" or "/es/team". */
  path: string;
  locale?: "en" | "es";
}) {
  return {
    title: args.title,
    description: args.description,
    url: absoluteUrl(args.path),
    siteName: COMPANY.legalName,
    type: "website" as const,
    locale: args.locale === "es" ? "es_US" : "en_US",
    images: [DEFAULT_OG_IMAGE],
  };
}

/** Helper for pages to build hreflang alternates symmetrically. */
export function buildAlternates(canonicalPath: string) {
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
