import type { Metadata } from "next";
import Link from "next/link";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Credentials — Licensed, Insured & EPA Certified · Berne Repair",
  description:
    "Berne Repair vendor paperwork: Florida technician license, EPA Section 608 certification (16-8019803514-2), Certificate of Insurance (COI), and DBA registration.",
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
            Berne Repair is a licensed and insured Florida appliance repair
            vendor. EPA Section 608 certified (refrigerant work). COI and DBA
            registration on file. Below: the four documents we send to
            property managers, hotel ops, and chain procurement teams when
            asked.
          </p>
        </div>
      </section>

      <CredentialsSection />

      <CTABand />

      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
