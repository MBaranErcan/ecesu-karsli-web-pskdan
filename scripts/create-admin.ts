/**
 * Yönetim paneline giriş yapabilecek admin kullanıcısını oluşturur.
 *
 * Çalıştırma:
 *   npm run create-admin -- eposta@ornek.com "GucluBirParola" "Ad Soyad"
 */
import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "./env";

const [email, password, fullName] = process.argv.slice(2);

if (!email || !password) {
  console.error("\nKullanım: npm run create-admin -- <e-posta> <parola> [ad soyad]\n");
  process.exit(1);
}

if (password.length < 10) {
  console.error("\nParola en az 10 karakter olmalıdır.\n");
  process.exit(1);
}

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  let userId = data?.user?.id;

  if (error) {
    if (!/already registered|already been registered/i.test(error.message)) {
      console.error(`\n✗ Kullanıcı oluşturulamadı: ${error.message}\n`);
      process.exit(1);
    }
    const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
    userId = list?.users.find((user) => user.email?.toLowerCase() === email.toLowerCase())?.id;
    if (!userId) {
      console.error("\n✗ Var olan kullanıcı bulunamadı.\n");
      process.exit(1);
    }
    console.log("• Kullanıcı zaten kayıtlı, yetkilendirme güncelleniyor.");
  }

  const { error: adminError } = await supabase
    .from("admins")
    .upsert({ id: userId, email, full_name: fullName ?? null }, { onConflict: "id" });

  if (adminError) {
    console.error(`\n✗ Yetkilendirme kaydedilemedi: ${adminError.message}\n`);
    process.exit(1);
  }

  console.log(`\n✓ Admin hazır: ${email}\n  Giriş: /admin/giris\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
