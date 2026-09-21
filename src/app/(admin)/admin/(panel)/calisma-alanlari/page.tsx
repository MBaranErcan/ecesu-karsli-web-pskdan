import Link from "next/link";
import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Badge, Card, EmptyState, LocaleTabs } from "@/features/admin/ui";
import { saveService } from "@/features/admin/actions/content";
import { ServiceFormFields } from "@/features/admin/ServiceFormFields";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

interface ServiceRow {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  featured: boolean;
  order_index: number;
}

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string; yeni?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { locale: rawLocale, yeni } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const { data } = await supabase
    .from("services")
    .select("id, title, slug, published, featured, order_index")
    .eq("locale", locale)
    .order("order_index");

  const rows = (data ?? []) as ServiceRow[];

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.services}
        description="Her çalışma alanının kendi SEO sayfası vardır. İçerik dile göre ayrı düzenlenir."
        action={
          <Link
            href={`/admin/calisma-alanlari?locale=${locale}&yeni=1`}
            className="rounded-full bg-ink-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-ink-800"
          >
            Yeni çalışma alanı
          </Link>
        }
      />
      <LocaleTabs active={locale} basePath="/admin/calisma-alanlari" />

      {yeni ? (
        <Card className="mb-6">
          <h2 className="mb-5 font-serif text-lg text-ink-900">Yeni çalışma alanı</h2>
          <AdminForm action={saveService} submitLabel={adminCopy.create}>
            <ServiceFormFields values={{ locale, order_index: rows.length + 1 }} />
          </AdminForm>
        </Card>
      ) : null}

      {rows.length ? (
        <Card className="p-0">
          <ul className="divide-y divide-ink-100">
            {rows.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div>
                  <Link
                    href={`/admin/calisma-alanlari/${row.id}`}
                    className="font-medium text-ink-900 hover:text-ice-800"
                  >
                    {row.title}
                  </Link>
                  <p className="mt-1 text-sm text-ink-500">/{row.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  {row.featured ? <Badge tone="info">Ana sayfada</Badge> : null}
                  <Badge tone={row.published ? "success" : "warning"}>
                    {row.published ? "Yayında" : "Yayında değil"}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <EmptyState>Bu dilde çalışma alanı yok.</EmptyState>
      )}
    </>
  );
}
