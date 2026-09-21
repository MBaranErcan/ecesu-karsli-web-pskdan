import { CheckboxField, SelectField, TextAreaField, TextField } from "./fields";
import { MarkdownEditor } from "./MarkdownEditor";
import type { Locale } from "@/i18n/config";

export interface PostFormValues {
  id?: string;
  locale: Locale;
  translation_key?: string | null;
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  cover_image_url?: string | null;
  cover_image_alt?: string | null;
  category_id?: string | null;
  author_name?: string | null;
  status?: string | null;
  published_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  og_image_url?: string | null;
}

/** datetime-local girdisi için ISO tarihi kırpar. */
function toLocalInput(value?: string | null): string {
  if (!value) return "";
  return value.slice(0, 16);
}

export function PostFormFields({
  values,
  categories,
}: {
  values: PostFormValues;
  categories: { id: string; name: string }[];
}) {
  return (
    <>
      <input type="hidden" name="locale" value={values.locale} />
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <input type="hidden" name="translation_key" value={values.translation_key ?? ""} />

      <div className="grid gap-5 lg:grid-cols-2">
        <TextField name="title" label="Başlık" required defaultValue={values.title} />
        <TextField
          name="slug"
          label="Slug"
          defaultValue={values.slug}
          hint="Boş bırakılırsa başlıktan otomatik üretilir."
        />
      </div>

      <TextAreaField
        name="excerpt"
        label="Kısa açıklama"
        rows={3}
        defaultValue={values.excerpt}
        hint="Liste kartlarında ve meta açıklaması boşsa arama sonuçlarında görünür."
      />

      <MarkdownEditor
        name="content"
        label="İçerik"
        rows={24}
        required
        defaultValue={values.content}
        hint="Araç çubuğunu kullanabilir ya da doğrudan Markdown yazabilirsiniz. H2 ve H3 başlıkları, yazı sayfasındaki içindekiler listesini otomatik oluşturur."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <SelectField
          name="category_id"
          label="Kategori"
          defaultValue={values.category_id}
          options={categories.map((category) => ({ value: category.id, label: category.name }))}
        />
        <TextField
          name="author_name"
          label="Yazar"
          defaultValue={values.author_name ?? "Ecesu Karslı"}
        />
        <TextField
          name="cover_image_url"
          label="Kapak görseli (URL)"
          defaultValue={values.cover_image_url}
          hint="Görseller sayfasından yükleyip bağlantıyı buraya yapıştırabilirsiniz."
        />
        <TextField
          name="cover_image_alt"
          label="Kapak görseli alternatif metni"
          defaultValue={values.cover_image_alt}
        />
      </div>

      <fieldset className="rounded-2xl border border-ink-200 p-5">
        <legend className="px-2 text-sm font-medium text-ink-700">Yayın</legend>
        <div className="grid gap-5 lg:grid-cols-2">
          <SelectField
            name="status"
            label="Durum"
            defaultValue={values.status ?? "draft"}
            options={[
              { value: "draft", label: "Taslak" },
              { value: "published", label: "Yayında" },
            ]}
          />
          <TextField
            name="published_at"
            label="Yayın tarihi"
            type="datetime-local"
            defaultValue={toLocalInput(values.published_at)}
            hint="Boş bırakılırsa yayına alındığı an kullanılır."
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-ink-200 p-5">
        <legend className="px-2 text-sm font-medium text-ink-700">SEO</legend>
        <div className="space-y-5">
          <TextField name="seo_title" label="SEO başlığı" defaultValue={values.seo_title} />
          <TextAreaField
            name="seo_description"
            label="Meta açıklama"
            rows={3}
            defaultValue={values.seo_description}
            hint="150-160 karakter arası önerilir."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <TextField
              name="canonical_url"
              label="Canonical URL"
              defaultValue={values.canonical_url}
              hint="Yalnızca içerik başka bir adreste de yayınlanıyorsa doldurun."
            />
            <TextField name="og_image_url" label="OG görseli (URL)" defaultValue={values.og_image_url} />
          </div>
        </div>
      </fieldset>
    </>
  );
}

export { CheckboxField };
