"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../auth";
import { adminCopy } from "../copy";
import { slugify } from "@/lib/utils";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { APPOINTMENT_STATUSES, type AppointmentStatus } from "@/features/appointments/schema";
import { SETTINGS_GROUPS } from "@/lib/data/settings";
import type { ActionState } from "./state";

function text(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optionalText(formData: FormData, key: string): string | null {
  const value = text(formData, key);
  return value === "" ? null : value;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function lines(formData: FormData, key: string): string[] {
  return text(formData, key)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function localeOf(formData: FormData): Locale {
  const value = text(formData, "locale");
  return isLocale(value) ? value : defaultLocale;
}

/** Tüm public sayfaları tazeler; küçük bir site için en güvenli yol. */
function revalidateSite() {
  revalidatePath("/", "layout");
}

function fail(error: { message: string } | null): ActionState {
  return { status: "error", message: error?.message ?? adminCopy.error };
}

/* -------------------------------------------------------------- Ayarlar */

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const group = text(formData, "group");
  const isShared = (SETTINGS_GROUPS.shared as readonly string[]).includes(group);
  const isLocalized = (SETTINGS_GROUPS.localized as readonly string[]).includes(group);
  if (!isShared && !isLocalized) return { status: "error", message: adminCopy.error };

  const locale = isShared ? "*" : localeOf(formData);
  const value: Record<string, string> = {};

  for (const [key, entry] of formData.entries()) {
    // Next.js'in eklediği $ACTION_* alanları ve form kontrol alanları atlanır.
    if (key.startsWith("$") || key === "group" || key === "locale") continue;
    if (typeof entry === "string") value[key] = entry.trim();
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: group, locale, value, updated_at: new Date().toISOString() }, { onConflict: "key,locale" });

  if (error) return fail(error);
  revalidateSite();
  return { status: "success" };
}

/* --------------------------------------------------------------- Sayfalar */

export async function savePage(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const locale = localeOf(formData);
  const translationKey = text(formData, "translation_key");
  if (!translationKey) return { status: "error", message: adminCopy.error };

  const { error } = await supabase.from("pages").upsert(
    {
      locale,
      translation_key: translationKey,
      slug: text(formData, "slug") || translationKey,
      title: text(formData, "title"),
      subtitle: optionalText(formData, "subtitle"),
      eyebrow: optionalText(formData, "eyebrow"),
      body: optionalText(formData, "body"),
      seo_title: optionalText(formData, "seo_title"),
      seo_description: optionalText(formData, "seo_description"),
      og_image_url: optionalText(formData, "og_image_url"),
      noindex: bool(formData, "noindex"),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "locale,translation_key" },
  );

  if (error) return fail(error);
  revalidateSite();
  return { status: "success" };
}

/* --------------------------------------------------------- Çalışma alanları */

export async function saveService(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const locale = localeOf(formData);
  const title = text(formData, "title");
  const translationKey = text(formData, "translation_key") || slugify(title);

  const { error } = await supabase.from("services").upsert(
    {
      locale,
      translation_key: translationKey,
      slug: slugify(text(formData, "slug") || title),
      title,
      short_description: text(formData, "short_description"),
      summary: optionalText(formData, "summary"),
      who_for: lines(formData, "who_for"),
      process_items: lines(formData, "process_items"),
      body: optionalText(formData, "body"),
      order_index: Number(text(formData, "order_index") || 0),
      featured: bool(formData, "featured"),
      published: bool(formData, "published"),
      seo_title: optionalText(formData, "seo_title"),
      seo_description: optionalText(formData, "seo_description"),
      og_image_url: optionalText(formData, "og_image_url"),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "locale,translation_key" },
  );

  if (error) return fail(error);
  revalidateSite();
  return { status: "success" };
}

export async function deleteService(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  await supabase.from("services").delete().eq("id", id);
  revalidateSite();
  redirect("/admin/calisma-alanlari");
}

/* -------------------------------------------------------------------- SSS */

export async function saveFaq(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const locale = localeOf(formData);
  const question = text(formData, "question");
  const translationKey = text(formData, "translation_key") || slugify(question);

  const { error } = await supabase.from("faqs").upsert(
    {
      locale,
      translation_key: translationKey,
      question,
      answer: text(formData, "answer"),
      category: optionalText(formData, "category"),
      order_index: Number(text(formData, "order_index") || 0),
      featured: bool(formData, "featured"),
      published: bool(formData, "published"),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "locale,translation_key" },
  );

  if (error) return fail(error);
  revalidateSite();
  return { status: "success" };
}

export async function deleteFaq(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("faqs").delete().eq("id", text(formData, "id"));
  revalidateSite();
  redirect(`/admin/sss?locale=${text(formData, "locale") || defaultLocale}`);
}

/* -------------------------------------------------------------- Kategoriler */

export async function saveCategory(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const locale = localeOf(formData);
  const name = text(formData, "name");
  const translationKey = text(formData, "translation_key") || slugify(name);

  const { error } = await supabase.from("blog_categories").upsert(
    {
      locale,
      translation_key: translationKey,
      slug: slugify(text(formData, "slug") || name),
      name,
      description: optionalText(formData, "description"),
      order_index: Number(text(formData, "order_index") || 0),
    },
    { onConflict: "locale,translation_key" },
  );

  if (error) return fail(error);
  revalidateSite();
  return { status: "success" };
}

export async function deleteCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("blog_categories").delete().eq("id", text(formData, "id"));
  revalidateSite();
  redirect(`/admin/kategoriler?locale=${text(formData, "locale") || defaultLocale}`);
}

