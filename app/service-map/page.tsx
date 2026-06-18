import type { Metadata } from "next";
import Link from "next/link";
import { ServiceMap } from "@/components/sections/service-map";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Service Map — Where We've Worked";
const PAGE_DESCRIPTION =
  "An interactive map of completed appliance repairs from the Miami metro to Tampa Bay and Sarasota — thousands of service calls across hundreds of Florida cities, shown at the neighborhood level for customer privacy.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/service-map",
    languages: {
      "en-US": absoluteUrl("/service-map"),
      "x-default": absoluteUrl("/service-map"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/service-map" }),
};

export default function ServiceMapPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Map", href: "/service-map" },
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
            <span className="text-foreground/80">Service Map</span>
          </nav>
          <span className="eyebrow">Coverage</span>
          <h1 className="heading-hero mt-3 max-w-4xl">
            Where Berne has been working.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every completed appliance repair, mapped — from the Miami metro up
            through Palm Beach and across to Tampa Bay and Sarasota. Locations
            are approximated to the neighborhood level for customer privacy: the
            map shows how many places we&apos;ve serviced and where, not whose
            home.
          </p>
        </div>
      </section>

      <ServiceMap />

      <Contact />

      <CTABand />

      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
