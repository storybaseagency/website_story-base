"use client";

import { useRef, type MouseEvent } from "react";
import { track } from "@/lib/track";

// Echter Beispiel-Report (Schönheitspraxis in Berlin, November 2026). Praxisname,
// Adresse, Arzt, Website, Stadtteil und Konkurrenzpraxen sind geschwärzt. Die
// Seiten liegen nur als Bilder vor; die PDF wird nicht veröffentlicht.
const pages = [1, 2, 3, 4].map((n) => ({
  src: `/images/beispiel-report-${n}.webp`,
  alt: `Beispiel-Report, Seite ${n} von 4 (anonymisiert)`,
}));

/** Kleiner Hinweis im Hero: springt zum echten Beispiel-Report weiter unten. */
export function ReportTeaser() {
  return (
    <a
      href="#report"
      className="group flex w-fit items-center gap-4 rounded-2xl border border-ink-950/8 bg-white/80 p-2 pr-5 text-left shadow-card backdrop-blur transition hover:border-accent/40 hover:shadow-card-hover"
    >
      <span className="h-14 w-11 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-ink-950/10">
        <img
          src="/images/beispiel-report-1-klein.webp"
          alt=""
          width={44}
          height={62}
          className="w-full transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className="leading-tight">
        <span className="block font-semibold text-ink-950">So sieht Ihr Report aus</span>
        <span className="text-sm text-ink-500">Echtes Beispiel ansehen</span>
      </span>
    </a>
  );
}

export function ReportPreview() {
  const dialog = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialog.current?.showModal();
    track("ki_check_report_preview");
  };
  const close = () => dialog.current?.close();
  const onDialogClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <figure className="mx-auto max-w-md">
      <button
        type="button"
        onClick={open}
        aria-label="Beispiel-Report ansehen: alle 4 Seiten, anonymisiert"
        className="group relative block w-full cursor-zoom-in pt-4 pr-10 pb-6 pl-2"
      >
        {/* Seiten 3 und 2 schauen hinter Seite 1 hervor */}
        <img
          src={pages[2].src}
          alt=""
          width={1000}
          height={1414}
          loading="lazy"
          className="absolute top-0 right-0 w-[78%] rotate-6 rounded-lg shadow-card transition-transform duration-300 group-hover:rotate-8"
        />
        <img
          src={pages[1].src}
          alt=""
          width={1000}
          height={1414}
          loading="lazy"
          className="absolute top-2 right-4 w-[80%] rotate-3 rounded-lg shadow-card transition-transform duration-300 group-hover:rotate-4"
        />
        <img
          src="/images/beispiel-report-1-klein.webp"
          alt={pages[0].alt}
          width={640}
          height={905}
          loading="lazy"
          className="relative w-[84%] rounded-lg shadow-image ring-1 ring-ink-950/5 transition-transform duration-300 group-hover:-translate-y-1"
        />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white shadow-button transition group-hover:bg-ink-800">
          Alle 4 Seiten ansehen
        </span>
      </button>
      <figcaption className="mt-4 text-center text-sm text-ink-500">
        Echter Report einer Schönheitspraxis in Berlin, einer von über 20 bisher. Namen, Adressen und Daten sind geschwärzt.
      </figcaption>

      <dialog
        ref={dialog}
        aria-label="Beispiel-Report, 4 Seiten"
        onClick={onDialogClick}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
      >
        <div className="mx-auto flex min-h-full max-w-3xl flex-col gap-4 px-4 py-16" onClick={onDialogClick}>
          {pages.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              width={1000}
              height={1414}
              loading="lazy"
              className="w-full rounded-lg shadow-image"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Schließen"
          className="fixed top-4 right-4 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white text-ink-950 shadow-card transition hover:bg-paper"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </dialog>
    </figure>
  );
}
