import { BRANDS, PREMIUM_BRANDS } from "@/data/brands";

export function Brands() {
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

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {BRANDS.slice(0, 16).map((brand) => (
            <div
              key={brand}
              className="flex h-14 items-center justify-center rounded-xl border border-border bg-card/40 px-3 text-center"
            >
              <span className="truncate text-sm font-semibold tracking-tight text-foreground/85">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
