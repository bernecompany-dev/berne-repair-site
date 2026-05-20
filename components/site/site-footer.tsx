"use client";

import Link from "next/link";
import { Children } from "react";
import { usePathname } from "next/navigation";
import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { SocialIcons } from "@/components/site/social-icons";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";
import { CITIES, PRIORITY_CITIES } from "@/data/cities";
import { BRANDS } from "@/data/brands";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";

export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname.startsWith("/es") ? "es" : "en";
  const t = getDictionary(locale).footer;
  const cityLinkMore = locale === "es"
    ? `Ver las ${CITIES.length} ciudades →`
    : `All ${CITIES.length} cities →`;

  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="container-prose grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo href={localePath(locale, "/")} />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>
          <address className="space-y-2 text-sm not-italic">
            <a href={`tel:${COMPANY.phone.tel}`} className="flex items-center gap-2.5 text-foreground hover:text-brand">
              <Phone className="size-4 text-brand" aria-hidden />
              <span className="font-medium" itemProp="telephone">{COMPANY.phone.display}</span>
            </a>
            <a href={`mailto:${COMPANY.email.public}`} className="flex items-center gap-2.5 text-foreground hover:text-brand">
              <Mail className="size-4 text-brand" aria-hidden />
              <span itemProp="email">{COMPANY.email.public}</span>
            </a>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="size-4 text-brand" aria-hidden />
              <time dateTime="Mo-Su 08:00-21:00">{COMPANY.hours.label}</time>
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              <span>{t.licensedShort} · {COMPANY.socialProof.warranty}</span>
            </div>
          </address>
        </div>

        <FooterCol title={t.services}>
          {SERVICES.slice(0, 7).map((s) => (
            <FooterLink key={s.slug} href={localePath(locale, `/services/${s.slug}`)}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title={t.serviceArea}>
          {PRIORITY_CITIES.slice(0, 8).map((c) => (
            <FooterLink key={c.slug} href={localePath(locale, `/areas/${c.slug}`)}>
              {c.name}
            </FooterLink>
          ))}
          <FooterLink href={localePath(locale, "/areas")}>{cityLinkMore}</FooterLink>
        </FooterCol>

        <FooterCol title={t.brandsCol}>
          <p className="text-sm leading-6 text-muted-foreground">{BRANDS.slice(0, 14).join(" · ")}</p>
          <p className="mt-3 text-xs text-muted-foreground/70">{t.brandsTail}</p>
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
          <p className="text-[11px] leading-relaxed text-muted-foreground/80">
            {t.trademarkDisclaimer}
          </p>
          <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {COMPANY.legalName} · DBA: {COMPANY.dbaNames.join(", ")}</p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link href={localePath(locale, "/")} className="hover:text-foreground">{t.home}</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/about")} className="hover:text-foreground">About</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/contact")} className="hover:text-foreground">{t.contactLink}</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/request-dispatch")} className="hover:text-foreground">Request dispatch</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/family")} className="hover:text-foreground">The family</Link>
              <span aria-hidden>·</span>
              <Link href={localePath(locale, "/privacy")} className="hover:text-foreground">{t.privacy}</Link>
              <span aria-hidden>·</span>
              <Link href="/sitemap.xml" className="hover:text-foreground">{t.sitemap}</Link>
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
