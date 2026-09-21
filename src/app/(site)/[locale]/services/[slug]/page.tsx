import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Prose } from "@/components/ui/Prose";
import { BlogCard } from "@/components/shared/BlogCard";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableOfContents } from "@/components/shared/TableOfContents";
import { getDictionary, interpolate } from "@/i18n";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { listPosts } from "@/lib/data/blog";
import { SERVICE_TO_CATEGORY } from "@/lib/data/relations";
import { getService, getServiceAlternates, listServices } from "@/lib/data/services";
import { getSettings } from "@/lib/data/settings";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { extractToc } from "@/lib/markdown";
import { formatDate, readingMinutes } from "@/lib/utils";

export const revalidate = 600;

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const services = await listServices(locale);
      return services.map((service) => ({ locale, slug: service.slug }));
    }),
  );
  return entries.flat();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [service, settings] = await Promise.all([getService(locale, slug), getSettings(locale)]);
  if (!service) return {};

  const slugByLocale = await getServiceAlternates(service.translation_key);

  return buildMetadata({
    locale,
    routeKey: "services",
    slugByLocale,
    title: service.seo_title ?? service.title,
    description: service.seo_description ?? service.short_description,
    siteName: settings.general.siteName,
    ogImage: service.og_image_url ?? settings.media.defaultOgImageUrl ?? null,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const service = await getService(locale, slug);
  if (!service) notFound();

  const dict = getDictionary(locale);
  const [settings, allServices, posts] = await Promise.all([
    getSettings(locale),
    listServices(locale),
    listPosts(locale),
  ]);

  const categoryKey = SERVICE_TO_CATEGORY[service.translation_key];
  const relatedPosts = (
    categoryKey
      ? posts.filter((post) => post.category?.translation_key === categoryKey)
      : []
  ).slice(0, 3);

  const otherServices = allServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  const toc = extractToc(service.body);
  const url = absoluteUrl(href(locale, "services", service.slug));
  const servicesUrl = absoluteUrl(href(locale, "services"));

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema({ locale, service, url, settings }),
          webPageSchema({
            locale,
            url,
            name: service.title,
            description: service.short_description,
            updatedAt: service.updated_at,
          }),
          breadcrumbSchema([
            { name: dict.common.breadcrumbHome, url: absoluteUrl(href(locale, "home")) },
            { name: dict.nav.services, url: servicesUrl },
            { name: service.title, url },
          ]),
        )}
      />

      <PageHeader
        eyebrow={dict.nav.services}
        title={service.title}
        subtitle={service.summary}
        breadcrumb={{
          items: [
            { label: dict.common.breadcrumbHome, href: href(locale, "home") },
            { label: dict.nav.services, href: href(locale, "services") },
            { label: service.title },
          ],
          label: dict.common.breadcrumbLabel,
        }}
      />

      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <div className="max-w-3xl">
            <div className="grid gap-6 sm:grid-cols-2">
              <section className="rounded-2xl bg-ice-50/70 p-6">
                <h2 className="font-serif text-lg text-ink-900">{dict.services.whoForTitle}</h2>
                <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-600">
                  {service.who_for.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ice-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl bg-sand-50 p-6">
                <h2 className="font-serif text-lg text-ink-900">{dict.services.processTitle}</h2>
                <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed text-ink-600">
                  {service.process_items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sand-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-12">
              <Prose content={service.body} />
            </div>
          </div>

          {toc.length >= 3 ? (
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <TableOfContents items={toc} title={dict.blog.tocTitle} />
            </aside>
          ) : null}
        </div>
      </Container>

      {relatedPosts.length ? (
        <Container className="pb-4">
          <h2 className="font-serif text-2xl text-ink-900">{dict.services.relatedPostsTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
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
        </Container>
      ) : null}

      {otherServices.length ? (
        <Container className="pt-14">
          <h2 className="font-serif text-2xl text-ink-900">{dict.services.otherServicesTitle}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {otherServices.map((item) => (
              <li key={item.id}>
                <Link
                  href={href(locale, "services", item.slug)}
                  className="block rounded-2xl border border-ink-200/70 bg-white px-5 py-4 text-[0.98rem] text-ink-800 transition-colors hover:border-ice-300 hover:text-ice-800"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      <CtaSection
        title={dict.services.ctaTitle}
        body={dict.services.ctaBody}
        ctaLabel={dict.services.ctaLabel}
        ctaHref={href(locale, "appointment")}
        secondaryLabel={dict.nav.services}
        secondaryHref={href(locale, "services")}
      />
    </>
  );
}
