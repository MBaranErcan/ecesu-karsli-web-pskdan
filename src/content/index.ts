import type { Locale } from "@/i18n/config";
import type { LocaleContent } from "./types";

import { trSettings } from "./tr/settings";
import { trPages } from "./tr/pages";
import { trServices } from "./tr/services";
import { trFaqs } from "./tr/faqs";
import { trBlogCategories, trBlogPosts } from "./tr/blog";

import { enSettings } from "./en/settings";
import { enPages } from "./en/pages";
import { enServices } from "./en/services";
import { enFaqs } from "./en/faqs";
import { enBlogCategories, enBlogPosts } from "./en/blog";

import { deSettings } from "./de/settings";
import { dePages } from "./de/pages";
import { deServices } from "./de/services";
import { deFaqs } from "./de/faqs";
import { deBlogCategories, deBlogPosts } from "./de/blog";

export const localeContent: Record<Locale, LocaleContent> = {
  tr: {
    settings: trSettings,
    pages: trPages,
    services: trServices,
    faqs: trFaqs,
    blogCategories: trBlogCategories,
    blogPosts: trBlogPosts,
  },
  en: {
    settings: enSettings,
    pages: enPages,
    services: enServices,
    faqs: enFaqs,
    blogCategories: enBlogCategories,
    blogPosts: enBlogPosts,
  },
  de: {
    settings: deSettings,
    pages: dePages,
    services: deServices,
    faqs: deFaqs,
    blogCategories: deBlogCategories,
    blogPosts: deBlogPosts,
  },
};

export function getLocaleContent(locale: Locale): LocaleContent {
  return localeContent[locale] ?? localeContent.tr;
}

export { sharedSettings } from "./shared";
export * from "./types";
