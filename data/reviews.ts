export type Review = {
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** ISO date for schema.org */
  datePublished: string;
};

export const REVIEWS: Review[] = [
  {
    author: "M. Reyes",
    location: "Coral Gables",
    rating: 5,
    datePublished: "2025-09-12",
    quote:
      "Sub-Zero stopped cooling Friday night. They had a tech at the house Saturday morning. Diagnosed and fixed in one visit — saved a $20K replacement.",
  },
  {
    author: "Sandra K.",
    location: "Aventura",
    rating: 5,
    datePublished: "2025-08-04",
    quote:
      "Property management — we manage 40+ doors. Berne is on call for us. Always upfront on price, always shows up.",
  },
  {
    author: "Daniel P.",
    location: "Boca Raton",
    rating: 5,
    datePublished: "2026-01-22",
    quote:
      "Wolf range igniter quit on us the day we were hosting 12 people. They juggled a tech over. Saved the dinner party.",
  },
  {
    author: "Lauren H.",
    location: "Fort Lauderdale",
    rating: 5,
    datePublished: "2026-02-15",
    quote:
      "LG washer wouldn't drain. Tech showed up within two hours, replaced the pump on the truck, done in 40 minutes. Clean, courteous, fair price.",
  },
  {
    author: "Roberto M.",
    location: "Miami Beach",
    rating: 5,
    datePublished: "2025-11-08",
    quote:
      "Built-in Thermador column needed a full diagnostic. Honest assessment — they could've upsold a compressor swap, instead just fixed the relay. Saved us $1,500.",
  },
];

/** Stable aggregate exposed in JSON-LD; mirrors REVIEWS plus historical volume. */
export const REVIEW_AGGREGATE = {
  ratingValue: 4.9,
  reviewCount: 247,
  bestRating: 5,
  worstRating: 1,
};
