import type { Metadata } from "next";
import Link from "next/link";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { InlineCta } from "@/components/sections/inline-cta";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = "Licencia y Seguro — COI, EPA 608 · Berne Appliance Repair";
const PAGE_DESCRIPTION = "Documentación de Berne Appliance Repair — licencia FL DBPR, EPA Section 608, COI, DBA, exención Workers' Comp, EIN del IRS y W-9, todo descargable.";

export const metadata: Metadata = {
  // Absolute — brand already in the string; layout template would double it.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/es/credentials",
    languages: {
      "en-US": absoluteUrl("/credentials"),
      "es-US": absoluteUrl("/es/credentials"),
      "x-default": absoluteUrl("/credentials"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/es/credentials", locale: "es" }),
};

export default function CredentialsPageES() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Credenciales", href: "/es/credentials" },
  ];

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-prose pt-14 pb-10 sm:pt-20 sm:pb-12">
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/es" className="hover:text-foreground">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Credenciales</span>
          </nav>
          <h1 className="heading-hero max-w-4xl">
            Credenciales, documentación y prueba de seguro.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Berne Appliance Repair es un vendor de reparación de electrodomésticos
            licenciado y asegurado en Florida. Certificado EPA Section 608
            (trabajo con refrigerante). Abajo: el set completo de documentos
            que enviamos a property managers, operaciones hoteleras y equipos
            de procurement de cadenas &mdash; certificado de seguro, licencia
            de técnico FL DBPR, certificado EPA, registro DBA, exención de
            Workers&apos; Comp de Florida, certificado de reventa FL, carta
            de asignación EIN del IRS y W-9 vigente. Verificaciones de
            antecedentes por técnico disponibles a solicitud para equipos
            de onboarding.
          </p>
        </div>
      </section>

      <CredentialsSection locale="es" />

      {/* Conversion exit for the PM/procurement audience — mirrors the EN
          /credentials block (lead review 06-11). */}
      <section className="container-prose pt-12 sm:pt-16">
        <InlineCta
          locale="es"
          title="¿Necesita un vendor con estas credenciales en archivo?"
          body={`Adjuntamos el COI y el certificado EPA 608 a su confirmación de servicio — listos para su equipo de cuentas por pagar y onboarding. Despacho el mismo día, visita de $${COMPANY.serviceCallPrice} gratuita si aprueba la reparación.`}
        />
      </section>

      <Contact locale="es" />

      <CTABand locale="es" />

      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
