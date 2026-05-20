import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  BadgeDollarSign,
  Wrench,
  MapPin,
  Star,
  Clock3,
  Phone,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { TEAM } from "@/data/team";
import { REVIEW_AGGREGATE } from "@/data/reviews";
import { breadcrumbJsonLd, absoluteUrl, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Berne Repair — South Florida Appliance Repair Since 2022",
  description:
    "Berne Repair: 18 technicians, 29,000+ jobs, 4.79/871 reviews across Miami-Dade, Broward & Palm Beach. Founded 2022 by Eugene Berne on 11+ years of industry heritage.",
  alternates: {
    canonical: "/about",
    languages: {
      "en-US": absoluteUrl("/about"),
      "es-US": absoluteUrl("/es/about"),
      "x-default": absoluteUrl("/about"),
    },
  },
};

export default function AboutPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Berne Repair",
    url: absoluteUrl("/about"),
    mainEntity: { "@id": absoluteUrl("/#business") },
    breadcrumb: { "@id": absoluteUrl("/about#breadcrumb") },
  };

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">About</span>
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
              <Star className="size-3.5 text-brand" aria-hidden />
              {REVIEW_AGGREGATE.ratingValue} / {REVIEW_AGGREGATE.reviewCount} reviews
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            South Florida&apos;s premium appliance team.{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Built on craft, not on subcontractors.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne Repair was established in 2022 as the premium South Florida
            branch of a family of appliance repair operations with{" "}
            <span className="text-foreground">11+ years of industry heritage</span>.
            Today: {COMPANY.socialProof.technicians} W-2 technicians,{" "}
            {COMPANY.socialProof.repairsCompleted} jobs completed,{" "}
            {REVIEW_AGGREGATE.ratingValue}/5 across {REVIEW_AGGREGATE.reviewCount}{" "}
            verified reviews — and a $59 flat service call applied toward the
            repair if you say go.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      <section className="container-prose grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/30 via-transparent to-transparent blur-2xl"
          />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_30px_80px_-30px_oklch(0.67_0.21_252/0.35)]">
            {/* TODO(eugene): replace owner photo with team-on-truck or workshop hero for /about if available */}
            <Image
              src="/images/team/evgenii-knyazev.webp"
              alt="Eugene Berne, founder of Berne Repair, photographed in the Berne Repair workshop"
              width={800}
              height={1000}
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div>
          <span className="eyebrow">Founder&apos;s note</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi — I&apos;m Eugene Berne.
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
            <p>
              I founded Berne Repair in 2022 after a decade in the appliance
              repair trade. The plan was simple: build a fleet operation in
              South Florida where every technician on the truck is a Berne
              employee — not a dispatcher&apos;s cousin, not a same-day subcontractor
              — and back every single repair with a real warranty and a phone
              number that I personally answer.
            </p>
            <p>
              Four years later we run {COMPANY.socialProof.technicians} full-time
              techs out of trucks stocked for Sub-Zero, Wolf, Viking, Thermador,
              Miele, Bosch and every major brand. We&apos;ve completed{" "}
              <strong className="text-foreground">
                {COMPANY.socialProof.repairsCompleted} jobs
              </strong>{" "}
              across Miami-Dade, Broward and Palm Beach counties. The reviews
              page shows the work — {REVIEW_AGGREGATE.ratingValue} out of 5
              across {REVIEW_AGGREGATE.reviewCount} verified reviews on Google,
              Yelp and the platforms our customers actually use.
            </p>
            <p>
              We&apos;re a young company. The craft behind it isn&apos;t — our senior
              technicians bring 7-10 years of bench experience each, and the
              broader Berne family of repair operations has been running calls
              in Florida since 2015. The general residential brand operates as{" "}
              <a
                href="https://bernerepair.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Appliance Repair
              </a>
              , and commercial / restaurant / hotel work is dispatched through{" "}
              <a
                href="https://www.berne-commercial.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Commercial Repair
              </a>
              . If you want the long version, the{" "}
              <Link href="/family" className="text-brand hover:underline">
                family page
              </Link>{" "}
              has it.
            </p>
            <p>
              Berne is a member of{" "}
              <a
                href="https://msaworld.com/"
                rel="noopener external"
                target="_blank"
                className="text-brand hover:underline"
              >
                MSA World
              </a>
              {" "}(Marcone Servicers Association), the leading industry
              association for appliance service contractors. Our technicians
              complete continuous training programs on emerging appliance
              technology through MSA World coursework and OEM (Sub-Zero, Wolf,
              Miele, LG, Samsung, GE) certification updates &mdash; so the
              truck arriving at your home is equipped to service the appliance
              you actually own, not the one made five years ago.
            </p>
            <p>
              If you call us today before noon, odds are we&apos;ll have a
              technician at your door by dinner. That&apos;s the operating
              standard. That&apos;s what {COMPANY.socialProof.repairsCompleted} jobs has
              taught us to commit to.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_10px_30px_-10px_var(--brand-glow)] hover:-translate-y-px hover:brightness-110"
            >
              <Phone className="size-4" aria-hidden />
              Call {COMPANY.phone.display}
            </a>
            <Link
              href="/team"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
            >
              <Users className="size-4 text-brand" aria-hidden />
              Meet the {TEAM.length - 1} techs
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container-prose py-16 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">By the numbers</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What Berne Repair looks like today.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              icon={<Users className="size-5 text-brand" aria-hidden />}
              value={String(COMPANY.socialProof.technicians)}
              label="Full-time technicians"
              sub="All W-2 employees, not subcontractors"
            />
            <Stat
              icon={<Wrench className="size-5 text-brand" aria-hidden />}
              value={COMPANY.socialProof.repairsCompleted}
              label="Repairs completed"
              sub="Across the Berne family of operations"
            />
            <Stat
              icon={<Star className="size-5 text-brand" aria-hidden />}
              value={`${REVIEW_AGGREGATE.ratingValue} / 5`}
              label={`${REVIEW_AGGREGATE.reviewCount} verified reviews`}
              sub="Google, Yelp & other platforms"
            />
            <Stat
              icon={<MapPin className="size-5 text-brand" aria-hidden />}
              value="3"
              label="Counties served"
              sub="Miami-Dade · Broward · Palm Beach"
            />
            <Stat
              icon={<BadgeDollarSign className="size-5 text-brand" aria-hidden />}
              value={`$${COMPANY.serviceCallPrice}`}
              label="Flat service call"
              sub="Applied toward the repair if you say go"
            />
            <Stat
              icon={<Clock3 className="size-5 text-brand" aria-hidden />}
              value="Same-day"
              label="Dispatch standard"
              sub="Open 7 days · 7 AM – 9 PM"
            />
            <Stat
              icon={<ShieldCheck className="size-5 text-brand" aria-hidden />}
              value="90-day"
              label="Labor & parts warranty"
              sub="Every job, written, no asterisks"
            />
            <Stat
              icon={<ShieldCheck className="size-5 text-brand" aria-hidden />}
              value="Licensed"
              label="& fully insured"
              sub="Florida state credentials on file"
            />
          </div>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Service area</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three counties, 60+ cities.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Berne Repair dispatches across all of Miami-Dade, Broward and
              Palm Beach counties — from Homestead in the south to Jupiter in
              the north. Priority neighborhoods include Bal Harbour, Sunny
              Isles, Fisher Island, Key Biscayne, Coral Gables, Pinecrest,
              Aventura, Hollywood, Fort Lauderdale, Boca Raton, Delray Beach
              and West Palm Beach.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/areas"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
              >
                <MapPin className="size-4 text-brand" aria-hidden />
                See all cities
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-white/[0.07]"
              >
                <Wrench className="size-4 text-brand" aria-hidden />
                What we repair
              </Link>
            </div>
          </div>

          <div>
            <span className="eyebrow">How we operate</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built like a fleet. Priced like a local.
            </h2>
            <ul className="mt-5 space-y-3 text-base leading-relaxed text-foreground/90">
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  W-2 technicians only. No subcontracted dispatch, no
                  &ldquo;we know a guy&rdquo; handoffs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  EPA-certified for refrigerant work where it counts —
                  Sub-Zero, built-in columns, sealed-system repairs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  Trucks stocked for the brands we see every day —
                  Sub-Zero, Wolf, Viking, Thermador, Miele, Bosch, LG,
                  Samsung, Whirlpool, GE, KitchenAid.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  90-day labor & parts warranty in writing. No fine print.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>
                  Owner-backed: Eugene personally answers escalations.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Contact />
      <CTABand />

      {/* Person JSON-LD for every member of the field team — E-E-A-T. */}
      <JsonLd
        data={[
          aboutJsonLd,
          breadcrumbJsonLd(crumbs),
          ...TEAM.map((m) => personJsonLd(m)),
        ]}
      />
    </>
  );
}

function Stat({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5">
      <div className="flex items-center gap-2">{icon}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground/85">{label}</div>
      {sub ? (
        <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {sub}
        </div>
      ) : null}
    </div>
  );
}
