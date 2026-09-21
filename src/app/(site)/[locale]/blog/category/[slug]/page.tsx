import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { BlogCard } from "@/components/shared/BlogCard";
import { CategoryFilter } from "@/components/shared/CategoryFilter";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHeader } from "@/components/shared/PageHeader";
import { getDictionary, interpolate } from "@/i18n";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { getCategoryAlternates, listCategories, listPosts } from "@/lib/data/blog";
import { getSettings } from "@/lib/data/settings";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";

export const revalidate = 300;

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const categories = await listCategories(locale);
      return categories.map((category) => ({ locale, slug: category.slug }));
    }),
  );
  return entries.flat();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [categories, settings] = await Promise.all([listCategories(locale), getSettings(locale)]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};

  const slugByLocale = await getCategoryAlternates(category.translation_key);
  const posts = await listPosts(locale, { categorySlug: slug });

  return buildMetadata({
    locale,
    routeKey: "blogCategory",
    slugByLocale,
    title: `${category.name}`,
    description: category.description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
    noindex: posts.length === 0,
  });
}

export default async function BlogCategoryPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [categories, settings] = await Promise.all([listCategories(locale), getSettings(locale)]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const [posts, allPosts] = await Promise.all([
    listPosts(locale, { categorySlug: slug }),
    listPosts(locale),
  ]);

  const url = absoluteUrl(href(locale, "blogCategory", category.slug));
  const usedCategories = categories.filter((item) =>
    allPosts.some((post) => post.category?.slug === item.slug),
  );

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            locale,
            url,
            name: category.name,
            description: category.description ?? "",
          }),
          breadcrumbSchema([
            { name: dict.common.breadcrumbHome, url: absoluteUrl(href(locale, "home")) },
            { name: dict.nav.blog, url: absoluteUrl(href(locale, "blog")) },
            { name: category.name, url },
          ]),
        )}
      />
      <PageHeader
        eyebrow={dict.blog.categoryEyebrow}
        title={category.name}
        subtitle={category.description}
        breadcrumb={{
          items: [
            { label: dict.common.breadcrumbHome, href: href(locale, "home") },
            { label: dict.nav.blog, href: href(locale, "blog") },
            { label: category.name },
          ],
          label: dict.common.breadcrumbLabel,
        }}
      />

      <Container className="py-12 sm:py-14">
        <CategoryFilter
          label={dict.blog.categoriesTitle}
          allLabel={dict.blog.allCategories}
          allHref={href(locale, "blog")}
          activeSlug={category.slug}
          items={usedCategories.map((item) => ({
            name: item.name,
            slug: item.slug,
            href: href(locale, "blogCategory", item.slug),
          }))}
        />

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
