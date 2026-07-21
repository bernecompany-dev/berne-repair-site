import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Phone,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Wrench,
  CalendarCheck,
} from "lucide-react";
import { JsonLd } from "@/components/site/json-ld";
import { CareersApplyForm } from "@/components/sections/careers-apply-form";
import { COMPANY } from "@/data/company";
import { TECH_ROLE, POSTING_DATE, VALID_THROUGH } from "@/data/careers";
import { breadcrumbJsonLd, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute — the layout template would append " · Berne Luxury Appliance
  // Repair" a second time and push the title past 80 chars in the SERP.
  title: { absolute: "Appliance Repair Technician Jobs — South Florida · Berne" },
  description:
    "Berne is hiring appliance repair technicians in Miami-Dade, Broward, and Palm Beach. W-2 employment, in-house training on Sub-Zero, Wolf, Viking, Miele, and Thermador, steady work year round.",
  alternates: {
    canonical: "/careers",
    languages: {
      "en-US": absoluteUrl("/careers"),
      "es-US": absoluteUrl("/es/careers"),
      "x-default": absoluteUrl("/careers"),
    },
  },
  openGraph: {
    title: "Appliance Repair Technician Jobs — South Florida · Berne",
    description:
      "W-2 employment, luxury-brand training (Sub-Zero, Wolf, Viking, Miele, Thermador), steady work across Miami-Dade, Broward, and Palm Beach.",
    url: absoluteUrl("/careers"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

/**
 * Google for Jobs JobPosting schema — single open role.
 * Per Eugene (2026-07-21): no baseSalary anywhere (pay is discussed per
 * experience); hiringOrganization is the site's schema entity
 * "Berne Luxury Appliance Repair" (lib/seo.ts ENTITY_NAME — do not rename).
 */
function jobPostingJsonLd() {
  const countyPlace = (county: string) => ({
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: county,
      addressRegion: "FL",
      addressCountry: "US",
    },
  });

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": absoluteUrl(`/careers#${TECH_ROLE.slug}`),
    title: TECH_ROLE.title,
    description: `<p>${TECH_ROLE.description}</p><h3>Requirements</h3><ul>${TECH_ROLE.requirements
      .map((r) => `<li>${r}</li>`)
      .join("")}</ul>`,
    identifier: {
      "@type": "PropertyValue",
      name: "Berne Luxury Appliance Repair",
      value: `berne-careers-${TECH_ROLE.slug}`,
    },
    datePosted: POSTING_DATE,
    validThrough: VALID_THROUGH,
    employmentType: TECH_ROLE.employmentType,
    industry: "Appliance Repair Service",
    occupationalCategory: "49-9031.00 Home Appliance Repairers",
    hiringOrganization: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: "Berne Luxury Appliance Repair",
      sameAs: COMPANY.url,
      logo: absoluteUrl("/og.png"),
    },
    jobLocation: [
      countyPlace("Miami-Dade County"),
      countyPlace("Broward County"),
      countyPlace("Palm Beach County"),
    ],
    applicantLocationRequirements: {
      "@type": "Country",
      name: "US",
    },
    skills: TECH_ROLE.skills,
    qualifications: TECH_ROLE.requirements.join("; "),
    directApply: true,
    workHours: COMPANY.hours.label,
  };
}

