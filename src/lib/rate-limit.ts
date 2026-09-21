/**
 * Basit, bellek içi sabit pencere sınırlayıcı.
 *
 * Sunucusuz ortamda her örnek kendi sayacını tutar; bu nedenle form
 * gönderimlerinde ayrıca veritabanı tarafında da tekrar kontrolü yapılır.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  bucket.count += 1;
  const success = bucket.count <= limit;

  // Bellek sızıntısını önlemek için süresi dolmuş kayıtları ara ara temizle.
  if (buckets.size > 500) {
    for (const [entryKey, entry] of buckets) {
      if (entry.resetAt <= now) buckets.delete(entryKey);
    }
  }

  return { success, remaining: Math.max(0, limit - bucket.count), resetAt: bucket.resetAt };
}
