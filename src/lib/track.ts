// Tracking-Ereignisse – feuern nur, wenn gtag nach einer Einwilligung geladen ist.
// Ohne Einwilligung passiert nichts.

import { site } from "./site";

// Wird ausgelöst, sobald gtag nach einer Einwilligung bereitsteht (siehe Consent.tsx)
export const TRACKING_READY_EVENT = "sb:tracking-ready";

export type TrackEvent = "ki_check_view" | "ki_check_form_start" | "ki_check_step2" | "ki_check_lead" | "ki_check_booking";

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  window.gtag?.("event", event, params);
}

/** Google-Ads-Conversion senden (nur mit Marketing-Einwilligung und hinterlegter ID). */
export function trackAdsConversion(label: string) {
  const { id } = site.googleAds;
  if (!id || !label || !window.Cookiebot?.consent?.marketing) return;
  window.gtag?.("event", "conversion", { send_to: `${id}/${label}` });
}

/** Führt fn aus, sobald Tracking bereitsteht – sofort, falls schon geladen. */
export function whenTrackingReady(fn: () => void) {
  if (window.gtag) {
    fn();
    return () => {};
  }
  const handler = () => fn();
  window.addEventListener(TRACKING_READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(TRACKING_READY_EVENT, handler);
}
