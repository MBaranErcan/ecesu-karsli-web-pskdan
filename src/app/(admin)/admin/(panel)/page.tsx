import Link from "next/link";
import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminPageHeader, Badge, Card, EmptyState } from "@/features/admin/ui";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface RequestRow {
  id: string;
  full_name: string;
  email: string;
  status: keyof typeof adminCopy.statuses;
  created_at: string;
}

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin();

  const [posts, drafts, published, newRequests, totalRequests, recent, services] =
    await Promise.all([
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
      supabase
        .from("blog_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", "published"),
      supabase
        .from("appointment_requests")
        .select("id", { count: "exact", head: true })
        .eq("status", "yeni"),
      supabase.from("appointment_requests").select("id", { count: "exact", head: true }),
      supabase
        .from("appointment_requests")
        .select("id, full_name, email, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase.from("services").select("id", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Toplam blog yazısı", value: posts.count ?? 0, href: "/admin/blog" },
    { label: "Taslak yazılar", value: drafts.count ?? 0, href: "/admin/blog?status=draft" },
    { label: "Yayınlanan yazılar", value: published.count ?? 0, href: "/admin/blog?status=published" },
    { label: "Yeni randevu talebi", value: newRequests.count ?? 0, href: "/admin/talepler?status=yeni" },
    { label: "Toplam talep", value: totalRequests.count ?? 0, href: "/admin/talepler" },
    { label: "Çalışma alanı", value: services.count ?? 0, href: "/admin/calisma-alanlari" },
  ];

  const rows = (recent.data ?? []) as RequestRow[];
  const contentEmpty = (services.count ?? 0) === 0 && (posts.count ?? 0) === 0;

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.dashboard}
        description="Site içeriklerinin ve gelen taleplerin özeti."
      />

      {contentEmpty ? (
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
          Veritabanında henüz içerik yok. Başlangıç içeriklerini yüklemek için terminalde{" "}
          <code className="rounded bg-amber-100 px-1.5 py-0.5">npm run seed</code> komutunu
          çalıştırın. O zamana kadar site, kod içindeki başlangıç metinlerini gösterir.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-ink-200 bg-white p-6 transition-colors hover:border-ink-300"
          >
            <p className="text-sm text-ink-500">{stat.label}</p>
            <p className="mt-2 font-serif text-3xl text-ink-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink-900">Son gelen talepler</h2>
          <Link href="/admin/talepler" className="text-sm text-ice-700 hover:underline">
            Tümünü gör
          </Link>
        </div>

        {rows.length ? (
          <Card className="p-0">
            <ul className="divide-y divide-ink-100">
              {rows.map((row) => (
                <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                  <div>
                    <p className="font-medium text-ink-900">{row.full_name}</p>
                    <p className="text-sm text-ink-500">{row.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={row.status === "yeni" ? "info" : "neutral"}>
                      {adminCopy.statuses[row.status] ?? row.status}
                    </Badge>
                    <span className="text-sm text-ink-400">{formatDateTime(row.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : (
          <EmptyState>Henüz randevu talebi gelmedi.</EmptyState>
        )}
      </div>
    </>
  );
}
