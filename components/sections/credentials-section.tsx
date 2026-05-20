import { FileText, ShieldCheck, Award, Stamp } from "lucide-react";
import type { Locale } from "@/lib/i18n";

/**
 * Credentials trust section — surfaces the documented vendor paperwork
 * (license, COI, EPA 608, DBA) on home + /about. Files live under
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
          icon: Stamp,
          title: "DBA · Berne Appliance Repair",
          body: "Entidad de negocio registrada. Facturamos y firmamos contratos como vendor legítimo de Florida.",
          file: "/credentials/dba-berne-appliance-repair.pdf",
          fileLabel: "Ver DBA (PDF)",
        },
        {
          icon: Award,
          title: "Certificación EPA Section 608",
          body: "Certificación federal requerida para manejar refrigerantes en sistemas comerciales. Nuestro equipo de refrigeración está certificado.",
          file: "/credentials/epa-certificate.pdf",
          fileLabel: "Ver certificado EPA (PDF)",
        },
        {
          icon: FileText,
          title: "Licencia de técnico",
          body: "Técnico senior con licencia en el equipo — documentación adicional disponible a solicitud.",
          file: "/credentials/technician-license.jpg",
          fileLabel: "Ver licencia",
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
          icon: Stamp,
          title: "DBA · Berne Appliance Repair",
          body: "Registered business entity. We invoice and contract as a legitimate Florida service vendor.",
          file: "/credentials/dba-berne-appliance-repair.pdf",
          fileLabel: "View DBA filing (PDF)",
        },
        {
          icon: Award,
          title: "EPA Section 608 Certification",
          body: "Required federal certification for handling refrigerants in sealed systems. Our refrigeration technicians are certified (cert # 16-8019803514-2).",
          file: "/credentials/epa-certificate.pdf",
          fileLabel: "View EPA certificate (PDF)",
        },
        {
          icon: FileText,
          title: "Technician License",
          body: "Licensed senior technician on the team — additional licensing documentation available on request.",
          file: "/credentials/technician-license.jpg",
          fileLabel: "View license",
        },
      ];

  return (
    <section
      id="credentials"
      className="border-y border-border/60 bg-gradient-to-b from-transparent via-card/30 to-transparent"
      aria-labelledby="credentials-heading"
    >
      <div className="container-prose py-20 sm:py-24">
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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-background/40 p-6"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-white/[0.04] text-brand">
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
