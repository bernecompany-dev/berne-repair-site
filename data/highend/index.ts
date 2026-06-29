import type { HighEndService, HighEndArticle } from "./types";
import { electricSaunaRepair } from "./electric-sauna-repair";
import { coldPlungeRepair } from "./cold-plunge-repair";
import { poolHeaterRepair } from "./pool-heater-repair";
import { coffeeMachineRepair } from "./coffee-machine-repair";
import { reclinerRepair } from "./recliner-repair";
import { warmingDrawerRepair } from "./warming-drawer-repair";

export type { HighEndService, HighEndArticle } from "./types";

/**
 * Hand-authored luxury/specialty residential service pages. Static routes that
 * live OUTSIDE the programmatic SERVICES array so they never spawn city combos.
 * Order here = display order on the /services hub specialty section.
 */
export const HIGHEND_SERVICES: HighEndService[] = [
  electricSaunaRepair,
  coldPlungeRepair,
  poolHeaterRepair,
  coffeeMachineRepair,
  warmingDrawerRepair,
  reclinerRepair,
];

export const HIGHEND_SERVICE_BY_SLUG: Record<string, HighEndService> =
  Object.fromEntries(HIGHEND_SERVICES.map((s) => [s.slug, s]));

/** Blog articles paired 1:1 with each high-end service (article ↔ service). */
export const HIGHEND_ARTICLES: HighEndArticle[] = HIGHEND_SERVICES.map(
  (s) => s.article,
);
