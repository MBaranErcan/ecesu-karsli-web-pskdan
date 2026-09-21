import Link from "next/link";
import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminPageHeader, Badge, Card, EmptyState, LocaleTabs } from "@/features/admin/ui";
import { deletePost, togglePostStatus } from "@/features/admin/actions/content";
import { DangerButton } from "@/features/admin/FormControls";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PostRow {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string | null;
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string; status?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { locale: rawLocale, status } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  let query = supabase
    .from("blog_posts")
    .select("id, title, slug, status, published_at, updated_at")
    .eq("locale", locale)
    .order("updated_at", { ascending: false });

  if (status === "draft" || status === "published") query = query.eq("status", status);

  const { data } = await query;
  const rows = (data ?? []) as PostRow[];

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.blog}
        description="Blog yazıları dile göre ayrı yönetilir. Aynı yazının çevirisini eklemek için diğer dilde yeni bir kayıt oluşturun."
        action={
          <Link
            href={`/admin/blog/yeni?locale=${locale}`}
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-ink-800"
          >
            Yeni yazı
          </Link>
        }
      />

      <LocaleTabs active={locale} basePath="/admin/blog" extraQuery={{ status }} />

      {rows.length ? (
        <Card className="p-0">
          <ul className="divide-y divide-ink-100">
            {rows.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="min-w-0">
                  <Link
                    href={`/admin/blog/${row.id}`}
                    className="font-medium text-ink-900 hover:text-ice-800"
                  >
                    {row.title}
                  </Link>
                  <p className="mt-1 truncate text-sm text-ink-500">/{row.slug}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={row.status === "published" ? "success" : "warning"}>
                    {row.status === "published" ? "Yayında" : "Taslak"}
                  </Badge>
                  <span className="text-sm text-ink-400">
                    {formatDateTime(row.published_at ?? row.updated_at)}
                  </span>
                  <form action={togglePostStatus}>
                    <input type="hidden" name="id" value={row.id} />
                    <input
                      type="hidden"
                      name="next"
                      value={row.status === "published" ? "draft" : "published"}
                    />
                    <button
                      type="submit"
                      className="rounded-full px-3.5 py-1.5 text-sm text-ink-600 transition-colors hover:bg-ink-100"
                    >
                      {row.status === "published" ? "Yayından kaldır" : "Yayınla"}
                    </button>
                  </form>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={row.id} />
                    <DangerButton />
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <EmptyState>Bu dilde henüz blog yazısı yok.</EmptyState>
      )}
    </>
  );
}
