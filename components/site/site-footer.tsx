"use client";

import Link from "next/link";
import { Children } from "react";
import { usePathname } from "next/navigation";
import { Phone, Mail, Clock, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { SocialIcons } from "@/components/site/social-icons";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";
import { CITIES, PRIORITY_CITIES } from "@/data/cities";
import { BRANDS } from "@/data/brands";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";

// Brand names (data/brands.ts) that have a hub page at /brands/<slug>.
// `es: true` means a Spanish mirror exists at /es/brands/<slug> — kept in
// sync with the `es` localization flags in
// lib/data/residential-brand-profiles.ts (importing that ~2.7k-line module
// into this client component would bloat the bundle for a slug lookup).
const BRAND_HUBS: Record<string, { slug: string; es: boolean }> = {
  "Sub-Zero": { slug: "sub-zero", es: true },
  Wolf: { slug: "wolf", es: true },
  Viking: { slug: "viking", es: true },
  Thermador: { slug: "thermador", es: true },
  Miele: { slug: "miele", es: true },
  KitchenAid: { slug: "kitchenaid", es: true },
  LG: { slug: "lg", es: true },
  Samsung: { slug: "samsung", es: true },
  Whirlpool: { slug: "whirlpool", es: true },
  GE: { slug: "ge", es: true },
  "GE Monogram": { slug: "monogram", es: false },
};

export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname.startsWith("/es") ? "es" : "en";
  const t = getDictionary(locale).footer;
  const cityLinkMore = locale === "es"
    ? `Ver las ${CITIES.length} ciudades →`
    : `All ${CITIES.length} cities →`;

  return (
    <footer aria-label={locale === "es" ? "Pie de página" : "Footer"} className="mt-24 border-t border-border/60 bg-background">
      <div className="container-prose grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo href={localePath(locale, "/")} />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>
          <address className="space-y-2 text-sm not-italic">
            {COMPANY.phones.map((p, i) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                data-analytics={i === 0 ? "footer-call-primary" : "footer-call-regional"}
                className="flex items-center gap-2.5 py-2 text-foreground hover:text-brand"
              >
                <Phone className="size-4 text-brand" aria-hidden />
                <span className="font-medium" itemProp={i === 0 ? "telephone" : undefined}>
                  {p.display}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  · {p.label}
                </span>
              </a>
            ))}
            <a href={`mailto:${COMPANY.email.public}`} className="flex items-center gap-2.5 py-2 text-foreground hover:text-brand">
              <Mail className="size-4 text-brand" aria-hidden />
              <span itemProp="email">{COMPANY.email.public}</span>
            </a>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="size-4 text-brand" aria-hidden />
              {/* Plain span: "Mo-Su 07:00-21:00" is schema.org openingHours
                  syntax, not a valid HTML <time datetime> value. */}
              <span>{COMPANY.hours.label}</span>
            </div>
            {/* Visible NAP street address — GEO/local trust signal (HQ). */}
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <MapPin className="size-4 text-brand" aria-hidden />
              <span>
                {COMPANY.address.hq.street}, {COMPANY.address.hq.city},{" "}
                {COMPANY.address.hq.region}
              </span>
            </div>
            <Link
              href={localePath(locale, "/credentials")}
              className="flex items-center gap-2.5 text-muted-foreground hover:text-brand"
            >
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              <span>Licensed · Insured · EPA 608 · {COMPANY.socialProof.warranty}</span>
            </Link>
            <a
              href="https://msaworld.com/"
              target="_blank"
              rel="noopener noreferrer external"
              className="flex items-center gap-2.5 text-muted-foreground hover:text-brand"
            >
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              <span>
                {locale === "es" ? "Miembro de MSA World" : "MSA World Member"}
                <span className="ml-1.5 text-muted-foreground/90">
                  {locale === "es"
                    ? "· Capacitación continua"
                    : "· Continuous training"}
                </span>
              </span>
            </a>
          </address>
        </div>

        <FooterCol title={t.services}>
          {SERVICES.slice(0, 7).map((s) => (
            <FooterLink key={s.slug} href={localePath(locale, `/services/${s.slug}`)}>
              {s.name}
            </FooterLink>
          ))}
          <FooterLink href={localePath(locale, "/services")}>
            {locale === "es"
              ? `Los ${SERVICES.length} servicios →`
              : `All ${SERVICES.length} services →`}
          </FooterLink>
        </FooterCol>

        <FooterCol title={t.serviceArea}>
          {PRIORITY_CITIES.slice(0, 8).map((c) => (
            <FooterLink key={c.slug} href={localePath(locale, `/areas/${c.slug}`)}>
              {c.name}
            </FooterLink>
          ))}
          <FooterLink href={localePath(locale, "/areas")}>{cityLinkMore}</FooterLink>
          {/* /service-map is EN-only (no /es mirror) — link the EN path from both locales */}
          <FooterLink href="/service-map">
            {locale === "es" ? "Mapa de servicio" : "Service map"}
          </FooterLink>
        </FooterCol>

        <FooterCol title={t.brandsCol}>
          <p className="text-sm leading-6 text-muted-foreground">
            {BRANDS.slice(0, 14).map((b, i) => {
              const hub = BRAND_HUBS[b];
              return (
                <span key={b}>
                  {i > 0 && " · "}
                  {hub ? (
                    <Link
                      href={hub.es ? localePath(locale, `/brands/${hub.slug}`) : `/brands/${hub.slug}`}
                      className="text-foreground/80 transition-colors hover:text-brand"
                    >
                      {b}
                    </Link>
                  ) : (
                    b
                  )}
                </span>
              );
            })}
          </p>
          <FooterLink href={localePath(locale, "/brands")}>
            {locale === "es" ? "Todas las marcas →" : "All brands →"}
          </FooterLink>
          <p className="mt-3 text-xs text-muted-foreground/90">{t.brandsTail}</p>
        </FooterCol>
      </div>

      <div className="border-t border-border/60 bg-muted/30">
        <div className="container-prose py-8">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t.divisionsTitle}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.divisions.map((d) => (
              <a
                key={d.href}
                href={d.href}
                rel="noopener"
                className="group flex flex-col gap-1 rounded-lg border border-border/60 bg-background/60 p-4 transition-colors hover:border-brand/40"
              >
                <span className="text-sm font-semibold text-foreground group-hover:text-brand">
                  {d.name} →
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {d.desc}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 border-t border-border/60 pt-6">
            <SocialIcons locale={locale} />
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-prose py-6 space-y-4">
          <p className="text-[11px] leading-relaxed text-muted-foreground/95">
            {t.trademarkDisclaimer}
          </p>
          <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {COMPANY.legalEntity} · DBA: {COMPANY.dbaNames.join(", ")}</p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link href={localePath(locale, "/")} className="inline-block py-1.5 hover:text-foreground">{t.home}</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/about")} className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "Sobre nosotros" : "About"}
              </Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/team")} className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "Equipo" : "Team"}
              </Link>
              <span aria-hidden>·</span>
              {/* /reviews is EN-only (no /es mirror) — link the EN path from both locales */}
              <Link href="/reviews" className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "Reseñas" : "Reviews"}
              </Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/careers")} className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "Carreras" : "Careers"}
              </Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/contact")} className="inline-block py-1.5 hover:text-foreground">{t.contactLink}</Link>
              <span aria-hidden>·</span>
              {/* /request-dispatch deliberately not linked from nav/footer —
                  it serves as an ads/SEO landing page only (wave-2 CRO,
                  2026-06-10). The page itself stays live. */}
              {/* Blog + comparison guides are English-only content — link the EN paths from both locales */}
              <Link href="/blog" className="inline-block py-1.5 hover:text-foreground">Blog</Link>
              <span aria-hidden>·</span>
              <Link href="/compare" className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "Guías y comparativas" : "Guides & comparisons"}
              </Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/credentials")} className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "Credenciales" : "Credentials"}
              </Link>
              <span aria-hidden>·</span>
              <Link href="/family" className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "La familia" : "The family"}
              </Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/search")} className="inline-block py-1.5 hover:text-foreground">
                {locale === "es" ? "Buscar" : "Search"}
              </Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/privacy")} className="inline-block py-1.5 hover:text-foreground">{t.privacy}</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/terms")} className="inline-block py-1.5 hover:text-foreground">{t.terms}</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/cookies")} className="inline-block py-1.5 hover:text-foreground">{t.cookies}</Link>
              <span aria-hidden>·</span>
              {/* Plain <a>: /sitemap.xml is a static file, not an app route —
                  next/link would prefetch a non-route then hard-navigate anyway. */}
              <a href="/sitemap.xml" className="inline-block py-1.5 hover:text-foreground">{t.sitemap}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</h3>
      <ul className="space-y-2.5">
        {Children.map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-foreground/80 transition-colors hover:text-brand">
      {children}
    </Link>
  );
}
