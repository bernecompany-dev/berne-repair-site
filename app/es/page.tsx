import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyUs } from "@/components/sections/why-us";
import { Areas } from "@/components/sections/areas";
import { Brands } from "@/components/sections/brands";
import { Reviews } from "@/components/sections/reviews";
import { TeamSection } from "@/components/sections/team";
import { Commercial } from "@/components/sections/commercial";
import { CTABand } from "@/components/sections/cta-band";
import { FAQSection } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/site/json-ld";
import { faqJsonLd, imageGalleryJsonLd, founderJsonLd, absoluteUrl } from "@/lib/seo";
import { GENERAL_FAQS_ES } from "@/data/faqs";
import { getDictionary } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: getDictionary("es").meta.homeTitle,
  description: getDictionary("es").meta.homeDescription,
  alternates: {
    canonical: "/es",
    languages: {
      "en-US": absoluteUrl("/"),
      "es-US": absoluteUrl("/es"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    title: getDictionary("es").meta.homeTitle,
    description: getDictionary("es").meta.homeDescription,
    url: absoluteUrl("/es"),
    type: "website",
    locale: "es_US",
  },
};

export default function HomeES() {
  return (
    <>
      <Hero locale="es" />
      <StatsStrip locale="es" />
      <ServicesGrid />
      <ProcessSteps locale="es" />
      <WhyUs locale="es" />
      <Areas />
      <Brands />
      <TeamSection />
      <Reviews />
      <Commercial />
      <FAQSection faqs={GENERAL_FAQS_ES} />
      <Contact locale="es" />
      <CTABand locale="es" />
      <JsonLd data={[faqJsonLd(GENERAL_FAQS_ES, "es"), imageGalleryJsonLd(), founderJsonLd()]} />
    </>
  );
}
