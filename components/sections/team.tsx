import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { FEATURED_TEAM } from "@/data/team";

export function TeamSection() {
  return (
    <section id="team" className="container-prose py-20 sm:py-28">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="eyebrow">The team</span>
          <h2 className="heading-section mt-3">
            Real technicians on every truck — not a callcenter.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            18 full-time technicians dispatched from across South Florida. The same
            people customers ask for by name on Google reviews.
          </p>
        </div>
        <Link
          href="/team"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
        >
          Meet the team
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {FEATURED_TEAM.map((m) => (
          <article
            key={m.slug}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-4 transition-all hover:-translate-y-0.5 hover:border-brand/40"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={m.photo}
                alt={`${m.name} — ${m.role} at Berne Appliance Repair, ${m.specialty}`}
                fill
                sizes="(min-width: 1024px) 18vw, 50vw"
                quality={78}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">{m.name}</h3>
              <p className="text-xs uppercase tracking-[0.14em] text-brand">{m.role}</p>
              <p className="text-xs text-muted-foreground">{m.specialty}</p>
            </div>
            <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="size-3.5" aria-hidden />
              {m.years} yrs with Berne
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
