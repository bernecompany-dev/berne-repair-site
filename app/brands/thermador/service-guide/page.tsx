import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { CTARow } from "@/components/site/cta-row";
import { StatsStrip } from "@/components/sections/stats-strip";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY, REPAIRS_COMPLETED } from "@/data/company";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd, DEFAULT_OG_IMAGE } from "@/lib/seo";

/**
 * /brands/thermador/service-guide — answer-first guide for the mixed-intent
 * "thermador customer service" query (1.6K/KD3, content audit 2026-06-10).
 * Honest editorial: leads with the OFFICIAL Thermador/BSH support channels,
 * then lays out when factory service vs an independent South Florida shop is
 * the right call. No clickbait, no bait-and-switch — the official answer
 * comes first because that's what half the searchers want.
 */

const PATH = "/brands/thermador/service-guide";
const TITLE = "Thermador Customer Service — Numbers & Faster Local Help";
const DESC =
  "Official Thermador customer service contacts (phone, scheduling, warranty) — and when an independent South Florida technician is the faster, cheaper call.";

export const metadata: Metadata = {
  // Absolute — hand-budgeted ≤60 chars; the layout suffix would push it
  // past SERP truncation.
  title: { absolute: TITLE },
  description: DESC,
  alternates: {
    canonical: PATH,
    languages: {
      "en-US": absoluteUrl(PATH),
      "x-default": absoluteUrl(PATH),
    },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: absoluteUrl(PATH),
    type: "article",
    images: [DEFAULT_OG_IMAGE],
  },
};

const OFFICIAL_CHANNELS = [
  {
    label: "Thermador Customer Support (phone)",
    value: "1-800-735-4328",
    detail:
      "The main line for service scheduling, warranty questions, registration, and parts. Staffed weekday business hours (Eastern). Expect to provide your model and serial number — photograph the rating plate before you call.",
  },
  {
    label: "Online service scheduling",
    value: "thermador.com → Owner Support → Service",
    detail:
      "Thermador's site books factory-network service visits online and shows availability up front — often the fastest way to see the real wait time in your zip code before committing.",
  },
  {
    label: "Product registration & warranty",
    value: "MyThermador account",
    detail:
      "Registering your appliance establishes the warranty record and speeds up any service call. Warranty terms vary by product and purchase date — typically two years on most products, longer on specific components. Confirm your exact terms here.",
  },
  {
    label: "Manuals, error codes & parts diagrams",
    value: "thermador.com → Owner Support",
    detail:
      "Use-and-care manuals and installation guides by model number, free. For genuine parts, Thermador routes through BSH's parts channel — independent shops like ours buy from the same pipeline.",
  },
];

const FAQS = [
  {
    question: "What is Thermador's customer service phone number?",
    answer:
      "Thermador customer support is 1-800-735-4328, staffed weekday business hours (Eastern). It handles service scheduling, warranty claims, registration, and parts questions. Have your model and serial number ready — they're on the rating plate, and the call goes much faster with them in hand.",
  },
  {
    question: "Is my Thermador repair covered under warranty?",
    answer:
      "Thermador's limited warranty typically runs two years on most products (with longer coverage on specific components), but terms vary by product line and purchase date. Check your MyThermador registration or your purchase paperwork. If you're inside warranty, use the official channel — an independent repair can complicate a warranty claim on the repaired component.",
  },
  {
    question: "How long does Thermador factory service take to schedule in South Florida?",
    answer:
      "It varies with season and zip code — sometimes days, sometimes a few weeks, and summer (peak appliance-failure season here) trends longer. The online scheduler shows real availability for your address, which is worth checking before you decide. Independent shops typically run same-day to 48 hours in the same area.",
  },
  {
    question: "Will using an independent technician void my Thermador warranty?",
    answer:
      "An independent repair doesn't void the warranty on the whole appliance, but the manufacturer can decline warranty coverage on parts or failures connected to non-factory work. That's why our honest advice is: in warranty, use the official channel; out of warranty, independence costs less and moves faster — and that's when we should be your call.",
  },
  {
    question: "Are you Thermador's authorized service center?",
    answer:
      "No. Berne Appliance Repair is an independent service company — not affiliated with, endorsed by, or an authorized service center for Thermador or BSH Home Appliances. We publish their official contacts above because half the people searching this phrase need exactly that. The other half have an out-of-warranty unit and a long factory wait — that's who we exist for.",
  },
  {
    question: "What do you charge to look at a Thermador?",
    answer:
      "A $59 diagnostic — credited to the repair when you approve the quote, paid only if you decline. Our techs service Thermador weekly — ranges, wall ovens, Freedom columns, steam ovens, dishwashers — with the BSH-platform diagnostics the brand is built on, a 90-day parts and labor warranty, and priority dispatch across Miami-Dade, Broward, and Palm Beach when scheduling allows.",
  },
];

