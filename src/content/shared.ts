import type { SharedSettings } from "./types";

/**
 * Dilden bağımsız ayarlar.
 *
 * Telefon, e-posta ve sosyal medya hesapları bilinçli olarak boştur:
 * bu bilgiler tarafımıza iletilmediği için uydurulmaz. Admin panelinden
 * doldurulana kadar sitede gösterilmezler.
 */
export const sharedSettings: SharedSettings = {
  contact: {
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    linkedin: "",
  },
  locations: {
    regions: "Tunalı, Bahçelievler, Koru, Mamak",
  },
  media: {
    heroImageUrl: "",
    portraitImageUrl: "",
    defaultOgImageUrl: "",
  },
};
