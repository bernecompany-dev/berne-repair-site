import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, BadgeDollarSign, Clock3 } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { CITIES, COUNTIES, type City } from "@/data/cities";
import { COMPANY } from "@/data/company";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Las ${CITIES.length} ciudades que cubrimos`,
  description: `Reparación de electrodomésticos el mismo día en ${CITIES.length} ciudades de Miami-Dade, Broward y Palm Beach. Visita técnica $${COMPANY.serviceCallPrice}.`,
  alternates: {
    canonical: "/es/areas",
    languages: {
      "en-US": absoluteUrl("/areas"),
      "es-US": absoluteUrl("/es/areas"),
      "x-default": absoluteUrl("/areas"),
    },
  },
};

export default function AreasIndexES() {
  const byCounty: Record<string, City[]> = { "Miami-Dade": [], Broward: [], "Palm Beach": [] };
  for (const c of CITIES) byCounty[c.county].push(c);
  for (const k of Object.keys(byCounty)) byCounty[k].sort((a, b) => a.name.localeCompare(b.name));
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Área de servicio", href: "/es/areas" },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute -top-32 left-1/2 -z-10 size-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.67 0.21 252 / 0.25), transparent)" }}
        />
        <div className="container-prose pt-14 pb-12 sm:pt-20 sm:pb-16">
          <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/es" className="hover:text-foreground">Inicio</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Área de servicio</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden /> Visita técnica ${COMPANY.serviceCallPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden /> El mismo día en todo el sur de Florida
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Las {CITIES.length} ciudades que cubrimos
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              en el sur de Florida.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Desde Homestead hasta Jupiter, cada cuadra intermedia. {COMPANY.socialProof.technicians} técnicos con licencia despachados desde todo el sur de Florida — la mayoría de trabajos en menos de una hora.
          </p>

          <div className="mt-9"><CTARow size="lg" locale="es" /></div>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          {COUNTIES.map((county) => (
            <div key={county}>
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-brand" aria-hidden />
                <h2 className="text-2xl font-semibold tracking-tight">Condado de {county}</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{byCounty[county].length} ciudades · el mismo día</p>
              <ul className="mt-6 space-y-2">
                {byCounty[county].map((c) => (
                  <li key={c.slug}>
                    <Link href={`/es/areas/${c.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-2.5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                    >
                      <span className="text-sm font-semibold">{c.name}</span>
                      <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Contact locale="es" />
      <CTABand locale="es" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
