import { en } from "@/locales/en";
import { es } from "@/locales/es";
import type { Locale } from "@/lib/i18n";

const DICTS = { en, es } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return DICTS[locale];
}
