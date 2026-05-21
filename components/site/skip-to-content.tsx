"use client";

/**
 * Skip-to-content link — WCAG 2.4.1 (Bypass Blocks).
 *
 * Hidden until focused; jumps to the layout's <main id="main"> region so
 * keyboard / screen-reader users can skip the navbar.
 *
 * Locale is detected from the pathname so the visible-on-focus label is
 * localized on `/es/*` routes.
 */
import { usePathname } from "next/navigation";

export function SkipToContent() {
  const pathname = usePathname() ?? "/";
  const isEs = pathname.startsWith("/es");
  const label = isEs ? "Saltar al contenido principal" : "Skip to main content";
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:shadow-lg focus:border focus:border-border"
    >
      {label}
    </a>
  );
}
