import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { AppointmentForm } from "@/features/appointments/AppointmentForm";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { getPage } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/settings";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const revalidate = 600;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [page, settings] = await Promise.all([getPage(locale, "appointment"), getSettings(locale)]);
  if (!page) return {};

  return buildMetadata({
    locale,
    routeKey: "appointment",
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
  });
}

export default async function AppointmentPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [page, settings] = await Promise.all([getPage(locale, "appointment"), getSettings(locale)]);
  if (!page) notFound();

  const url = absoluteUrl(href(locale, "appointment"));

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            locale,
            url,
            name: page.title,
            description: page.seo_description ?? "",
            updatedAt: page.updated_at,
          }),
          breadcrumbSchema([
            { name: dict.common.breadcrumbHome, url: absoluteUrl(href(locale, "home")) },
            { name: page.title, url },
          ]),
        )}
      />
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        breadcrumb={{
          items: [
            { label: dict.common.breadcrumbHome, href: href(locale, "home") },
            { label: page.title },
          ],
          label: dict.common.breadcrumbLabel,
        }}
      />

      <Container size="narrow" className="py-14 sm:py-16">
        <div className="mb-9">
          <h2 className="font-serif text-2xl text-ink-900">{dict.appointment.formTitle}</h2>
          <p className="mt-3 text-[1rem] leading-relaxed text-ink-600">
            {settings.general.contactNote}
          </p>
          <p className="mt-2 text-sm text-ink-500">{settings.general.responseTime}</p>
        </div>

        <AppointmentForm
          locale={locale}
          dict={dict}
          kvkkHref={href(locale, "kvkk")}
          homeHref={href(locale, "home")}
        />
      </Container>
    </>
  );
}
