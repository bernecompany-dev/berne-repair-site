import { Sparkles } from "lucide-react";
import type { QuickAnswer as QuickAnswerData } from "@/data/quick-answers";

/**
 * GEO / AI-citation "Quick answer" block. Renders a compact, self-contained
 * extractable answer (the `lead`) directly after the hero, followed by 2-3
 * visible H2 question/answer pairs. Purely presentational — the same `qa`
 * items must also be passed into the page's FAQPage schema by the caller so
 * visible content and structured data stay in sync.
 */
export function QuickAnswer({
  data,
  locale = "en",
}: {
  data: QuickAnswerData;
  locale?: "en" | "es";
}) {
  const heading = locale === "es" ? "Respuesta rápida" : "Quick answer";
  return (
    <section className="container-prose pt-10 sm:pt-12">
      <div className="rounded-3xl border border-brand/30 bg-brand/[0.06] p-6 sm:p-8">
        <span className="eyebrow">
          <Sparkles className="mr-1.5 inline size-3.5" aria-hidden />
          {heading}
        </span>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg">
          {data.lead}
        </p>
        {data.qa.length > 0 ? (
          <div className="mt-6 grid gap-5 border-t border-border/60 pt-6 sm:grid-cols-2">
            {data.qa.map((item) => (
              <div key={item.question}>
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  {item.question}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
