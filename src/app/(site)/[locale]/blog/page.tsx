import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { BlogCard } from "@/components/shared/BlogCard";
import { CategoryFilter } from "@/components/shared/CategoryFilter";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHeader } from "@/components/shared/PageHeader";
import { getDictionary, interpolate } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { listCategories, listPosts } from "@/lib/data/blog";
import { getPage } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/settings";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";

export const revalidate = 300;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [page, settings] = await Promise.all([getPage(locale, "blog"), getSettings(locale)]);
  if (!page) return {};

  return buildMetadata({
    locale,
    routeKey: "blog",
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
  });
}

export default async function BlogIndexPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [page, posts, categories, settings] = await Promise.all([
    getPage(locale, "blog"),
    listPosts(locale),
    listCategories(locale),
    getSettings(locale),
  ]);
  if (!page) notFound();

  const url = absoluteUrl(href(locale, "blog"));
  const usedCategories = categories.filter((category) =>
    posts.some((post) => post.category?.slug === category.slug),
  );

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            "@id": `${url}#blog`,
            name: page.title,
            description: page.seo_description ?? "",
            url,
            inLanguage: locale,
            publisher: { "@id": `${absoluteUrl(href(locale, "home"))}#person` },
          },
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

      <Container className="py-12 sm:py-14">
        {usedCategories.length ? (
          <CategoryFilter
            label={dict.blog.categoriesTitle}
            allLabel={dict.blog.allCategories}
            allHref={href(locale, "blog")}
            items={usedCategories.map((category) => ({
              name: category.name,
              slug: category.slug,
              href: href(locale, "blogCategory", category.slug),
            }))}
          />
        ) : null}

        {posts.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                href={href(locale, "blog", post.slug)}
                date={formatDate(post.published_at, locale)}
                readingTime={interpolate(dict.blog.readingTime, {
                  minutes: readingMinutes(post.content),
                })}
                categoryName={post.category?.name}
                coverImageUrl={post.cover_image_url}
                coverImageAlt={post.cover_image_alt}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-ink-500">{dict.blog.empty}</p>
        )}
      </Container>

      <CtaSection
        title={settings.home.ctaTitle}
        body={settings.home.ctaBody}
        ctaLabel={settings.home.ctaLabel}
        ctaHref={href(locale, "appointment")}
      />
    </>
  );
}
