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
import { faqJsonLd, imageGalleryJsonLd, absoluteUrl } from "@/lib/seo";
import { GENERAL_FAQS } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "en-US": absoluteUrl("/"),
      "es-US": absoluteUrl("/es"),
      "x-default": absoluteUrl("/"),
    },
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ServicesGrid />
      <ProcessSteps />
      <WhyUs />
      <Areas />
      <Brands />
      <TeamSection />
      <Reviews />
      <Commercial />
      <FAQSection faqs={GENERAL_FAQS} />
      <Contact />
      <CTABand />
      <JsonLd data={[faqJsonLd(GENERAL_FAQS), imageGalleryJsonLd()]} />
    </>
  );
}
