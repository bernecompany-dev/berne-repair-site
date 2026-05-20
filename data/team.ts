export type TeamCredential = {
  name: string;
  /** Schema.org credentialCategory — "certification" or "license" */
  category: "certification" | "license";
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  /** Approximate years on the team */
  years: number;
  photo: string;
  /** Optional short bio shown on /team page */
  bio?: string;
  /** Featured members surface on the home Team section */
  featured?: boolean;
  /** Optional given/family name split for Person schema. */
  givenName?: string;
  familyName?: string;
  /** Schema.org hasCredential set (EPA 608, FL technician license, etc.). */
  credentials?: TeamCredential[];
  /** Languages spoken — Schema.org knowsLanguage. */
  languages?: string[];
  /** External profiles to disambiguate the Person entity (LinkedIn, etc.). */
  sameAs?: string[];
};

const EPA: TeamCredential = { name: "EPA Section 608 Universal", category: "certification" };
const FL_LIC: TeamCredential = { name: "Florida Technician License", category: "license" };

/**
 * 16 real Berne Repair team members. Names sourced from photo filenames
 * provided by the operations team. Roles and specialties are best-fit
 * defaults — edit as the team confirms exact assignments.
 *
 * Person-schema fields (credentials / languages / sameAs) added 2026-05-20
 * for E-E-A-T schema emission. See lib/seo.ts → personJsonLd().
 */
