import type { FAQ } from "@/data/faqs";

export function FAQSection({ faqs, title = "Frequently asked" }: { faqs: FAQ[]; title?: string }) {
  return (
    <section id="faq" className="container-prose py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="heading-section mt-3">{title}</h2>
        </div>
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {faqs.map((f, i) => (
            <li key={i}>
              <details className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-left">
                  <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {f.question}
                  </span>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-tint/[0.04] text-brand transition-transform group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                  {f.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
