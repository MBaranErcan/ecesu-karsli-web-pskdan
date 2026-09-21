import { absoluteUrl } from "@/lib/seo";
import { href } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { SiteSettings } from "@/lib/data/settings";
import type { BlogPost, Faq, Service } from "@/lib/data/types";

type JsonLd = Record<string, unknown>;

function socialProfiles(settings: SiteSettings): string[] {
  return [settings.contact.instagram, settings.contact.linkedin].filter(
    (value): value is string => Boolean(value),
  );
}

export function personSchema(locale: Locale, settings: SiteSettings): JsonLd {
  const sameAs = socialProfiles(settings);
  return {
    "@type": "Person",
    "@id": `${absoluteUrl(href(locale, "home"))}#person`,
    name: settings.general.personName,
    jobTitle: settings.general.personTitle,
    description: settings.general.description,
    url: absoluteUrl(href(locale, "about")),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "TED Üniversitesi",
      sameAs: "https://www.tedu.edu.tr/",
    },
    knowsLanguage: ["tr", "en", "de"],
    ...(settings.media.portraitImageUrl ? { image: settings.media.portraitImageUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function professionalServiceSchema(locale: Locale, settings: SiteSettings): JsonLd {
  const regions = settings.locations.regions
    .split(",")
    .map((region) => region.trim())
    .filter(Boolean);

  return {
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl(href(locale, "home"))}#service`,
    name: `${settings.general.personName} — ${settings.general.personTitle}`,
    description: settings.general.description,
    url: absoluteUrl(href(locale, "home")),
    provider: { "@id": `${absoluteUrl(href(locale, "home"))}#person` },
    availableLanguage: ["tr", "en", "de"],
    areaServed: [
      { "@type": "City", name: settings.general.city },
      ...regions.map((region) => ({ "@type": "Place", name: `${region}, Ankara` })),
    ],
    ...(settings.contact.phone ? { telephone: settings.contact.phone } : {}),
    ...(settings.contact.email ? { email: settings.contact.email } : {}),
  };
}

export function webSiteSchema(locale: Locale, settings: SiteSettings): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl(href(locale, "home"))}#website`,
    name: settings.general.siteName,
    url: absoluteUrl(href(locale, "home")),
    inLanguage: locale,
    publisher: { "@id": `${absoluteUrl(href(locale, "home"))}#person` },
  };
}

export function webPageSchema(params: {
  locale: Locale;
  url: string;
  name: string;
  description: string;
  updatedAt?: string | null;
}): JsonLd {
  return {
    "@type": "WebPage",
    "@id": `${params.url}#webpage`,
    url: params.url,
    name: params.name,
    description: params.description,
    inLanguage: params.locale,
    isPartOf: { "@id": `${absoluteUrl(href(params.locale, "home"))}#website` },
    ...(params.updatedAt ? { dateModified: params.updatedAt } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPostingSchema(params: {
  locale: Locale;
  post: BlogPost;
  url: string;
  settings: SiteSettings;
}): JsonLd {
  const { locale, post, url, settings } = params;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    inLanguage: locale,
    mainEntityOfPage: url,
    url,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: {
      "@type": "Person",
      name: post.author_name || settings.general.personName,
      url: absoluteUrl(href(locale, "about")),
    },
    publisher: { "@id": `${absoluteUrl(href(locale, "home"))}#person` },
    ...(post.cover_image_url ? { image: [post.cover_image_url] } : {}),
    ...(post.category ? { articleSection: post.category.name } : {}),
  };
}

export function serviceSchema(params: {
  locale: Locale;
  service: Service;
  url: string;
  settings: SiteSettings;
}): JsonLd {
  const { locale, service, url, settings } = params;
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.short_description,
    url,
    serviceType: service.title,
    provider: { "@id": `${absoluteUrl(href(locale, "home"))}#person` },
    areaServed: { "@type": "City", name: settings.general.city },
    availableLanguage: ["tr", "en", "de"],
  };
}

export function faqPageSchema(faqs: Faq[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Birden fazla şemayı tek bir @graph içinde birleştirir. */
export function graph(...nodes: JsonLd[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
