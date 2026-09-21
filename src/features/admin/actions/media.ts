"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../auth";
import { env } from "@/lib/env";
import { slugify } from "@/lib/utils";
import type { ActionState } from "./state";

const MAX_BYTES = 3 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function uploadMedia(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const file = formData.get("file");
  const altText = String(formData.get("alt_text") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Lütfen bir görsel seçin." };
  }
  if (!ALLOWED.includes(file.type)) {
    return { status: "error", message: "Yalnızca JPEG, PNG, WebP veya AVIF yükleyebilirsiniz." };
  }
  if (file.size > MAX_BYTES) {
    return { status: "error", message: "Dosya boyutu en fazla 3 MB olabilir." };
  }
  if (!altText) {
    return { status: "error", message: "Erişilebilirlik için alternatif metin zorunludur." };
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "gorsel";
  const path = `uploads/${Date.now()}-${baseName}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(env.storageBucket)
    .upload(path, file, { cacheControl: "31536000", contentType: file.type, upsert: false });

  if (uploadError) return { status: "error", message: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from(env.storageBucket).getPublicUrl(path);

  const { error } = await supabase.from("media").insert({
    storage_path: path,
    public_url: publicUrl,
    alt_text: altText,
    mime_type: file.type,
    size_bytes: file.size,
  });

  if (error) return { status: "error", message: error.message };

  revalidatePath("/admin/gorseller");
  return { status: "success" };
}

export async function deleteMedia(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const path = String(formData.get("storage_path") ?? "");

  if (path) await supabase.storage.from(env.storageBucket).remove([path]);
  await supabase.from("media").delete().eq("id", id);

  revalidatePath("/admin/gorseller");
  redirect("/admin/gorseller");
}
