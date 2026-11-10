// Tracking-Ereignisse für den Google Tag Manager. Sie landen im dataLayer; ob ein
// Tag darauf feuert (z. B. eine Google-Ads-Conversion), entscheidet der Tag Manager
// anhand der Einwilligung aus Cookiebot (Consent Mode v2).

import { isAnalyticsLoaded } from "@/components/Consent";

export type TrackEvent = "ki_check_view" | "ki_check_form_start" | "ki_check_step2" | "ki_check_lead" | "ki_check_booking"
  | "ki_check_video_play";

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  // Direkt eingebundenes Google Analytics zusätzlich informieren (nur nach Einwilligung geladen)
  if (isAnalyticsLoaded()) window.gtag?.("event", event, params);
}
