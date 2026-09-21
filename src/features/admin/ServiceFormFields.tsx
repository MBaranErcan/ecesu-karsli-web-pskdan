import { CheckboxField, TextAreaField, TextField } from "./fields";
import { MarkdownEditor } from "./MarkdownEditor";
import type { Locale } from "@/i18n/config";

export interface ServiceFormValues {
  locale: Locale;
  translation_key?: string | null;
  slug?: string | null;
  title?: string | null;
  short_description?: string | null;
  summary?: string | null;
  who_for?: string[] | null;
  process_items?: string[] | null;
  body?: string | null;
  order_index?: number | null;
  featured?: boolean | null;
  published?: boolean | null;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image_url?: string | null;
}

export function ServiceFormFields({ values }: { values: ServiceFormValues }) {
  return (
    <>
      <input type="hidden" name="locale" value={values.locale} />

      <div className="grid gap-5 lg:grid-cols-2">
        <TextField name="title" label="Başlık" required defaultValue={values.title} />
        <TextField
          name="slug"
          label="Slug"
          defaultValue={values.slug}
          hint="Adres satırında görünür. Boş bırakılırsa başlıktan üretilir."
        />
      </div>

      <TextField
        name="translation_key"
        label="Çeviri anahtarı"
        defaultValue={values.translation_key}
        hint="Diller arasında aynı çalışma alanını eşleştirir (ör. sinav-kaygisi)."
      />

      <TextAreaField
        name="short_description"
        label="Kısa açıklama"
        rows={2}
        required
        defaultValue={values.short_description}
        hint="Kartlarda görünen tek cümlelik açıklama."
      />

      <TextAreaField
        name="summary"
        label="Giriş paragrafı"
        rows={4}
        defaultValue={values.summary}
        hint="Sayfa başlığının altında görünür."
      />

      <TextAreaField
        name="who_for"
        label="Kimler için uygun olabilir?"
        rows={6}
        defaultValue={(values.who_for ?? []).join("\n")}
        hint="Her satır bir madde."
      />

      <TextAreaField
        name="process_items"
        label="Süreçte neler ele alınabilir?"
        rows={6}
        defaultValue={(values.process_items ?? []).join("\n")}
        hint="Her satır bir madde."
      />

      <MarkdownEditor name="body" label="Sayfa içeriği" rows={20} defaultValue={values.body} />

      <div className="grid gap-5 lg:grid-cols-3">
        <TextField
          name="order_index"
          label="Sıra"
          type="number"
          defaultValue={values.order_index ?? 0}
        />
        <CheckboxField name="featured" label="Ana sayfada göster" defaultChecked={values.featured ?? true} />
        <CheckboxField name="published" label="Yayında" defaultChecked={values.published ?? true} />
      </div>

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
          <TextField name="og_image_url" label="OG görseli (URL)" defaultValue={values.og_image_url} />
        </div>
      </fieldset>
    </>
  );
}