export default function CareersPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      {/* Hero */}
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
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">Careers</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Briefcase className="size-3.5" aria-hidden />
              Now hiring
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              W-2 employment · not 1099
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-tint/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <GraduationCap className="size-3.5 text-brand" aria-hidden />
              Luxury-brand training in-house
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Appliance Repair Technician —{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.55_0.12_252)] dark:to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              join the Berne team.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Berne has repaired household appliances in South Florida since 2015.
            Our clients own Sub-Zero, Wolf, Viking, Miele, and Thermador — and they
            expect a technician who covers the floor, explains the diagnosis, and
            leaves the kitchen cleaner than he found it. That is the standard we
            hire for.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-brand-foreground shadow-sm transition-transform hover:-translate-y-px"
            >
              <Briefcase className="size-4" aria-hidden />
              Apply below
            </a>
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-tint/[0.04] px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-brand/40"
            >
              <Phone className="size-4 text-brand" aria-hidden />
              {COMPANY.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* The role — EN */}
      <section className="container-prose py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">The role</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What the job looks like.
          </h2>
        </div>

        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-foreground/90">
          <p>
            Full-time field work across Miami-Dade, Broward, and Palm Beach. The
            call volume holds steady year round — South Florida kitchens do not
            take a season off. The team is {COMPANY.socialProof.technicians} staff
            technicians, every one a W-2 employee: payroll and taxes handled by
            the company, no 1099 arrangements.
          </p>
          <p>
            You do not need Sub-Zero experience on day one. We train technicians
            on the luxury brands in-house — sealed systems, control boards, the
            quirks each manufacturer never puts in the manual. Refrigerant work
            follows EPA Section 608 rules. What we need from you: real repair
            experience or a solid technical base, a driver license, and enough
            English to walk a homeowner through a diagnosis. A good part of the
            team also speaks Russian.
          </p>
          <p>
            Pay is discussed based on experience. Tell us what you have repaired
            and for how long — then we talk numbers.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <ShieldCheck className="size-5 text-brand" aria-hidden />,
              title: "W-2 from day one",
              body: `${COMPANY.socialProof.technicians} staff technicians on payroll — not subcontractors.`,
            },
            {
              icon: <GraduationCap className="size-5 text-brand" aria-hidden />,
              title: "Luxury-brand training",
              body: "Sub-Zero, Wolf, Viking, Miele, Thermador — taught in-house.",
            },
            {
              icon: <CalendarCheck className="size-5 text-brand" aria-hidden />,
              title: "Steady work year round",
              body: "No seasonal slumps — the schedule stays full every month.",
            },
            {
              icon: <MapPin className="size-5 text-brand" aria-hidden />,
              title: "Three counties",
              body: "Miami-Dade, Broward, and Palm Beach service territory.",
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

        <div className="mt-10 max-w-3xl">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Requirements
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {TECH_ROLE.requirements.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span className="text-foreground/85">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Русский блок */}
      <section lang="ru" className="border-t border-border/60">
        <div className="container-prose py-16 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">По-русски</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Работа в Berne — приглашаем техников.
            </h2>
          </div>

          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-foreground/90">
            <p>
              Berne ремонтирует бытовую технику в Южной Флориде с 2015 года. Наши
              клиенты — владельцы Sub-Zero, Wolf, Viking, Miele и Thermador, дома
              от Майами-Бич до Бока-Ратона. Такой клиент ждёт аккуратности:
              бахилы, чистая диагностика, понятное объяснение — что сломалось и
              что мы будем с этим делать.
            </p>
            <p>
              В штате {COMPANY.socialProof.technicians} техников, все оформлены
              официально по W-2 — зарплата и налоги через компанию, без схем с
              1099. Заказы идут круглый год, сезонных провалов нет. Зоны работы —
              Miami-Dade, Broward и Palm Beach. Работа с фреоном — по стандарту
              EPA 608.
            </p>
            <p>
              Работе с люксовыми брендами научим: обучение проходит внутри
              компании, от герметичных контуров Sub-Zero до электроники Miele. От
              вас нужен опыт ремонта бытовой техники или сильная техническая база
              (электрика, холодильные системы), водительские права и разговорный
              английский. В команде многие говорят по-русски, так что освоиться
              будет просто.
            </p>
            <p>
              Оплата обсуждается по опыту — расскажите, что умеете, и обсудим
              условия.
            </p>
            <p>
              Откликнуться можно через форму ниже или по телефону{" "}
              <a href={`tel:${COMPANY.phone.tel}`} className="font-semibold text-brand hover:underline">
                {COMPANY.phone.display}
              </a>
              .
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Требования
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {TECH_ROLE.requirementsRu.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <Wrench className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  <span className="text-foreground/85">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="border-t border-border/60 scroll-mt-20">
        <div className="container-prose py-16 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <CareersApplyForm variant="bilingual" />
          </div>
        </div>
      </section>

      <JsonLd data={[jobPostingJsonLd(), breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
