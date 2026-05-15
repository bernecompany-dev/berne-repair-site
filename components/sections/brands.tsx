import Image from "next/image";
import { BRANDS, PREMIUM_BRANDS } from "@/data/brands";

type LogoStyle = "image" | "wordmark";
type BrandSpec = { name: string; src?: string; style?: LogoStyle; cls?: string };

const LOGOS: Record<string, string> = {
  Samsung: "/brands/samsung.svg",
  LG: "/brands/lg.svg",
  Bosch: "/brands/bosch.svg",
  GE: "/brands/ge.svg",
  "GE Monogram": "/brands/ge.svg",
  Maytag: "/brands/maytag.svg",
};

// Distinctive wordmark styles for brands without logo images
const WORDMARK_CLS: Record<string, string> = {
  "Sub-Zero":  "font-serif tracking-tight",
  Wolf:        "font-serif italic",
  Viking:      "font-serif uppercase tracking-[0.18em]",
  Thermador:   "tracking-tight font-light uppercase",
  Miele:       "font-serif uppercase tracking-[0.24em]",
  KitchenAid:  "tracking-tight italic",
  Whirlpool:   "tracking-tight",
  Frigidaire:  "uppercase tracking-[0.18em] font-light",
  Electrolux:  "uppercase tracking-[0.18em]",
  "Jenn-Air":  "uppercase tracking-tight",
  "Speed Queen": "uppercase tracking-[0.14em]",
  Scotsman:    "tracking-tight",
  "U-Line":    "uppercase tracking-[0.18em]",
  Marvel:      "uppercase tracking-tight font-semibold",
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
              className="flex h-16 items-center justify-center rounded-xl border border-border bg-card/40 px-3 transition-colors hover:border-brand/40 hover:bg-card/60"
              title={brand}
            >
              {LOGOS[brand] ? (
                <Image
                  src={LOGOS[brand]}
                  alt={`${brand} logo — Berne Repair services ${brand} appliances`}
                  width={84}
                  height={36}
                  className="h-7 w-auto opacity-85 transition-opacity"
                />
              ) : (
                <span
                  className={`text-base font-semibold text-foreground/85 ${
                    WORDMARK_CLS[brand] ?? "tracking-tight"
                  }`}
                >
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
