import { BRANDS, PREMIUM_BRANDS } from "@/data/brands";

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
// keep their brand color via inline `style`.
const NEUTRAL = "text-foreground/85";
const WORDMARK: Record<string, { text: string; cls: string; style?: React.CSSProperties }> = {
  "Sub-Zero":  { text: "SUB·ZERO",    cls: `font-serif font-medium tracking-[0.24em] ${NEUTRAL}` },
  Wolf:        { text: "WOLF",        cls: "font-serif font-bold tracking-[0.18em]",   style: { color: "#c0392b" } },
  Viking:      { text: "VIKING",      cls: `font-serif font-bold tracking-[0.30em] ${NEUTRAL}` },
  Thermador:   { text: "Thermador",   cls: "font-serif italic font-medium tracking-tight", style: { color: "#b06a2c" } },
  Miele:       { text: "MIELE",       cls: "font-sans font-bold tracking-[0.20em]",    style: { color: "#9b0e10" } },
  Bosch:       { text: "BOSCH",       cls: "font-bold tracking-[0.16em]",              style: { color: "#d0021b" } },
  KitchenAid:  { text: "KitchenAid",  cls: "italic font-bold tracking-tight",          style: { color: "#cf2127" } },
  LG:          { text: "LG",          cls: "font-bold tracking-[0.30em]",              style: { color: "#a50034" } },
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

export function Brands() {
  const list = BRANDS.slice(0, 14);
  return (
    <section className="border-y border-border/60 bg-background/40">
      <div className="container-prose py-14">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow">Brands we service</span>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Premium specialists — including {PREMIUM_BRANDS.slice(0, 4).join(", ")} — plus every
            major residential and commercial brand.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {list.map((brand) => (
            <li
              key={brand}
              className="flex h-16 items-center justify-center rounded-xl border border-border bg-card/40 px-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              title={`Berne Appliance Repair services ${brand}`}
            >
              {WORDMARK[brand] ? (
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
              )}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          Plus Bosch, GE Monogram, Jenn-Air, Speed Queen, Scotsman, U-Line, Marvel and most residential and commercial brands.
        </p>
      </div>
    </section>
  );
}
