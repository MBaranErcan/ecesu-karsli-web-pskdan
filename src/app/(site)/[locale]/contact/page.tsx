import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/shared/PageHeader";
import { getDictionary } from "@/i18n";
import { isLocale, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { getPage } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/settings";
import {
  breadcrumbSchema,
  graph,
  personSchema,
  professionalServiceSchema,
  webPageSchema,
} from "@/lib/jsonld";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { telHref, whatsappHref } from "@/lib/utils";

export const revalidate = 600;

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const [page, settings] = await Promise.all([getPage(locale, "contact"), getSettings(locale)]);
  if (!page) return {};

  return buildMetadata({
    locale,
    routeKey: "contact",
    title: page.seo_title ?? page.title,
    description: page.seo_description ?? settings.general.description,
    siteName: settings.general.siteName,
    ogImage: settings.media.defaultOgImageUrl || null,
  });
}

export default async function ContactPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [page, settings] = await Promise.all([getPage(locale, "contact"), getSettings(locale)]);
  if (!page) notFound();

  const { contact } = settings;
  const channels = [
    contact.phone ? { label: dict.contact.phoneLabel, value: contact.phone, href: telHref(contact.phone) } : null,
    contact.email ? { label: dict.contact.emailLabel, value: contact.email, href: `mailto:${contact.email}` } : null,
    contact.instagram
      ? { label: dict.contact.instagramLabel, value: contact.instagram.replace(/^https?:\/\//, ""), href: contact.instagram }
      : null,
    contact.linkedin
      ? { label: dict.contact.linkedinLabel, value: contact.linkedin.replace(/^https?:\/\//, ""), href: contact.linkedin }
      : null,
  ].filter((item) => item !== null);

  const url = absoluteUrl(href(locale, "contact"));

  return (
    <>
      <JsonLd
        data={graph(
          personSchema(locale, settings),
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
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <section>
            <h2 className="font-serif text-2xl text-ink-900">{dict.contact.channelsTitle}</h2>
            {channels.length ? (
              <dl className="mt-6 space-y-5">
                {channels.map((channel) => (
                  <div key={channel.label}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                      {channel.label}
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={channel.href}
                        className="text-[1.05rem] text-ice-700 underline-offset-4 hover:underline"
                        {...(channel.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer me" }
                          : {})}
                      >
                        {channel.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-6 text-[1rem] leading-relaxed text-ink-600">
                {dict.contact.noChannelsYet}
              </p>
            )}

            {contact.whatsapp ? (
              <div className="mt-8">
                <ButtonLink
                  href={whatsappHref(contact.whatsapp)}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dict.contact.whatsappCta}
                </ButtonLink>
              </div>
            ) : null}

            <p className="mt-8 text-sm leading-relaxed text-ink-500">
              {settings.general.responseTime}
            </p>
          </section>

          <section className="rounded-3xl bg-ice-50 p-7 sm:p-9">
            <h2 className="font-serif text-2xl text-ink-900">{dict.contact.preferFormTitle}</h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-600">
              {dict.contact.preferFormBody}
            </p>
            <div className="mt-7">
              <ButtonLink href={href(locale, "appointment")} size="lg" data-analytics="randevu_cta">
                {settings.home.ctaLabel}
              </ButtonLink>
            </div>

            <div className="mt-10 space-y-6 border-t border-ice-200 pt-7">
              <div>
                <h3 className="font-serif text-lg text-ink-900">{dict.contact.onlineTitle}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-600">
                  {dict.contact.onlineBody}
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg text-ink-900">{dict.contact.inPersonTitle}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-600">
                  {dict.contact.inPersonBody}
                </p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
