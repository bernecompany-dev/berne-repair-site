import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, Quote } from "lucide-react";
import { COMPANY } from "@/data/company";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function OwnerIntro({ locale = "en" }: { locale?: Locale }) {
  const d = getDictionary(locale).ownerIntro;
  return (
    <section
      id="owner"
      className="container-prose pt-6 pb-12 sm:pt-10 sm:pb-16 scroll-mt-20"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 via-transparent to-transparent blur-2xl"
          />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.67_0.21_252/0.35)]">
            <Image
              src="/images/team/evgenii-knyazev.webp"
              alt="Eugene Berne — owner of Berne Repair, South Florida appliance repair company"
              width={800}
              height={1000}
              priority
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="eyebrow">{d.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {d.title}
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
            <p>{d.p1}</p>
            <p>
              {d.p2Pre}{" "}
              <strong className="text-foreground">{d.p2Bold}</strong>
              {d.p2Post}
            </p>
            <p>{d.p3}</p>
            <figure className="mt-6 rounded-2xl border border-border bg-card/60 p-5">
              <Quote className="size-5 text-brand" aria-hidden />
              <blockquote className="mt-2 text-base italic text-foreground/85">
                {d.quote}
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {d.quoteBy}
              </figcaption>
            </figure>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_var(--brand-glow)] hover:-translate-y-px hover:brightness-110"
            >
              <Phone className="size-4" aria-hidden />
              {d.ctaCall} {COMPANY.phone.display}
            </a>
            <Link
              href="#team-grid"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
            >
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              {d.ctaTeam}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
