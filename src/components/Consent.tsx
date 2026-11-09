"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    Cookiebot?: {
      consent?: { statistics: boolean; marketing: boolean; preferences: boolean };
      renew?: () => void;
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsLoaded = false;

// Cookiebot und der Google Tag Manager werden im <head> geladen (src/lib/tagging.ts);
// Cookiebot übermittelt die Einwilligung per Consent Mode v2 selbst an Google.
// Google Analytics binden wir zusätzlich direkt ein – erst nach Einwilligung in
// „Statistiken“. Hinweis: Durch <script id="Cookiebot"> ist window.Cookiebot schon
// vor dem Laden das DOM-Element – daher die optionalen Zugriffe auf consent/renew.
function loadAnalytics() {
  if (analyticsLoaded || !window.Cookiebot?.consent?.statistics) return;
  analyticsLoaded = true;
  window.gtag?.("config", site.gaId, { anonymize_ip: true });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
  document.head.appendChild(script);
}

export function isAnalyticsLoaded() {
  return analyticsLoaded;
}

export function Consent() {
  useEffect(() => {
    loadAnalytics();
    window.addEventListener("CookiebotOnConsentReady", loadAnalytics);
    window.addEventListener("CookiebotOnAccept", loadAnalytics);
    return () => {
      window.removeEventListener("CookiebotOnConsentReady", loadAnalytics);
      window.removeEventListener("CookiebotOnAccept", loadAnalytics);
    };
  }, []);

  return null;
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.Cookiebot?.renew?.()}>
      Cookie-Einstellungen
    </button>
  );
}
