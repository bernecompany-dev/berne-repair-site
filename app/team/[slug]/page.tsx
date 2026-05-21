import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  Languages,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { COMPANY } from "@/data/company";
import { TEAM, TEAM_BY_SLUG, type TeamMember } from "@/data/team";
import {
  BACK_OFFICE,
  BACK_OFFICE_BY_SLUG,
  TECH_BIOS,
  type ExtendedBio,
} from "@/data/team-bios";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  personJsonLd,
  SITE_URL,
} from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...TEAM.map((t) => ({ slug: t.slug })),
    ...BACK_OFFICE.map((b) => ({ slug: b.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tech = TEAM_BY_SLUG[slug];
  const back = BACK_OFFICE_BY_SLUG[slug];

  if (tech) {
    const title = `${tech.name} — ${tech.role} | Berne Appliance Repair`;
    const description = `${tech.name}, ${tech.role} at ${COMPANY.legalName}. ${tech.years} years on the team. ${tech.specialty}. Serving Miami-Dade, Broward, Palm Beach.`;
    return {
      title,
      description,
      alternates: {
        canonical: `/team/${slug}`,
        languages: {
          "en-US": absoluteUrl(`/team/${slug}`),
          "x-default": absoluteUrl(`/team/${slug}`),
        },
      },
    };
  }
  if (back) {
    return {
      title: `${back.role} — Berne Appliance Repair Operations`,
      description: `${back.role} role at ${COMPANY.legalName}. Part of the dispatch and operations team behind the technician fleet.`,
      alternates: {
        canonical: `/team/${slug}`,
      },
    };
  }
  return {
    title: "Team — Berne Appliance Repair",
    description: "Berne Appliance Repair team member.",
    robots: { index: false, follow: false },
  };
}

export default async function TeamMemberPage({ params }: Params) {
  const { slug } = await params;
  const tech: TeamMember | undefined = TEAM_BY_SLUG[slug];
  const back = BACK_OFFICE_BY_SLUG[slug];

  if (!tech && !back) notFound();

  const isBackOffice = !!back;
  const bio: ExtendedBio | undefined = tech
    ? TECH_BIOS[slug]
    : back?.bio;
  if (!bio) notFound();

  const name = isBackOffice ? back!.name : tech!.name;
  const role = isBackOffice ? back!.role : tech!.role;
  const photo = isBackOffice ? back!.photo : tech!.photo;
  const years = isBackOffice ? null : tech!.years;
  const credentials = isBackOffice ? [] : tech!.credentials ?? [];
  const languages = isBackOffice ? [] : tech!.languages ?? [];
  const specialtyText = isBackOffice ? "" : tech!.specialty;

  // Build Person schema
  let personSchema: Record<string, unknown>;
  if (tech) {
    const base = personJsonLd(tech);
    personSchema = {
      ...base,
      "@id": `${SITE_URL}/team/${slug}#person`,
      url: absoluteUrl(`/team/${slug}`),
      mainEntityOfPage: { "@id": absoluteUrl(`/team/${slug}`) },
    };
  } else {
    personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/team/${slug}#person`,
      name,
      image: absoluteUrl(photo),
      jobTitle: role,
      worksFor: { "@id": absoluteUrl("/#business") },
      url: absoluteUrl(`/team/${slug}`),
    };
  }

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/team/${slug}#profilepage`,
    url: absoluteUrl(`/team/${slug}`),
    name: `${name} — ${role}`,
    mainEntity: { "@id": `${SITE_URL}/team/${slug}#person` },
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#organization") },
  };

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Team", href: "/team" },
    { name: isBackOffice ? role : name, href: `/team/${slug}` },
  ];

  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-prose py-12 sm:py-16 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/team" className="hover:text-foreground">
              Team
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">
              {isBackOffice ? role : name}
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
                <Image
                  src={photo}
                  alt={`${name} — ${role}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                {isBackOffice ? "Operations" : "Technician"}
              </p>
              <h1 className="heading-hero mt-3">
                {isBackOffice ? role : name}
              </h1>
              {!isBackOffice ? (
                <p className="mt-2 text-base font-medium text-muted-foreground">
                  {role}
                </p>
              ) : null}

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {bio.lede}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                {years ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-medium text-brand">
                    <Briefcase className="size-3.5" aria-hidden /> {years} years with Berne
                  </span>
                ) : null}
                {languages.length > 0 ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-foreground/80">
                    <Languages className="size-3.5 text-brand" aria-hidden />
                    {languages.join(" · ")}
                  </span>
                ) : null}
                {credentials.map((c) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-foreground/80"
                  >
                    <ShieldCheck className="size-3.5 text-brand" aria-hidden />
                    {c.name}
                  </span>
                ))}
              </div>

              {specialtyText ? (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Specialties
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm">
                    <Sparkles className="size-3.5 text-brand" aria-hidden />
                    {specialtyText}
                  </p>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${COMPANY.phone.tel}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
                >
                  <Phone className="size-4" aria-hidden />
                  Call {COMPANY.phone.display}
                </a>
                <Link
                  href="/request-dispatch"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold hover:border-brand/40"
                >
                  Request service
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container-prose grid gap-10 py-14 sm:py-16 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Background</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {bio.background}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {isBackOffice ? "What this role covers" : "What I work on"}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {bio.workOn}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Why I work at Berne
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {bio.whyBerne}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Service area</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {bio.serviceArea}
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-card/50 p-6">
              <p className="text-sm font-semibold tracking-tight">
                Related services & brands
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {bio.related.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="group flex items-start gap-2 text-foreground hover:text-brand"
                    >
                      <Wrench className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden />
                      <span className="underline-offset-4 group-hover:underline">
                        {r.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-brand/30 bg-brand/5 p-6">
              <p className="text-sm font-semibold tracking-tight">Schedule service</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {isBackOffice
                  ? `Reach the ${role.toLowerCase()} during business hours.`
                  : `Dispatch ${name.split(" ")[0]} or another Berne tech to your address.`}
              </p>
              <a
                href={`tel:${COMPANY.phone.tel}`}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
              >
                <Phone className="size-4" aria-hidden />
                {COMPANY.phone.display}
              </a>
              <Link
                href="/request-dispatch"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand/40 bg-background px-4 py-2.5 text-sm font-semibold hover:border-brand"
              >
                Request dispatch online
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <JsonLd data={[personSchema, profilePage, breadcrumbJsonLd(crumbs)]} />
    </>
  );
}
