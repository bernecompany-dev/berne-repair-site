import Link from "next/link";
import {
  Refrigerator,
  WashingMachine,
  Wind,
  CookingPot,
  Microwave,
  Snowflake,
  Wine,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type Service } from "@/data/services";

const ICONS: Record<string, LucideIcon> = {
  "refrigerator-repair": Refrigerator,
  "washer-repair": WashingMachine,
  "dryer-repair": Wind,
  "dishwasher-repair": Sparkles,
  "oven-repair": CookingPot,
  "microwave-repair": Microwave,
  "ice-maker-repair": Snowflake,
  "wine-cooler-repair": Wine,
};

export function ServicesGrid() {
  return (
    <section id="services" className="container-prose py-20 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="eyebrow">What we repair</span>
          <h2 className="heading-section mt-3">
            Every major appliance. Every major brand.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From Sub-Zero columns to a Whirlpool washer — our trucks are stocked for the brands and
            models we see every day in South Florida homes and businesses.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.slug] ?? Sparkles;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-card/80"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-brand transition-colors group-hover:border-brand/40 group-hover:bg-brand/10">
          <Icon className="size-5" aria-hidden />
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {service.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </Link>
  );
}
