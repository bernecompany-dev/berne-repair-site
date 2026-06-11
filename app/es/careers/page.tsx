import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Wrench,
  BadgeDollarSign,
} from "lucide-react";
import { CTARow } from "@/components/site/cta-row";
import { Contact } from "@/components/sections/contact";
import { CTABand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { CAREERS, POSTING_DATE, VALID_THROUGH } from "@/data/careers";
import { breadcrumbJsonLd, absoluteUrl, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute — brand already in the string; layout template would double it.
  title: { absolute: "Empleos de Técnico de Electrodomésticos — Sur de Florida · Berne" },
  description: `Únete a Berne Appliance Repair — ${COMPANY.socialProof.industryExperienceYears}+ años de experiencia, ${COMPANY.socialProof.technicians} técnicos W-2. Estamos contratando técnicos senior y junior, servicio al cliente y despacho en Hallandale Beach y Boca Raton.`,
  alternates: {
    canonical: "/es/careers",
    languages: {
      "en-US": absoluteUrl("/careers"),
      "es-US": absoluteUrl("/es/careers"),
      "x-default": absoluteUrl("/careers"),
    },
  },
  openGraph: {
    title: "Carreras en Berne Appliance Repair — Sur de Florida",
    description:
      "Contratando técnicos de electrodomésticos W-2, servicio al cliente y despacho en Miami-Dade, Broward y Palm Beach.",
    url: absoluteUrl("/es/careers"),
    type: "website",
    locale: "es_US",
    images: [DEFAULT_OG_IMAGE],
  },
};

/**
 * Google for Jobs JobPosting schema — Spanish locale variant. Keep schema
 * field VALUES in Spanish (Google supports inLanguage) so SERP rich results
 * surface in the user's language. Required fields identical to the English
 * page; only the strings differ.
 */
function jobPostingJsonLdEs(roleSlug: string) {
  const role = CAREERS.find((r) => r.slug === roleSlug)!;
  const hq = COMPANY.address.hq;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": absoluteUrl(`/es/careers#${role.slug}`),
    inLanguage: "es-US",
    title: role.titleEs,
    description: `<p>${role.descriptionEs}</p><h3>Requisitos</h3><ul>${role.requirementsEs
      .map((r) => `<li>${r}</li>`)
      .join("")}</ul>`,
    identifier: {
      "@type": "PropertyValue",
      name: COMPANY.legalName,
      value: `berne-careers-${role.slug}-es`,
    },
    datePosted: POSTING_DATE,
    validThrough: VALID_THROUGH,
    employmentType: role.employmentType,
    industry: "Reparación de Electrodomésticos",
    occupationalCategory: "49-9031.00 Home Appliance Repairers",
    hiringOrganization: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: COMPANY.legalName,
      sameAs: COMPANY.url,
      logo: absoluteUrl("/og.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: hq.street,
        addressLocality: hq.city,
        addressRegion: hq.region,
        postalCode: hq.postalCode,
        addressCountry: hq.country,
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "US",
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: role.pay.min,
        maxValue: role.pay.max,
        unitText: role.pay.unitText,
      },
    },
    skills: role.skillsEs,
    qualifications: role.requirementsEs.join("; "),
    directApply: false,
    workHours: COMPANY.hours.label,
  };
}

