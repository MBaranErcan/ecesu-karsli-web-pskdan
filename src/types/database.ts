/**
 * Supabase tablolarının uygulama tarafındaki tip karşılıkları.
 * Şema tanımı: database/migrations/0001_init.sql
 */

export type PostStatus = "draft" | "published";

export type MeetingPreference = "online" | "yuz-yuze-ankara" | "farketmez";

export type AppointmentReason =
  | "kaygi"
  | "sinav-sureci"
  | "aile-ici-iletisim"
  | "ozsaygi"
  | "anlam-arayisi"
  | "ebeveyn-danismanligi"
  | "diger"
  | "belirtmek-istemiyorum";

export type AppointmentStatus = "yeni" | "iletisime-gecildi" | "planlandi" | "kapandi";

export interface SiteSettingRow {
  key: string;
  value: Record<string, string>;
  updated_at: string;
}

export interface PageRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  eyebrow: string | null;
  body: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  noindex: boolean;
  updated_at: string;
}

export interface ServiceRow {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  summary: string | null;
  who_for: string[];
  process_items: string[];
  body: string | null;
  order_index: number;
  featured: boolean;
  published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order_index: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogCategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  category_id: string | null;
  author_name: string;
  status: PostStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostWithCategory extends BlogPostRow {
  category: Pick<BlogCategoryRow, "id" | "slug" | "name"> | null;
}

export interface AppointmentRequestRow {
  id: string;
  full_name: string;
  age: number | null;
  phone: string;
  email: string;
  meeting_preference: MeetingPreference;
  reason: AppointmentReason;
  message: string | null;
  consent: boolean;
  status: AppointmentStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaRow {
  id: string;
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}

export interface AdminRow {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}
