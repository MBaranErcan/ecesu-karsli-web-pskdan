"use client";

import Script from "next/script";
import { useEffect } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

interface AnalyticsProps {
  enabled: boolean;
  domain?: string;
  scriptSrc?: string;
}

/**
 * Ölçümleme kapalıyken hiçbir script yüklenmez ve hiçbir istek yapılmaz.
 *
 * Olaylar `data-analytics` özniteliğiyle işaretlenmiş bağlantılardan ve
 * telefon / WhatsApp bağlantılarından otomatik toplanır.
 */
export function Analytics({ enabled, domain, scriptSrc }: AnalyticsProps) {
  useEffect(() => {
    if (!enabled) return;

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button");
      if (!target) return;

      const named = target.dataset.analytics;
      if (named) {
        trackEvent(named);
        return;
      }

      const href = target.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackEvent(ANALYTICS_EVENTS.phoneClick);
      else if (href.includes("wa.me")) trackEvent(ANALYTICS_EVENTS.whatsappClick);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  if (!enabled || !domain || !scriptSrc) return null;

  return <Script src={scriptSrc} data-domain={domain} strategy="afterInteractive" defer />;
}
