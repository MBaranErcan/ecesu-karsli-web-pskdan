import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BlogCard } from "@/components/shared/BlogCard";
import { CtaSection } from "@/components/shared/CtaSection";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { HeroPortrait } from "@/components/shared/HeroPortrait";
import { LocationCard } from "@/components/shared/LocationCard";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { Section } from "@/components/shared/Section";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getDictionary, interpolate } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { listPosts } from "@/lib/data/blog";
import { listFeaturedFaqs } from "@/lib/data/faqs";
import { getPage } from "@/lib/data/pages";
import { listServices } from "@/lib/data/services";
import { getSettings } from "@/lib/data/settings";
import {
  graph,
  personSchema,
  professionalServiceSchema,
  webPageSchema,
  webSiteSchema,
} from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate, readingMinutes } from "@/lib/utils";

export const revalidate = 600;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [page, settings] = await Promise.all([getPage(locale, "home"), getSettings(locale)]);

  return buildMetadata({
    locale,
    routeKey: "home",
    title: page?.seo_title ?? settings.general.siteName,
    description: page?.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
  });
}

export default async function HomePage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [settings, services, faqs, posts, page] = await Promise.all([
    getSettings(locale),
    listServices(locale),
    listFeaturedFaqs(locale, 5),
    listPosts(locale, { limit: 3 }),
    getPage(locale, "home"),
  ]);

  const { home } = settings;
  const regions = settings.locations.regions
    .split(",")
    .map((region) => region.trim())
    .filter(Boolean);

  const featuredServices = services.filter((service) => service.featured);
  const shownServices = (featuredServices.length ? featuredServices : services).slice(0, 6);

  const processSteps = [
    { title: home.processStep1Title, body: home.processStep1Body },
    { title: home.processStep2Title, body: home.processStep2Body },
    { title: home.processStep3Title, body: home.processStep3Body },
    { title: home.processStep4Title, body: home.processStep4Body },
  ];

  const url = absoluteUrl(href(locale, "home"));

  return (
    <>
      <JsonLd
        data={graph(
          personSchema(locale, settings),
          professionalServiceSchema(locale, settings),
          webSiteSchema(locale, settings),
          webPageSchema({
            locale,
            url,
            name: page?.seo_title ?? settings.general.siteName,
            description: page?.seo_description ?? settings.general.description,
            updatedAt: page?.updated_at,
          }),
        )}
      />

      {/* Hero */}
      <section className="border-b border-ink-200/50 bg-gradient-to-b from-ice-50/70 to-canvas">
        <Container size="wide" className="py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ice-700">
                {home.heroEyebrow}
              </p>
              <h1 className="max-w-2xl font-serif text-[2.15rem] leading-[1.12] text-ink-900 sm:text-[2.9rem] lg:text-[3.25rem]">
                {home.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-ink-600">
                {home.heroSubtitle}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={href(locale, "appointment")} size="lg" data-analytics="randevu_cta">
                  {home.heroPrimaryCta}
                </ButtonLink>
                <ButtonLink href={href(locale, "services")} variant="secondary" size="lg">
                  {home.heroSecondaryCta}
                </ButtonLink>
              </div>
              <p className="mt-8 text-sm text-ink-500">{dict.home.heroNote}</p>
            </div>
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <HeroPortrait
                src={settings.media.heroImageUrl}
                alt={home.heroImageAlt}
                name={settings.general.personName}
                title={settings.general.personTitle}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Kısa tanıtım */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionTitle eyebrow={settings.general.personTitle} title={home.introTitle} />
          <div>
            <p className="text-[1.05rem] leading-relaxed text-ink-600">{home.introBody}</p>
            <Link
              href={href(locale, "about")}
              className="mt-6 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-ice-700 underline-offset-4 hover:text-ice-900 hover:underline"
            >
              {home.introCta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Section>

      {/* Çalışma alanları */}
      <Section tone="muted">
        <SectionTitle title={dict.home.servicesTitle} lead={dict.home.servicesLead} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shownServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.short_description}
              href={href(locale, "services", service.slug)}
              cta={dict.common.learnMore}
            />
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href={href(locale, "services")} variant="secondary">
            {dict.home.servicesCta}
          </ButtonLink>
        </div>
      </Section>

      {/* Nasıl çalışıyorum */}
      <Section>
        <SectionTitle title={dict.home.processTitle} lead={dict.home.processLead} />
        <div className="mt-12">
          <ProcessSteps steps={processSteps} />
        </div>
      </Section>

      {/* Görüşme biçimleri */}
      <Section tone="sand">
        <SectionTitle title={dict.home.formatsTitle} lead={dict.home.formatsLead} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              title: dict.home.onlineCardTitle,
              body: dict.home.onlineCardBody,
              cta: dict.home.onlineCardCta,
              target: href(locale, "online"),
            },
            {
              title: dict.home.inPersonCardTitle,
              body: dict.home.inPersonCardBody,
              cta: dict.home.inPersonCardCta,
              target: href(locale, "ankara"),
            },
          ].map((card) => (
            <article
              key={card.title}
              className="group relative flex flex-col rounded-2xl border border-ink-200/70 bg-white p-7"
            >
              <h3 className="font-serif text-xl text-ink-900">{card.title}</h3>
              <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-ink-600">{card.body}</p>
              <Link
                href={card.target}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ice-700 after:absolute after:inset-0 after:content-[''] group-hover:text-ice-900"
              >
                {card.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      {/* Ankara bölgeleri */}
      <Section>
        <SectionTitle title={dict.home.locationsTitle} lead={home.locationsNote} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((region) => (
            <LocationCard key={region} name={region} note={settings.general.city} />
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={href(locale, "ankara")} variant="secondary">
            {dict.home.inPersonCardCta}
          </ButtonLink>
        </div>
      </Section>

      {/* SSS */}
      <Section tone="muted" size="narrow">
        <SectionTitle title={dict.home.faqTitle} lead={dict.home.faqLead} />
        <div className="mt-8">
          <FaqAccordion
            items={faqs.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
          />
        </div>
        <div className="mt-8">
          <ButtonLink href={href(locale, "faq")} variant="secondary">
            {dict.home.faqCta}
          </ButtonLink>
        </div>
      </Section>

      {/* Blog */}
      {posts.length ? (
        <Section>
          <SectionTitle title={dict.home.blogTitle} lead={dict.home.blogLead} />
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
          <div className="mt-10">
            <ButtonLink href={href(locale, "blog")} variant="secondary">
              {dict.home.blogCta}
            </ButtonLink>
          </div>
        </Section>
      ) : null}

      <CtaSection
        title={home.ctaTitle}
        body={home.ctaBody}
        ctaLabel={home.ctaLabel}
        ctaHref={href(locale, "appointment")}
        secondaryLabel={dict.nav.contact}
        secondaryHref={href(locale, "contact")}
      />
    </>
  );
}
