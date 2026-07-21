"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { PhoneCTA } from "@/components/site/phone-cta";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname.startsWith("/es") ? "es" : "en";
  const t = getDictionary(locale).nav;
  // Real hub pages where they exist; "Why us" stays a home anchor (no
  // standalone page). `match` is the pathname prefix that marks the item
  // active (null for anchor links).
  const NAV: Array<{ href: string; label: string; match: string | null }> = [
    { href: localePath(locale, "/services"), label: t.services, match: localePath(locale, "/services") },
    { href: localePath(locale, "/areas"), label: t.areas, match: localePath(locale, "/areas") },
    { href: localePath(locale, "/brands"), label: locale === "es" ? "Marcas" : "Brands", match: localePath(locale, "/brands") },
    { href: localePath(locale, "/team"), label: t.team, match: localePath(locale, "/team") },
    { href: localePath(locale, "/careers"), label: locale === "es" ? "Empleo" : "Careers", match: localePath(locale, "/careers") },
    // Not localePath: it would emit "/es/#why" (trailing slash → 308 on hard load).
    { href: locale === "es" ? "/es#why" : "/#why", label: t.whyUs, match: null },
    { href: localePath(locale, "/contact"), label: t.contact, match: localePath(locale, "/contact") },
  ];
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isActive = (match: string | null) =>
    match !== null && (normalizedPath === match || normalizedPath.startsWith(`${match}/`));

  // Close the mobile panel on Escape and on clicks/taps outside the header.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const menuLabel = open
    ? locale === "es" ? "Cerrar menú" : "Close menu"
    : locale === "es" ? "Abrir menú" : "Open menu";

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/55">
      <div className="container-prose flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Logo href={localePath(locale, "/")} />
        </div>

        <nav aria-label={locale === "es" ? "Principal" : "Primary"} className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.match) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-tint/[0.05] hover:text-foreground",
                isActive(item.match)
                  ? "bg-tint/[0.05] text-foreground"
                  : "text-foreground/80",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden md:inline-flex" />
          <ThemeToggle className="size-11" />
          <PhoneCTA size="sm" variant="solid" locale={locale} className="hidden sm:inline-flex" />
          <PhoneCTA size="sm" variant="solid" locale={locale} withLabel={false} className="sm:hidden" />
          <button
            type="button"
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-tint/[0.03] text-foreground transition-colors hover:bg-tint/[0.06] lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        // `inert` removes the collapsed menu's links from the tab order and
        // the accessibility tree — visually hidden via max-h-0/opacity-0 they
        // were still keyboard-focusable (invisible tab stops on every page).
        inert={!open || undefined}
        className={cn(
          "lg:hidden overflow-hidden border-t border-border/60 transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-prose flex flex-col gap-1 py-4" aria-label={locale === "es" ? "Móvil" : "Mobile"}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.match) ? "page" : undefined}
              className={cn(
                "rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-tint/[0.05]",
                isActive(item.match)
                  ? "bg-tint/[0.05] text-foreground"
                  : "text-foreground/90",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-end gap-3">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
