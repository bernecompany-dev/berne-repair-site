export type Locale = "en" | "es";

export const LOCALES: Locale[] = ["en", "es"];
export const DEFAULT_LOCALE: Locale = "en";

/** Used in <html lang="..."> and JSON-LD `inLanguage`. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en-US",
  es: "es-US",
};

/** Display labels for the language switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

/**
 * Returns the path prefix for a locale. English is at the root, Spanish at /es.
 *  prefix("en") → ""
 *  prefix("es") → "/es"
 */
export function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}

/** Helper to prepend a locale prefix to a route path. */
export function localePath(locale: Locale, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${localePrefix(locale)}${p === "/" ? "" : p}` || "/";
}

/**
 * Returns the EN ↔ ES counterpart for a given path.
 *  en("/services/x")  →  "/es/services/x"
 *  es("/es/services/x") → "/services/x"
 */
export function altLocaleHref(currentLocale: Locale, currentPath: string): string {
  const otherLocale: Locale = currentLocale === "en" ? "es" : "en";
  // Strip current prefix
  const stripped =
    currentLocale === "es" && currentPath.startsWith("/es")
      ? currentPath.slice(3) || "/"
      : currentPath;
  return localePath(otherLocale, stripped);
}
