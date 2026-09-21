import Link from "next/link";
import { requireAdmin } from "@/features/admin/auth";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card } from "@/features/admin/ui";
import { savePost } from "@/features/admin/actions/content";
import { PostFormFields } from "@/features/admin/PostFormFields";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { locale: rawLocale } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const { data: categories } = await supabase
    .from("blog_categories")
    .select("id, name")
    .eq("locale", locale)
    .order("order_index");

  return (
    <>
      <AdminPageHeader
        title="Yeni blog yazısı"
        description={`Dil: ${locale.toUpperCase()}`}
        action={
          <Link href={`/admin/blog?locale=${locale}`} className="text-sm text-ink-600 hover:underline">
            Listeye dön
          </Link>
        }
      />
      <Card>
        <AdminForm action={savePost} submitLabel="Yazıyı oluştur">
          <PostFormFields values={{ locale }} categories={categories ?? []} />
        </AdminForm>
      </Card>
    </>
  );
}
