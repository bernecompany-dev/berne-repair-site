import Link from "next/link";
import { BRANDS } from "@/data/brands";
import { RESIDENTIAL_BRAND_PROFILES } from "@/lib/data/residential-brand-profiles";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

/**
 * Typographic wordmarks for every brand in the grid.
 *
 * We render all brands as considered typographic marks — brand-appropriate
 * typography + accent colors — rather than logo image files. This keeps the
 * grid perfectly uniform (no mix of logos and fallback text), avoids shipping
 * trademarked logo art, and removes the `next/image` SVG-optimization path
 * that was returning HTTP 400 on `/_next/image` (SVG is rejected unless
 * `dangerouslyAllowSVG` is enabled) and surfacing raw alt text for Bosch, LG,
 * Samsung, GE, GE Monogram and Maytag.
 */
// Neutral marks use the theme `foreground` token (via `text-foreground/85`) so they
// stay legible in BOTH the light and dark themes — a hardcoded light hex was washing
// out on the default light background. Brands with a distinctive, theme-agnostic accent
// keep their brand color via inline `style`. Miele and LG use class-based colors with
// a brighter `dark:` variant — their official hexes sit near 2:1 contrast on dark cards.
const NEUTRAL = "text-foreground/85";
const WORDMARK: Record<string, { text: string; cls: string; style?: React.CSSProperties }> = {
  "Sub-Zero":  { text: "SUB·ZERO",    cls: `font-serif font-medium tracking-[0.24em] ${NEUTRAL}` },
  Wolf:        { text: "WOLF",        cls: "font-serif font-bold tracking-[0.18em]",   style: { color: "#c0392b" } },
  Viking:      { text: "VIKING",      cls: `font-serif font-bold tracking-[0.30em] ${NEUTRAL}` },
  Thermador:   { text: "Thermador",   cls: "font-serif italic font-medium tracking-tight", style: { color: "#b06a2c" } },
  Miele:       { text: "MIELE",       cls: "font-sans font-bold tracking-[0.20em] text-[#9b0e10] dark:text-[#c4121f]" },
  Bosch:       { text: "BOSCH",       cls: "font-bold tracking-[0.16em]",              style: { color: "#d0021b" } },
  KitchenAid:  { text: "KitchenAid",  cls: "italic font-bold tracking-tight",          style: { color: "#cf2127" } },
  LG:          { text: "LG",          cls: "font-bold tracking-[0.30em] text-[#a50034] dark:text-[#d4286a]" },
  Samsung:     { text: "SAMSUNG",     cls: `font-bold tracking-[0.18em] ${NEUTRAL}` },
  Whirlpool:   { text: "whirlpool",   cls: `lowercase font-bold tracking-tight ${NEUTRAL}` },
  GE:          { text: "GE",          cls: `font-serif font-bold tracking-[0.10em] ${NEUTRAL}` },
  "GE Monogram": { text: "MONOGRAM",  cls: "font-serif italic font-medium tracking-[0.06em]", style: { color: "#b06a2c" } },
  Maytag:      { text: "MAYTAG",      cls: `font-bold tracking-[0.16em] ${NEUTRAL}` },
  Frigidaire:  { text: "FRIGIDAIRE",  cls: `font-bold tracking-[0.18em] ${NEUTRAL}` },
  Electrolux:  { text: "Electrolux",  cls: `font-light tracking-[0.04em] ${NEUTRAL}` },
  "Jenn-Air":  { text: "JENN-AIR",    cls: `font-bold tracking-[0.14em] ${NEUTRAL}` },
  "Speed Queen": { text: "SPEED QUEEN", cls: `font-bold tracking-[0.10em] ${NEUTRAL}` },
  Scotsman:    { text: "Scotsman",    cls: `font-serif font-medium tracking-tight ${NEUTRAL}` },
  "U-Line":    { text: "U-LINE",      cls: `font-bold tracking-[0.18em] ${NEUTRAL}` },
  Marvel:      { text: "MARVEL",      cls: `font-bold tracking-tight ${NEUTRAL}` },
};

// Grid label → hub-page profile. The grid says "GE Monogram"; the brand hub
// profile is named "Monogram" (slug `monogram`).
const PROFILE_BY_NAME = new Map(RESIDENTIAL_BRAND_PROFILES.map((b) => [b.name, b] as const));
const NAME_ALIASES: Record<string, string> = { "GE Monogram": "Monogram" };

/** Hub-page href for a grid brand, or null if the brand has no hub page.
 *  On /es we only localize the href when the profile has a real Spanish
 *  layer — EN-only hubs (e.g. Monogram) keep the EN path. */
function brandHref(brand: string, locale: Locale): string | null {
  const profile = PROFILE_BY_NAME.get(NAME_ALIASES[brand] ?? brand);
  if (!profile) return null;
  return locale === "es" && profile.es
    ? `/es/brands/${profile.slug}`
    : `/brands/${profile.slug}`;
}

export function Brands({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).brands;
  const list = BRANDS.slice(0, 14);
  return (
    <section className="border-y border-border/60 bg-background/40">
      <div className="container-prose py-14">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">{t.eyebrow}</span>
          <p className="max-w-2xl text-sm text-muted-foreground">{t.body}</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {list.map((brand) => {
            const mark = WORDMARK[brand] ? (
              <span
                className={`text-base ${WORDMARK[brand].cls}`}
                style={WORDMARK[brand].style}
              >
                {WORDMARK[brand].text}
              </span>
            ) : (
              <span className="text-base font-semibold tracking-tight text-foreground/85">
                {brand}
              </span>
            );
            const href = brandHref(brand, locale);
            return (
              <li
                key={brand}
                className="flex h-16 items-center justify-center rounded-xl border border-border bg-card/40 px-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                title={
                  locale === "es"
                    ? `Berne Appliance Repair repara ${brand}`
                    : `Berne Appliance Repair services ${brand}`
                }
              >
                {href ? (
                  <Link
                    href={href}
                    aria-label={
                      locale === "es" ? `Reparación ${brand}` : `${brand} repair`
                    }
                    className="flex h-full w-full items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {mark}
                  </Link>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          {t.footnote.replace("{brands}", BRANDS.slice(14).join(", "))}
        </p>
      </div>
    </section>
  );
}
