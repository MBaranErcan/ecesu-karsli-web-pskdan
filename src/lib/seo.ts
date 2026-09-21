import type { Metadata } from "next";
import { env } from "@/lib/env";
import {
  defaultLocale,
  localeHrefLang,
  locales,
  openGraphLocale,
  type Locale,
} from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";
import type { AlternateSlugs } from "@/lib/data/types";

export function absoluteUrl(path: string): string {
  return `${env.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

interface MetadataInput {
  locale: Locale;
  routeKey: RouteKey;
  /** Detay sayfalarında dile göre değişen slug'lar. */
  slugByLocale?: AlternateSlugs;
  /** Slug'ın önüne eklenecek sabit segmentler (ör. kategori sayfaları). */
  extraSegments?: string[];
  title: string;
  description: string;
  siteName: string;
  ogImage?: string | null;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  canonicalOverride?: string | null;
}

function pathFor(
  locale: Locale,
  routeKey: RouteKey,
  extraSegments: string[],
  slug?: string,
): string {
  const segments = [...extraSegments, ...(slug ? [slug] : [])];
  return href(locale, routeKey, ...segments);
}

/** Sayfa metadata'sını, hreflang alternatifleriyle birlikte üretir. */
export function buildMetadata(input: MetadataInput): Metadata {
  const {
    locale,
    routeKey,
    slugByLocale,
    extraSegments = [],
    title,
    description,
    siteName,
    ogImage,
    noindex = false,
    type = "website",
    publishedTime,
    modifiedTime,
    canonicalOverride,
  } = input;

  const currentSlug = slugByLocale?.[locale];
  const canonicalPath = pathFor(locale, routeKey, extraSegments, currentSlug);
  const canonical = canonicalOverride || absoluteUrl(canonicalPath);

  const languages: Record<string, string> = {};
  for (const item of locales) {
    if (slugByLocale && !slugByLocale[item]) continue;
    languages[localeHrefLang[item]] = absoluteUrl(
      pathFor(item, routeKey, extraSegments, slugByLocale?.[item]),
    );
  }
  const defaultHref = languages[localeHrefLang[defaultLocale]];
  if (defaultHref) languages["x-default"] = defaultHref;

  const images = ogImage ? [{ url: ogImage, alt: title }] : undefined;

  return {
    // seo_title alanları marka adını zaten içerdiği için layout şablonu
    // uygulanmaz; başlık olduğu gibi kullanılır.
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: openGraphLocale[locale],
      type,
      images,
      ...(type === "article"
        ? {
            publishedTime: publishedTime ?? undefined,
            modifiedTime: modifiedTime ?? undefined,
          }
        : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
