/**
 * Ortam değişkenleri tek noktadan okunur.
 * Supabase yapılandırılmadığında site, kod içindeki başlangıç içerikleriyle
 * çalışmaya devam eder; bu sayede kurulum öncesinde de önizleme alınabilir.
 */

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  storageBucket: process.env.SUPABASE_STORAGE_BUCKET ?? "media",
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
  analyticsDomain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ?? "",
  analyticsScriptSrc: process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "",
};

/** Public (anon) Supabase istemcisi kurulabilir mi? */
export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey);

/** Sunucu tarafı yazma işlemleri için service role anahtarı var mı? */
export const isServiceRoleConfigured = Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);
