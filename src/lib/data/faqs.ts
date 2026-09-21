import { cache } from "react";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { getLocaleContent } from "@/content";
import type { FaqSeed } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { Faq } from "./types";

function fromSeed(seed: FaqSeed): Faq {
  return {
    id: `seed-${seed.translation_key}`,
    translation_key: seed.translation_key,
    question: seed.question,
    answer: seed.answer,
    category: seed.category,
    order_index: seed.order_index,
    featured: seed.featured,
  };
}

export const listFaqs = cache(async (locale: Locale): Promise<Faq[]> => {
  const fallback = getLocaleContent(locale).faqs.map(fromSeed);
  const supabase = getSupabasePublicClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("faqs")
    .select("id, translation_key, question, answer, category, order_index, featured")
    .eq("locale", locale)
    .eq("published", true)
    .order("order_index", { ascending: true });

  if (error || !data?.length) return fallback;
  return data as Faq[];
});

export async function listFeaturedFaqs(locale: Locale, limit = 5): Promise<Faq[]> {
  const all = await listFaqs(locale);
  const featured = all.filter((faq) => faq.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
