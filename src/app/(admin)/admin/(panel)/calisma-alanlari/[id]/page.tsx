import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/features/admin/auth";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card } from "@/features/admin/ui";
import { deleteService, saveService } from "@/features/admin/actions/content";
import { DangerButton } from "@/features/admin/FormControls";
import { ServiceFormFields, type ServiceFormValues } from "@/features/admin/ServiceFormFields";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

export const dynamic = "force-dynamic";

export default async function AdminEditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const service = data as ServiceFormValues & { locale: string; slug: string; published: boolean };
  const locale: Locale = isLocale(service.locale) ? service.locale : "tr";

  return (
    <>
      <AdminPageHeader
        title="Çalışma alanını düzenle"
        description={`Dil: ${locale.toUpperCase()}`}
        action={
          <div className="flex items-center gap-4">
            {service.published ? (
              <Link
                href={href(locale, "services", service.slug)}
                target="_blank"
                className="text-sm text-ice-700 hover:underline"
              >
                Sitede görüntüle
              </Link>
            ) : null}
            <Link
              href={`/admin/calisma-alanlari?locale=${locale}`}
              className="text-sm text-ink-600 hover:underline"
            >
              Listeye dön
            </Link>
          </div>
        }
      />
      <Card>
        <AdminForm action={saveService} submitLabel="Değişiklikleri kaydet">
          <ServiceFormFields values={{ ...service, locale }} />
        </AdminForm>
      </Card>

      <form action={deleteService} className="mt-6">
        <input type="hidden" name="id" value={id} />
        <DangerButton label="Bu çalışma alanını sil" />
      </form>
    </>
  );
}
