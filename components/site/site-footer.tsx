import Link from "next/link";
import { Children } from "react";
import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";
import { PRIORITY_CITIES } from "@/data/cities";
import { BRANDS } from "@/data/brands";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="container-prose grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Premium appliance repair across Miami-Dade, Broward, and Palm Beach. 17 technicians.
            Same-day service. Licensed & insured.
          </p>
          <address className="space-y-2 text-sm not-italic">
            <a
              href={`tel:${COMPANY.phone.tel}`}
              className="flex items-center gap-2.5 text-foreground hover:text-brand"
            >
              <Phone className="size-4 text-brand" aria-hidden />
              <span className="font-medium" itemProp="telephone">{COMPANY.phone.display}</span>
            </a>
            <a
              href={`mailto:${COMPANY.email.public}`}
              className="flex items-center gap-2.5 text-foreground hover:text-brand"
            >
              <Mail className="size-4 text-brand" aria-hidden />
              <span itemProp="email">{COMPANY.email.public}</span>
            </a>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="size-4 text-brand" aria-hidden />
              <time dateTime="Mo-Su 08:00-21:00">{COMPANY.hours.label}</time>
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <ShieldCheck className="size-4 text-brand" aria-hidden />
              <span>Licensed & insured · {COMPANY.socialProof.warranty}</span>
            </div>
          </address>
        </div>

        <FooterCol title="Services">
          {SERVICES.slice(0, 7).map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Service area">
          {PRIORITY_CITIES.slice(0, 8).map((c) => (
            <FooterLink key={c.slug} href={`/areas/${c.slug}`}>
              {c.name}
            </FooterLink>
          ))}
          <FooterLink href="/areas">All 60+ cities →</FooterLink>
        </FooterCol>

        <FooterCol title="Brands we service">
          <p className="text-sm leading-6 text-muted-foreground">
            {BRANDS.slice(0, 14).join(" · ")}
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            …plus most residential and commercial brands.
          </p>
        </FooterCol>
      </div>

      <div className="border-t border-border/60">
        <div className="container-prose flex flex-col items-start justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName} · DBA: {COMPANY.dbaNames.join(", ")}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span aria-hidden>·</span>
            <Link href="/#contact" className="hover:text-foreground">Contact</Link>
            <span aria-hidden>·</span>
            <Link href="/sitemap.xml" className="hover:text-foreground">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h3>
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
    <Link
      href={href}
      className="text-sm text-foreground/80 transition-colors hover:text-brand"
    >
      {children}
    </Link>
  );
}
