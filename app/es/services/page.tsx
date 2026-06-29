import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, ArrowRight, BadgeDollarSign, Clock3, Gem } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { SERVICES } from "@/data/services";
import { HIGHEND_SERVICES } from "@/data/highend";
import { COMPANY } from "@/data/company";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const PAGE_TITLE = `Todos los ${SERVICES.length} servicios de reparación`;
const PAGE_DESCRIPTION = `Reparación el mismo día en todos los electrodomésticos principales. Visita técnica $${COMPANY.serviceCallPrice}. Con licencia y asegurados.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/es/services",
    languages: {
      "en-US": absoluteUrl("/services"),
      "es-US": absoluteUrl("/es/services"),
      "x-default": absoluteUrl("/services"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/es/services", locale: "es" }),
};

export default function ServicesIndexES() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Servicios", href: "/es/services" },
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
            <span className="text-foreground/80">Servicios</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <BadgeDollarSign className="size-3.5" aria-hidden />
              Visita técnica ${COMPANY.serviceCallPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <Clock3 className="size-3.5 text-brand" aria-hidden />
              El mismo día en todo el sur de Florida
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Todos los electrodomésticos.
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Todas las marcas principales.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Desde columnas Sub-Zero hasta lavadoras Whirlpool — {COMPANY.socialProof.technicians} técnicos
            con licencia despachan con camiones equipados para las marcas y modelos que vemos a diario
            en el sur de Florida.
          </p>

          <div className="mt-9"><CTARow size="lg" locale="es" /></div>
        </div>
      </section>

      <section className="container-prose py-16 sm:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/es/services/${s.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
              >
                <div className="flex items-center gap-2">
                  <Wrench className="size-5 text-brand" aria-hidden />
                  <h2 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-brand">
                    {s.es.name}
                  </h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.es.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                  Ver detalles
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Servicios especializados de alta gama — páginas estáticas escritas a
          mano, fuera del set programático (sin combinaciones por ciudad). */}
      <section className="border-t border-border/60 bg-background/40">
        <div className="container-prose py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Gem className="mr-1.5 inline size-3.5" aria-hidden />
              Alta gama y especializados
            </span>
            <h2 className="heading-section mt-3">
              Equipo de lujo del hogar, por su nombre.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Más allá de la cocina y la lavandería, nuestros técnicos senior
              reparan el equipo especializado de las casas de lujo del sur de
              Florida — desde calefactores de sauna hasta chillers de inmersión
              fría y cafeteras empotradas.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHEND_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/es/services/${s.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:-translate-y-px hover:border-brand/40 hover:bg-card/60"
                >
                  <div className="flex items-center gap-2">
                    <Gem className="size-5 text-brand" aria-hidden />
                    <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-brand">
                      {s.es.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.es.metaDescription}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand">
                    Ver detalles
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact locale="es" />
      <CTABand locale="es" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
