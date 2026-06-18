import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

/**
 * Lightweight homepage teaser for /service-map. Static text + a link only —
 * deliberately NO map here so the homepage LCP stays untouched. The actual
 * interactive map lives on /service-map and (lazily) on city pages.
 */
export function ServiceMapTeaser() {
  return (
    <section className="container-prose py-12 sm:py-16">
      <Link
        href="/service-map"
        className="group flex flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/80 via-card/40 to-card/80 p-8 transition-colors hover:border-brand/40 sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <MapPin className="size-3.5" aria-hidden />
            Coverage
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            See where we&apos;ve worked.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Thousands of completed appliance repairs across South Florida — from
            the Miami metro to Tampa Bay and Sarasota — mapped at the
            neighborhood level for privacy.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-brand/40 bg-brand/10 px-5 py-3 text-sm font-semibold text-brand transition-colors group-hover:bg-brand/20">
          See where we&apos;ve worked
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </Link>
    </section>
  );
}
