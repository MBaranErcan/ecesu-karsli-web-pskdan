"use client";

import { usePathname } from "next/navigation";
import { locales, localeShortLabels, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Dil değiştirme bağlantıları. Detay sayfalarında slug'lar dile göre farklı
 * olduğundan hedef adres sunucu tarafında (/api/language) çözümlenir.
 */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const currentPath = usePathname();

  return (
    <div
      aria-label={label}
      role="group"
      className="inline-flex items-center gap-0.5 rounded-full bg-ink-100 p-0.5"
    >
      {locales.map((item) => {
        const active = item === locale;
        return (
          <a
            key={item}
            href={`/api/language?to=${item}&path=${encodeURIComponent(currentPath)}`}
            hrefLang={item}
            aria-current={active ? "true" : undefined}
            title={localeLabels[item]}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
              active ? "bg-white text-ice-800 shadow-sm" : "text-ink-500 hover:text-ink-800",
            )}
          >
            {localeShortLabels[item]}
          </a>
        );
      })}
    </div>
  );
}
