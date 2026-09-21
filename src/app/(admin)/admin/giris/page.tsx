import { LoginForm } from "@/features/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/env";
import { adminCopy } from "@/features/admin/copy";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-serif text-2xl text-ink-900">Ecesu Karslı</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-500">
            {adminCopy.appName}
          </p>
        </div>

        {isSupabaseConfigured ? (
          <div className="rounded-2xl border border-ink-200 bg-white p-7">
            <LoginForm next={next ?? "/admin"} />
          </div>
        ) : (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
            {adminCopy.notConfigured}
          </p>
        )}
      </div>
    </main>
  );
}
