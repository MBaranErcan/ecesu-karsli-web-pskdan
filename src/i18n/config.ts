export const locales = ["tr", "en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeLabels: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch",
};

export const localeShortLabels: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
  de: "DE",
};

/** hreflang / OpenGraph için tam dil kodları. */
export const localeHrefLang: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en",
  de: "de-DE",
};

export const openGraphLocale: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
  de: "de_DE",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
