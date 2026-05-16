import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Wrench, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { OwnerIntro } from "@/components/sections/owner-intro";
import { JsonLd } from "@/components/site/json-ld";
import { TEAM } from "@/data/team";
import { COMPANY } from "@/data/company";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Berne Repair Team — 17 South Florida Technicians",
  description: `Meet the ${COMPANY.socialProof.technicians} licensed technicians and dispatch team at ${COMPANY.legalName}. Real names, real specialties — the same people customers ask for by name on Google reviews.`,
  alternates: {
    canonical: "/team",
    languages: {
      "en-US": absoluteUrl("/team"),
      "es-US": absoluteUrl("/es/team"),
      "x-default": absoluteUrl("/team"),
    },
  },
};

export default function TeamPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/team" },
  ];

  // Person schema for each member — improves rich results
  const peopleJsonLd = TEAM.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    description: m.bio ?? m.specialty,
    image: absoluteUrl(m.photo),
    worksFor: { "@id": absoluteUrl("/#business") },
    knowsAbout: m.specialty.split("·").map((s) => s.trim()),
  }));

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background: "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Team</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Users className="size-3.5" aria-hidden />
              {COMPANY.socialProof.technicians} full-time technicians
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Licensed & insured
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden />
              ${COMPANY.serviceCallPrice} service call
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            The people on the trucks.
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Berne Repair team.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne Repair is a fleet operation, not a hand-off to subcontractors. Every technician
            here is a Berne employee — trained on the brands we service, EPA-certified where
            refrigerant is involved, on the same warranty page as everyone else.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <OwnerIntro />

      <section id="team-grid" className="container-prose py-16 sm:py-20 scroll-mt-20">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">The crew</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Sixteen technicians I hand-picked.
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <article
              key={m.slug}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 transition-colors hover:border-brand/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role} at Berne Repair`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  quality={78}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">{m.name}</h2>
                <p className="text-xs uppercase tracking-[0.18em] text-brand">{m.role}</p>
                <p className="text-sm text-muted-foreground">{m.specialty}</p>
              </div>
              {m.bio ? <p className="text-sm leading-relaxed text-foreground/85">{m.bio}</p> : null}
              <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <Wrench className="size-3.5" aria-hidden />
                {m.years} years with Berne
              </div>
            </article>
          ))}
        </div>
      </section>

      <Contact />
      <CTABand />

      <JsonLd data={[...peopleJsonLd, breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