export default function ThermadorServiceGuidePage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: "Thermador", href: "/brands/thermador" },
    { name: "Customer Service Guide", href: PATH },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": absoluteUrl(`${PATH}#article`),
    headline: "Thermador customer service: official channels and faster local options",
    description: DESC,
    author: { "@type": "Organization", name: COMPANY.legalName },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(PATH) },
    datePublished: "2026-06-11",
    dateModified: "2026-06-11",
    inLanguage: "en-US",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-16 sm:pt-20 sm:pb-20">
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/brands" className="hover:text-foreground">Brands</Link>
            <span aria-hidden>/</span>
            <Link href="/brands/thermador" className="hover:text-foreground">Thermador</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Customer Service Guide</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              Owner&apos;s guide · updated June 2026
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> Independent &amp; honest
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Thermador customer service:
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              the official channels — and the faster ones.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Looking for Thermador&apos;s support number? It&apos;s{" "}
            <strong className="text-foreground">1-800-735-4328</strong> — all the official
            channels are below, no runaround. And if you&apos;re out of warranty or tired of
            waiting on the factory queue in South Florida, we&apos;ll tell you honestly when an
            independent technician is the better call. We&apos;re one, so judge that advice
            accordingly — but we&apos;ve tried to earn it.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      {/* Answer-first: official channels */}
      <section className="container-prose py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">The official answer first</span>
          <h2 className="heading-section mt-3">
            Thermador&apos;s official customer service channels.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Thermador is a BSH Home Appliances brand (alongside Bosch and Gaggenau), and its
            support infrastructure is genuinely good. If your unit is in warranty, start here —
            not with us, not with anyone independent.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {OFFICIAL_CHANNELS.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card/40 p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Phone className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-tight text-foreground">
                    {c.label}
                  </div>
                  <div className="text-sm font-semibold text-brand">{c.value}</div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Tip that saves everyone twenty minutes: photograph the rating plate (model + serial)
          before contacting anyone — Thermador or independent. On ranges it&apos;s usually under
          the control panel or behind the door; on Freedom columns, inside on the wall; on
          dishwashers, the door edge.
        </p>
      </section>

      {/* When official is right */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">Use the factory channel when…</span>
            <h2 className="heading-section mt-3">
              When official Thermador service is the right call.
            </h2>
          </div>
          <ul className="mt-8 grid max-w-3xl gap-4">
            {[
              "Your appliance is under warranty. This is non-negotiable advice: warranty work belongs in the official channel, and an independent repair can complicate coverage on the repaired component. Don't pay anyone — including us — for work Thermador owes you free.",
              "There's an open recall or service campaign on your model. Factory campaigns are handled at no cost through the official network, and they have parts and procedures independents may not see for months.",
              "The unit is brand new and misbehaving from day one. Out-of-box issues are a dealer/manufacturer conversation, not a repair. Document the symptoms and push through the official channel — you may be owed replacement, not repair.",
              "You want the service record inside Thermador's system — some owners value the factory paper trail for resale on very high-end kitchens, and that's a legitimate preference.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card/40 p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                <span className="text-sm leading-relaxed text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* When independent is right */}
      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <span className="eyebrow">And when it isn&apos;t</span>
            <h2 className="heading-section mt-3">
              When an independent South Florida tech is faster and cheaper.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Out of warranty, the math changes. Factory-network scheduling in South Florida
                can run days to weeks depending on season and zip code — summer, when appliances
                here fail hardest, trends longest. Factory-channel pricing reflects the
                overhead it carries. None of that is a criticism; it&apos;s just what a national
                service network costs and how it schedules.
              </p>
              <p>
                An established independent shop covers the same repairs differently: same-day or
                next-day dispatch because the techs are already crossing Miami-Dade, Broward, and
                Palm Beach all day; a $59 diagnostic that is free if you approve the repair; and parts from
                the same BSH pipeline the factory channel uses. Thermador&apos;s engineering
                actually favors independents who know the platform — the error-code structure and
                service diagnostics are systematic, so a tech fluent in BSH products (we service
                Bosch and Gaggenau on the same rotation) diagnoses by the book rather than by
                guesswork.
              </p>
              <p>
                The honest decision rule we give callers: <strong className="text-foreground">in
                warranty → Thermador; out of warranty → whoever you trust that can come
                soonest.</strong> A range down for three weeks costs a family more than the
                price difference between any two shops. If that&apos;s us, the diagnostic is
                $59 and it is free if you approve the repair. If the factory queue is short that week —
                take it, genuinely.
              </p>
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-card/50 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">
              Independent service, the numbers
            </div>
            <ul className="mt-5 grid gap-3 text-sm text-foreground/90">
              <li className="flex items-center gap-2">
                <BadgeDollarSign className="size-4 shrink-0 text-brand" aria-hidden />
                ${COMPANY.serviceCallPrice} diagnostic — credited to repair
              </li>
              <li className="flex items-center gap-2">
                <Clock3 className="size-4 shrink-0 text-brand" aria-hidden />
                Same-day / next-day dispatch, tri-county
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-brand" aria-hidden />
                90-day labor &amp; parts warranty
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-brand" aria-hidden />
                18 techs · {REPAIRS_COMPLETED} repairs · 4.79★ (871 reviews)
              </li>
            </ul>
            <div className="mt-5 grid gap-2">
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground hover:brightness-110"
              >
                Call {COMPANY.phone.display}
              </a>
              <Link
                href="/brands/thermador"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                Our Thermador platform guide
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* What we actually repair */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="eyebrow">If it lands on our bench</span>
            <h2 className="heading-section mt-3">
              The Thermador work our techs run weekly.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The same platform knowledge, from the independent side: Pro Grand and Pro Harmony
              range ignition and oven faults, Freedom column refrigeration (EPA-608 certified
              for the sealed-system work), steam-oven descaling and water-path service in our
              hard-water county, Star-Sapphire dishwasher diagnostics, and the door, hinge, and
              gasket work that keeps a premium kitchen feeling premium. Most common parts ride
              on the truck; the rest typically lands in 2-4 business days through BSH
              distribution.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/brands/thermador"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                Thermador repair — full guide
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services/oven-repair"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                Oven &amp; range repair
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/compare/sub-zero-vs-thermador"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-4 py-2 text-sm font-semibold text-foreground hover:bg-tint/[0.07]"
              >
                Sub-Zero vs Thermador — compared
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsStrip />

      <FAQSection faqs={FAQS} title="Thermador customer service — questions we get" />

      <section className="container-prose pb-4">
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Thermador® is a registered trademark of BSH Home Appliances Corporation. Berne
          Appliance Repair is an independent service company and is not affiliated with,
          endorsed by, sponsored by, or an authorized service center for Thermador or BSH.
          Official contact details above are published for owner convenience and were accurate
          as of June 2026 — verify current numbers and warranty terms at thermador.com.
        </p>
      </section>

      <Contact defaultAppliance="thermador" />
      <CTABand />

      <JsonLd data={[articleJsonLd, faqJsonLd(FAQS), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
