"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Updates `<html lang>` to match the route locale after client hydration.
 * The HTML is statically prerendered as `lang="en-US"` for SSG performance;
 * this component switches it to `es-US` for /es routes so screen readers and
 * translation tooling get the right signal. Google ranks via hreflang
 * alternates regardless, so SEO is unaffected.
 */
export function LangSync() {
  const pathname = usePathname() ?? "/";
  useEffect(() => {
    const lang = pathname.startsWith("/es") ? "es-US" : "en-US";
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, [pathname]);
  return null;
}
