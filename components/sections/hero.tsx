import { getImageProps } from "next/image";
import { BadgeDollarSign, Star, ShieldCheck, Clock3 } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { COMPANY } from "@/data/company";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const d = getDictionary(locale).hero;
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      <BackgroundGrid />

      <div className="container-prose relative pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium tracking-wide text-brand">
                <BadgeDollarSign className="size-3.5" aria-hidden />
                {d.badgePrice}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                {d.badgeLicensed}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
                <Star className="size-3.5 text-brand" aria-hidden />
                {d.badgeRepairs}
              </span>
            </div>

            <h1 className="heading-hero mt-7">
              {d.title1}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand via-[oklch(0.78_0.18_252)] to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
                {d.title2}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {d.body} <span className="text-foreground">{d.bodyHighlight}</span>{d.bodySuffix}
            </p>

            <div className="mt-9">
              <CTARow size="lg" locale={locale} />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock3 className="size-4 text-brand" aria-hidden />
                <span>{d.openToday}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand" aria-hidden />
                <span>{d.warranty}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-foreground/80">{COMPANY.socialProof.technicians}</span>
                <span>{d.technicians}</span>
              </div>
            </div>
          </div>

          <HeroImage label={d.priceCardLabel} suffix={d.priceCardSuffix} />
        </div>
      </div>
    </section>
  );
}

// 1×1 transparent GIF — served to <1024px viewports via <source media> so
// phones download ZERO image bytes for the desktop-only hero portrait.
const BLANK_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function HeroImage({ label, suffix }: { label: string; suffix: string }) {
  // MOBILE LCP CONTRACT — this portrait is rendered only at lg+ (the wrapper
  // is `hidden lg:block`), but a plain <Image priority> would still cost
  // mobile users twice: (a) browsers fetch <img> inside display:none parents
  // anyway, and (b) `priority` emits an unconditional <link rel=preload>
  // that, with a `100vw` sizes fallback, preloads a ~full-width variant
  // during the critical first-paint window. On mobile the LCP element is the
  // hero <h1>, so that preload directly competed with fonts/CSS for
  // bandwidth. Fix (per next/image "Art Direction" docs): getImageProps +
  // <picture> with a data-URI source below 1024px (zero bytes on phones),
  // plus a media-gated preload so desktop keeps the early LCP image fetch.
  const { props: imgProps } = getImageProps({
    src: "/images/team/evgenii-knyazev.webp",
    alt: "Eugene Berne — Owner of Berne Appliance Repair, South Florida appliance repair",
    width: 800,
    height: 1100,
    priority: true,
    sizes: "40vw",
  });

  return (
    <div className="relative hidden lg:block">
      {/* React 19 hoists <link> to <head>. media-gated so ONLY desktop preloads. */}
      <link
        rel="preload"
        as="image"
        imageSrcSet={imgProps.srcSet}
        imageSizes={imgProps.sizes}
        media="(min-width: 1024px)"
        fetchPriority="high"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 via-transparent to-transparent blur-2xl"
      />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.67_0.21_252/0.35)]">
        <picture>
          <source media="(max-width: 1023px)" srcSet={BLANK_PIXEL} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- raw <img> is required inside <picture> for art direction; alt/srcSet come from getImageProps */}
          <img {...imgProps} fetchPriority="high" className="h-auto w-full object-cover" />
        </picture>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-border bg-card/85 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight text-foreground">${COMPANY.serviceCallPrice}</span>
            <span className="text-sm text-muted-foreground">{suffix}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -z-10 size-[1000px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.30), transparent)",
        }}
      />
    </>
  );
}
