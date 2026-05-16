import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, Quote } from "lucide-react";
import { COMPANY } from "@/data/company";

/**
 * Owner block at the top of /team. Written first-person, no AI-flavored
 * generic phrasing. Story is real: arrived 2022, learned the trade,
 * launched the company. Update copy by editing this file directly.
 */
export function OwnerIntro() {
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
          <span className="eyebrow">From the owner</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Hey — I'm Eugene Berne.
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
            <p>
              I moved to the United States in 2022. Didn't speak the industry, didn't know a soul
              in it. I fell into appliance repair by accident — picked up a wrench because the rent
              wasn't going to pay itself, and I figured I could learn something useful while I did.
            </p>
            <p>
              Seven months later I launched Berne Repair. No investors, no playbook, just a couple
              of trucks and a phone that I answered myself. Three years on we've completed{" "}
              <strong className="text-foreground">over 30,000 service calls</strong> across South
              Florida — Sub-Zero columns in Coral Gables, commercial laundromats in Hialeah,
              ovens in Boca Raton kitchens the night before a dinner party.
            </p>
            <p>
              I don't run this from behind a desk. I personally hire every technician on this page,
              and I personally back every repair we do. If a job goes sideways — call me. The
              number on this site rings me.
            </p>
            <figure className="mt-6 rounded-2xl border border-border bg-card/60 p-5">
              <Quote className="size-5 text-brand" aria-hidden />
              <blockquote className="mt-2 text-base italic text-foreground/85">
                "I'd rather lose a job than send a guy I don't trust into your home. That's the
                whole standard."
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                — Eugene Berne, owner
              </figcaption>
            </figure>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_var(--brand-glow)] hover:-translate-y-px hover:brightness-110"
            >
              <Phone className="size-4" aria-hidden />
              Call me direct: {COMPANY.phone.display}
            </a>
            <Link
              href="#team-grid"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
            >
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              Meet the crew I trust
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
