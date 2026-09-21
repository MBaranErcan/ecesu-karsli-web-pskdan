import type { Locale } from "@/i18n/config";

export interface Service {
  id: string;
  translation_key: string;
  slug: string;
  title: string;
  short_description: string;
  summary: string;
  who_for: string[];
  process_items: string[];
  body: string;
  order_index: number;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  updated_at: string | null;
}

export interface Page {
  id: string;
  translation_key: string;
  slug: string;
  title: string;
  subtitle: string | null;
  eyebrow: string | null;
  body: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  noindex: boolean;
  updated_at: string | null;
}

export interface Faq {
  id: string;
  translation_key: string;
  question: string;
  answer: string;
  category: string | null;
  order_index: number;
  featured: boolean;
}

export interface BlogCategory {
  id: string;
  translation_key: string;
  slug: string;
  name: string;
  description: string | null;
  order_index: number;
}

export interface BlogPost {
  id: string;
  translation_key: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  author_name: string;
  published_at: string | null;
  updated_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  category: Pick<BlogCategory, "slug" | "name" | "translation_key"> | null;
}

/** Diller arası eşleşen slug'lar; hreflang alternatifleri için kullanılır. */
export type AlternateSlugs = Partial<Record<Locale, string>>;
