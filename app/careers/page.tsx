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
  title: "Careers at Berne Appliance Repair — South Florida Appliance Technician Jobs",
  description: `Join Berne Appliance Repair — ${COMPANY.socialProof.industryExperienceYears}+ years in business, ${COMPANY.socialProof.technicians} W-2 technicians. Now hiring senior + junior appliance technicians, customer service, and dispatch in Hallandale Beach and Boca Raton.`,
  alternates: {
    canonical: "/careers",
    languages: {
      "en-US": absoluteUrl("/careers"),
      "es-US": absoluteUrl("/es/careers"),
      "x-default": absoluteUrl("/careers"),
    },
  },
  openGraph: {
    title: "Careers at Berne Appliance Repair — South Florida",
    description:
      "Now hiring W-2 appliance technicians, customer service, and dispatch across Miami-Dade, Broward, and Palm Beach.",
    url: absoluteUrl("/careers"),
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

/**
 * Google for Jobs JobPosting schema per open role.
 * https://developers.google.com/search/docs/appearance/structured-data/job-posting
 *
 * Required fields: title, description, datePosted, hiringOrganization,
 *   jobLocation (or applicantLocationRequirements for remote), validThrough.
 * Strongly recommended: baseSalary, employmentType, identifier.
 */
function jobPostingJsonLd(roleSlug: string) {
  const role = CAREERS.find((r) => r.slug === roleSlug)!;
  const hq = COMPANY.address.hq;

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": absoluteUrl(`/careers#${role.slug}`),
    title: role.title,
    description: `<p>${role.description}</p><h3>Requirements</h3><ul>${role.requirements
      .map((r) => `<li>${r}</li>`)
      .join("")}</ul>`,
    identifier: {
      "@type": "PropertyValue",
      name: COMPANY.legalName,
      value: `berne-careers-${role.slug}`,
    },
    datePosted: POSTING_DATE,
    validThrough: VALID_THROUGH,
    employmentType: role.employmentType,
    industry: "Appliance Repair Service",
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
    skills: role.skills,
    qualifications: role.requirements.join("; "),
    directApply: false,
    workHours: COMPANY.hours.label,
  };
}

export default function CareersPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" },
  ];

  const jobPostings = CAREERS.map((r) => jobPostingJsonLd(r.slug));

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/careers#collection`,
    url: absoluteUrl("/careers"),
    name: "Careers — Berne Appliance Repair",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: CAREERS.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@id": absoluteUrl(`/careers#${r.slug}`) },
      })),
    },
  };

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
              Currently accepting applications
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <ShieldCheck className="size-3.5 text-brand" aria-hidden />
              W-2 employment · not 1099
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-foreground/80">
              <GraduationCap className="size-3.5 text-brand" aria-hidden />
              MSA-funded OEM training
            </span>
          </div>

          <h1 className="heading-hero mt-6 max-w-4xl">
            Build a career with{" "}
            <span className="block bg-gradient-to-r from-brand to-[oklch(0.85_0.06_252)] bg-clip-text text-transparent">
              Berne Appliance Repair.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            We&rsquo;re an {COMPANY.socialProof.industryExperienceYears}-year South Florida
            appliance repair company actively growing the team. Currently servicing
            Miami-Dade, Broward, Palm Beach, plus Gulf Coast cities (Tampa, Sarasota,
            Naples). Open roles below — apply by email with resume and 3 references.
          </p>

          <div className="mt-9">
            <CTARow size="lg" />
          </div>
        </div>
      </section>

      {/* Why Berne */}
      <section className="container-prose py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">Why work at Berne</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What employment here actually looks like.
          </h2>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <ShieldCheck className="size-5 text-brand" aria-hidden />,
              title: "W-2 employment",
              body:
                "Not 1099 subcontractor. Payroll, taxes, workers&rsquo; comp handled by the company.",
            },
            {
              icon: <GraduationCap className="size-5 text-brand" aria-hidden />,
              title: "Continuous OEM training",
              body:
                "Marcone Servicers Association (MSA) — Sub-Zero, Wolf, Miele, LG, Samsung, GE. Company-paid.",
            },
            {
              icon: <Wrench className="size-5 text-brand" aria-hidden />,
              title: "Established route + dispatch",
              body:
                "HousecallPro back-end. Routes pre-built. Parts pre-staged. No cold-calling.",
            },
            {
              icon: <Briefcase className="size-5 text-brand" aria-hidden />,
              title: "Bilingual team",
              body: "English, Spanish, and Russian fluent on most trucks and in dispatch.",
            },
            {
              icon: <MapPin className="size-5 text-brand" aria-hidden />,
              title: "Two offices",
              body:
                "Hallandale Beach HQ + Boca Raton — pick whichever is closer to home.",
            },
            {
              icon: <BadgeDollarSign className="size-5 text-brand" aria-hidden />,
              title: "Honest pricing culture",
              body:
                "90-day labor &amp; parts warranty. No commission-based upsell pressure.",
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
                <p
                  className="mt-1 text-sm leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: b.body }}
                />
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
          <span className="eyebrow">Open roles</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Currently accepting applications.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Apply by emailing your resume + 3 references to{" "}
            <a
              href={`mailto:${COMPANY.email.public}`}
              className="text-brand hover:underline"
            >
              {COMPANY.email.public}
            </a>{" "}
            with the role title in the subject line, or call dispatch at{" "}
            <a href={`tel:${COMPANY.phone.tel}`} className="text-brand hover:underline">
              {COMPANY.phone.display}
            </a>{" "}
            to talk to a recruiter.
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
                    {role.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role.workLocation}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand">
                  <BadgeDollarSign className="size-3.5" aria-hidden />
                  {role.pay.label}
                </span>
              </header>

              <p className="text-base leading-relaxed text-foreground/90">
                {role.description}
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Requirements
                  </h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    {role.requirements.map((r) => (
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
                    Employment details
                  </h4>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Type</dt>
                      <dd className="font-medium">Full-time, W-2</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Location</dt>
                      <dd className="font-medium text-right">{role.workLocation}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Pay</dt>
                      <dd className="font-medium text-right">{role.pay.label}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5">
                      <dt className="text-muted-foreground">Posted</dt>
                      <dd className="font-medium">{POSTING_DATE}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${COMPANY.email.public}?subject=Application: ${encodeURIComponent(role.title)}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand/90"
                    >
                      <Mail className="size-4" aria-hidden />
                      Email resume
                    </a>
                    <a
                      href={`tel:${COMPANY.phone.tel}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand/40"
                    >
                      <Phone className="size-4 text-brand" aria-hidden />
                      Call recruiter
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
          <span className="eyebrow">How we hire</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            5 steps. About a week, start to finish.
          </h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["1", "Email resume", `Send resume + 3 references to ${COMPANY.email.public}.`],
            ["2", "Phone screen", "15-minute call with the hiring manager."],
            ["3", "In-person interview", "30-45 minutes at Hallandale HQ or Boca."],
            [
              "4",
              "Skills assessment",
              "Technician roles only — a 1-day ride-along with a senior tech.",
            ],
            ["5", "Decision within 1 week", "Offer, hire date, and W-2 onboarding."],
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
            <strong className="text-foreground">Equal opportunity employer.</strong>{" "}
            Berne Appliance Repair hires based on skill and attitude. We do not
            discriminate by race, color, national origin, religion, sex, age,
            disability, veteran status, or any other protected class.
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
