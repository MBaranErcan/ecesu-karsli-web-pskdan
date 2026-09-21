import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/features/admin/auth";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card } from "@/features/admin/ui";
import { deletePost, savePost } from "@/features/admin/actions/content";
import { DangerButton } from "@/features/admin/FormControls";
import { PostFormFields, type PostFormValues } from "@/features/admin/PostFormFields";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

export const dynamic = "force-dynamic";

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const post = data as PostFormValues & { locale: string; status: string; slug: string };
  const locale: Locale = isLocale(post.locale) ? post.locale : "tr";

  const { data: categories } = await supabase
    .from("blog_categories")
    .select("id, name")
    .eq("locale", locale)
    .order("order_index");

  return (
    <>
      <AdminPageHeader
        title="Blog yazısını düzenle"
        description={`Dil: ${locale.toUpperCase()}`}
        action={
          <div className="flex items-center gap-4">
            {post.status === "published" ? (
              <Link
                href={href(locale, "blog", post.slug)}
                target="_blank"
                className="text-sm text-ice-700 hover:underline"
              >
                Sitede görüntüle
              </Link>
            ) : null}
            <Link href={`/admin/blog?locale=${locale}`} className="text-sm text-ink-600 hover:underline">
              Listeye dön
            </Link>
          </div>
        }
      />
      <Card>
        <AdminForm action={savePost} submitLabel="Değişiklikleri kaydet">
          <PostFormFields values={{ ...post, id, locale }} categories={categories ?? []} />
        </AdminForm>
      </Card>

      <form action={deletePost} className="mt-6">
        <input type="hidden" name="id" value={id} />
        <DangerButton label="Bu yazıyı sil" />
      </form>
    </>
  );
}
