import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Gem } from "lucide-react";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const TITLE = "Resources — Luxury Appliance Repair Guides";
const DESCRIPTION =
  "Reference guides for high-end appliance owners in South Florida — repair-cost ranges, repair-vs-replace tools, and brand-specific know-how from a factory-trained, EPA 608 service desk.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/resources",
    languages: {
      "en-US": absoluteUrl("/resources"),
      "es-US": absoluteUrl("/es/resources"),
      "x-default": absoluteUrl("/resources"),
    },
  },
  openGraph: pageOpenGraph({ title: TITLE, description: DESCRIPTION, path: "/resources" }),
};

const RESOURCES = [
  {
    href: "/resources/luxury-appliance-repair-cost-guide",
    title: "Luxury Appliance Repair & Care Cost Guide",
    blurb:
      "Repair-cost ranges by category and failure, a repair-vs-replace calculator, and diagnostic benchmarks for Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau & Liebherr.",
  },
];

export default function ResourcesIndex() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
  ];

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
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Resources</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <BookOpen className="size-3.5" aria-hidden />
            Reference guides
          </span>
          <h1 className="heading-hero mt-6 max-w-3xl">
            Guides for high-end{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              appliance owners.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {DESCRIPTION}
          </p>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        <ul className="grid gap-4 sm:grid-cols-2">
          {RESOURCES.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <Gem className="size-5 text-brand" aria-hidden />
                <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-brand">
                  {r.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                  Open the guide
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Contact />
      <CTABand />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
