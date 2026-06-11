import { FileText, ShieldCheck, Award, Stamp, Building2, Receipt, FileSignature, ShieldHalf, Network, GraduationCap } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Credentials trust section — surfaces the full set of documented vendor
 * paperwork on home + /about + /credentials. Files live under
 * /public/credentials/ — keep names in sync with the schema in lib/seo.ts
 * (organization hasCredential[]).
 *
 * Adapted from berne-commercial's components/credentials-section.tsx
 * (different design tokens, so this is a clean reimplementation matching
 * the berne-repair dark-navy/brand theme rather than the commercial one).
 */
export function CredentialsSection({ locale = "en" }: { locale?: Locale }) {
  const isEs = locale === "es";
  const eyebrow = isEs ? "Documentos verificables" : "Verifiable paperwork";
  const title = isEs
    ? "Licenciados, asegurados y documentados."
    : "Licensed, insured, and documented.";
  const description = isEs
    ? "Todos los documentos vendor en archivo. Adjuntamos un COI con su propiedad como additional insured a solicitud."
    : "All vendor paperwork on file. We attach a COI naming your property as additional insured on request.";

  const credentials = isEs
    ? [
        {
          icon: ShieldCheck,
          title: "Certificado de seguro (COI)",
          body: "Cobertura de responsabilidad general en archivo. Proveemos un COI nombrando a su propiedad o cadena como additional insured a solicitud.",
          file: "/credentials/coi.pdf",
          fileLabel: "Ver COI (PDF)",
        },
        {
          icon: Award,
          title: "Certificación EPA Section 608",
          body: "Certificación federal del equipo para manejar refrigerantes (cert # 16-8019803514-2). Requerido para todo trabajo en sistemas sellados de refrigeración.",
          file: "/credentials/epa-certificate.pdf",
          fileLabel: "Ver certificado EPA (PDF)",
        },
        {
          icon: FileText,
          title: "Licencia de técnico (FL DBPR)",
          body: "Técnico senior con licencia del Florida Department of Business and Professional Regulation. Documentación adicional disponible a solicitud.",
          file: "/credentials/technician-license.jpg",
          fileLabel: "Ver licencia",
        },
        {
          icon: Stamp,
          title: "DBA · Berne Appliance Repair",
          body: "Entidad de negocio registrada. Facturamos y firmamos contratos como vendor legítimo de Florida.",
          file: "/credentials/dba-berne-appliance-repair.pdf",
          fileLabel: "Ver DBA (PDF)",
        },
        {
          icon: ShieldHalf,
          title: "Exención FL Workers' Comp",
          body: "Exención oficial de compensación laboral del estado de Florida en archivo. Asegura cumplimiento al contratar con propiedades comerciales.",
          file: "/credentials/wc-exemption.pdf",
          fileLabel: "Ver exención WC (PDF)",
        },
        {
          icon: Receipt,
          title: "Certificado de reventa FL",
          body: "Florida Annual Resale Certificate for Sales Tax. Permite la compra de partes y materiales libres de impuesto sobre ventas para trabajos facturables.",
          file: "/credentials/florida-resale-certificate.pdf",
          fileLabel: "Ver certificado de reventa (PDF)",
        },
        {
          icon: Building2,
          title: "Asignación IRS EIN (CP 575)",
          body: "Carta oficial del IRS confirmando el número de identificación del empleador. Solicitada por equipos de procurement corporativos.",
          file: "/credentials/ein-cp575.pdf",
          fileLabel: "Ver carta EIN (PDF)",
        },
        {
          icon: FileSignature,
          title: "IRS W-9",
          body: "Formulario W-9 firmado y vigente — listo para enviar a su departamento de cuentas por pagar.",
          file: "/credentials/w9.pdf",
          fileLabel: "Ver W-9 (PDF)",
        },
        {
          icon: Network,
          title: "Miembro de MSA World",
          body: "Miembro de Marcone Servicers Association (MSA), la principal asociación industrial de contratistas de servicio de electrodomésticos en Norteamérica.",
          file: "https://msaworld.com/",
          fileLabel: "Visitar MSA World",
        },
        {
          icon: GraduationCap,
          title: "Capacitación continua del fabricante",
          body: "Nuestros técnicos completan capacitación continua sobre tecnología emergente de electrodomésticos a través de cursos de MSA World y actualizaciones OEM (Sub-Zero, Wolf, Miele, LG, Samsung, GE).",
          file: "https://msaworld.com/",
          fileLabel: "Programa MSA",
        },
      ]
    : [
        {
          icon: ShieldCheck,
          title: "Certificate of Insurance",
          body: "General liability coverage on file. We provide a COI naming your property or chain as additional insured on request.",
          file: "/credentials/coi.pdf",
          fileLabel: "View COI (PDF)",
        },
        {
          icon: Award,
          title: "EPA Section 608 Certification",
          body: "Federal certification for handling refrigerants in sealed systems (cert # 16-8019803514-2). Required for all refrigeration work.",
          file: "/credentials/epa-certificate.pdf",
          fileLabel: "View EPA certificate (PDF)",
        },
        {
          icon: FileText,
          title: "Florida Technician License",
          body: "Licensed by the Florida Department of Business and Professional Regulation. Additional per-technician documentation available on request.",
          file: "/credentials/technician-license.jpg",
          fileLabel: "View license",
        },
        {
          icon: Stamp,
          title: "DBA · Berne Appliance Repair",
          body: "Registered business entity. We invoice and contract as a legitimate Florida service vendor.",
          file: "/credentials/dba-berne-appliance-repair.pdf",
          fileLabel: "View DBA filing (PDF)",
        },
        {
          icon: ShieldHalf,
          title: "FL Workers' Comp Exemption",
          body: "State of Florida workers' compensation exemption on file. Cleared for commercial property and hospitality vendor onboarding.",
          file: "/credentials/wc-exemption.pdf",
          fileLabel: "View WC exemption (PDF)",
        },
        {
          icon: Receipt,
          title: "Florida Resale Certificate",
          body: "Florida Annual Resale Certificate for Sales Tax. Lets us purchase parts and materials tax-exempt for billable repairs.",
          file: "/credentials/florida-resale-certificate.pdf",
          fileLabel: "View resale cert (PDF)",
        },
        {
          icon: Building2,
          title: "IRS EIN Assignment (CP 575)",
          body: "Official IRS letter confirming our Employer Identification Number. Commonly requested by corporate procurement teams.",
          file: "/credentials/ein-cp575.pdf",
          fileLabel: "View EIN letter (PDF)",
        },
        {
          icon: FileSignature,
          title: "IRS Form W-9",
          body: "Signed, current W-9 — ready to drop into your accounts-payable workflow.",
          file: "/credentials/w9.pdf",
          fileLabel: "View W-9 (PDF)",
        },
        {
          icon: Network,
          title: "MSA World Member",
          body: "Member of Marcone Servicers Association (MSA), the leading industry association for appliance service contractors in North America. Verifiable industry affiliation.",
          file: "https://msaworld.com/",
          fileLabel: "Visit MSA World",
        },
        {
          icon: GraduationCap,
          title: "Continuous Manufacturer Training",
          body: "Our technicians complete ongoing training on emerging appliance technology through MSA World coursework and OEM programs (Sub-Zero, Wolf, Miele, LG, Samsung, GE).",
          file: "https://msaworld.com/",
          fileLabel: "MSA training program",
        },
      ];

  return (
    <section
      id="credentials"
      className="border-y border-border/60 bg-gradient-to-b from-transparent via-card/30 to-transparent"
      aria-labelledby="credentials-heading"
    >
      <div className="container-prose py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2
            id="credentials-heading"
            className="heading-section mt-3"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {credentials.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-background/40 p-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-tint/[0.04] text-brand">
                <c.icon className="size-5" aria-hidden />
              </span>
              <div className="text-sm font-semibold text-foreground">
                {c.title}
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <a
                href={c.file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline"
              >
                {c.fileLabel} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
