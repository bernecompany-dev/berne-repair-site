import type { Metadata } from "next";
import {
  LuxuryCostGuidePage,
  COST_GUIDE_SLUG,
} from "@/components/site/luxury-cost-guide-page";
import { absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PATH = `/${COST_GUIDE_SLUG}`;
const TITLE = "Luxury Appliance Repair Cost Guide | Sub-Zero, Wolf, Miele";
const DESCRIPTION =
  "Real repair-cost ranges, common failures & a repair-vs-replace calculator for built-in luxury appliances — Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau. Factory-trained, EPA 608.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
    languages: {
      "en-US": absoluteUrl(PATH),
      "es-US": absoluteUrl(`/es${PATH}`),
      "x-default": absoluteUrl(PATH),
    },
  },
  openGraph: pageOpenGraph({ title: TITLE, description: DESCRIPTION, path: PATH }),
};

export default function Page() {
  return <LuxuryCostGuidePage locale="en" />;
}
