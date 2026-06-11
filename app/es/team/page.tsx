import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Wrench, ShieldCheck, BadgeDollarSign } from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { OwnerIntro } from "@/components/sections/owner-intro";
import { JsonLd } from "@/components/site/json-ld";
import { TEAM } from "@/data/team";
import { BACK_OFFICE } from "@/data/team-bios";
import { COMPANY } from "@/data/company";
import { breadcrumbJsonLd, absoluteUrl, pageOpenGraph } from "@/lib/seo";

const TECH_COUNT = COMPANY.socialProof.technicians;

const PAGE_TITLE = `El equipo Berne — ${COMPANY.socialProof.technicians} técnicos en el sur de Florida`;
const PAGE_DESCRIPTION = `Conozca a los ${COMPANY.socialProof.technicians} técnicos con licencia y al equipo de despacho de ${COMPANY.legalName}. Nombres reales, especialidades reales.`;

export const metadata: Metadata = {
  // Absolute — brand already in the string; layout template would double it.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/es/team",
    languages: {
      "en-US": absoluteUrl("/team"),
      "es-US": absoluteUrl("/es/team"),
      "x-default": absoluteUrl("/team"),
    },
  },
  openGraph: pageOpenGraph({ title: PAGE_TITLE, description: PAGE_DESCRIPTION, path: "/es/team", locale: "es" }),
};

export default function TeamPageES() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Equipo", href: "/es/team" },
  ];

  const peopleJsonLd = TEAM.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    description: m.bio ?? m.specialty,
    image: absoluteUrl(m.photo),
    worksFor: { "@id": absoluteUrl("/#business") },
    knowsAbout: m.specialty.split("·").map((s) => s.trim()),
  }));

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
            <span className="text-foreground/80">Equipo</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Users className="size-3.5" aria-hidden /> {COMPANY.socialProof.technicians} técnicos a tiempo completo
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden /> Con licencia y asegurados
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <BadgeDollarSign className="size-3.5 text-brand" aria-hidden /> Visita técnica ${COMPANY.serviceCallPrice}
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            La gente en los camiones.
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Equipo Berne Appliance Repair.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne Appliance Repair es una operación de flota — no subcontratamos. Cada técnico aquí es empleado de Berne, entrenado en las marcas que servimos, certificado EPA donde corresponde.
          </p>

          <div className="mt-9"><CTARow size="lg" locale="es" /></div>
        </div>
      </section>

      <OwnerIntro locale="es" />

      <section id="team-grid" className="container-prose py-16 sm:py-20 scroll-mt-20">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">El equipo</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {`${TECH_COUNT} técnicos que elegí personalmente.`}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m) => (
            <article key={m.slug} className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 transition-colors hover:border-brand/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src={m.photo} alt={`${m.name}, ${m.role} en Berne Appliance Repair`} fill sizes="(min-width: 1024px) 30vw, 100vw" quality={78} loading="lazy" className="object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">{m.name}</h2>
                <p className="text-xs uppercase tracking-[0.18em] text-brand">{m.role}</p>
                <p className="text-sm text-muted-foreground">{m.specialty}</p>
              </div>
              {m.bio ? <p className="text-sm leading-relaxed text-foreground/85">{m.bio}</p> : null}
              <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <Wrench className="size-3.5" aria-hidden /> {m.years} años con Berne
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="back-office" className="container-prose pb-16 sm:pb-20 scroll-mt-20">
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">Despacho y operaciones</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            El equipo detrás de su reparación
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Los técnicos en los camiones son la primera línea. Estas siete
            personas son la oficina detrás de ellos — contestan el teléfono,
            dirigen la flota y se aseguran de que el repuesto correcto vaya en
            el camión correcto.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BACK_OFFICE.map((m) => (
            <article key={m.slug} className="flex flex-col gap-4 rounded-3xl border border-border bg-card/30 p-6 transition-colors hover:border-brand/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <Image src={m.photo} alt={`${m.name}, ${m.roleEs} en Berne Appliance Repair`} fill sizes="(min-width: 1024px) 30vw, 100vw" quality={78} loading="lazy" className="object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">{m.name}</h3>
                <p className="text-xs uppercase tracking-[0.18em] text-brand">{m.roleEs}</p>
                <p className="text-sm text-muted-foreground">{m.factEs}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Contact locale="es" />
      <CTABand locale="es" />

      <JsonLd data={[...peopleJsonLd, breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
