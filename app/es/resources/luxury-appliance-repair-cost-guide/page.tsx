import type { Metadata } from "next";
import {
  LuxuryCostGuidePage,
  COST_GUIDE_SLUG,
} from "@/components/site/luxury-cost-guide-page";
import { absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PATH = `/${COST_GUIDE_SLUG}`;
const TITLE = "Guía de Costos de Reparación de Lujo | Sub-Zero, Wolf, Miele";
const DESCRIPTION =
  "Rangos reales de costo de reparación, fallas comunes y una calculadora de reparar-vs-reemplazar para electrodomésticos empotrados de lujo — Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau. Formados de fábrica, EPA 608.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `/es${PATH}`,
    languages: {
      "en-US": absoluteUrl(PATH),
      "es-US": absoluteUrl(`/es${PATH}`),
      "x-default": absoluteUrl(PATH),
    },
  },
  openGraph: pageOpenGraph({
    title: TITLE,
    description: DESCRIPTION,
    path: `/es${PATH}`,
    locale: "es",
  }),
};

export default function Page() {
  return <LuxuryCostGuidePage locale="es" />;
}