/* --------------------------------------------------------------- Blog */

export async function savePost(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const locale = localeOf(formData);
  const id = optionalText(formData, "id");
  const title = text(formData, "title");
  const slug = slugify(text(formData, "slug") || title);
  const status = text(formData, "status") === "published" ? "published" : "draft";
  const publishedAtInput = optionalText(formData, "published_at");

  const payload = {
    locale,
    translation_key: text(formData, "translation_key") || slug,
    slug,
    title,
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    cover_image_url: optionalText(formData, "cover_image_url"),
    cover_image_alt: optionalText(formData, "cover_image_alt"),
    category_id: optionalText(formData, "category_id"),
    author_name: text(formData, "author_name") || "Ecesu Karslı",
    status,
    published_at:
      status === "published" ? (publishedAtInput ?? new Date().toISOString()) : publishedAtInput,
    seo_title: optionalText(formData, "seo_title"),
    seo_description: optionalText(formData, "seo_description"),
    canonical_url: optionalText(formData, "canonical_url"),
    og_image_url: optionalText(formData, "og_image_url"),
    updated_at: new Date().toISOString(),
  };

  if (!title || !payload.content) {
    return { status: "error", message: "Başlık ve içerik zorunludur." };
  }

  if (id) {
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
    if (error) return fail(error);
    revalidateSite();
    return { status: "success" };
  }

  const { data, error } = await supabase.from("blog_posts").insert(payload).select("id").single();
  if (error) return fail(error);
  revalidateSite();
  redirect(`/admin/blog/${data.id}`);
}

export async function deletePost(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("blog_posts").delete().eq("id", text(formData, "id"));
  revalidateSite();
  redirect("/admin/blog");
}

export async function togglePostStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const next = text(formData, "next") === "published" ? "published" : "draft";

  await supabase
    .from("blog_posts")
    .update({
      status: next,
      published_at: next === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidateSite();
  redirect("/admin/blog");
}

/* ------------------------------------------------------- Randevu talepleri */

export async function updateRequestStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const status = text(formData, "status") as AppointmentStatus;
  if (!APPOINTMENT_STATUSES.includes(status)) return;

  await supabase
    .from("appointment_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  revalidatePath("/admin/talepler");
  redirect("/admin/talepler");
}

export async function saveRequestNote(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("appointment_requests")
    .update({ admin_notes: optionalText(formData, "admin_notes"), updated_at: new Date().toISOString() })
    .eq("id", text(formData, "id"));

  if (error) return fail(error);
  revalidatePath("/admin/talepler");
  return { status: "success" };
}

export async function deleteRequest(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("appointment_requests").delete().eq("id", text(formData, "id"));
  revalidatePath("/admin/talepler");
  redirect("/admin/talepler");
}
