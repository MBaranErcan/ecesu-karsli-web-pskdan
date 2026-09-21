import Link from "next/link";
import { cn } from "@/lib/utils";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { adminCopy } from "./copy";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl text-ink-900">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm text-ink-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-ink-200 bg-white p-6", className)} {...props} />;
}

export function LocaleTabs({
  active,
  basePath,
  extraQuery,
}: {
  active: Locale;
  basePath: string;
  extraQuery?: Record<string, string | undefined>;
}) {
  const buildHref = (locale: Locale) => {
    const params = new URLSearchParams({ locale });
    for (const [key, value] of Object.entries(extraQuery ?? {})) {
      if (value) params.set(key, value);
    }
    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
        {adminCopy.localeLabel}
      </span>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={buildHref(locale)}
          aria-current={locale === active ? "page" : undefined}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm transition-colors",
            locale === active
              ? "bg-ink-900 text-white"
              : "bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-ink-300",
          )}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "info";
}) {
  const tones = {
    neutral: "bg-ink-100 text-ink-700",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    info: "bg-ice-100 text-ice-800",
  };
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}

export function EmptyState({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-10 text-center text-sm text-ink-500">
      {children ?? adminCopy.empty}
    </p>
  );
}
