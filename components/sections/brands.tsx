import Image from "next/image";
import { BRANDS, PREMIUM_BRANDS } from "@/data/brands";

const LOGOS: Record<string, string> = {
  Samsung: "/brands/samsung.svg",
  LG: "/brands/lg.svg",
  Bosch: "/brands/bosch.svg",
  GE: "/brands/ge.svg",
  "GE Monogram": "/brands/ge.svg",
  Maytag: "/brands/maytag.svg",
};

/**
 * Typographic wordmarks for brands without licensed logo assets.
 * We use brand-appropriate typography + accent colors so each mark
 * reads as a distinct, considered piece of branding — not a generic
 * text list — while staying clear of trademarked logo art.
 */
const WORDMARK: Record<string, { text: string; cls: string; style?: React.CSSProperties }> = {
  "Sub-Zero":  { text: "SUB·ZERO",    cls: "font-serif font-medium tracking-[0.24em]", style: { color: "#dfe6f2" } },
  Wolf:        { text: "WOLF",        cls: "font-serif font-bold tracking-[0.18em]",   style: { color: "#e44a3b" } },
  Viking:      { text: "VIKING",      cls: "font-serif font-bold tracking-[0.30em]",   style: { color: "#dfe6f2" } },
  Thermador:   { text: "Thermador",   cls: "font-serif italic font-medium tracking-tight", style: { color: "#c98a4a" } },
  Miele:       { text: "MIELE",       cls: "font-sans font-bold tracking-[0.20em]",    style: { color: "#9b0e10" } },
  KitchenAid:  { text: "KitchenAid",  cls: "italic font-bold tracking-tight",          style: { color: "#cf2127" } },
  Whirlpool:   { text: "whirlpool",   cls: "lowercase font-bold tracking-tight",       style: { color: "#dfe6f2" } },
  Frigidaire:  { text: "FRIGIDAIRE",  cls: "font-bold tracking-[0.18em]",              style: { color: "#dfe6f2" } },
  Electrolux:  { text: "Electrolux",  cls: "font-light tracking-[0.04em]",             style: { color: "#dfe6f2" } },
  "Jenn-Air":  { text: "JENN-AIR",    cls: "font-bold tracking-[0.14em]",              style: { color: "#dfe6f2" } },
  "Speed Queen": { text: "SPEED QUEEN", cls: "font-bold tracking-[0.10em]",            style: { color: "#dfe6f2" } },
  Scotsman:    { text: "Scotsman",    cls: "font-serif font-medium tracking-tight",    style: { color: "#dfe6f2" } },
  "U-Line":    { text: "U-LINE",      cls: "font-bold tracking-[0.18em]",              style: { color: "#dfe6f2" } },
  Marvel:      { text: "MARVEL",      cls: "font-bold tracking-tight",                 style: { color: "#dfe6f2" } },
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
              {LOGOS[brand] ? (
                <Image
                  src={LOGOS[brand]}
                  alt={`${brand} — Berne Appliance Repair services ${brand} appliances`}
                  width={84}
                  height={36}
                  loading="lazy"
                  className="h-7 w-auto opacity-85"
                />
              ) : WORDMARK[brand] ? (
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
