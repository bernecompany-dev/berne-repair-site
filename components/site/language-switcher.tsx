"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALES, LOCALE_SHORT, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Set of paths that have a Spanish counterpart at /es/<same path>.
 * Add to this as more pages get translated. Pages not listed fall back to
 * the Spanish home (/es) instead of 404'ing on a missing mirror.
 */
const HAS_ES_MIRROR = new Set<string>([
  "/",
]);

// Patterns we know have Spanish mirrors. If the path matches any, the
// switcher links directly to the corresponding /es/... URL; otherwise it
// falls back to the Spanish home.
const ES_MIRROR_PATTERNS: RegExp[] = [
  /^\/$/,
  /^\/team\/?$/,
  /^\/areas\/?$/,
  /^\/areas\/[a-z0-9-]+\/?$/,
  /^\/services\/[a-z0-9-]+\/?$/,
  /^\/services\/[a-z0-9-]+\/[a-z0-9-]+\/?$/,
];

function targetHref(currentLocale: Locale, pathname: string): string {
  if (currentLocale === "en") {
    const hasMirror = ES_MIRROR_PATTERNS.some((rx) => rx.test(pathname));
    return hasMirror ? `/es${pathname === "/" ? "" : pathname}` : "/es";
  }
  // currentLocale === "es": strip the /es prefix and go to the English mirror
  const stripped = pathname.replace(/^\/es(\/|$)/, "/");
  return stripped || "/";
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const currentLocale: Locale = pathname.startsWith("/es") ? "es" : "en";
  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-tint/[0.04] p-0.5",
        className,
      )}
    >
      <Languages className="mx-1 size-3.5 text-muted-foreground" aria-hidden />
      {LOCALES.map((loc) => {
        const isActive = loc === currentLocale;
        const href = isActive ? pathname : targetHref(currentLocale, pathname);
        return (
          <Link
            key={loc}
            href={href}
            hrefLang={loc}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
              isActive
                ? "bg-brand text-brand-foreground"
                : "text-foreground/80 hover:bg-tint/[0.06]",
            )}
          >
            {LOCALE_SHORT[loc]}
          </Link>
        );
      })}
    </div>
  );
}
