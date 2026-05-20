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
    yearsInBusiness: 11,
    licensed: true,
    insured: true,
    warranty: "90-day labor & parts warranty",
    sameDay: true,
  },
  url: "https://www.berne-repair.com",
} as const;

export type Company = typeof COMPANY;
