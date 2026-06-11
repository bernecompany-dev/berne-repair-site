import type { Metadata } from "next";
import Link from "next/link";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute — the layout template would append " · Berne Appliance Repair"
  // a second time on top of the brand already in the string.
  title: { absolute: "Licensed & Insured — COI, EPA 608 · Berne Appliance Repair" },
  description:
    "Berne Appliance Repair vendor paperwork: FL technician license, EPA Section 608 cert (16-8019803514-2), COI, DBA, FL Workers' Comp exemption, FL resale certificate, IRS EIN (CP 575), and W-9 — all downloadable.",
  alternates: {
    canonical: "/credentials",
    languages: {
      "en-US": absoluteUrl("/credentials"),
      "es-US": absoluteUrl("/es/credentials"),
      "x-default": absoluteUrl("/credentials"),
    },
  },
};

export default function CredentialsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Credentials", href: "/credentials" },
  ];

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-prose pt-14 pb-10 sm:pt-20 sm:pb-12">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Credentials</span>
          </nav>
          <h1 className="heading-hero max-w-4xl">
            Credentials, paperwork, and proof of insurance.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Berne Appliance Repair is a licensed and insured Florida appliance repair
            vendor. EPA Section 608 certified (refrigerant work). Member of{" "}
            <a
              href="https://msaworld.com/"
              target="_blank"
              rel="noopener noreferrer external"
              className="text-brand hover:underline"
            >
              MSA World
            </a>
            {" "}(Marcone Servicers Association) with continuous training on
            emerging appliance technology. Below: the full document set we
            send to property managers, hotel ops, and chain procurement teams
            &mdash; certificate of insurance, FL DBPR technician license, EPA
            Section 608 cert, DBA filing, FL Workers&apos; Comp exemption, FL
            resale certificate, IRS EIN assignment letter, and a current W-9.
            Background checks for individual technicians are available on
            request to onboarding teams.
          </p>
        </div>
      </section>

      <CredentialsSection />

      <CTABand bookHref="/#lead-form" />

      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
