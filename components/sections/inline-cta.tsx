import { CTARow } from "@/components/site/cta-row";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Compact mid-page conversion block — a slimmer sibling of CTABand for spots
 * where the full band is too heavy: right after the TL;DR verdict on
 * /compare/* (long reads otherwise bury the next button CTA ~20k characters
 * down) and after the document grid on /credentials. Copy comes from the
 * caller so each page speaks to its own audience (comparison shoppers vs
 * property managers). Lead-path review fix, 2026-06-11.
 */
export function InlineCta({
  title,
  body,
  bookHref,
  locale = "en",
  className,
}: {
  title: string;
  body: string;
  /** Forwarded to CTARow — pass "/#lead-form" on pages without a lead form. */
  bookHref?: string;
  locale?: Locale;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-brand/30 bg-brand/[0.06] p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {body}
          </p>
        </div>
        <CTARow size="md" locale={locale} bookHref={bookHref} className="shrink-0" />
      </div>
    </aside>
  );
}
