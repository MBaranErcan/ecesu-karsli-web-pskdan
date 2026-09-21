import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { CtaSection } from "@/components/shared/CtaSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { getPage } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/settings";
import {
  breadcrumbSchema,
  graph,
  professionalServiceSchema,
  webPageSchema,
} from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const revalidate = 600;

const ROUTE_KEY = "online" as const;
const PAGE_KEY = "online";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [page, settings] = await Promise.all([getPage(locale, PAGE_KEY), getSettings(locale)]);
  if (!page) return {};

  return buildMetadata({
    locale,
    routeKey: ROUTE_KEY,
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: page.og_image_url ?? settings.media.defaultOgImageUrl ?? null,
    noindex: page.noindex,
  });
}

export default async function Page({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [page, settings] = await Promise.all([getPage(locale, PAGE_KEY), getSettings(locale)]);
  if (!page) notFound();

  const url = absoluteUrl(href(locale, ROUTE_KEY));

  return (
    <>
      <JsonLd
        data={graph(
          professionalServiceSchema(locale, settings),
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
      <ContentPage
        page={page}
        breadcrumb={{
          items: [
            { label: dict.common.breadcrumbHome, href: href(locale, "home") },
            { label: page.title },
          ],
          label: dict.common.breadcrumbLabel,
        }}
        tocTitle={dict.blog.tocTitle}
      />
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
