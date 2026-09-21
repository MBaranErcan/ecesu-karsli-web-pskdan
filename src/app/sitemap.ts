import type { MetadataRoute } from "next";
import { localeHrefLang, locales, type Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";
import { listCategories, listPosts } from "@/lib/data/blog";
import { listServices } from "@/lib/data/services";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

const STATIC_ROUTES: { key: RouteKey; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { key: "home", priority: 1, changeFrequency: "weekly" },
  { key: "about", priority: 0.8, changeFrequency: "monthly" },
  { key: "services", priority: 0.9, changeFrequency: "monthly" },
  { key: "online", priority: 0.9, changeFrequency: "monthly" },
  { key: "ankara", priority: 0.9, changeFrequency: "monthly" },
  { key: "blog", priority: 0.8, changeFrequency: "weekly" },
  { key: "faq", priority: 0.7, changeFrequency: "monthly" },
  { key: "contact", priority: 0.7, changeFrequency: "yearly" },
  { key: "appointment", priority: 0.8, changeFrequency: "yearly" },
  { key: "privacy", priority: 0.3, changeFrequency: "yearly" },
  { key: "kvkk", priority: 0.3, changeFrequency: "yearly" },
  { key: "cookies", priority: 0.3, changeFrequency: "yearly" },
];

function languagesFor(key: RouteKey, slugs?: Partial<Record<Locale, string>>) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    if (slugs && !slugs[locale]) continue;
    languages[localeHrefLang[locale]] = absoluteUrl(
      slugs ? href(locale, key, slugs[locale] as string) : href(locale, key),
    );
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    const languages = languagesFor(route.key);
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(href(locale, route.key)),
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      });
    }
  }

  const perLocale = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      services: await listServices(locale),
      posts: await listPosts(locale),
      categories: await listCategories(locale),
    })),
  );

  const collect = (
    kind: "services" | "posts" | "categories",
  ): Map<string, Partial<Record<Locale, string>>> => {
    const map = new Map<string, Partial<Record<Locale, string>>>();
    for (const bucket of perLocale) {
      for (const item of bucket[kind]) {
        const current = map.get(item.translation_key) ?? {};
        current[bucket.locale] = item.slug;
        map.set(item.translation_key, current);
      }
    }
    return map;
  };

  const push = (
    key: RouteKey,
    map: Map<string, Partial<Record<Locale, string>>>,
    priority: number,
    changeFrequency: "weekly" | "monthly",
    lastModifiedFor?: (locale: Locale, slug: string) => Date,
  ) => {
    for (const slugs of map.values()) {
      const languages = languagesFor(key, slugs);
      for (const locale of locales) {
        const slug = slugs[locale];
        if (!slug) continue;
        entries.push({
          url: absoluteUrl(href(locale, key, slug)),
          lastModified: lastModifiedFor?.(locale, slug) ?? new Date(),
          changeFrequency,
          priority,
          alternates: { languages },
        });
      }
    }
  };

  push("services", collect("services"), 0.85, "monthly");

  const postDates = new Map<string, Date>();
  for (const bucket of perLocale) {
    for (const post of bucket.posts) {
      const stamp = post.updated_at ?? post.published_at;
      if (stamp) postDates.set(`${bucket.locale}:${post.slug}`, new Date(stamp));
    }
  }
  push("blog", collect("posts"), 0.7, "monthly", (locale, slug) =>
    postDates.get(`${locale}:${slug}`) ?? new Date(),
  );

  push("blogCategory", collect("categories"), 0.5, "weekly");

  return entries;
}
