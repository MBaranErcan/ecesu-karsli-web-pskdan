import Image from "next/image";
import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card, EmptyState } from "@/features/admin/ui";
import { deleteMedia, uploadMedia } from "@/features/admin/actions/media";
import { DangerButton } from "@/features/admin/FormControls";
import { CopyableUrl } from "@/features/admin/CopyableUrl";
import { Input, Label } from "@/components/ui/Field";
import { TextField } from "@/features/admin/fields";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface MediaRow {
  id: string;
  storage_path: string;
  public_url: string;
  alt_text: string | null;
  size_bytes: number | null;
  created_at: string;
}

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  return `${Math.round(bytes / 1024)} KB`;
}

export default async function AdminMediaPage() {
  const { supabase } = await requireAdmin();

  const { data } = await supabase
    .from("media")
    .select("id, storage_path, public_url, alt_text, size_bytes, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as MediaRow[];

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.media}
        description="Yüklenen görseller Supabase Storage'da saklanır. En fazla 3 MB; JPEG, PNG, WebP veya AVIF."
      />

      <Card className="mb-8">
        <h2 className="mb-5 font-serif text-lg text-ink-900">Görsel yükle</h2>
        <AdminForm action={uploadMedia} submitLabel="Yükle" encType="multipart/form-data">
          <div>
            <Label htmlFor="file">Dosya</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              required
              className="mt-2 file:mr-4 file:rounded-full file:border-0 file:bg-ink-100 file:px-4 file:py-2 file:text-sm"
            />
          </div>
          <TextField
            name="alt_text"
            label="Alternatif metin"
            required
            hint="Görselde ne olduğunu kısaca yazın. Ekran okuyucular için zorunludur."
          />
        </AdminForm>
      </Card>

      {rows.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <Card key={row.id} className="p-4">
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-ink-100">
                <Image
                  src={row.public_url}
                  alt={row.alt_text ?? ""}
                  fill
                  sizes="(min-width: 1024px) 300px, 45vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="mb-2 text-sm text-ink-700">{row.alt_text}</p>
              <CopyableUrl url={row.public_url} />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-ink-400">
                  {formatSize(row.size_bytes)} · {formatDateTime(row.created_at)}
                </span>
                <form action={deleteMedia}>
                  <input type="hidden" name="id" value={row.id} />
                  <input type="hidden" name="storage_path" value={row.storage_path} />
                  <DangerButton label="Sil" />
                </form>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState>Henüz görsel yüklenmedi.</EmptyState>
      )}
    </>
  );
}
