import Link from "next/link";
import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminPageHeader, Badge, Card, EmptyState } from "@/features/admin/ui";
import { deleteRequest, updateRequestStatus } from "@/features/admin/actions/content";
import { RequestNotes } from "@/features/admin/RequestNotes";
import { DangerButton } from "@/features/admin/FormControls";
import { APPOINTMENT_STATUSES } from "@/features/appointments/schema";
import { cn, formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

type StatusKey = (typeof APPOINTMENT_STATUSES)[number];

interface RequestRow {
  id: string;
  full_name: string;
  age: number | null;
  phone: string;
  email: string;
  meeting_preference: keyof typeof adminCopy.preferences;
  reason: keyof typeof adminCopy.reasons;
  message: string | null;
  status: StatusKey;
  admin_notes: string | null;
  locale: string | null;
  created_at: string;
}

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { status } = await searchParams;
  const activeStatus = APPOINTMENT_STATUSES.includes(status as StatusKey)
    ? (status as StatusKey)
    : null;

  let query = supabase
    .from("appointment_requests")
    .select(
      "id, full_name, age, phone, email, meeting_preference, reason, message, status, admin_notes, locale, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(200);

  if (activeStatus) query = query.eq("status", activeStatus);

  const { data } = await query;
  const rows = (data ?? []) as RequestRow[];

  const chip = "rounded-full px-3.5 py-1.5 text-sm transition-colors";

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.requests}
        description="Formdan gelen ön görüşme talepleri. Bu kayıtlara yalnızca yönetici hesabı erişebilir."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/admin/talepler"
          className={cn(
            chip,
            !activeStatus ? "bg-ink-900 text-white" : "bg-white text-ink-600 ring-1 ring-ink-200",
          )}
        >
          Tümü
        </Link>
        {APPOINTMENT_STATUSES.map((item) => (
          <Link
            key={item}
            href={`/admin/talepler?status=${item}`}
            className={cn(
              chip,
              activeStatus === item
                ? "bg-ink-900 text-white"
                : "bg-white text-ink-600 ring-1 ring-ink-200",
            )}
          >
            {adminCopy.statuses[item]}
          </Link>
        ))}
      </div>

      {rows.length ? (
        <div className="space-y-4">
          {rows.map((row) => (
            <Card key={row.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-lg text-ink-900">{row.full_name}</h2>
                  <p className="mt-1 text-sm text-ink-500">
                    {formatDateTime(row.created_at)}
                    {row.locale ? ` · ${row.locale.toUpperCase()}` : ""}
                  </p>
                </div>
                <Badge tone={row.status === "yeni" ? "info" : "neutral"}>
                  {adminCopy.statuses[row.status]}
                </Badge>
              </div>

              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-ink-500">Telefon</dt>
                  <dd className="mt-0.5">
                    <a href={`tel:${row.phone}`} className="text-ice-700 hover:underline">
                      {row.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-500">E-posta</dt>
                  <dd className="mt-0.5">
                    <a href={`mailto:${row.email}`} className="text-ice-700 hover:underline">
                      {row.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-500">Yaş</dt>
                  <dd className="mt-0.5 text-ink-800">{row.age ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Görüşme şekli</dt>
                  <dd className="mt-0.5 text-ink-800">
                    {adminCopy.preferences[row.meeting_preference] ?? row.meeting_preference}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-500">Başvuru nedeni</dt>
                  <dd className="mt-0.5 text-ink-800">
                    {adminCopy.reasons[row.reason] ?? row.reason}
                  </dd>
                </div>
              </dl>

              {row.message ? (
                <div className="mt-5 rounded-xl bg-ink-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                    Paylaşılan not
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-700">
                    {row.message}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-ink-100 pt-5">
                <form action={updateRequestStatus} className="flex flex-wrap items-end gap-2">
                  <input type="hidden" name="id" value={row.id} />
                  <label htmlFor={`status-${row.id}`} className="text-sm text-ink-600">
                    Durum
                  </label>
                  <select
                    id={`status-${row.id}`}
                    name="status"
                    defaultValue={row.status}
                    className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm"
                  >
                    {APPOINTMENT_STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {adminCopy.statuses[item]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full bg-ink-900 px-4 py-2 text-sm text-white transition-colors hover:bg-ink-800"
                  >
                    Güncelle
                  </button>
                </form>

                <form action={deleteRequest}>
                  <input type="hidden" name="id" value={row.id} />
                  <DangerButton label="Kaydı sil" />
                </form>
              </div>

              <div className="mt-5">
                <RequestNotes id={row.id} defaultValue={row.admin_notes} />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState>Bu filtreye uyan talep bulunmuyor.</EmptyState>
      )}
    </>
  );
}
