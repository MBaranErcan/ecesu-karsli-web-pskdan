import { requireAdmin } from "@/features/admin/auth";
import { adminCopy } from "@/features/admin/copy";
import { AdminForm } from "@/features/admin/AdminForm";
import { AdminPageHeader, Card, LocaleTabs } from "@/features/admin/ui";
import { saveSettings } from "@/features/admin/actions/content";
import { TextAreaField, TextField } from "@/features/admin/fields";
import { settingGroups } from "@/features/admin/settingsSchema";
import { getSettings } from "@/lib/data/settings";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  await requireAdmin();
  const { locale: rawLocale } = await searchParams;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const settings = (await getSettings(locale)) as unknown as Record<string, Record<string, string>>;

  return (
    <>
      <AdminPageHeader
        title={adminCopy.nav.settings}
        description="Ana sayfa metinleri ve iletişim bilgileri. Dil sekmesi yalnızca dile bağlı grupları etkiler."
      />
      <LocaleTabs active={locale} basePath="/admin/ayarlar" />

      <div className="space-y-6">
        {settingGroups.map((group) => (
          <Card key={group.key}>
            <div className="mb-6">
              <h2 className="font-serif text-lg text-ink-900">
                {group.title}
                {group.scope === "shared" ? (
                  <span className="ml-2 text-xs font-normal uppercase tracking-[0.12em] text-ink-400">
                    tüm diller
                  </span>
                ) : null}
              </h2>
              <p className="mt-1.5 text-sm text-ink-500">{group.description}</p>
            </div>

            <AdminForm action={saveSettings}>
              <input type="hidden" name="group" value={group.key} />
              <input type="hidden" name="locale" value={locale} />
              <div className="grid gap-5 lg:grid-cols-2">
                {group.fields.map((field) => {
                  const value = settings[group.key]?.[field.name] ?? "";
                  const wide = field.type === "textarea";
                  return (
                    <div key={field.name} className={wide ? "lg:col-span-2" : undefined}>
                      {wide ? (
                        <TextAreaField
                          name={field.name}
                          label={field.label}
                          rows={field.rows ?? 3}
                          defaultValue={value}
                          hint={field.hint}
                        />
                      ) : (
                        <TextField
                          name={field.name}
                          label={field.label}
                          type={field.type === "url" ? "url" : "text"}
                          defaultValue={value}
                          hint={field.hint}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </AdminForm>
          </Card>
        ))}
      </div>
    </>
  );
}
