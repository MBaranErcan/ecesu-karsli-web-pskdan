import Link from "next/link";
import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { signOut } from "@/features/admin/actions/auth";
import { Sidebar, type SidebarItem } from "@/features/admin/Sidebar";

const items: SidebarItem[] = [
  { label: adminCopy.nav.dashboard, href: "/admin" },
  { label: adminCopy.nav.requests, href: "/admin/talepler" },
  { label: adminCopy.nav.blog, href: "/admin/blog" },
  { label: adminCopy.nav.categories, href: "/admin/kategoriler" },
  { label: adminCopy.nav.services, href: "/admin/calisma-alanlari" },
  { label: adminCopy.nav.faqs, href: "/admin/sss" },
  { label: adminCopy.nav.pages, href: "/admin/sayfalar" },
  { label: adminCopy.nav.settings, href: "/admin/ayarlar" },
  { label: adminCopy.nav.media, href: "/admin/gorseller" },
];

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
      <aside className="border-b border-ink-200 bg-white px-5 py-6 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="mb-8">
          <p className="font-serif text-lg text-ink-900">Ecesu Karslı</p>
          <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-400">
            {adminCopy.appName}
          </p>
        </div>
        <Sidebar items={items} />
        <div className="mt-8 border-t border-ink-100 pt-5">
          <p className="truncate text-xs text-ink-500">{user.email}</p>
          <form action={signOut} className="mt-3">
            <button
              type="submit"
              className="text-sm text-ink-600 underline-offset-4 hover:text-ink-900 hover:underline"
            >
              {adminCopy.signOut}
            </button>
          </form>
          <Link
            href="/tr"
            className="mt-3 block text-sm text-ice-700 underline-offset-4 hover:underline"
          >
            Siteyi görüntüle
          </Link>
        </div>
      </aside>
      <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
