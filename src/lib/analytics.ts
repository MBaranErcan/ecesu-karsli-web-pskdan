/**
 * Gizlilik dostu, çerezsiz ölçümleme.
 *
 * Yalnızca olay adı gönderilir; form içeriği, e-posta, telefon ya da
 * danışanın yazdığı hiçbir metin analytics sistemine iletilmez.
 */
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export const ANALYTICS_EVENTS = {
  appointmentCta: "randevu_cta",
  formStart: "form_basladi",
  formSubmitted: "form_tamamlandi",
  phoneClick: "telefon_tikladi",
  whatsappClick: "whatsapp_tikladi",
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function trackEvent(event: AnalyticsEvent | string) {
  if (typeof window === "undefined") return;
  window.plausible?.(event);
}
