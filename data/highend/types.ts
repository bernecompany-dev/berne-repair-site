/**
 * High-end / luxury RESIDENTIAL specialty service pages.
 *
 * These are hand-authored, fully static service routes that live OUTSIDE the
 * programmatic SERVICES array (data/services.ts) on purpose: they must NOT
 * spawn service×city combo pages. Each one is a single indexable page in EN
 * and ES with unique, technician-voice content — symptom → cause → fix banks,
 * niche brands, and authored owner notes. No templating, no thin tail.
 *
 * Rendered by components/site/highend-service-page.tsx. Registered for routing
 * by the per-slug folders under app/services/<slug>/ and app/es/services/<slug>/.
 */

export type HighEndFailureMode = {
  /** How the homeowner describes it. */
  symptom: string;
  /** Root cause(s), in a senior tech's voice. */
  cause: string;
  /** What we actually do on-site (and when a part has to be ordered). */
  fix: string;
};

export type HighEndFaq = { question: string; answer: string };

/** First-person owner note (Eugene Berne), rendered by <PersonalNote/>. */
export type OwnerNote = { opener: string; body: string; closer: string };

/** A cross-link to another service hub (existing or high-end sibling). */
export type RelatedLink = {
  /** Path, e.g. "/services/wine-cooler-repair" or "/services/cold-plunge-repair". */
  href: string;
  label: string;
  blurb: string;
};

/** Inline blog article paired 1:1 with the service (article ↔ service link). */
export type HighEndArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: Date;
  updatedAt?: Date;
  author: string;
  readingMinutes: number;
  /** Reuses the existing Article topic union member — no schema change. */
  topic: "premium-service";
  /** Markdown body. Must link back to the paired /services/<slug> page. */
  body: string;
};

export type HighEndServiceEs = {
  /** Full Spanish display name, e.g. "Reparación de Saunas Eléctricas". */
  name: string;
  /** Short noun for cards/labels, e.g. "Sauna". */
  shortName: string;
  /** Lowercase inline noun, e.g. "sauna eléctrica". */
  seoNoun: string;
  /** Absolute SERP title, ≤60ch (layout suffix is bypassed). */
  metaTitle: string;
  metaDescription: string;
  /** Gradient second line of the H1, e.g. "en hogares de lujo del sur de Florida.". */
  heroLede: string;
  /** Hero paragraph. */
  longDescription: string;
  ownerNote: OwnerNote;
  /** Heading above the failure-mode bank, e.g. "Cómo diagnosticamos y reparamos". */
  diagnosisTitle: string;
  diagnosisIntro: string;
  commonIssues: string[];
  failureModes: HighEndFailureMode[];
  faqs: HighEndFaq[];
};

export type HighEndService = {
  slug: string;
  /** Full display name, e.g. "Electric Sauna Repair". */
  name: string;
  /** Short noun for cards/labels, e.g. "Sauna". */
  shortName: string;
  /** Lowercase inline noun, e.g. "electric sauna". */
  seoNoun: string;
  /** Absolute SERP title, ≤60ch. */
  metaTitle: string;
  metaDescription: string;
  /** One-line card description for the /services hub. */
  cardDescription: string;
  /** Gradient second line of the H1, e.g. "across South Florida's luxury homes.". */
  heroLede: string;
  /** Hero paragraph. */
  longDescription: string;
  ownerNote: OwnerNote;
  /** Heading above the failure-mode bank, e.g. "How we diagnose & fix it". */
  diagnosisTitle: string;
  diagnosisIntro: string;
  commonIssues: string[];
  failureModes: HighEndFailureMode[];
  faqs: HighEndFaq[];
  /** Brand chips shown in the "brands we service" grid. */
  brands: string[];
  /** 2-4 cross-links to related hubs (mix of existing + high-end siblings). */
  related: RelatedLink[];
  /** The paired blog article (registered into the blog registry). */
  article: HighEndArticle;
  es: HighEndServiceEs;
};
