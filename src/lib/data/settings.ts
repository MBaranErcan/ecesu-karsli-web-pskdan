import { cache } from "react";
import { getSupabasePublicClient } from "@/lib/supabase/public";
import { getLocaleContent, sharedSettings } from "@/content";
import type { LocalizedSettings, SharedSettings } from "@/content/types";
import type { Locale } from "@/i18n/config";

export type SiteSettings = LocalizedSettings & SharedSettings;

export const SETTINGS_GROUPS = {
  localized: ["general", "home"] as const,
  shared: ["contact", "locations", "media"] as const,
};

function fallbackSettings(locale: Locale): SiteSettings {
  return {
    ...getLocaleContent(locale).settings,
    ...sharedSettings,
  };
}

/**
 * Ayarları veritabanından okur; kayıt yoksa başlangıç içerikleriyle birleştirir.
 * Böylece admin panelde henüz doldurulmamış alanlar boş kalmaz.
 */
export const getSettings = cache(async (locale: Locale): Promise<SiteSettings> => {
  const fallback = fallbackSettings(locale);
  const supabase = getSupabasePublicClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("site_settings")
    .select("key, locale, value")
    .in("locale", [locale, "*"]);

  if (error || !data?.length) return fallback;

  const merged: Record<string, Record<string, string>> = JSON.parse(JSON.stringify(fallback));
  for (const row of data) {
    const value = (row.value ?? {}) as Record<string, string>;
    merged[row.key] = { ...(merged[row.key] ?? {}), ...value };
  }
  return merged as unknown as SiteSettings;
});
