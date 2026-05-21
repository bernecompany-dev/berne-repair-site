import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Wrench, ShieldCheck, BadgeDollarSign, ArrowRight } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { OwnerIntro } from "@/components/sections/owner-intro";
import { JsonLd } from "@/components/site/json-ld";
import { TEAM } from "@/data/team";
import { BACK_OFFICE } from "@/data/team-bios";
import { COMPANY } from "@/data/company";
import { breadcrumbJsonLd, absoluteUrl, personJsonLd, SITE_URL } from "@/lib/seo";

// Canonical headcount per the brand's NAP — 18 W-2 field technicians.
// `TEAM` (data/team.ts) lists the 16 published bios; the remaining roles
// are dispatched but not yet bio-ready. See data/company.ts → socialProof.
const TECH_COUNT = COMPANY.socialProof.technicians;

export const metadata: Metadata = {
  title: `The Berne Appliance Repair Team — ${TECH_COUNT} South Florida Technicians`,
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

  // Person schema for each member — improves rich results, E-E-A-T signal.
  // See lib/seo.ts → personJsonLd() for the full node shape (hasCredential,
  // knowsAbout, knowsLanguage, worksFor reference, sameAs, etc.).
  const peopleJsonLd = TEAM.map((m) => personJsonLd(m));

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/team#roster`,
    name: "Berne Appliance Repair — Technician roster",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: TEAM.length,
    itemListElement: TEAM.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/team/${m.slug}`),
      item: {
        "@type": "Person",
        "@id": absoluteUrl(`/team/${m.slug}#person`),
        name: m.name,
        jobTitle: m.role,
        image: absoluteUrl(m.photo),
      },
    })),
  };

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/team#collection`,
    url: absoluteUrl("/team"),
    name: "Berne Appliance Repair — Team",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
    mainEntity: { "@id": `${SITE_URL}/team#roster` },
  };

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
              Berne Appliance Repair team.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne Appliance Repair is a fleet operation, not a hand-off to subcontractors. Every technician
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
            {`${TECH_COUNT} technicians I hand-picked.`}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <Link
              key={m.slug}
              href={`/team/${m.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 transition-colors hover:border-brand/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role} at Berne Appliance Repair`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  quality={78}
                  loading="lazy"
                  className="object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight group-hover:text-brand">{m.name}</h2>
                <p className="text-xs uppercase tracking-[0.18em] text-brand">{m.role}</p>
                <p className="text-sm text-muted-foreground">{m.specialty}</p>
              </div>
              {m.bio ? <p className="text-sm leading-relaxed text-foreground/85">{m.bio}</p> : null}
              <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Wrench className="size-3.5" aria-hidden />
                  {m.years} years with Berne
                </span>
                <span className="font-medium text-brand">Read bio →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="back-office" className="container-prose pb-16 sm:pb-20 scroll-mt-20">
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">Back office</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            The dispatch and operations team
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            The technicians on the trucks are the front line. These five roles
            are the back-end that keeps Berne dispatchable. Photos and names
            being finalized — role descriptions are live now.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BACK_OFFICE.map((m) => (
            <Link
              key={m.slug}
              href={`/team/${m.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card/30 p-6 transition-colors hover:border-brand/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={m.photo}
                  alt={`${m.role} at Berne Appliance Repair`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-brand">
                  {m.role}
                </h3>
                <p className="text-xs uppercase tracking-[0.18em] text-brand">
                  Operations team
                </p>
              </div>
              <div className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                Read role <ArrowRight className="size-3.5" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Contact />
      <CTABand />

      <JsonLd data={[...peopleJsonLd, itemList, collectionPage, breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
