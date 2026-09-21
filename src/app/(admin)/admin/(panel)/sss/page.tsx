import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card, EmptyState, LocaleTabs } from "@/features/admin/ui";
import { deleteFaq, saveFaq } from "@/features/admin/actions/content";
import { DangerButton } from "@/features/admin/FormControls";
import { CheckboxField, TextAreaField, TextField } from "@/features/admin/fields";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

interface FaqRow {
  id: string;
  translation_key: string;
  question: string;
  answer: string;
  category: string | null;
  order_index: number;
  featured: boolean;
  published: boolean;
}

export default async function AdminFaqPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { locale: rawLocale } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const { data } = await supabase
    .from("faqs")
    .select("id, translation_key, question, answer, category, order_index, featured, published")
    .eq("locale", locale)
    .order("order_index");

  const rows = (data ?? []) as FaqRow[];

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.faqs}
        description="Öne çıkan olarak işaretlenen sorular ana sayfada da gösterilir."
      />
      <LocaleTabs active={locale} basePath="/admin/sss" />

      <Card className="mb-6">
        <h2 className="mb-5 font-serif text-lg text-ink-900">Yeni soru</h2>
        <AdminForm action={saveFaq} submitLabel={adminCopy.create}>
          <input type="hidden" name="locale" value={locale} />
          <TextField name="question" label="Soru" required />
          <TextAreaField name="answer" label="Cevap" rows={4} required />
          <div className="grid gap-5 sm:grid-cols-3">
            <TextField name="category" label="Grup" hint="Ör. Süreç, Online, Gizlilik" />
            <TextField name="order_index" label="Sıra" type="number" defaultValue={rows.length + 1} />
            <TextField
              name="translation_key"
              label="Çeviri anahtarı"
              hint="Diller arası eşleştirme için."
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <CheckboxField name="featured" label="Ana sayfada göster" />
            <CheckboxField name="published" label="Yayında" defaultChecked />
          </div>
        </AdminForm>
      </Card>

      {rows.length ? (
        <div className="space-y-5">
          {rows.map((row) => (
            <Card key={row.id}>
              <AdminForm action={saveFaq}>
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="translation_key" value={row.translation_key} />
                <TextField name="question" label="Soru" required defaultValue={row.question} />
                <TextAreaField name="answer" label="Cevap" rows={4} required defaultValue={row.answer} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField name="category" label="Grup" defaultValue={row.category} />
                  <TextField
                    name="order_index"
                    label="Sıra"
                    type="number"
                    defaultValue={row.order_index}
                  />
                </div>
                <div className="flex flex-wrap gap-6">
                  <CheckboxField
                    name="featured"
                    label="Ana sayfada göster"
                    defaultChecked={row.featured}
                  />
                  <CheckboxField name="published" label="Yayında" defaultChecked={row.published} />
                </div>
              </AdminForm>
              <form action={deleteFaq} className="mt-4 border-t border-ink-100 pt-4">
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="locale" value={locale} />
                <DangerButton />
              </form>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState>Bu dilde soru yok.</EmptyState>
      )}
    </>
  );
}
