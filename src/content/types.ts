/** Başlangıç içeriklerinin (seed + fallback) tip tanımları. */

export interface SharedSettings {
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    instagram: string;
    linkedin: string;
  };
  locations: {
    regions: string;
  };
  media: {
    heroImageUrl: string;
    portraitImageUrl: string;
    defaultOgImageUrl: string;
  };
}

export interface LocalizedSettings {
  general: {
    siteName: string;
    personName: string;
    personTitle: string;
    tagline: string;
    description: string;
    city: string;
    responseTime: string;
    contactNote: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    heroImageAlt: string;
    introTitle: string;
    introBody: string;
    introCta: string;
    processStep1Title: string;
    processStep1Body: string;
    processStep2Title: string;
    processStep2Body: string;
    processStep3Title: string;
    processStep3Body: string;
    processStep4Title: string;
    processStep4Body: string;
    locationsNote: string;
    ctaTitle: string;
    ctaBody: string;
    ctaLabel: string;
  };
}

export type SharedSettingsKey = keyof SharedSettings;
export type LocalizedSettingsKey = keyof LocalizedSettings;

export interface PageSeed {
  /** Diller arasında aynı sayfayı eşleştiren sabit anahtar. */
  translation_key: string;
  slug: string;
  title: string;
  subtitle: string | null;
  eyebrow: string | null;
  body: string | null;
  seo_title: string;
  seo_description: string;
}

export interface ServiceSeed {
  translation_key: string;
  slug: string;
  title: string;
  short_description: string;
  summary: string;
  who_for: string[];
  process_items: string[];
  body: string;
  order_index: number;
  featured: boolean;
  seo_title: string;
  seo_description: string;
}

export interface FaqSeed {
  translation_key: string;
  question: string;
  answer: string;
  category: string | null;
  order_index: number;
  featured: boolean;
}

export interface BlogCategorySeed {
  translation_key: string;
  slug: string;
  name: string;
  description: string;
  order_index: number;
}

export interface BlogPostSeed {
  translation_key: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category_key: string;
  published_at: string;
  seo_title: string;
  seo_description: string;
}

export interface LocaleContent {
  settings: LocalizedSettings;
  pages: PageSeed[];
  services: ServiceSeed[];
  faqs: FaqSeed[];
  blogCategories: BlogCategorySeed[];
  blogPosts: BlogPostSeed[];
}
