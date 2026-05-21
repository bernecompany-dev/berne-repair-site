export const COMPANY = {
  // Canonical brand name — used in titles, schema `name`, body copy.
  // The historic short form "Berne Repair" remains in `legalEntity` for the
  // Inc. legal entity (copyright footer, Yelp slug references).
  legalName: "Berne Appliance Repair",
  /** Historic legal-entity short form. Used only in copyright + LLC references. */
  legalEntity: "Berne Repair, Inc.",
  dbaNames: ["Berne Appliance Repair", "Berne Repair", "Norma Appliance Repair"],
  shortName: "Berne Appliance Repair",
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
  /**
   * All three canonical dispatch lines (NAP-consistency sweep 2026-05-20).
   * 754 is the primary; 954 (Hollywood/Broward) and 561 (Boca/Palm Beach) are
   * the regional dispatch trunks. Surface every line as `tel:` so mobile users
   * can tap any of the three in /contact, /request-dispatch, and the footer.
   */
  phones: [
    { display: "(754) 345-4515", tel: "+17543454515", label: "Primary dispatch" },
    { display: "(954) 569-8550", tel: "+19545698550", label: "Hollywood · Broward" },
    { display: "(561) 858-9919", tel: "+15618589919", label: "Boca · Palm Beach" },
  ],
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
    /** Headquarters — Hallandale Beach. */
    hq: {
      street: "1001 N Federal Hwy #230",
      city: "Hallandale Beach",
      region: "FL",
      postalCode: "33009",
      country: "US",
    },
    /** Boca Raton office (Palm Beach county). */
    boca: {
      street: "131 S Federal Hwy #533",
      city: "Boca Raton",
      region: "FL",
      postalCode: "33432",
      country: "US",
    },
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
