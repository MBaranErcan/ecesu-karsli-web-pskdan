import { cache } from "react";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { getLocaleContent } from "@/content";
import type { PageSeed } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Page } from "./types";

function fromSeed(seed: PageSeed): Page {
  return {
    id: `seed-${seed.translation_key}`,
    translation_key: seed.translation_key,
    slug: seed.slug,
    title: seed.title,
    subtitle: seed.subtitle,
    eyebrow: seed.eyebrow,
    body: seed.body,
    seo_title: seed.seo_title,
    seo_description: seed.seo_description,
    og_image_url: null,
    noindex: false,
    updated_at: null,
  };
}

/** Statik sayfaların (hakkımda, online, yasal metinler…) içeriğini getirir. */
export const getPage = cache(async (locale: Locale, key: string): Promise<Page | null> => {
  const seed = getLocaleContent(locale).pages.find((page) => page.translation_key === key);
  const fallback = seed ? fromSeed(seed) : null;

  const supabase = getSupabasePublicClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("pages")
    .select(
      "id, translation_key, slug, title, subtitle, eyebrow, body, seo_title, seo_description, og_image_url, noindex, updated_at",
    )
    .eq("locale", locale)
    .eq("translation_key", key)
    .maybeSingle();

  if (error || !data) return fallback;
  return data as Page;
});