export const TEAM: TeamMember[] = [
  {
    slug: "evgenii-knyazev",
    name: "Eugene Berne",
    role: "Owner",
    specialty: "Founder · Commercial accounts · Personal guarantee on every job",
    years: 4,
    photo: "/images/team/evgenii-knyazev.webp",
    bio: "Founded Berne Repair after moving to the US in 2022. Still picks up the phone, still goes out on commercial calls, still backs every single repair personally. 29,000+ jobs and counting.",
    featured: true,
    givenName: "Eugene",
    familyName: "Bernitsky",
    credentials: [EPA, FL_LIC],
    languages: ["English", "Russian", "Spanish"],
    sameAs: ["https://www.linkedin.com/in/eugene-bernitsky-b52763364/"],
  },
  {
    slug: "refat-bekirov",
    name: "Refat Bekirov",
    role: "Senior Technician",
    specialty: "Refrigeration · Diagnostics · Premium brands",
    years: 8,
    photo: "/images/team/refat-bekirov.webp",
    bio: "Refat shows up on time, runs honest diagnostics, and explains every step. Customers on Google reviews ask for him by name.",
    featured: true,
    givenName: "Refat",
    familyName: "Bekirov",
    credentials: [EPA, FL_LIC],
    languages: ["English", "Russian"],
  },
  {
    slug: "akhmed-osmanov",
    name: "Akhmed Osmanov",
    role: "Commercial Technician",
    specialty: "Commercial laundry · UniMac · Speed Queen · Property management",
    years: 10,
    photo: "/images/team/akhmed-osmanov.webp",
    bio: "Property managers and laundromats lean on Akhmed to keep their UniMac, Speed Queen, and Electrolux Professional fleets running.",
    featured: true,
    givenName: "Akhmed",
    familyName: "Osmanov",
    credentials: [EPA, FL_LIC],
    languages: ["English", "Russian"],
  },
  {
    slug: "andrei-lavrov",
    name: "Andrei Lavrov",
    role: "Senior Technician",
    specialty: "Sealed system · Refrigerant recovery · Built-in cooling",
    years: 7,
    photo: "/images/team/andrei-lavrov.webp",
    bio: "EPA-certified for refrigerant work. Andrei handles compressor swaps, evaporator coil leaks, and built-in fridges others won't touch.",
    featured: true,
    givenName: "Andrei",
    familyName: "Lavrov",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "dzmitrii-kitou",
    name: "Dzmitrii Kitou",
    role: "Senior Technician",
    specialty: "Laundry · Washing machines · Drains and seals",
    years: 6,
    photo: "/images/team/dzmitrii-kitou.webp",
    bio: "Drum bearings, transmissions, drain pump rebuilds — Dzmitrii handles the laundry jobs other techs flag as hard.",
    featured: true,
    givenName: "Dzmitrii",
    familyName: "Kitou",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "mike",
    name: "Mike",
    role: "Sub-Zero Technician",
    specialty: "Sub-Zero · Wolf · Built-in refrigeration",
    years: 5,
    photo: "/images/team/mike.webp",
    bio: "Mike is the Sub-Zero specialist on the team — built-in columns, integrated wine coolers, dual-zone units. Factory-trained on sealed systems.",
    featured: true,
    givenName: "Mike",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "nikita-maslakov",
    name: "Nikita Maslakov",
    role: "Service Technician",
    specialty: "Dryers · Vent installation · Gas appliances",
    years: 5,
    photo: "/images/team/nikita-maslakov.webp",
    bio: "Quick, polite, knowledgeable — exactly what reviewers say about Nikita's house calls.",
    givenName: "Nikita",
    familyName: "Maslakov",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "nikita-shirshov",
    name: "Nikita Shirshov",
    role: "Service Technician",
    specialty: "Ovens · Ranges · Cooktops",
    years: 5,
    photo: "/images/team/nikita-shirshov.webp",
    bio: "Wolf, Viking, Thermador — Nikita is the call for premium cooking equipment in the area.",
    givenName: "Nikita",
    familyName: "Shirshov",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "maksim-shiryagin",
    name: "Maksim Shiryagin",
    role: "Service Technician",
    specialty: "Diagnostics · Multi-brand · Control boards",
    years: 5,
    photo: "/images/team/maksim-shiryagin.webp",
    bio: "Patient and thorough — Maksim would rather take an extra 30 minutes than guess at a root cause.",
    givenName: "Maksim",
    familyName: "Shiryagin",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "denis-novitskii",
    name: "Denis Novitskii",
    role: "Service Technician",
    specialty: "General appliance repair · Same-day calls",
    years: 4,
    photo: "/images/team/denis-novitskii.webp",
    bio: "On time and dependable — straight from a recent Google review (\"Dennis was great\").",
    givenName: "Denis",
    familyName: "Novitskii",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "dzmitrii",
    name: "Dzmitrii",
    role: "Service Technician",
    specialty: "Refrigerators · Ice makers · Dishwashers",
    years: 4,
    photo: "/images/team/dzmitrii.webp",
    givenName: "Dzmitrii",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "ruslan-hordieiev",
    name: "Ruslan Hordieiev",
    role: "Service Technician",
    specialty: "Washers · Dryers · Front-load systems",
    years: 4,
    photo: "/images/team/ruslan-hordieiev.webp",
    givenName: "Ruslan",
    familyName: "Hordieiev",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "shokhrat-agabekov",
    name: "Shokhrat Agabekov",
    role: "Service Technician",
    specialty: "General service · Microwaves · Ranges",
    years: 4,
    photo: "/images/team/shokhrat-agabekov.webp",
    givenName: "Shokhrat",
    familyName: "Agabekov",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "valerii-basov",
    name: "Valerii Basov",
    role: "Service Technician",
    specialty: "Dishwashers · Ovens · Cooking appliances",
    years: 4,
    photo: "/images/team/valerii-basov.webp",
    givenName: "Valerii",
    familyName: "Basov",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
  {
    slug: "viktor-kamenschikov",
    name: "Viktor Kamenschikov",
    role: "Service Technician",
    specialty: "Refrigerators · Built-in repairs",
    years: 4,
    photo: "/images/team/viktor-kamenschikov.webp",
    givenName: "Viktor",
    familyName: "Kamenschikov",
    credentials: [EPA, FL_LIC],
    languages: ["English", "Russian"],
  },
  {
    slug: "boris",
    name: "Boris",
    role: "Service Technician",
    specialty: "General service · Same-day dispatch",
    years: 4,
    photo: "/images/team/boris.webp",
    givenName: "Boris",
    credentials: [EPA],
    languages: ["English", "Russian"],
  },
];

export const FEATURED_TEAM = TEAM.filter((m) => m.featured);

export const TEAM_BY_SLUG: Record<string, TeamMember> = Object.fromEntries(
  TEAM.map((t) => [t.slug, t]),
);
