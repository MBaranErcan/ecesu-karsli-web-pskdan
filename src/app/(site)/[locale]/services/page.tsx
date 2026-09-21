import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHeader } from "@/components/shared/PageHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { listServices } from "@/lib/data/services";
import { getPage } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/settings";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const revalidate = 600;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [page, settings] = await Promise.all([getPage(locale, "services"), getSettings(locale)]);
  if (!page) return {};

  return buildMetadata({
    locale,
    routeKey: "services",
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
  });
}

export default async function ServicesPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [page, services, settings] = await Promise.all([
    getPage(locale, "services"),
    listServices(locale),
    getSettings(locale),
  ]);
  if (!page) notFound();

  const url = absoluteUrl(href(locale, "services"));

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
          {
            "@type": "ItemList",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: service.title,
              url: absoluteUrl(href(locale, "services", service.slug)),
            })),
          },
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
      <Container className="py-14 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.short_description}
              href={href(locale, "services", service.slug)}
              cta={dict.common.learnMore}
            />
          ))}
        </div>
      </Container>
      <CtaSection
        title={settings.home.ctaTitle}
        body={settings.home.ctaBody}
        ctaLabel={settings.home.ctaLabel}
        ctaHref={href(locale, "appointment")}
        secondaryLabel={dict.nav.faq}
        secondaryHref={href(locale, "faq")}
      />
    </>
  );
}
