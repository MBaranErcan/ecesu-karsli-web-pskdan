/** Site ayarları formundaki alanların Türkçe etiketleri ve alan tipleri. */

export interface SettingFieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "url";
  hint?: string;
  rows?: number;
}

export interface SettingGroupDef {
  key: string;
  title: string;
  description: string;
  scope: "shared" | "localized";
  fields: SettingFieldDef[];
}

export const settingGroups: SettingGroupDef[] = [
  {
    key: "general",
    title: "Genel bilgiler",
    description: "Site adı, unvan ve arama sonuçlarında kullanılan varsayılan açıklama.",
    scope: "localized",
    fields: [
      { name: "siteName", label: "Site adı", type: "text" },
      { name: "personName", label: "Ad Soyad", type: "text" },
      { name: "personTitle", label: "Unvan", type: "text" },
      { name: "tagline", label: "Kısa tanım", type: "text" },
      {
        name: "description",
        label: "Varsayılan meta açıklama",
        type: "textarea",
        rows: 3,
        hint: "Sayfaya özel açıklama yoksa kullanılır.",
      },
      { name: "city", label: "Şehir", type: "text" },
      { name: "responseTime", label: "Yanıt süresi metni", type: "text" },
      { name: "contactNote", label: "Form üstü bilgilendirme", type: "textarea", rows: 3 },
    ],
  },
  {
    key: "home",
    title: "Ana sayfa metinleri",
    description: "Hero alanı, kısa tanıtım, süreç adımları ve kapanış çağrısı.",
    scope: "localized",
    fields: [
      { name: "heroEyebrow", label: "Hero üst etiketi", type: "text" },
      { name: "heroTitle", label: "Hero başlığı (H1)", type: "textarea", rows: 2 },
      { name: "heroSubtitle", label: "Hero alt metni", type: "textarea", rows: 4 },
      { name: "heroPrimaryCta", label: "Birincil buton metni", type: "text" },
      { name: "heroSecondaryCta", label: "İkincil buton metni", type: "text" },
      { name: "heroImageAlt", label: "Hero görseli alternatif metni", type: "text" },
      { name: "introTitle", label: "Kısa tanıtım başlığı", type: "text" },
      { name: "introBody", label: "Kısa tanıtım metni", type: "textarea", rows: 5 },
      { name: "introCta", label: "Kısa tanıtım bağlantı metni", type: "text" },
      { name: "processStep1Title", label: "1. adım başlığı", type: "text" },
      { name: "processStep1Body", label: "1. adım metni", type: "textarea", rows: 3 },
      { name: "processStep2Title", label: "2. adım başlığı", type: "text" },
      { name: "processStep2Body", label: "2. adım metni", type: "textarea", rows: 3 },
      { name: "processStep3Title", label: "3. adım başlığı", type: "text" },
      { name: "processStep3Body", label: "3. adım metni", type: "textarea", rows: 3 },
      { name: "processStep4Title", label: "4. adım başlığı", type: "text" },
      { name: "processStep4Body", label: "4. adım metni", type: "textarea", rows: 3 },
      { name: "locationsNote", label: "Ankara bölgeleri açıklaması", type: "textarea", rows: 4 },
      { name: "ctaTitle", label: "Kapanış CTA başlığı", type: "text" },
      { name: "ctaBody", label: "Kapanış CTA metni", type: "textarea", rows: 3 },
      { name: "ctaLabel", label: "Kapanış CTA buton metni", type: "text" },
    ],
  },
  {
    key: "contact",
    title: "İletişim bilgileri",
    description:
      "Bu alanlar tüm diller için ortaktır. Boş bırakılan bilgiler sitede hiç gösterilmez.",
    scope: "shared",
    fields: [
      { name: "phone", label: "Telefon", type: "text", hint: "Örnek biçim: +90 5xx xxx xx xx" },
      { name: "whatsapp", label: "WhatsApp numarası", type: "text" },
      { name: "email", label: "E-posta", type: "text" },
      { name: "instagram", label: "Instagram bağlantısı", type: "url" },
      { name: "linkedin", label: "LinkedIn bağlantısı", type: "url" },
    ],
  },
  {
    key: "locations",
    title: "Ankara bölgeleri",
    description: "Görüşme organize edilebilen bölgeler. Virgülle ayırın.",
    scope: "shared",
    fields: [{ name: "regions", label: "Bölgeler", type: "text" }],
  },
  {
    key: "media",
    title: "Site görselleri",
    description: "Görseller sayfasından yükleyip bağlantıları buraya yapıştırın.",
    scope: "shared",
    fields: [
      { name: "heroImageUrl", label: "Hero görseli", type: "url" },
      { name: "portraitImageUrl", label: "Profil fotoğrafı", type: "url" },
      { name: "defaultOgImageUrl", label: "Varsayılan paylaşım görseli (OG)", type: "url" },
    ],
  },
];
