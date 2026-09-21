import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared/ContentPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDictionary } from "@/i18n";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";
import { getPage } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/settings";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 600;

const DOCS = {
  privacy: "privacy",
  kvkk: "kvkk",
  cookies: "cookies",
} satisfies Record<string, RouteKey>;

type DocKey = keyof typeof DOCS;

type Params = { params: Promise<{ locale: string; doc: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    (Object.keys(DOCS) as DocKey[]).map((doc) => ({ locale, doc })),
  );
}

function isDocKey(value: string): value is DocKey {
  return value in DOCS;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, doc } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  if (!isDocKey(doc)) return {};

  const [page, settings] = await Promise.all([getPage(locale, doc), getSettings(locale)]);
  if (!page) return {};

  return buildMetadata({
    locale,
    routeKey: DOCS[doc],
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
  });
}

export default async function LegalPage({ params }: Params) {
  const { locale: raw, doc } = await params;
  if (!isLocale(raw) || !isDocKey(doc)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const page = await getPage(locale, doc);
  if (!page) notFound();

  const url = absoluteUrl(href(locale, DOCS[doc]));

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
      <ContentPage
        page={page}
        breadcrumb={{
          items: [
            { label: dict.common.breadcrumbHome, href: href(locale, "home") },
            { label: page.title },
          ],
          label: dict.common.breadcrumbLabel,
        }}
        lastUpdatedLabel={page.updated_at ? dict.legal.lastUpdated : undefined}
        lastUpdatedValue={page.updated_at ? formatDate(page.updated_at, locale) : undefined}
      />
    </>
  );
}
