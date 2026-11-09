"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import { ArrowIcon } from "./icons";

const texts = {
  bestaetigen: {
    eyebrow: "Einwilligung",
    title: "Tipps zum Praxismarketing per E-Mail",
    text: "Mit einem Klick bestätigen Sie, dass Story Base Ihnen gelegentlich Tipps und Angebote zum Praxismarketing per E-Mail schicken darf. Abmelden können Sie sich jederzeit über den Link in jeder E-Mail.",
    button: "Einwilligung bestätigen",
  },
  abmelden: {
    eyebrow: "Abmeldung",
    title: "Keine Tipps mehr per E-Mail erhalten",
    text: "Mit einem Klick melden Sie sich von unseren Tipps und Angeboten per E-Mail ab. Ihren Report und Antworten auf Ihre Anfragen erhalten Sie weiterhin.",
    button: "Jetzt abmelden",
  },
};

/** Seite mit Button, die die Einwilligung bestätigt oder widerruft (POST an ki-check-einwilligung.php). */
export function MarketingConsentAction({ action }: { action: keyof typeof texts }) {
  const [token, setToken] = useState<string | null>(null);
  const t = texts[action];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Token steht nur in der Browser-URL
    setToken(new URLSearchParams(window.location.search).get("t") ?? "");
  }, []);

  return (
    <Panel eyebrow={t.eyebrow} title={t.title}>
      <p className="mt-4 text-lg leading-relaxed text-ink-600">{t.text}</p>
      {token === "" ? (
        <p className="mt-8 text-ink-600">
          Dieser Link ist unvollständig. Bitte verwenden Sie den Link aus Ihrer E-Mail oder schreiben Sie uns an{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-accent-deep underline">
            {site.email}
          </a>
          .
        </p>
      ) : (
        <form action="/ki-check-einwilligung.php" method="post" className="mt-8">
          <input type="hidden" name="t" value={token ?? ""} />
          <input type="hidden" name="aktion" value={action} />
          <button
            type="submit"
            disabled={!token}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-ink-950 shadow-button transition hover:bg-accent-dark disabled:opacity-60"
          >
            {t.button}
            <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      )}
    </Panel>
  );
}

const results: Record<string, { title: string; text: string }> = {
  bestaetigt: {
    title: "Danke – Ihre Einwilligung ist bestätigt.",
    text: "Wir schicken Ihnen ab und zu Tipps zum Praxismarketing. In jeder E-Mail finden Sie einen Link, mit dem Sie sich jederzeit abmelden können.",
  },
  abgemeldet: {
    title: "Sie sind abgemeldet.",
    text: "Sie erhalten von uns keine Tipps und Angebote mehr per E-Mail. Ihren Report und Antworten auf Ihre Anfragen bekommen Sie weiterhin.",
  },
  abgelaufen: {
    title: "Dieser Link ist abgelaufen.",
    text: "Bestätigungslinks sind 30 Tage gültig. Wenn Sie unsere Tipps erhalten möchten, schreiben Sie uns einfach kurz.",
  },
  ungueltig: {
    title: "Dieser Link ist ungültig.",
    text: "Bitte verwenden Sie den vollständigen Link aus Ihrer E-Mail oder schreiben Sie uns kurz.",
  },
};

/** Ergebnisseite nach Bestätigung oder Abmeldung. */
export function MarketingConsentResult() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Status steht nur in der Browser-URL
    setStatus(new URLSearchParams(window.location.search).get("status") ?? "ungueltig");
  }, []);

  if (!status) return <Panel eyebrow="Einwilligung" title="" />;
  const r = results[status] ?? results.ungueltig;
  return (
    <Panel eyebrow="Einwilligung" title={r.title}>
      <p className="mt-4 text-lg leading-relaxed text-ink-600">
        {r.text}{" "}
        {(status === "abgelaufen" || status === "ungueltig") && (
          <a href={`mailto:${site.email}`} className="font-semibold text-accent-deep underline">
            {site.email}
          </a>
        )}
      </p>
      <Link href="/" className="mt-8 inline-block font-semibold text-accent-deep underline underline-offset-2">
        Zur Startseite
      </Link>
    </Panel>
  );
}

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-32 pb-24 sm:px-6">
      <p className="text-sm font-semibold tracking-widest text-accent-deep uppercase">{eyebrow}</p>
      <h1 className="mt-3 min-h-[1.2em] text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-ink-950">
        {title}
      </h1>
      {children}
    </div>
  );
}
