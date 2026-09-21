import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaSection } from "@/components/shared/CtaSection";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { PageHeader } from "@/components/shared/PageHeader";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { listFaqs } from "@/lib/data/faqs";
import { getPage } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/settings";
import { breadcrumbSchema, faqPageSchema, graph, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const revalidate = 600;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [page, settings] = await Promise.all([getPage(locale, "faq"), getSettings(locale)]);
  if (!page) return {};

  return buildMetadata({
    locale,
    routeKey: "faq",
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
  });
}

export default async function FaqPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [page, faqs, settings] = await Promise.all([
    getPage(locale, "faq"),
    listFaqs(locale),
    getSettings(locale),
  ]);
  if (!page) notFound();

  const groups = new Map<string, typeof faqs>();
  for (const faq of faqs) {
    const key = faq.category ?? "";
    groups.set(key, [...(groups.get(key) ?? []), faq]);
  }

  const url = absoluteUrl(href(locale, "faq"));

  return (
    <>
      <JsonLd
        data={graph(
          faqPageSchema(faqs),
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
        <div className="space-y-12">
          {[...groups.entries()].map(([category, items]) => (
            <section key={category || "genel"}>
              {category ? (
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-ice-700">
                  {category}
                </h2>
              ) : null}
              <FaqAccordion
                items={items.map((faq) => ({
                  id: faq.id,
                  question: faq.question,
                  answer: faq.answer,
                }))}
              />
            </section>
          ))}
        </div>
      </Container>

      <CtaSection
        title={dict.faq.stillQuestionsTitle}
        body={dict.faq.stillQuestionsBody}
        ctaLabel={dict.faq.contactCta}
        ctaHref={href(locale, "contact")}
        secondaryLabel={settings.home.ctaLabel}
        secondaryHref={href(locale, "appointment")}
      />
    </>
  );
}
