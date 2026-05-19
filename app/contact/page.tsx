import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Berne Repair — Premium Appliance Service",
  description: `Reach Berne Repair dispatch for premium appliance service across South Florida. ${COMPANY.phone.display} · ${COMPANY.hours.label}. Same-day service. Licensed & insured.`,
  alternates: {
    canonical: "/contact",
    languages: {
      "en-US": absoluteUrl("/contact"),
      "x-default": absoluteUrl("/contact"),
    },
  },
  openGraph: {
    title: "Contact Berne Repair — Premium Appliance Service",
    description:
      "Reach Berne Repair dispatch for premium appliance service across South Florida.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Berne Repair",
  "url": absoluteUrl("/contact"),
  "mainEntity": {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    "name": COMPANY.legalName,
    "telephone": COMPANY.phone.tel,
    "email": COMPANY.email.public,
    "url": COMPANY.url,
    "areaServed": COMPANY.address.serviceArea,
    "openingHours": "Mo-Su 08:00-21:00",
  },
};

export default function ContactPage() {
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
            <span className="text-foreground/80">Contact</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <ShieldCheck className="size-3.5" aria-hidden />
            Licensed & insured · {COMPANY.socialProof.warranty}
          </span>

          <h1 className="heading-hero mt-6 max-w-3xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Berne Repair.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Premium appliance service across Miami-Dade, Broward, and Palm Beach.
            Talk to a real dispatcher — no call centers, no answering services.
          </p>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="container-prose py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">How to reach us</h2>
            <p className="mt-3 text-muted-foreground">
              We answer the phone seven days a week. Call before noon and same-day is
              usually on the table.
            </p>

            <ul className="mt-8 space-y-4 text-base">
              <li className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Phone &amp; SMS
                  </div>
                  <a
                    href={`tel:${COMPANY.phone.tel}`}
                    className="font-semibold text-foreground hover:text-brand"
                  >
                    {COMPANY.phone.display}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Email
                  </div>
                  <a
                    href={`mailto:${COMPANY.email.public}`}
                    className="font-semibold text-foreground hover:text-brand"
                  >
                    {COMPANY.email.public}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Clock3 className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Hours
                  </div>
                  <div className="font-semibold text-foreground">
                    {COMPANY.hours.label}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Service area
                  </div>
                  <div className="font-semibold text-foreground">
                    Miami-Dade · Broward · Palm Beach
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-card/40 p-5">
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Need it faster than the form?
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For emergency outages or same-day dispatch, calling is the fastest path.
                A dispatcher answers — not an auto-attendant.
              </p>
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110"
              >
                <Phone className="size-4" aria-hidden />
                Call {COMPANY.phone.display}
              </a>
            </div>
          </div>

          <div id="lead-form">
            <LeadForm />
          </div>
        </div>
      </section>

      <JsonLd data={contactPageSchema} />
    </>
  );
}
