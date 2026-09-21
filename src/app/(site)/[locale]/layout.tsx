import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { inter, lora } from "@/app/fonts";
import { Header, type NavItem } from "@/components/layout/Header";
import { Footer, type FooterLink } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Analytics } from "@/components/Analytics";
import { getDictionary } from "@/i18n";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { getSettings } from "@/lib/data/settings";
import { listServices } from "@/lib/data/services";
import { env } from "@/lib/env";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "tr";
  const settings = await getSettings(locale);

  return {
    metadataBase: new URL(env.siteUrl),
    title: {
      default: `${settings.general.personName} | ${settings.general.personTitle}`,
      template: `%s | ${settings.general.siteName}`,
    },
    description: settings.general.description,
    applicationName: settings.general.siteName,
    authors: [{ name: settings.general.personName }],
    creator: settings.general.personName,
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const dict = getDictionary(locale);
  const [settings, services] = await Promise.all([getSettings(locale), listServices(locale)]);

  const navItems: NavItem[] = [
    { label: dict.nav.home, href: href(locale, "home") },
    { label: dict.nav.about, href: href(locale, "about") },
    { label: dict.nav.services, href: href(locale, "services") },
    { label: dict.nav.online, href: href(locale, "online") },
    { label: dict.nav.blog, href: href(locale, "blog") },
    { label: dict.nav.faqShort, href: href(locale, "faq") },
    { label: dict.nav.contact, href: href(locale, "contact") },
  ];

  const social: FooterLink[] = [];
  if (settings.contact.instagram) {
    social.push({ label: dict.contact.instagramLabel, href: settings.contact.instagram });
  }
  if (settings.contact.linkedin) {
    social.push({ label: dict.contact.linkedinLabel, href: settings.contact.linkedin });
  }

  const footerColumns = [
    {
      title: dict.footer.navTitle,
      links: [
        { label: dict.nav.about, href: href(locale, "about") },
        { label: dict.nav.online, href: href(locale, "online") },
        { label: dict.home.inPersonCardCta, href: href(locale, "ankara") },
        { label: dict.nav.blog, href: href(locale, "blog") },
        { label: dict.nav.faq, href: href(locale, "faq") },
        { label: dict.nav.contact, href: href(locale, "contact") },
      ],
    },
    {
      title: dict.footer.servicesTitle,
      links: services.slice(0, 6).map((service) => ({
        label: service.title,
        href: href(locale, "services", service.slug),
      })),
    },
    {
      title: dict.footer.legalTitle,
      links: [
        { label: dict.nav.appointment, href: href(locale, "appointment") },
        { label: dict.appointment.consentLinkText, href: href(locale, "kvkk") },
        { label: dict.footer.privacy, href: href(locale, "privacy") },
        { label: dict.footer.cookies, href: href(locale, "cookies") },
      ],
    },
  ];

  return (
    <html lang={locale} className={`${inter.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SkipLink label={dict.nav.skipToContent} />
        <Header
          locale={locale}
          brandName={settings.general.personName}
          brandTitle={settings.general.personTitle}
          homeHref={href(locale, "home")}
          items={navItems}
          ctaLabel={dict.nav.appointment}
          ctaHref={href(locale, "appointment")}
          labels={{
            openMenu: dict.nav.openMenu,
            closeMenu: dict.nav.closeMenu,
            mainNav: dict.nav.mainNavLabel,
            language: dict.nav.languageLabel,
          }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Analytics
          enabled={env.analyticsEnabled}
          domain={env.analyticsDomain}
          scriptSrc={env.analyticsScriptSrc}
        />
        <Footer
          brandName={settings.general.personName}
          brandTitle={settings.general.personTitle}
          description={settings.general.tagline}
          homeHref={href(locale, "home")}
          columns={footerColumns}
          social={social}
          socialTitle={dict.footer.followTitle}
          disclaimer={dict.footer.disclaimer}
          rights={dict.footer.rights}
        />
      </body>
    </html>
  );
}
