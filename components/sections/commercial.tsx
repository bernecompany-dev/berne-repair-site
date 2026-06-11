import { Building2, Store, Utensils, Briefcase } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

const SEGMENT_ICONS = [Store, Utensils, Building2, Briefcase];

export function Commercial({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).commercial;
  const segments = t.segments.map((label, i) => ({
    icon: SEGMENT_ICONS[i] ?? Briefcase,
    label,
  }));
  return (
    <section className="relative overflow-hidden border-y border-border/60">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(900px 400px at 70% 50%, oklch(0.67 0.21 252 / 0.10), transparent 60%)",
        }}
      />
      <div className="container-prose grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.title}</h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t.body}</p>

          <div className="mt-8">
            <CTARow size="md" locale={locale} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {segments.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card/60 p-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-tint/[0.04] text-brand">
                <s.icon className="size-5" aria-hidden />
              </span>
              <div className="text-base font-semibold tracking-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
