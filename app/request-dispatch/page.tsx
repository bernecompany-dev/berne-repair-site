import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock3, Wrench, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute — the layout template would append " · Berne Appliance Repair"
  // a second time on top of the brand already in the string.
  title: { absolute: "Request Dispatch — Berne Appliance Repair · Same-Day Service" },
  description: `Request same-day appliance dispatch in South Florida. $${COMPANY.serviceCallPrice} service call. ${COMPANY.socialProof.technicians} licensed technicians. Sub-Zero, Wolf, Viking, Bosch and every major brand.`,
  alternates: {
    canonical: "/request-dispatch",
    languages: {
      "en-US": absoluteUrl("/request-dispatch"),
      "es-US": absoluteUrl("/es/request-dispatch"),
      "x-default": absoluteUrl("/request-dispatch"),
    },
  },
  openGraph: {
    title: "Request Dispatch — Berne Appliance Repair · Same-Day Service",
    description: `Request same-day appliance dispatch in South Florida. $${COMPANY.serviceCallPrice} service call. Licensed & insured.`,
    url: absoluteUrl("/request-dispatch"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

const requestDispatchSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Request Dispatch — Berne Appliance Repair",
  "url": absoluteUrl("/request-dispatch"),
  "mainEntity": {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    "name": COMPANY.legalName,
    "telephone": COMPANY.phone.tel,
    "email": COMPANY.email.public,
    "url": COMPANY.url,
    "areaServed": COMPANY.address.serviceArea,
    "openingHours": "Mo-Su 08:00-21:00",
    "potentialAction": {
      "@type": "ReserveAction",
      "name": "Request appliance repair dispatch",
      "target": absoluteUrl("/request-dispatch#lead-form"),
    },
  },
};

export default function RequestDispatchPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Request dispatch</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Wrench className="size-3.5" aria-hidden />
              Same-day dispatch
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden />
              ${COMPANY.serviceCallPrice} service call
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Licensed &amp; insured
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-3xl">
            Request{" "}
            <span className="bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              service dispatch.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Tell us what&apos;s broken and where you are — we&apos;ll call back with a
            slot within minutes during open hours. Sub-Zero, Wolf, Viking, Thermador,
            Miele, Bosch and every major residential brand.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY.phone.tel}`}
              data-analytics="cta-call"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-brand-foreground shadow-[0_0_0_1px_oklch(1_0_0/0.08),0_10px_30px_-10px_var(--brand-glow)] hover:-translate-y-px hover:brightness-110"
            >
              <Phone className="size-4" aria-hidden />
              <span>Or call {COMPANY.phone.display}</span>
            </a>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4 text-brand" aria-hidden />
              {COMPANY.hours.label}
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-prose py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              How dispatch works
            </h2>
            <ol className="mt-6 space-y-5">
              <li className="flex gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                  1
                </span>
                <div>
                  <div className="font-semibold text-foreground">
                    You submit the form (or call)
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Three minutes, two required fields. SMS works too — text the
                    same number.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                  2
                </span>
                <div>
                  <div className="font-semibold text-foreground">
                    Dispatch calls back
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Same-day if you&apos;re reaching out before noon. Otherwise next
                    morning. A real human, not a chatbot.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                  3
                </span>
                <div>
                  <div className="font-semibold text-foreground">
                    Technician arrives, ${COMPANY.serviceCallPrice} diagnostic
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Applied toward the repair if you say go. {COMPANY.socialProof.warranty}.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-8 rounded-2xl border border-border bg-card/40 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                Brand &amp; warranty
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {COMPANY.socialProof.technicians} licensed technicians.{" "}
                {COMPANY.socialProof.warranty} on parts and labor. Independent —
                not an authorized service center for any manufacturer.
              </p>
            </div>
          </div>

          <div id="lead-form">
            <LeadForm />
          </div>
        </div>
      </section>

      <JsonLd data={requestDispatchSchema} />
    </>
  );
}