export default function CareersPageEs() {
  const crumbs = [
    { name: "Inicio", href: "/es" },
    { name: "Carreras", href: "/es/careers" },
  ];

  const jobPostings = CAREERS.map((r) => jobPostingJsonLdEs(r.slug));

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/es/careers#collection`,
    url: absoluteUrl("/es/careers"),
    name: "Carreras — Berne Appliance Repair",
    inLanguage: "es-US",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: CAREERS.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@id": absoluteUrl(`/es/careers#${r.slug}`) },
      })),
    },
  };

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
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/es" className="hover:text-foreground">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Carreras</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Briefcase className="size-3.5" aria-hidden />
              Aceptando solicitudes ahora
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              Empleo W-2 · no 1099
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <GraduationCap className="size-3.5 text-brand" aria-hidden />
              Capacitación OEM con MSA
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Construye una carrera con{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Berne Appliance Repair.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Somos una empresa de reparación de electrodomésticos del sur de Florida
            con {COMPANY.socialProof.industryExperienceYears} años en el mercado.
            Servimos Miami-Dade, Broward, Palm Beach, más ciudades de la costa del
            Golfo (Tampa, Sarasota, Naples). Roles abiertos abajo — aplica por correo
            electrónico con tu currículum y 3 referencias.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      {/* Why Berne */}
      <section className="container-prose py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">Por qué trabajar en Berne</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Cómo se ve realmente el empleo aquí.
          </h2>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <ShieldCheck className="size-5 text-brand" aria-hidden />,
              title: "Empleo W-2",
              body:
                "No subcontratista 1099. Nómina, impuestos y compensación laboral manejados por la empresa.",
            },
            {
              icon: <GraduationCap className="size-5 text-brand" aria-hidden />,
              title: "Capacitación OEM continua",
              body:
                "Marcone Servicers Association (MSA) — Sub-Zero, Wolf, Miele, LG, Samsung, GE. Pagado por la empresa.",
            },
            {
              icon: <Wrench className="size-5 text-brand" aria-hidden />,
              title: "Ruta + despacho establecidos",
              body:
                "Back-end de HousecallPro. Rutas pre-construidas. Repuestos pre-asignados. Sin llamadas en frío.",
            },
            {
              icon: <Briefcase className="size-5 text-brand" aria-hidden />,
              title: "Equipo bilingüe",
              body:
                "Inglés, español y ruso con fluidez en la mayoría de las camionetas y en despacho.",
            },
            {
              icon: <MapPin className="size-5 text-brand" aria-hidden />,
              title: "Dos oficinas",
              body:
                "Sede en Hallandale Beach + Boca Raton — elige la más cercana a tu casa.",
            },
            {
              icon: <BadgeDollarSign className="size-5 text-brand" aria-hidden />,
              title: "Cultura de precios honestos",
              body:
                "Garantía de 90 días en mano de obra y repuestos. Sin presión por venta adicional basada en comisiones.",
            },
          ].map((b) => (
            <li
              key={b.title}
              className="flex gap-3 rounded-2xl border border-border bg-card/40 p-5"
            >
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                {b.icon}
              </span>
              <div>
                <h3 className="text-base font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Open roles */}
      <section
        id="open-roles"
        className="container-prose pb-16 sm:pb-20 scroll-mt-20"
      >
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">Roles abiertos</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Aceptando solicitudes ahora.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Aplica enviando tu currículum + 3 referencias a{" "}
            <a
              href={`mailto:${COMPANY.email.public}`}
              className="text-brand hover:underline"
            >
              {COMPANY.email.public}
            </a>{" "}
            con el título del rol en el asunto, o llama al despacho{" "}
            <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">
              {COMPANY.phone.display}
            </a>{" "}
            para hablar con un reclutador.
          </p>
        </div>

        <div className="space-y-6">
          {CAREERS.map((role) => (
            <article
              key={role.slug}
              id={role.slug}
              className="rounded-3xl border border-border bg-card/40 p-6 sm:p-8 scroll-mt-20"
            >
              <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {role.titleEs}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role.workLocationEs}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand">
                  <BadgeDollarSign className="size-3.5" aria-hidden />
                  {role.pay.labelEs}
                </span>
              </header>

              <p className="text-base leading-relaxed text-foreground/90">
                {role.descriptionEs}
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Requisitos
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    {role.requirementsEs.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-brand"
                          aria-hidden
                        />
                        <span className="text-foreground/85">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Detalles del empleo
                  </h4>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Tipo</dt>
                      <dd className="font-medium">Tiempo completo, W-2</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Ubicación</dt>
                      <dd className="font-medium text-right">
                        {role.workLocationEs}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Pago</dt>
                      <dd className="font-medium text-right">{role.pay.labelEs}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Publicado</dt>
                      <dd className="font-medium">{POSTING_DATE}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${COMPANY.email.public}?subject=Solicitud: ${encodeURIComponent(role.titleEs)}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand/90"
                    >
                      <Mail className="size-4" aria-hidden />
                      Enviar currículum
                    </a>
                    <a
                      href={`tel:${COMPANY.phone.tel}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-tint/[0.04] px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand/40"
                    >
                      <Phone className="size-4 text-brand" aria-hidden />
                      Llamar al reclutador
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How we hire */}
      <section
        id="how-we-hire"
        className="container-prose pb-16 sm:pb-20 scroll-mt-20"
      >
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">Cómo contratamos</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            5 pasos. Aproximadamente una semana de principio a fin.
          </h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["1", "Enviar currículum", `Envía CV + 3 referencias a ${COMPANY.email.public}.`],
            ["2", "Llamada inicial", "15 minutos con el gerente de contratación."],
            ["3", "Entrevista en persona", "30-45 minutos en la sede Hallandale o Boca."],
            [
              "4",
              "Evaluación de habilidades",
              "Solo roles técnicos — un día acompañando a un técnico senior.",
            ],
            [
              "5",
              "Decisión en 1 semana",
              "Oferta, fecha de inicio y onboarding W-2.",
            ],
          ].map(([n, title, body]) => (
            <li
              key={n}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card/40 p-5"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand/10 text-base font-semibold text-brand">
                {n}
              </span>
              <h3 className="text-base font-semibold tracking-tight">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-2xl border border-brand/30 bg-brand/5 p-5 text-sm leading-relaxed">
          <p>
            <strong className="text-foreground">
              Empleador de igualdad de oportunidades.
            </strong>{" "}
            Berne Appliance Repair contrata en función de la habilidad y la
            actitud. No discriminamos por raza, color, origen nacional, religión,
            sexo, edad, discapacidad, condición de veterano o cualquier otra clase
            protegida.
          </p>
        </div>
      </section>

      <Contact />
      <CTABand />

      <JsonLd
        data={[
          ...jobPostings,
          collectionPage,
          breadcrumbJsonLd(crumbs),
        ]}
      />
    </>
  );
}
