import { Clock3, Users, ShieldCheck, Wrench, Award, Truck } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

const ICONS = [Clock3, Users, Truck, Wrench, ShieldCheck, Award];

export function WhyUs({ locale = "en" }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.whyUs;
  const REASONS = dict.whyReasons.map((r, i) => ({ icon: ICONS[i] ?? Wrench, ...r }));
  return (
    <section
      id="why"
      className="relative border-y border-border/60 bg-gradient-to-b from-transparent via-card/30 to-transparent"
    >
      <div className="container-prose py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.title}</h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="flex gap-4 rounded-2xl border border-border bg-background/40 p-6"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-brand">
                <r.icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
