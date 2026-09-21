import { cache } from "react";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { getLocaleContent } from "@/content";
import type { ServiceSeed } from "@/content/types";
import { locales, type Locale } from "@/i18n/config";
import type { AlternateSlugs, Service } from "./types";

const COLUMNS =
  "id, translation_key, slug, title, short_description, summary, who_for, process_items, body, order_index, featured, seo_title, seo_description, og_image_url, updated_at";

function fromSeed(seed: ServiceSeed): Service {
  return {
    id: `seed-${seed.translation_key}`,
    translation_key: seed.translation_key,
    slug: seed.slug,
    title: seed.title,
    short_description: seed.short_description,
    summary: seed.summary,
    who_for: seed.who_for,
    process_items: seed.process_items,
    body: seed.body,
    order_index: seed.order_index,
    featured: seed.featured,
    seo_title: seed.seo_title,
    seo_description: seed.seo_description,
    og_image_url: null,
    updated_at: null,
  };
}

export const listServices = cache(async (locale: Locale): Promise<Service[]> => {
  const fallback = getLocaleContent(locale).services.map(fromSeed);
  const supabase = getSupabasePublicClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("services")
    .select(COLUMNS)
    .eq("locale", locale)
    .eq("published", true)
    .order("order_index", { ascending: true });

  if (error || !data?.length) return fallback;
  return data as Service[];
});

export const getService = cache(
  async (locale: Locale, slug: string): Promise<Service | null> => {
    const supabase = getSupabasePublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select(COLUMNS)
        .eq("locale", locale)
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!error && data) return data as Service;
    }
    const seed = getLocaleContent(locale).services.find((service) => service.slug === slug);
    return seed ? fromSeed(seed) : null;
  },
);

/** Aynı hizmetin diğer dillerdeki slug'ları (hreflang için). */
export const getServiceAlternates = cache(
  async (translationKey: string): Promise<AlternateSlugs> => {
    const supabase = getSupabasePublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select("locale, slug")
        .eq("translation_key", translationKey)
        .eq("published", true);
      if (!error && data?.length) {
        return Object.fromEntries(data.map((row) => [row.locale, row.slug])) as AlternateSlugs;
      }
    }
    const result: AlternateSlugs = {};
    for (const locale of locales) {
      const match = getLocaleContent(locale).services.find(
        (service) => service.translation_key === translationKey,
      );
      if (match) result[locale] = match.slug;
    }
    return result;
  },
);
