import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Gem } from "lucide-react";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const TITLE = "Recursos — Guías de Reparación de Electrodomésticos de Lujo";
const DESCRIPTION =
  "Guías de referencia para dueños de electrodomésticos de alta gama en el sur de Florida — rangos de costo de reparación, herramientas de reparar-vs-reemplazar y conocimiento por marca de un taller formado de fábrica y certificado EPA 608.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/es/resources",
    languages: {
      "en-US": absoluteUrl("/resources"),
      "es-US": absoluteUrl("/es/resources"),
      "x-default": absoluteUrl("/resources"),
    },
  },
  openGraph: pageOpenGraph({ title: TITLE, description: DESCRIPTION, path: "/es/resources", locale: "es" }),
};

const RESOURCES = [
  {
    href: "/es/resources/luxury-appliance-repair-cost-guide",
    title: "Guía de Costos de Reparación de Electrodomésticos de Lujo",
    blurb:
      "Rangos de costo de reparación por categoría y falla, una calculadora de reparar-vs-reemplazar y referencias de diagnóstico para Sub-Zero, Wolf, Miele, Thermador, Viking, Gaggenau y Liebherr.",
  },
];

export default function ResourcesIndexEs() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Recursos", href: "/es/resources" },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)",
          }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/es" className="hover:text-foreground">Inicio</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Recursos</span>
          </nav>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            <BookOpen className="size-3.5" aria-hidden />
            Guías de referencia
          </span>
          <h1 className="heading-hero mt-6 max-w-3xl">
            Guías para dueños de{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              electrodomésticos de lujo.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {DESCRIPTION}
          </p>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        <ul className="grid gap-4 sm:grid-cols-2">
          {RESOURCES.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <Gem className="size-5 text-brand" aria-hidden />
                <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-brand">
                  {r.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                  Abrir la guía
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Contact locale="es" />
      <CTABand locale="es" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
