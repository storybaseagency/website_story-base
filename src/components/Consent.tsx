"use client";

import Script from "next/script";
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

// Hinweis: Durch <script id="Cookiebot"> ist window.Cookiebot schon vor dem
// Laden das DOM-Element – daher die optionalen Zugriffe auf consent/renew.
// Google Analytics wird erst geladen, wenn im Cookiebot-Banner der
// Kategorie „Statistiken“ zugestimmt wurde.
function loadAnalytics() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag erwartet das arguments-Objekt, kein Array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", site.gaId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
  document.head.appendChild(script);
}

export function Consent() {
  useEffect(() => {
    const check = () => {
      if (window.Cookiebot?.consent?.statistics) loadAnalytics();
    };
    check();
    window.addEventListener("CookiebotOnConsentReady", check);
    window.addEventListener("CookiebotOnAccept", check);
    return () => {
      window.removeEventListener("CookiebotOnConsentReady", check);
      window.removeEventListener("CookiebotOnAccept", check);
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
