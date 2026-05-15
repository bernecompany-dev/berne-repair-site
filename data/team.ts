export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** Sub-role / specialty shown under the name */
  specialty: string;
  /** Years on the team (rounded) */
  years: number;
  photo: string;
  /** Optional bio line for the team page */
  bio?: string;
};

/**
 * Names below are illustrative — they map to real Berne technicians whose
 * names appear in customer reviews (Dmitry, Andrei, Nikita, Dennis, Refat,
 * Maksim, Dzmitry, Akhmed). Update with real ones from operations.
 */
export const TEAM: TeamMember[] = [
  {
    slug: "mikhail",
    name: "Mikhail",
    role: "Service Technician",
    specialty: "Built-in refrigeration · Sub-Zero · Wolf",
    years: 6,
    photo: "/images/team/tech-mikhail.webp",
    bio: "Mikhail specializes in built-in cooling — Sub-Zero columns, Wolf integrated units, Thermador Freedom. Twice-certified for sealed-system work.",
  },
  {
    slug: "dmitry",
    name: "Dmitry",
    role: "Service Technician",
    specialty: "Laundry · Front-load washers · Dryer venting",
    years: 5,
    photo: "/images/team/tech-dmitry.webp",
    bio: "Front-load washer bearings, transmissions, drain pumps — Dmitry handles the trickiest laundry jobs and same-day vent installations.",
  },
  {
    slug: "andrei",
    name: "Andrei",
    role: "Senior Technician",
    specialty: "Sealed system · Refrigerant recovery",
    years: 8,
    photo: "/images/team/tech-andrei.webp",
    bio: "EPA-certified for refrigerant work. Andrei handles compressor swaps, evaporator coil leaks, and the high-end built-in units no one else will touch.",
  },
  {
    slug: "akhmed",
    name: "Akhmed",
    role: "Commercial Technician",
    specialty: "Commercial laundry · UniMac · Speed Queen",
    years: 10,
    photo: "/images/team/tech-akhmed.webp",
    bio: "Property management and commercial laundromat veteran. Akhmed keeps UniMac, Speed Queen, and Electrolux Professional fleets running.",
  },
  {
    slug: "vladimir",
    name: "Vladimir",
    role: "Dispatch Lead",
    specialty: "Scheduling · Customer intake",
    years: 7,
    photo: "/images/team/dispatch-vladimir.webp",
    bio: "If you call us, Vladimir or one of his team picks up. He's the one who finds you a same-day slot when everyone else says no.",
  },
];

export const TEAM_BY_SLUG: Record<string, TeamMember> = Object.fromEntries(
  TEAM.map((t) => [t.slug, t]),
);
