import Link from "next/link";
import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminPageHeader, Badge, Card, LocaleTabs } from "@/features/admin/ui";
import { getLocaleContent } from "@/content";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { locale: rawLocale } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const seeds = getLocaleContent(locale).pages;
  const { data } = await supabase
    .from("pages")
    .select("translation_key, title")
    .eq("locale", locale);

  const saved = new Map((data ?? []).map((row) => [row.translation_key as string, row.title as string]));

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.pages}
        description="Hakkımda, online danışmanlık, Ankara ve yasal metinler gibi sabit sayfaların içerikleri."
      />
      <LocaleTabs active={locale} basePath="/admin/sayfalar" />

      <Card className="p-0">
        <ul className="divide-y divide-ink-100">
          {seeds.map((seed) => (
            <li
              key={seed.translation_key}
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
            >
              <div>
                <Link
                  href={`/admin/sayfalar/${seed.translation_key}?locale=${locale}`}
                  className="font-medium text-ink-900 hover:text-ice-800"
                >
                  {saved.get(seed.translation_key) ?? seed.title}
                </Link>
                <p className="mt-1 text-sm text-ink-500">{seed.translation_key}</p>
              </div>
              <Badge tone={saved.has(seed.translation_key) ? "success" : "warning"}>
                {saved.has(seed.translation_key) ? "Veritabanında" : "Başlangıç içeriği"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
