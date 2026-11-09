"use client";

import { useEffect, useRef, useState } from "react";
import { KI_CHECK_STORAGE_KEY } from "@/lib/kicheck";
import { site } from "@/lib/site";
import { track, trackAdsConversion } from "@/lib/track";
import { Button } from "./ui";

type Lead = { vorname?: string; email?: string };

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
  }
}

function readLead(): Lead {
  try {
    return JSON.parse(sessionStorage.getItem(KI_CHECK_STORAGE_KEY) ?? "{}") as Lead;
  } catch {
    return {};
  }
}

export function KiCheckThanks() {
  const [lead, setLead] = useState<Lead>({});
  const [calendlyAllowed, setCalendlyAllowed] = useState(false);
  const widget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage gibt es nur im Browser
    setLead(readLead());

    // Calendly setzt Cookies – eingebettet nur nach Einwilligung in „Marketing“
    const check = () => setCalendlyAllowed(!!window.Cookiebot?.consent?.marketing);
    check();
    window.addEventListener("CookiebotOnConsentReady", check);
    window.addEventListener("CookiebotOnAccept", check);

    // Gebuchte Termine aus dem Calendly-Widget zählen
    const onMessage = (e: MessageEvent) => {
      if (e.origin === "https://calendly.com" && (e.data as { event?: string })?.event === "calendly.event_scheduled") {
        track("ki_check_booking");
        trackAdsConversion(site.googleAds.bookingLabel);
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("CookiebotOnConsentReady", check);
      window.removeEventListener("CookiebotOnAccept", check);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    if (!calendlyAllowed || !widget.current) return;
    const el = widget.current;
    const init = () => window.Calendly?.initInlineWidget({ url: `${site.kiCheckCalendlyUrl}?hide_gdpr_banner=1`, parentElement: el });
    if (window.Calendly) return init();
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, [calendlyAllowed]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-24 sm:px-6 sm:pt-32">
      <p className="text-sm font-semibold tracking-widest text-accent-deep uppercase">Anfrage eingegangen</p>
      <h1 className="mt-3 text-4xl leading-[1.1] font-extrabold tracking-tight text-balance text-ink-950 sm:text-5xl">
        Danke{lead.vorname ? `, ${lead.vorname}` : ""}! Ihr Check läuft.
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-600">
        Sie erhalten Ihren Report innerhalb von 2 Werktagen
        {lead.email ? (
          <>
            {" "}
            an <strong className="text-ink-950">{lead.email}</strong>
          </>
        ) : (
          " per E-Mail"
        )}
        . Wenn Sie den Report direkt mit uns besprechen möchten, wählen Sie hier schon einen Termin – 20 Minuten,
        telefonisch oder per Video.
      </p>

      {calendlyAllowed ? (
        <div ref={widget} className="mt-10 h-[700px] overflow-hidden rounded-3xl border border-ink-950/8 bg-white shadow-card" />
      ) : (
        <div className="mt-10 rounded-3xl border border-ink-950/8 bg-white p-8 shadow-card">
          <h2 className="text-xl font-bold text-ink-950">Besprechung gleich buchen</h2>
          <p className="mt-2 leading-relaxed text-ink-600">
            Die Terminbuchung öffnet sich bei unserem Partner Calendly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={site.kiCheckCalendlyUrl} external>
              Termin wählen
            </Button>
            <Button href={site.phone.href} variant="outline" icon="phone">
              {site.phone.display}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
