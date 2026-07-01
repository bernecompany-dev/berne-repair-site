import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/sections/lead-form";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

// Absolute — brand already in the string; layout template would double it.
const TITLE = "Contacto — Berne Appliance Repair · Servicio premium";
const DESC = `Comuníquese con el despacho de Berne Appliance Repair para servicio premium de electrodomésticos en el sur de Florida. ${COMPANY.phone.display} · ${COMPANY.hours.label}. Despacho prioritario de guante blanco. Con licencia y asegurados.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: {
    canonical: "/es/contact",
    languages: {
      "en-US": absoluteUrl("/contact"),
      "es-US": absoluteUrl("/es/contact"),
      "x-default": absoluteUrl("/contact"),
    },
  },
  openGraph: {
    title: TITLE,
    description:
      "Comuníquese con el despacho de Berne Appliance Repair para servicio premium de electrodomésticos en el sur de Florida.",
    url: absoluteUrl("/es/contact"),
    type: "website",
    locale: "es_US",
    images: [DEFAULT_OG_IMAGE],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto — Berne Appliance Repair",
  "url": absoluteUrl("/es/contact"),
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
  },
};

export default function ContactPageES() {
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
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Ruta de navegación">
            <Link href="/es" className="hover:text-foreground">Inicio</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Contacto</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <ShieldCheck className="size-3.5" aria-hidden />
            Con licencia y asegurados · {COMPANY.socialProof.warranty}
          </span>

          <h1 className="heading-hero mt-6 max-w-3xl">
            Contacte a{" "}
            <span className="bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Berne Appliance Repair.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Servicio premium de electrodomésticos en Miami-Dade, Broward y Palm
            Beach. Hable con un despachador real — sin centros de llamadas ni
            contestadores automáticos.
          </p>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="container-prose py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Cómo comunicarse</h2>
            <p className="mt-3 text-muted-foreground">
              Contestamos el teléfono los siete días de la semana. Si llama antes
              del mediodía, el servicio el mismo día suele ser posible.
            </p>

            <ul className="mt-8 space-y-4 text-base">
              <li className="flex items-start gap-3">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Phone className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Teléfono y SMS
                  </div>
                  <div className="mt-1 space-y-1.5">
                    {COMPANY.phones.map((p, i) => (
                      <div key={p.tel} className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <a
                          href={`tel:${p.tel}`}
                          data-analytics={i === 0 ? "click-to-call-primary" : "click-to-call-regional"}
                          className="font-semibold text-foreground hover:text-brand"
                        >
                          {p.display}
                        </a>
                        <span className="text-xs text-muted-foreground">
                          {p.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Mail className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Correo electrónico
                  </div>
                  <a
                    href={`mailto:${COMPANY.email.public}`}
                    className="font-semibold text-foreground hover:text-brand"
                  >
                    {COMPANY.email.public}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Clock3 className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Horario
                  </div>
                  <div className="font-semibold text-foreground">
                    {COMPANY.hours.label}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Zona de servicio
                  </div>
                  <div className="font-semibold text-foreground">
                    Miami-Dade · Broward · Palm Beach
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-card/40 p-5">
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                ¿Lo necesita más rápido que el formulario?
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Para averías urgentes o despacho el mismo día, llamar es la vía
                más rápida. Contesta un despachador — no un contestador
                automático.
              </p>
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110"
              >
                <Phone className="size-4" aria-hidden />
                Llame al {COMPANY.phone.display}
              </a>
            </div>
          </div>

          <div id="lead-form">
            <LeadForm locale="es" />
          </div>
        </div>
      </section>

      <JsonLd data={contactPageSchema} />
    </>
  );
}
