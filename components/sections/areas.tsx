import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { CITIES, PRIORITY_CITIES, COUNTIES } from "@/data/cities";

export function Areas() {
  return (
    <section id="areas" className="container-prose py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <span className="eyebrow">Areas we serve</span>
          <h2 className="heading-section mt-3">
            Across Miami-Dade, Broward & Palm Beach.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Twelve priority cities, every neighborhood in between, plus the full coastline from
            Coral Gables to West Palm Beach.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {COUNTIES.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80"
              >
                <MapPin className="size-3.5 text-brand" aria-hidden />
                {c} County
              </span>
            ))}
          </div>

          <MapMock />
        </div>

        <div className="grid gap-2 self-start">
          {PRIORITY_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/areas/${city.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {city.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {city.county} County · {city.neighborhoods.slice(0, 2).join(", ")}
                </div>
              </div>
              <ArrowRight
                className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                aria-hidden
              />
            </Link>
          ))}
          <Link
            href="/areas"
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-brand/40 bg-brand/5 px-4 py-3 text-sm font-semibold text-brand hover:bg-brand/10"
          >
            See all {CITIES.length} cities we cover
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MapMock() {
  // Stylized map placeholder — replaced with real map in Phase 4
  return (
    <div
      aria-hidden
      className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card/40"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-3/5"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, oklch(0.67 0.21 252 / 0.18), transparent 60%)",
        }}
      />
      {/* coastline-ish vertical line */}
      <div className="absolute inset-y-8 right-[18%] w-px bg-gradient-to-b from-transparent via-brand/40 to-transparent" />
      {/* city pins */}
      {[
        { top: "12%", right: "22%", label: "West Palm Beach" },
        { top: "26%", right: "20%", label: "Delray Beach" },
        { top: "36%", right: "20%", label: "Boca Raton" },
        { top: "50%", right: "22%", label: "Fort Lauderdale" },
        { top: "62%", right: "24%", label: "Hollywood" },
        { top: "70%", right: "26%", label: "Aventura" },
        { top: "82%", right: "30%", label: "Miami" },
      ].map((pin) => (
        <div
          key={pin.label}
          className="absolute"
          style={{ top: pin.top, right: pin.right }}
        >
          <span className="block size-2.5 rounded-full bg-brand shadow-[0_0_0_4px_oklch(0.67_0.21_252/0.20)]" />
        </div>
      ))}
    </div>
  );
}
