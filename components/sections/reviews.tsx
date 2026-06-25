import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function Reviews({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).reviews;
  return (
    <section className="container-prose py-20 sm:py-28">
      <div className="max-w-2xl">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 className="heading-section mt-3">{t.title}</h2>
        <p className="mt-4 text-sm text-muted-foreground">{t.body}</p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {REVIEWS.slice(0, 3).map((r) => (
          <figure
            key={r.author}
            className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-6"
          >
            <Quote className="size-6 text-brand/70" aria-hidden />
            <blockquote className="text-base leading-relaxed text-foreground/90">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {r.author}
                </div>
                <div className="text-xs text-muted-foreground">{r.location}</div>
              </div>
              <div
                role="img"
                className="flex items-center gap-0.5"
                aria-label={
                  locale === "es" ? `${r.rating} de 5 estrellas` : `${r.rating} out of 5 stars`
                }
              >
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-brand text-brand" aria-hidden />
                ))}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
