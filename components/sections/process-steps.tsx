import { Phone, Wrench, CheckCircle2, BadgeDollarSign, ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function ProcessSteps({ locale = "en" }: { locale?: Locale }) {
  const d = getDictionary(locale).processSteps;
  const STEPS = [
    { n: 1, icon: Phone,           title: d.s1Title, body: d.s1Body, tag: d.s1Tag },
    { n: 2, icon: BadgeDollarSign, title: d.s2Title, body: d.s2Body, tag: d.s2Tag },
    { n: 3, icon: Wrench,          title: d.s3Title, body: d.s3Body, tag: d.s3Tag },
    { n: 4, icon: CheckCircle2,    title: d.s4Title, body: d.s4Body, tag: d.s4Tag },
  ];
  return (
    <section className="container-prose py-20 sm:py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">{d.eyebrow}</span>
        <h2 className="heading-section mt-3">{d.title}</h2>
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.n} className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex items-start justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-tint/[0.04] text-brand">
                <s.icon className="size-5" aria-hidden />
              </span>
              <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-brand">{s.tag}</span>
            </div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{d.step} {s.n}</div>
            <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            {i < STEPS.length - 1 ? (
              <ArrowRight aria-hidden className="pointer-events-none absolute right-[-12px] top-1/2 hidden -translate-y-1/2 text-brand/60 lg:block" />
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
