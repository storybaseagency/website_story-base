import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

// Ziel der Formular-Weiterleitung, wenn JavaScript deaktiviert ist
export const metadata: Metadata = {
  title: "Danke für Ihre Anfrage",
  robots: { index: false, follow: true },
};

export default function Danke() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-accent-deep uppercase">Anfrage gesendet</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink-950">Danke – wir melden uns.</h1>
      <p className="mt-4 text-ink-600">
        Ihre Anfrage ist bei uns angekommen. Wenn es schneller gehen soll, buchen Sie Ihren Praxis-Check direkt online.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={site.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-accent px-7 py-3.5 font-semibold text-ink-950 shadow-button hover:bg-accent-dark"
        >
          Termin buchen
        </a>
        <Link href="/" className="rounded-full border border-ink-950/14 px-7 py-3.5 font-semibold text-ink-950 hover:bg-white">
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
