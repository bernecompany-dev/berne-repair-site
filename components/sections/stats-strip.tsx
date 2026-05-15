import { Users, Star, BadgeDollarSign, MapPin, Clock3, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/data/company";
import { CITIES } from "@/data/cities";
import { REVIEW_AGGREGATE } from "@/data/reviews";

const STATS = [
  {
    icon: Users,
    value: `${COMPANY.socialProof.technicians}`,
    label: "Full-time technicians",
    sub: "Not subcontractors",
  },
  {
    icon: Star,
    value: `${REVIEW_AGGREGATE.ratingValue}`,
    label: `From ${REVIEW_AGGREGATE.reviewCount}+ Google reviews`,
    sub: "Across 3 DBAs",
  },
  {
    icon: BadgeDollarSign,
    value: `$${COMPANY.serviceCallPrice}`,
    label: "Flat service call",
    sub: "Applied toward repair",
  },
  {
    icon: MapPin,
    value: `${CITIES.length}`,
    label: "Cities covered",
    sub: "Miami-Dade · Broward · Palm Beach",
  },
  {
    icon: Clock3,
    value: "Same-day",
    label: "Most jobs scheduled <1 hour",
    sub: "Open 7 days · 8 AM – 9 PM",
  },
  {
    icon: ShieldCheck,
    value: "90-day",
    label: "Warranty on labor & parts",
    sub: "Licensed & insured",
  },
];

export function StatsStrip() {
  return (
    <section className="border-y border-border/60 bg-background/40">
      <div className="container-prose py-12 sm:py-14">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s) => (
            <li
              key={s.label}
              className="flex flex-col gap-1 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-brand/40"
            >
              <s.icon className="size-5 text-brand" aria-hidden />
              <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {s.value}
              </div>
              <div className="text-xs font-medium text-foreground/85">{s.label}</div>
              <div className="text-[11px] text-muted-foreground">{s.sub}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
