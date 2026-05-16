import { Users, Star, BadgeDollarSign, MapPin, Clock3, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/data/company";
import { CITIES } from "@/data/cities";
import { REVIEW_AGGREGATE } from "@/data/reviews";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function StatsStrip({ locale = "en" }: { locale?: Locale }) {
  const d = getDictionary(locale).statsStrip;
  const STATS = [
    { icon: Users,           value: `${COMPANY.socialProof.technicians}`, label: d.techs,         sub: d.techsSub },
    { icon: Star,            value: `${REVIEW_AGGREGATE.ratingValue}`,    label: d.rating.replace("{count}", `${REVIEW_AGGREGATE.reviewCount}`), sub: d.ratingSub },
    { icon: BadgeDollarSign, value: `$${COMPANY.serviceCallPrice}`,       label: d.price,         sub: d.priceSub },
    { icon: MapPin,          value: `${CITIES.length}`,                   label: d.cities,        sub: d.citiesSub },
    { icon: Clock3,          value: d.sameDay,                            label: d.sameDayLabel,  sub: d.sameDaySub },
    { icon: ShieldCheck,     value: d.warranty,                           label: d.warrantyLabel, sub: d.warrantySub },
  ];
  return (
    <section className="border-y border-border/60 bg-background/40">
      <div className="container-prose py-12 sm:py-14">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s) => (
            <li key={s.label} className="flex flex-col gap-1 rounded-2xl border border-border bg-card/50 p-4 transition-colors hover:border-brand/40">
              <s.icon className="size-5 text-brand" aria-hidden />
              <div className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{s.value}</div>
              <div className="text-xs font-medium text-foreground/85">{s.label}</div>
              <div className="text-[11px] text-muted-foreground">{s.sub}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
