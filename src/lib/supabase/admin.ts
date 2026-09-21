import "server-only";
import { createClient } from "@supabase/supabase-js";
import { env, isServiceRoleConfigured } from "@/lib/env";

/**
 * Service role istemcisi: yalnızca sunucu tarafında, RLS'i aşması gereken
 * işlemlerde (form kaydı, seed, medya kaydı) kullanılır.
 */
export function getSupabaseAdminClient() {
  if (!isServiceRoleConfigured) return null;

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
