import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card, EmptyState, LocaleTabs } from "@/features/admin/ui";
import { deleteCategory, saveCategory } from "@/features/admin/actions/content";
import { DangerButton } from "@/features/admin/FormControls";
import { TextAreaField, TextField } from "@/features/admin/fields";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

interface CategoryRow {
  id: string;
  translation_key: string;
  slug: string;
  name: string;
  description: string | null;
  order_index: number;
}

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { locale: rawLocale } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const { data } = await supabase
    .from("blog_categories")
    .select("id, translation_key, slug, name, description, order_index")
    .eq("locale", locale)
    .order("order_index");

  const rows = (data ?? []) as CategoryRow[];

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.categories}
        description="Kategoriler her dil için ayrı tutulur. Aynı kategoriyi diğer dillere eklerken çeviri anahtarını aynı yazın."
      />
      <LocaleTabs active={locale} basePath="/admin/kategoriler" />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="mb-5 font-serif text-lg text-ink-900">Yeni kategori</h2>
          <AdminForm action={saveCategory} submitLabel={adminCopy.create}>
            <input type="hidden" name="locale" value={locale} />
            <TextField name="name" label="Ad" required />
            <TextField name="slug" label="Slug" hint="Boş bırakılırsa addan üretilir." />
            <TextField
              name="translation_key"
              label="Çeviri anahtarı"
              hint="Diller arası eşleştirme için ortak anahtar (ör. kaygi)."
            />
            <TextAreaField name="description" label="Açıklama" rows={3} />
            <TextField name="order_index" label="Sıra" type="number" defaultValue={rows.length + 1} />
          </AdminForm>
        </Card>

        <div className="space-y-5">
          {rows.length ? (
            rows.map((row) => (
              <Card key={row.id}>
                <AdminForm action={saveCategory}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="translation_key" value={row.translation_key} />
                  <TextField name="name" label="Ad" required defaultValue={row.name} />
                  <TextField name="slug" label="Slug" defaultValue={row.slug} />
                  <TextAreaField
                    name="description"
                    label="Açıklama"
                    rows={3}
                    defaultValue={row.description}
                  />
                  <TextField
                    name="order_index"
                    label="Sıra"
                    type="number"
                    defaultValue={row.order_index}
                  />
                </AdminForm>
                <form action={deleteCategory} className="mt-4 border-t border-ink-100 pt-4">
                  <input type="hidden" name="id" value={row.id} />
                  <input type="hidden" name="locale" value={locale} />
                  <DangerButton />
                </form>
              </Card>
            ))
          ) : (
            <EmptyState>Bu dilde kategori yok.</EmptyState>
          )}
        </div>
      </div>
    </>
  );
}
