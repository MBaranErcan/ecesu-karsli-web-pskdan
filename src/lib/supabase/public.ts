import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, isSupabaseConfigured } from "@/lib/env";

let client: SupabaseClient | null = null;

/**
 * Oturum taşımayan, yalnızca yayınlanmış içerikleri okuyan istemci.
 * Cookie kullanmadığı için sayfaların statik olarak üretilmesine engel olmaz.
 */
export function getSupabasePublicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { "x-application-name": "ecesu-karsli-web" } },
    });
  }
  return client;
}
