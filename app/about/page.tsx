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
import { COMPANY, REPAIRS_COMPLETED } from "@/data/company";
import { TEAM } from "@/data/team";
import { REVIEW_AGGREGATE } from "@/data/reviews";
import { breadcrumbJsonLd, absoluteUrl, personJsonLd, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "About Berne Appliance Repair — Family-Run Since 2015";
const PAGE_DESCRIPTION = `Part of the Berne family of companies serving South Florida since 2015 — premium division since 2022. 18 W-2 technicians, ${REPAIRS_COMPLETED} services, 4.79/1,373 reviews.`;

export const metadata: Metadata = {
  // Absolute — the layout template would append " · Berne Appliance Repair"
  // a second time on top of the brand already in the string.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/about",
    languages: {
      "en-US": absoluteUrl("/about"),
      "es-US": absoluteUrl("/es/about"),
      "x-default": absoluteUrl("/about"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/about" }),
};

export default function AboutPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Berne Appliance Repair",
    url: absoluteUrl("/about"),
    description:
      `Berne Appliance Repair: the premium division of the Berne family of companies, repairing South Florida appliances since 2015 — launched by Eugene Berne in 2022. 18 W-2 technicians, ${REPAIRS_COMPLETED} services completed, 4.79/1,373 reviews. Sub-Zero, Wolf, Viking, Thermador, Miele service across Miami-Dade, Broward, Palm Beach, and the Gulf Coast.`,
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Licensed & insured
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Star className="size-3.5 text-brand" aria-hidden />
              {REVIEW_AGGREGATE.ratingValue} / {REVIEW_AGGREGATE.reviewCount} reviews
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            South Florida&apos;s premium appliance team.{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Built on craft, not on subcontractors.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            The Berne family of companies has been repairing South Florida
            appliances since 2015 on a single premise: premium households
            deserved a repair company that actually showed up, fixed the
            appliance right the first time, and could be trusted inside a $40K
            Sub-Zero column or a Wolf 48&quot; range. Eugene Berne launched this
            premium division in 2022 — same operator, same standards, sharper
            focus on luxury brands. Today — {COMPANY.socialProof.technicians} W-2
            technicians, {COMPANY.socialProof.repairsCompleted} services completed,{" "}
            <span className="text-foreground">
              {REVIEW_AGGREGATE.ratingValue}/5 across {REVIEW_AGGREGATE.reviewCount}{" "}
              verified reviews
            </span>{" "}
            — that premise is the operating system of the entire company.
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
            {/* LCP candidate on /about — render eagerly with high fetch priority. */}
            <Image
              src="/images/team/evgenii-knyazev.webp"
              alt="Eugene Berne, founder of Berne Appliance Repair, photographed in the Berne Appliance Repair workshop"
              width={800}
              height={1000}
              priority
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
              The Berne family of companies has been repairing South Florida
              appliances since 2015, because high-net-worth households here
              kept asking the same question: who do I trust inside a $20K
              refrigerator? The honest answer used to be &ldquo;nobody
              reliably&rdquo; — the market was franchise dispatchers, one-truck
              operations, and a long tail of guys who would happily attempt
              a Sub-Zero sealed-system repair with no formal training. The
              family built the alternative — and in 2022 I launched this
              premium division: same operator, same standards, sharper focus
              on luxury brands.
            </p>
            <p>
              Today, across the family of companies, the operation is{" "}
              {COMPANY.socialProof.technicians}{" "}
              W-2 technicians running out of trucks stocked specifically for
              the premium brands South Florida has in its kitchens: Sub-Zero,
              Wolf, Viking, Thermador, Miele, Bosch, plus the volume brands
              (LG, Samsung, Whirlpool, GE, KitchenAid) we still service every
              day because every household has a mix. We&apos;ve completed{" "}
              <strong className="text-foreground">
                {COMPANY.socialProof.repairsCompleted} services
              </strong>{" "}
              across Miami-Dade, Broward, Palm Beach, and the Gulf Coast — the
              4.79★ across {REVIEW_AGGREGATE.reviewCount} reviews is multi-source
              (Google, Yelp, and the platforms our customers actually use).
            </p>
            <p>
              Why W-2 only matters: when the technician on your driveway is a
              Berne employee with a paycheck on the line, the diagnostic is
              honest, the repair is the right repair, and the truck is stocked
              before it leaves the office. When it&apos;s a same-day
              subcontractor, none of that is structurally true. We made the
              expensive operational call early — payroll, benefits, training
              budget, fleet — because nothing else gets you the consistency
              the work demands.
            </p>
            <p>
              The Berne family runs three coordinated brands. The general
              residential operation is{" "}
              <a
                href="https://bernerepair.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Appliance Repair
              </a>
              {" "}— the consumer-facing site where most service calls land.
              This site,{" "}
              <span className="text-foreground">berne-repair.com</span>, is the
              premium tier — Sub-Zero columns, Wolf dual-fuel, Miele built-ins,
              the high-end Sunny Isles / Bal Harbour / Fisher Island
              households where the appliance install was a custom kitchen
              build-out. Commercial kitchens, restaurant equipment, hotels,
              and property-managed buildings dispatch through{" "}
              <a
                href="https://www.berne-commercial.com/"
                rel="noopener"
                className="text-brand hover:underline"
              >
                Berne Commercial Repair
              </a>
              . Same training standard. Same accountability. The{" "}
              <Link href="/family" className="text-brand hover:underline">
                family page
              </Link>{" "}
              has the long version.
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
              complete continuous training through MSA World coursework and
              OEM (Sub-Zero, Wolf, Miele, LG, Samsung, GE) certification
              updates &mdash; so the truck arriving at your home is equipped
              to service the appliance you actually own, not a five-year-old
              spec sheet.
            </p>
            <p>
              Where we are going: another six to eight technicians joining the
              fleet over the next 18 months. A widening commercial footprint
              through the sister brand. And — the part that does not change —
              every escalation call still routes to me personally. That is the
              operating standard.
              That is what {COMPANY.socialProof.repairsCompleted} services has
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
            >
              <Users className="size-4 text-brand" aria-hidden />
              Meet the {COMPANY.socialProof.technicians} techs
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container-prose py-16 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">By the numbers</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What Berne Appliance Repair looks like today.
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
              label="Flat diagnostic"
              sub="Free if you say go ahead with the repair"
            />
            <Stat
              icon={<Clock3 className="size-5 text-brand" aria-hidden />}
              value="Same-day"
              label="Dispatch standard"
              sub="Open 7 days · 7 AM – 9 PM"
            />
            <Stat
              icon={<ShieldCheck className="size-5 text-brand" aria-hidden />}
              value="10-yr parts"
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
              Berne Appliance Repair dispatches across all of Miami-Dade, Broward and
              Palm Beach counties — from Homestead in the south to Jupiter in
              the north. Priority neighborhoods include Bal Harbour, Sunny
              Isles, Fisher Island, Key Biscayne, Coral Gables, Pinecrest,
              Aventura, Hollywood, Fort Lauderdale, Boca Raton, Delray Beach
              and West Palm Beach.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/areas"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                <MapPin className="size-4 text-brand" aria-hidden />
                See all cities
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] px-5 py-3 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
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
