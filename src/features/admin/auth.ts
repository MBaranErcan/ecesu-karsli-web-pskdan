import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export interface AdminSession {
  user: User;
  supabase: SupabaseClient;
}

/** Oturum açmış ve `admins` tablosunda kayıtlı kullanıcıyı döndürür. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) return null;
  return { user, supabase };
}

/** Yetkisiz erişimde giriş sayfasına yönlendirir. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/giris");
  return session;
}
