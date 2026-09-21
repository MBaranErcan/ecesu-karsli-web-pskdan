import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Uygulama içi (canonical) yollar ile her dile ait görünen yollar arasındaki
 * eşleşme. `app/[locale]/...` altındaki klasör adları canonical yollardır;
 * ziyaretçinin gördüğü adres dile göre yeniden yazılır (middleware).
 */
export const routeMap = {
  home: { canonical: "", tr: "", en: "", de: "" },
  about: { canonical: "about", tr: "hakkimda", en: "about", de: "ueber-mich" },
  services: {
    canonical: "services",
    tr: "calisma-alanlari",
    en: "services",
    de: "leistungen",
  },
  online: {
    canonical: "online",
    tr: "online-danismanlik",
    en: "online-counselling",
    de: "online-beratung",
  },
  ankara: {
    canonical: "ankara",
    tr: "ankara-psikolojik-danismanlik",
    en: "counselling-in-ankara",
    de: "beratung-in-ankara",
  },
  blogCategory: {
    canonical: "blog/category",
    tr: "blog/kategori",
    en: "blog/category",
    de: "blog/kategorie",
  },
  blog: { canonical: "blog", tr: "blog", en: "blog", de: "blog" },
  faq: { canonical: "faq", tr: "sss", en: "faq", de: "haeufige-fragen" },
  contact: { canonical: "contact", tr: "iletisim", en: "contact", de: "kontakt" },
  appointment: {
    canonical: "appointment",
    tr: "randevu",
    en: "appointment",
    de: "termin",
  },
  privacy: {
    canonical: "legal/privacy",
    tr: "gizlilik",
    en: "privacy-policy",
    de: "datenschutz",
  },
  kvkk: {
    canonical: "legal/kvkk",
    tr: "kvkk",
    en: "data-protection-notice",
    de: "kvkk-hinweis",
  },
  cookies: {
    canonical: "legal/cookies",
    tr: "cerez-politikasi",
    en: "cookie-policy",
    de: "cookie-richtlinie",
  },
} as const;

export type RouteKey = keyof typeof routeMap;

const routeKeys = (Object.keys(routeMap) as RouteKey[]).filter((key) => key !== "home");

/** En uzun yol önce denenmeli ki "blog/kategori", "blog"dan önce eşleşsin. */
function keysByLocalizedLength(locale: Locale): RouteKey[] {
  return [...routeKeys].sort(
    (a, b) => routeMap[b][locale].length - routeMap[a][locale].length,
  );
}

/**
 * Dil ve rota anahtarından ziyaretçiye gösterilecek adresi üretir.
 * `segments` ile detay sayfalarının slug'ları eklenir.
 */
export function href(locale: Locale, key: RouteKey, ...segments: string[]): string {
  const localized = routeMap[key][locale];
  const parts = [locale, localized, ...segments].filter((part) => part !== "");
  return `/${parts.join("/")}`;
}

/** Localized yolu canonical yola çevirir. Eşleşme yoksa null döner. */
export function toCanonicalPath(locale: Locale, rest: string): string | null {
  if (rest === "") return null;
  for (const key of keysByLocalizedLength(locale)) {
    const localized = routeMap[key][locale];
    if (localized === "") continue;
    if (rest === localized) return routeMap[key].canonical;
    if (rest.startsWith(`${localized}/`)) {
      return `${routeMap[key].canonical}${rest.slice(localized.length)}`;
    }
  }
  return null;
}

/**
 * Canonical yolla doğrudan gelen istekleri (ör. /de/legal/privacy) tespit eder
 * ki doğru dildeki adrese kalıcı olarak yönlendirilebilsin.
 */
export function toLocalizedPath(locale: Locale, rest: string): string | null {
  if (rest === "") return null;
  const keys = [...routeKeys].sort(
    (a, b) => routeMap[b].canonical.length - routeMap[a].canonical.length,
  );
  for (const key of keys) {
    const canonical = routeMap[key].canonical;
    const localized = routeMap[key][locale];
    if (canonical === localized) continue;
    if (rest === canonical) return localized;
    if (rest.startsWith(`${canonical}/`)) {
      return `${localized}${rest.slice(canonical.length)}`;
    }
  }
  return null;
}

/** URL'in ilk parçasından dili okur. */
export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLocale(first) ? first : defaultLocale;
}
