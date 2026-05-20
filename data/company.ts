export const COMPANY = {
  legalName: "Berne Repair",
  dbaNames: ["Berne Repair", "Berne Appliance Repair", "Norma Appliance Repair"],
  shortName: "Berne Repair",
  tagline: "Premium appliance repair across South Florida",
  serviceCallPrice: 59,
  phone: {
    display: "(305) 520-7833",
    tel: "+13055207833",
    sms: "+13055207833",
  },
  email: {
    public: "BerneRepair@gmail.com",
    leads: "BerneRepair@gmail.com",
  },
  hours: {
    label: "Open 7 days · 8 AM – 9 PM",
    structured: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], open: "08:00", close: "21:00" },
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
