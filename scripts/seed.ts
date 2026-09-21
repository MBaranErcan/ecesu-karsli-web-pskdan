/**
 * Başlangıç içeriklerini Supabase'e yazar.
 *
 * Çalıştırma:  npm run seed
 *
 * Var olan kayıtlar (locale + translation_key) üzerinden güncellenir; bu yüzden
 * komut birden fazla kez çalıştırılabilir. Admin panelinden yapılan
 * değişikliklerin üzerine yazacağını unutmayın.
 */
import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "./env";
import { getLocaleContent, sharedSettings } from "../src/content";
import { locales } from "../src/i18n/config";

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

function check(label: string, error: { message: string } | null) {
  if (error) {
    console.error(`✗ ${label}: ${error.message}`);
    process.exitCode = 1;
    return false;
  }
  console.log(`✓ ${label}`);
  return true;
}

async function seedSharedSettings() {
  const rows = Object.entries(sharedSettings).map(([key, value]) => ({
    key,
    locale: "*",
    value,
  }));
  const { error } = await supabase
    .from("site_settings")
    .upsert(rows, { onConflict: "key,locale" });
  check("Ortak ayarlar", error);
}

async function seedLocale(locale: (typeof locales)[number]) {
  const content = getLocaleContent(locale);

  const settingRows = Object.entries(content.settings).map(([key, value]) => ({
    key,
    locale,
    value,
  }));
  check(
    `[${locale}] Ayarlar`,
    (await supabase.from("site_settings").upsert(settingRows, { onConflict: "key,locale" })).error,
  );

  check(
    `[${locale}] Sayfalar (${content.pages.length})`,
    (
      await supabase
        .from("pages")
        .upsert(
          content.pages.map((page) => ({ ...page, locale })),
          { onConflict: "locale,translation_key" },
        )
    ).error,
  );

  check(
    `[${locale}] Çalışma alanları (${content.services.length})`,
    (
      await supabase.from("services").upsert(
        content.services.map((service) => ({ ...service, locale, published: true })),
        { onConflict: "locale,translation_key" },
      )
    ).error,
  );

  check(
    `[${locale}] SSS (${content.faqs.length})`,
    (
      await supabase.from("faqs").upsert(
        content.faqs.map((faq) => ({ ...faq, locale, published: true })),
        { onConflict: "locale,translation_key" },
      )
    ).error,
  );

  check(
    `[${locale}] Blog kategorileri (${content.blogCategories.length})`,
    (
      await supabase.from("blog_categories").upsert(
        content.blogCategories.map((category) => ({ ...category, locale })),
        { onConflict: "locale,translation_key" },
      )
    ).error,
  );

  const { data: categories, error: categoryError } = await supabase
    .from("blog_categories")
    .select("id, translation_key")
    .eq("locale", locale);

  if (categoryError) {
    check(`[${locale}] Kategori kimlikleri`, categoryError);
    return;
  }

  const categoryIds = new Map(
    (categories ?? []).map((row) => [row.translation_key as string, row.id as string]),
  );

  const posts = content.blogPosts.map((post) => ({
    locale,
    translation_key: post.translation_key,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category_id: categoryIds.get(post.category_key) ?? null,
    author_name: "Ecesu Karslı",
    status: "published" as const,
    published_at: new Date(`${post.published_at}T09:00:00Z`).toISOString(),
    seo_title: post.seo_title,
    seo_description: post.seo_description,
  }));

  check(
    `[${locale}] Blog yazıları (${posts.length})`,
    (await supabase.from("blog_posts").upsert(posts, { onConflict: "locale,translation_key" }))
      .error,
  );
}

async function main() {
  console.log("\nBaşlangıç içerikleri yükleniyor…\n");
  await seedSharedSettings();
  for (const locale of locales) {
    await seedLocale(locale);
  }
  console.log(
    process.exitCode === 1
      ? "\nBazı adımlar başarısız oldu. Yukarıdaki hataları kontrol edin.\n"
      : "\nTamamlandı.\n",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
