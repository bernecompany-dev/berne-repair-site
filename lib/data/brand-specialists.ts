/**
 * Brand → technician mapping. Surfaces 2-3 specialists in a "Specialists for
 * this brand at Berne" block on each /brands/{slug} page.
 *
 * Source of truth:
 *   - C:/Users/golds/Berne_Commercial/_data/technicians.json
 *   - data/team.ts (UI roster + photos)
 *   - data/team-bios.ts (deployed bio pages at /team/{slug})
 *
 * Mapping rules:
 *   - Brand with explicit specialty match in technicians.json → direct match
 *     (Sub-Zero, Wolf, Thermador, Viking → Eugene/Mike/Nikita Shirshov).
 *   - Brand without explicit specialty → mapped by category:
 *     - Premium cooking → Nikita Shirshov, Maksim Shiryagin
 *     - Premium refrigeration → Eugene, Mike, Viktor Kamenschikov, Andrei Lavrov
 *     - Mass-market laundry → Dzmitrii Kitou, Akhmed Osmanov
 *     - LG/Samsung electronics → Refat Bekirov (premium-brand diagnostic)
 *     - Multi-category mass-market → Denis Novitskii, Boris
 *
 * If a brand has no entry here, the page renders a single "Berne dispatches the
 * right specialist" fallback card instead.
 */

import { TEAM_BY_SLUG, type TeamMember } from "@/data/team";

export type BrandSpecialistMatch = {
  slug: string;
  name: string;
  role: string;
  photo: string;
};

/** Brand slug → ordered list of tech slugs (priority order, max 3 used). */
export const BRAND_SPECIALISTS: Record<string, string[]> = {
  // Premium refrigeration
  "sub-zero": ["evgenii-knyazev", "mike", "viktor-kamenschikov"],
  // Premium cooking + refrigeration
  wolf: ["evgenii-knyazev", "nikita-shirshov", "mike"],
  viking: ["nikita-shirshov", "maksim-shiryagin"],
  thermador: ["evgenii-knyazev", "andrei-lavrov", "nikita-shirshov"],
  // Premium European multi-category
  miele: ["valerii-basov", "refat-bekirov"],
  // Mid-premium
  kitchenaid: ["valerii-basov", "maksim-shiryagin"],
  ge: ["maksim-shiryagin", "refat-bekirov"],
  // LG / Samsung electronics
  lg: ["refat-bekirov", "ruslan-hordieiev", "dzmitrii-kitou"],
  samsung: ["refat-bekirov", "nikita-maslakov", "dzmitrii-kitou"],
  // Mass-market laundry-heavy
  whirlpool: ["dzmitrii-kitou", "denis-novitskii", "akhmed-osmanov"],
};

/**
 * Resolve a brand slug to an ordered list of TeamMember objects (max 3).
 * Tech slugs that don't exist in the roster are silently dropped so the page
 * never breaks on a stale mapping.
 */
export function getBrandSpecialists(slug: string): TeamMember[] {
  const techSlugs = BRAND_SPECIALISTS[slug] ?? [];
  return techSlugs
    .map((s) => TEAM_BY_SLUG[s])
    .filter((m): m is TeamMember => Boolean(m))
    .slice(0, 3);
}
