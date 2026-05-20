export const COMPANY = {
  legalName: "Berne Repair",
  dbaNames: ["Berne Repair", "Berne Appliance Repair", "Norma Appliance Repair"],
  shortName: "Berne Repair",
  tagline: "Premium appliance repair across South Florida",
  serviceCallPrice: 59,
  // Canonical primary dispatch line — see Berne_Commercial/_docs/canonical-facts.md.
  // Unified across all three Berne sites on 2026-05-20 (NAP-consistency sweep).
  // The legacy (305) 520-7833 number was retired and folded into the dispatch trunk.
  phone: {
    display: "(754) 345-4515",
    tel: "+17543454515",
    sms: "+17543454515",
  },
  email: {
    public: "BerneRepair@gmail.com",
    leads: "BerneRepair@gmail.com",
  },
  hours: {
    label: "Open 7 days · 7 AM – 9 PM",
    structured: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], open: "07:00", close: "21:00" },
    ],
  },
  address: {
    region: "FL",
    country: "US",
    serviceArea: "South Florida",
  },
  socialProof: {
    technicians: 18,
    repairsCompleted: "29,000+",
    // Brand established 2022 (see lib/seo.ts FOUNDING_YEAR); the 11+ years of
    // industry heritage belongs to the parent Berne Appliance Repair entity.
    // Use foundingDate in schema as the single source of truth; do not surface
    // "11 years" on berne-repair.com without explicit parent attribution.
    industryExperienceYears: 11,
    licensed: true,
    insured: true,
    warranty: "90-day labor & parts warranty",
    sameDay: true,
  },
  url: "https://www.berne-repair.com",
} as const;

export type Company = typeof COMPANY;
