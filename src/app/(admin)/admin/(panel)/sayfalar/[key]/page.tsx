import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/features/admin/auth";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card } from "@/features/admin/ui";
import { savePage } from "@/features/admin/actions/content";
import { CheckboxField, TextAreaField, TextField } from "@/features/admin/fields";
import { MarkdownEditor } from "@/features/admin/MarkdownEditor";
import { getLocaleContent } from "@/content";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function AdminEditPagePage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { key } = await params;
  const { locale: rawLocale } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const { supabase } = await requireAdmin();

  const seed = getLocaleContent(locale).pages.find((page) => page.translation_key === key);
  if (!seed) notFound();

  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("locale", locale)
    .eq("translation_key", key)
    .maybeSingle();

  const values = data ?? seed;

  return (
    <>
      <AdminPageHeader
        title={seed.title}
        description={`Dil: ${locale.toUpperCase()} · Anahtar: ${key}`}
        action={
          <Link
            href={`/admin/sayfalar?locale=${locale}`}
            className="text-sm text-ink-600 hover:underline"
          >
            Listeye dön
          </Link>
        }
      />

      {!data ? (
        <p className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Bu sayfa henüz veritabanına kaydedilmedi. Aşağıdaki içerik, kod içindeki başlangıç
          metnidir. Kaydettiğinizde veritabanına yazılır ve bundan sonra buradan yönetilir.
        </p>
      ) : null}

      <Card>
        <AdminForm action={savePage} submitLabel="Sayfayı kaydet">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="translation_key" value={key} />
          <input type="hidden" name="slug" value={values.slug ?? key} />

          <TextField name="eyebrow" label="Üst etiket" defaultValue={values.eyebrow} />
          <TextField name="title" label="Başlık (H1)" required defaultValue={values.title} />
          <TextAreaField name="subtitle" label="Alt başlık" rows={3} defaultValue={values.subtitle} />
          <MarkdownEditor
            name="body"
            label="İçerik"
            rows={24}
            defaultValue={values.body}
            hint="Bazı sayfalarda (ana sayfa, blog, SSS, iletişim) içerik alanı kullanılmaz; düzen bileşenlerden gelir."
          />

          <fieldset className="rounded-2xl border border-ink-200 p-5">
            <legend className="px-2 text-sm font-medium text-ink-700">SEO</legend>
            <div className="space-y-5">
              <TextField name="seo_title" label="SEO başlığı" defaultValue={values.seo_title} />
              <TextAreaField
                name="seo_description"
                label="Meta açıklama"
                rows={3}
                defaultValue={values.seo_description}
              />
              <TextField
                name="og_image_url"
                label="OG görseli (URL)"
                defaultValue={"og_image_url" in values ? values.og_image_url : ""}
              />
              <CheckboxField
                name="noindex"
                label="Arama motorlarında gösterme (noindex)"
                defaultChecked={"noindex" in values ? Boolean(values.noindex) : false}
              />
            </div>
          </fieldset>
        </AdminForm>
      </Card>
    </>
  );
}
