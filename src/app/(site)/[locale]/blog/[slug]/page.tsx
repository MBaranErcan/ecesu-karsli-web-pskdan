import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Prose } from "@/components/ui/Prose";
import { BlogCard } from "@/components/shared/BlogCard";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CtaSection } from "@/components/shared/CtaSection";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { TableOfContents } from "@/components/shared/TableOfContents";
import { getDictionary, interpolate } from "@/i18n";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { getPost, getPostAlternates, listPosts, listRelatedPosts } from "@/lib/data/blog";
import { getSettings } from "@/lib/data/settings";
import { blogPostingSchema, breadcrumbSchema, graph } from "@/lib/jsonld";
import { extractToc } from "@/lib/markdown";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate, isoDate, readingMinutes } from "@/lib/utils";

export const revalidate = 300;

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const posts = await listPosts(locale);
      return posts.map((post) => ({ locale, slug: post.slug }));
    }),
  );
  return entries.flat();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [post, settings] = await Promise.all([getPost(locale, slug), getSettings(locale)]);
  if (!post) return {};

  const slugByLocale = await getPostAlternates(post.translation_key);

  return buildMetadata({
    locale,
    routeKey: "blog",
    slugByLocale,
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt,
    siteName: settings.general.siteName,
    ogImage: post.og_image_url ?? post.cover_image_url ?? settings.media.defaultOgImageUrl ?? null,
    type: "article",
    publishedTime: post.published_at,
    modifiedTime: post.updated_at,
    canonicalOverride: post.canonical_url,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const post = await getPost(locale, slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const [settings, related] = await Promise.all([
    getSettings(locale),
    listRelatedPosts(locale, post, 3),
  ]);

  const toc = extractToc(post.content);
  const url = absoluteUrl(href(locale, "blog", post.slug));
  const minutes = readingMinutes(post.content);

  const crumbs = [
    { label: dict.common.breadcrumbHome, href: href(locale, "home") },
    { label: dict.nav.blog, href: href(locale, "blog") },
    ...(post.category
      ? [{ label: post.category.name, href: href(locale, "blogCategory", post.category.slug) }]
      : []),
    { label: post.title },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          blogPostingSchema({ locale, post, url, settings }),
          breadcrumbSchema(
            crumbs.map((crumb) => ({
              name: crumb.label,
              url: crumb.href ? absoluteUrl(crumb.href) : url,
            })),
          ),
        )}
      />

      <Container className="pt-10">
        <Breadcrumb items={crumbs} label={dict.common.breadcrumbLabel} />
      </Container>

      <Container className="pb-12">
        <article>
          <header className="mx-auto max-w-3xl">
            {post.category ? (
              <Link
                href={href(locale, "blogCategory", post.category.slug)}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-ice-700 underline-offset-4 hover:underline"
              >
                {post.category.name}
              </Link>
            ) : null}
            <h1 className="mt-4 font-serif text-[2rem] leading-[1.18] text-ink-900 sm:text-[2.5rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-600">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
              <span>{post.author_name}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={isoDate(post.published_at)}>
                {formatDate(post.published_at, locale)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{interpolate(dict.blog.readingTime, { minutes })}</span>
            </div>
            {post.updated_at && isoDate(post.updated_at) !== isoDate(post.published_at) ? (
              <p className="mt-2 text-sm text-ink-500">
                {dict.common.updatedOn}: {formatDate(post.updated_at, locale)}
              </p>
            ) : null}
          </header>

          {post.cover_image_url ? (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ice-50">
              <Image
                src={post.cover_image_url}
                alt={post.cover_image_alt ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
            <div className="max-w-3xl">
              <Prose content={post.content} />

              <p className="mt-12 rounded-2xl bg-ink-50 px-5 py-4 text-sm leading-relaxed text-ink-500">
                {dict.blog.disclaimer}
              </p>

              <div className="mt-8 border-t border-ink-200/70 pt-6">
                <ShareButtons
                  url={url}
                  title={post.title}
                  labels={{
                    share: dict.blog.shareTitle,
                    copyLink: dict.common.copyLink,
                    copied: dict.common.copied,
                  }}
                />
              </div>
            </div>

            {toc.length >= 3 ? (
              <aside className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
                <TableOfContents items={toc} title={dict.blog.tocTitle} />
              </aside>
            ) : null}
          </div>
        </article>
      </Container>

      {related.length ? (
        <Container className="pb-6">
          <h2 className="font-serif text-2xl text-ink-900">{dict.blog.relatedTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard
                key={item.id}
                title={item.title}
                excerpt={item.excerpt}
                href={href(locale, "blog", item.slug)}
                date={formatDate(item.published_at, locale)}
                readingTime={interpolate(dict.blog.readingTime, {
                  minutes: readingMinutes(item.content),
                })}
                categoryName={item.category?.name}
                coverImageUrl={item.cover_image_url}
                coverImageAlt={item.cover_image_alt}
              />
            ))}
          </div>
        </Container>
      ) : null}

      <CtaSection
        title={dict.blog.ctaTitle}
        body={dict.blog.ctaBody}
        ctaLabel={dict.blog.ctaLabel}
        ctaHref={href(locale, "appointment")}
        secondaryLabel={dict.nav.services}
        secondaryHref={href(locale, "services")}
      />
    </>
  );
}
