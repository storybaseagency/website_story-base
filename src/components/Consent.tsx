"use client";

import Script from "next/script";
import { useEffect } from "react";
import { site } from "@/lib/site";
import { TRACKING_READY_EVENT } from "@/lib/track";

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

const configured = { analytics: false, ads: false };

function ensureGtag(id: string) {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag erwartet das arguments-Objekt, kein Array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

// Hinweis: Durch <script id="Cookiebot"> ist window.Cookiebot schon vor dem
// Laden das DOM-Element – daher die optionalen Zugriffe auf consent/renew.
// Google Analytics lädt erst nach Einwilligung in „Statistiken“,
// Google-Ads-Conversion-Tracking erst nach Einwilligung in „Marketing“.
function applyConsent() {
  const consent = window.Cookiebot?.consent;
  if (!consent) return;
  const ads = site.googleAds.id;

  if (consent.statistics && !configured.analytics) {
    ensureGtag(site.gaId);
    window.gtag!("config", site.gaId, { anonymize_ip: true });
    configured.analytics = true;
  }
  if (consent.marketing && ads && !configured.ads) {
    ensureGtag(ads);
    window.gtag!("config", ads);
    configured.ads = true;
  }
  if (window.gtag) window.dispatchEvent(new Event(TRACKING_READY_EVENT));
}

export function Consent() {
  useEffect(() => {
    applyConsent();
    window.addEventListener("CookiebotOnConsentReady", applyConsent);
    window.addEventListener("CookiebotOnAccept", applyConsent);
    return () => {
      window.removeEventListener("CookiebotOnConsentReady", applyConsent);
      window.removeEventListener("CookiebotOnAccept", applyConsent);
    };
  }, []);

  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={site.cookiebotId}
      data-culture="de"
      strategy="afterInteractive"
    />
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.Cookiebot?.renew?.()}>
      Cookie-Einstellungen
    </button>
  );
}
