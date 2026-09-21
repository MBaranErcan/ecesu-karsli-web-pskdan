import { cache } from "react";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { getLocaleContent } from "@/content";
import type { BlogCategorySeed, BlogPostSeed } from "@/content/types";
import { locales, type Locale } from "@/i18n/config";
import type { AlternateSlugs, BlogCategory, BlogPost } from "./types";

const POST_COLUMNS =
  "id, translation_key, slug, title, excerpt, content, cover_image_url, cover_image_alt, author_name, published_at, updated_at, seo_title, seo_description, canonical_url, og_image_url, category:blog_categories(slug, name, translation_key)";

const DEFAULT_AUTHOR = "Ecesu Karslı";

function categoryFromSeed(seed: BlogCategorySeed): BlogCategory {
  return {
    id: `seed-${seed.translation_key}`,
    translation_key: seed.translation_key,
    slug: seed.slug,
    name: seed.name,
    description: seed.description,
    order_index: seed.order_index,
  };
}

function postFromSeed(seed: BlogPostSeed, locale: Locale): BlogPost {
  const category = getLocaleContent(locale).blogCategories.find(
    (item) => item.translation_key === seed.category_key,
  );
  return {
    id: `seed-${seed.translation_key}`,
    translation_key: seed.translation_key,
    slug: seed.slug,
    title: seed.title,
    excerpt: seed.excerpt,
    content: seed.content,
    cover_image_url: null,
    cover_image_alt: null,
    author_name: DEFAULT_AUTHOR,
    published_at: seed.published_at,
    updated_at: seed.published_at,
    seo_title: seed.seo_title,
    seo_description: seed.seo_description,
    canonical_url: null,
    og_image_url: null,
    category: category
      ? { slug: category.slug, name: category.name, translation_key: category.translation_key }
      : null,
  };
}

/** Supabase ilişkili seçimlerde kategoriyi dizi olarak döndürebilir; tekile indirger. */
function normalizePost(row: Record<string, unknown>): BlogPost {
  const rawCategory = row.category;
  const category = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
  return { ...(row as unknown as BlogPost), category: (category ?? null) as BlogPost["category"] };
}

export const listCategories = cache(async (locale: Locale): Promise<BlogCategory[]> => {
  const fallback = getLocaleContent(locale).blogCategories.map(categoryFromSeed);
  const supabase = getSupabasePublicClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("blog_categories")
    .select("id, translation_key, slug, name, description, order_index")
    .eq("locale", locale)
    .order("order_index", { ascending: true });

  if (error || !data?.length) return fallback;
  return data as BlogCategory[];
});

export const listPosts = cache(
  async (
    locale: Locale,
    options: { limit?: number; categorySlug?: string } = {},
  ): Promise<BlogPost[]> => {
    const supabase = getSupabasePublicClient();

    if (supabase) {
      let query = supabase
        .from("blog_posts")
        .select(POST_COLUMNS)
        .eq("locale", locale)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });

      if (options.limit) query = query.limit(options.limit);

      const { data, error } = await query;
      if (!error && data?.length) {
        const posts = data.map((row) => normalizePost(row as Record<string, unknown>));
        return options.categorySlug
          ? posts.filter((post) => post.category?.slug === options.categorySlug)
          : posts;
      }
      if (!error) return [];
    }

    let fallback = getLocaleContent(locale)
      .blogPosts.map((seed) => postFromSeed(seed, locale))
      .sort((a, b) => (a.published_at ?? "") < (b.published_at ?? "") ? 1 : -1);

    if (options.categorySlug) {
      fallback = fallback.filter((post) => post.category?.slug === options.categorySlug);
    }
    return options.limit ? fallback.slice(0, options.limit) : fallback;
  },
);

export const getPost = cache(
  async (locale: Locale, slug: string): Promise<BlogPost | null> => {
    const supabase = getSupabasePublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(POST_COLUMNS)
        .eq("locale", locale)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (!error && data) return normalizePost(data as Record<string, unknown>);
      if (!error) return null;
    }
    const seed = getLocaleContent(locale).blogPosts.find((post) => post.slug === slug);
    return seed ? postFromSeed(seed, locale) : null;
  },
);

export const getPostAlternates = cache(
  async (translationKey: string): Promise<AlternateSlugs> => {
    const supabase = getSupabasePublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("locale, slug")
        .eq("translation_key", translationKey)
        .eq("status", "published");
      if (!error && data?.length) {
        return Object.fromEntries(data.map((row) => [row.locale, row.slug])) as AlternateSlugs;
      }
    }
    const result: AlternateSlugs = {};
    for (const locale of locales) {
      const match = getLocaleContent(locale).blogPosts.find(
        (post) => post.translation_key === translationKey,
      );
      if (match) result[locale] = match.slug;
    }
    return result;
  },
);

export const getCategoryAlternates = cache(
  async (translationKey: string): Promise<AlternateSlugs> => {
    const supabase = getSupabasePublicClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("locale, slug")
        .eq("translation_key", translationKey);
      if (!error && data?.length) {
        return Object.fromEntries(data.map((row) => [row.locale, row.slug])) as AlternateSlugs;
      }
    }
    const result: AlternateSlugs = {};
    for (const locale of locales) {
      const match = getLocaleContent(locale).blogCategories.find(
        (category) => category.translation_key === translationKey,
      );
      if (match) result[locale] = match.slug;
    }
    return result;
  },
);

/** Aynı kategoriden, mevcut yazı dışındaki en yeni yazılar. */
export async function listRelatedPosts(
  locale: Locale,
  post: BlogPost,
  limit = 3,
): Promise<BlogPost[]> {
  const all = await listPosts(locale);
  const sameCategory = all.filter(
    (item) => item.id !== post.id && item.category?.slug === post.category?.slug,
  );
  const others = all.filter(
    (item) => item.id !== post.id && item.category?.slug !== post.category?.slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
