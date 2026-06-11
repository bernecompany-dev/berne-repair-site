import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock3, Wrench, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

// Absolute title: the brand is already in the string — the layout template was
// appending " · Berne Appliance Repair" a second time (102ch, double brand).
const TITLE = "Reserve su visita — Berne Appliance Repair · Servicio mismo día";
const DESC = `Solicite despacho el mismo día en el sur de Florida. Visita técnica $${COMPANY.serviceCallPrice}, ${COMPANY.socialProof.technicians} técnicos con licencia, garantía de 90 días. Todas las marcas principales.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: {
    canonical: "/es/request-dispatch",
    languages: {
      "en-US": absoluteUrl("/request-dispatch"),
      "es-US": absoluteUrl("/es/request-dispatch"),
      "x-default": absoluteUrl("/request-dispatch"),
    },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: absoluteUrl("/es/request-dispatch"),
    type: "website",
    locale: "es_US",
    images: [DEFAULT_OG_IMAGE],
  },
};

const requestDispatchSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Reserve su visita de reparación — Berne Appliance Repair",
  "url": absoluteUrl("/es/request-dispatch"),
  "inLanguage": "es-US",
  "mainEntity": {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    "name": COMPANY.legalName,
    "telephone": COMPANY.phone.tel,
    "email": COMPANY.email.public,
    "url": COMPANY.url,
    "areaServed": COMPANY.address.serviceArea,
    "openingHours": "Mo-Su 07:00-21:00",
    "potentialAction": {
      "@type": "ReserveAction",
      "name": "Solicitar despacho de reparación de electrodomésticos",
      "target": absoluteUrl("/es/request-dispatch#lead-form"),
    },
  },
};

export default function RequestDispatchPageES() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/es" className="hover:text-foreground">Inicio</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Solicitar despacho</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Wrench className="size-3.5" aria-hidden />
              Despacho el mismo día
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden />
              Visita técnica ${COMPANY.serviceCallPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Con licencia y asegurados
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-3xl">
            Reserve su{" "}
            <span className="bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              visita de reparación.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Cuéntenos qué se dañó y dónde está usted — le devolvemos la llamada
            con un horario en minutos durante el horario de atención. Sub-Zero,
            Wolf, Viking, Thermador, Miele, Bosch y todas las marcas residenciales
            principales.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {COMPANY.phones.map((p, i) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                data-analytics={i === 0 ? "cta-call-primary" : "cta-call-regional"}
                className={
                  i === 0
                    ? "inline-flex h-12 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-brand-foreground shadow-[0_0_0_1px_oklch(1_0_0/0.08),0_10px_30px_-10px_var(--brand-glow)] hover:-translate-y-px hover:brightness-110"
                    : "inline-flex h-12 items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-5 text-[15px] font-semibold text-foreground hover:bg-tint/[0.07]"
                }
              >
                <Phone className="size-4" aria-hidden />
                <span>{p.display}</span>
                <span className="text-xs text-muted-foreground">· {p.label}</span>
              </a>
            ))}
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4 text-brand" aria-hidden />
              {COMPANY.hours.label}
            </span>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-prose py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Formulario primero en móvil (landing de anuncios). */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Cómo funciona el despacho
            </h2>
            <ol className="mt-6 space-y-5">
              <li className="flex gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                  1
                </span>
                <div>
                  <div className="font-semibold text-foreground">
                    Usted envía el formulario (o llama)
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Nombre y teléfono — nada más. El SMS también funciona —
                    envíe un texto al mismo número.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                  2
                </span>
                <div>
                  <div className="font-semibold text-foreground">
                    Despacho le devuelve la llamada
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Mismo día si llama antes del mediodía. De lo contrario, la
                    próxima mañana. Una persona real, no un chatbot.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                  3
                </span>
                <div>
                  <div className="font-semibold text-foreground">
                    Llega el técnico, diagnóstico de ${COMPANY.serviceCallPrice}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aplicado a la reparación si nos da luz verde. Garantía de
                    90 días en piezas y mano de obra.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-8 rounded-2xl border border-border bg-card/40 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                Marca y garantía
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {COMPANY.socialProof.technicians} técnicos con licencia.
                Garantía de 90 días en piezas y mano de obra. Independiente —
                no somos un centro de servicio autorizado de ningún fabricante.
              </p>
            </div>
          </div>

          <div id="lead-form" className="order-1 lg:order-2">
            <LeadForm locale="es" />
          </div>
        </div>
      </section>

      <JsonLd data={requestDispatchSchema} />
    </>
  );
}
