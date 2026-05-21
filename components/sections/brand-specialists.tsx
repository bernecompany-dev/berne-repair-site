import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { getBrandSpecialists } from "@/lib/data/brand-specialists";

type Props = {
  /** Brand slug — same value used in /brands/{slug} route param. */
  brandSlug: string;
  /** Brand display name — used in the heading + fallback copy. */
  brandName: string;
};

/**
 * "Specialists for this brand at Berne" — additive block that links 2-3
 * technician bio pages (/team/{slug}) whose specialties cover the brand.
 *
 * Mapping lives in `lib/data/brand-specialists.ts`. When no mapping exists
 * we render a single fallback card pointing at the team index so the page
 * still has the section but doesn't fabricate a specialist.
 */
export function BrandSpecialistsBlock({ brandSlug, brandName }: Props) {
  const specialists = getBrandSpecialists(brandSlug);

  return (
    <section
      className="border-y border-border/60 bg-background/40"
      aria-labelledby={`specialists-${brandSlug}-heading`}
      data-block="brand-specialists"
    >
      <div className="container-prose py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Specialists for this brand</span>
          <h2
            id={`specialists-${brandSlug}-heading`}
            className="heading-section mt-3"
          >
            Specialists for {brandName} at Berne.
          </h2>
          <p className="mt-4 text-muted-foreground">
            {specialists.length > 0
              ? `The technicians on the Berne roster who carry ${brandName} factory training, model-specific parts on the truck, and the diagnostic habit ${brandName} platforms reward.`
              : `Berne dispatches the right ${brandName} specialist from an 18-tech roster — refrigeration, cooking, and laundry coverage across South Florida.`}
          </p>
        </div>

        {specialists.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specialists.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/team/${t.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card/40 p-4 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={t.photo}
                      alt={`${t.name}, ${t.role} at Berne Appliance Repair`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="text-sm font-semibold text-foreground group-hover:text-brand">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                    <div className="truncate text-xs text-muted-foreground/80">
                      {t.specialty}
                    </div>
                  </div>
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Users className="size-5" aria-hidden />
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Berne dispatches the right {brandName} specialist.
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                18 full-time technicians across South Florida. Dispatch routes
                each {brandName} call to the tech with the closest match on
                model platform, parts inventory, and travel time.
              </p>
              <Link
                href="/team"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                Meet the full team
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
