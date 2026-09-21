import { defaultLocale, type Locale } from "./config";
import { tr, type Dictionary } from "./dictionaries/tr";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";

const dictionaries: Record<Locale, Dictionary> = { tr, en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** "{minutes} dk okuma" gibi basit yer tutucuları doldurur. */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type { Dictionary };
