import type { Metadata } from "next";
import Link from "next/link";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Credenciales — Licenciados, asegurados y EPA certificados · Berne Repair",
  description:
    "Documentación verificable de Berne Repair: licencia de técnico de Florida, certificación EPA Section 608 (16-8019803514-2), Certificado de Seguro (COI) y registro DBA.",
  alternates: {
    canonical: "/es/credentials",
    languages: {
      "en-US": absoluteUrl("/credentials"),
      "es-US": absoluteUrl("/es/credentials"),
      "x-default": absoluteUrl("/credentials"),
    },
  },
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
            Berne Repair es un vendor de reparación de electrodomésticos
            licenciado y asegurado en Florida. Certificado EPA Section 608
            (trabajo con refrigerante). COI y registro DBA en archivo. Abajo:
            los cuatro documentos que enviamos a property managers, operaciones
            hoteleras y equipos de procurement de cadenas cuando los solicitan.
          </p>
        </div>
      </section>

      <CredentialsSection locale="es" />

      <CTABand />

      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
