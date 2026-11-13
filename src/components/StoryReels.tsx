"use client";

import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { beispielReels } from "@/lib/content";
import { track } from "@/lib/track";

// Beispiel-Reels als „Story“: ein kleiner Auslöser mit runden Vorschaubildern,
// der einen Vollbild-Player im Hochformat öffnet. Die Reels laufen nacheinander
// (stumm, die Clips haben keinen Ton), mit Fortschrittsbalken wie bei Instagram.
// Videos laden erst, wenn der Player geöffnet wird.
export function StoryReels({ quelle, className = "" }: { quelle: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const count = beispielReels.length;

  const show = (i: number) => {
    setProgress(0);
    setIndex(i);
  };
  const open = () => {
    show(0);
    dialog.current?.showModal();
    track("beispiel_reels_open", { quelle });
  };
  const close = () => dialog.current?.close();
  const next = () => (index !== null && index + 1 < count ? show(index + 1) : close());
  const prev = () => show(Math.max(0, (index ?? 0) - 1));

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };
  // Klick auf den abgedunkelten Rand schließt den Player
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const reel = index !== null ? beispielReels[index] : null;

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`group flex w-fit cursor-pointer items-center gap-4 rounded-2xl border border-ink-950/8 bg-white/80 p-2 pr-5 text-left shadow-card backdrop-blur transition hover:border-accent/40 hover:shadow-card-hover ${className}`}
      >
        <span className="flex -space-x-3">
          {beispielReels.map((r) => (
            <span
              key={r.slug}
              className="rounded-full bg-linear-135 from-accent to-accent-deep p-[2px] transition-transform group-hover:-translate-y-0.5"
            >
              <img
                src={r.thumb}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                className="size-11 rounded-full border-2 border-white object-cover"
              />
            </span>
          ))}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold text-ink-950">Beispiel-Reels ansehen</span>
          <span className="text-sm text-ink-500">3 kurze Videos im Story-Base-Look</span>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label="Beispiel-Reels"
        onClose={() => setIndex(null)}
        onClick={onDialogClick}
        onKeyDown={onKeyDown}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink-950/90 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
      >
        {reel && (
          <div className="relative h-full w-full overflow-hidden bg-ink-950 sm:h-[min(92dvh,860px)] sm:w-auto sm:aspect-[9/16] sm:rounded-3xl sm:shadow-image">
            <video
              key={reel.slug}
              className="size-full object-contain"
              src={reel.src}
              poster={reel.poster}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress(v.currentTime / v.duration);
              }}
              onEnded={next}
            />

            {/* Fortschrittsbalken, Hinweis und Schließen */}
            <div className="absolute inset-x-0 top-0 bg-linear-to-b from-ink-950/60 to-transparent px-3 pt-3 pb-8">
              <div className="flex gap-1.5" aria-hidden>
                {beispielReels.map((r, i) => (
                  <span key={r.slug} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                    <span
                      className="block h-full rounded-full bg-white transition-[width] duration-300 ease-linear"
                      style={{ width: `${i < index! ? 100 : i === index ? progress * 100 : 0}%` }}
                    />
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-white">
                <p className="text-sm leading-tight">
                  <span className="block font-semibold">{reel.title}</span>
                  <span className="text-xs text-white/70">Beispiel, umgesetzt mit Stockmaterial</span>
                </p>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Schließen"
                  className="relative z-10 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-ink-950/40 backdrop-blur transition hover:bg-ink-950/60"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tippen links = zurück, rechts = weiter */}
            <button
              type="button"
              onClick={prev}
              aria-label="Vorheriges Reel"
              className="absolute top-24 bottom-0 left-0 w-1/3 cursor-pointer focus-visible:outline-none"
            />
            <button
              type="button"
              onClick={next}
              aria-label={index! + 1 < count ? "Nächstes Reel" : "Schließen"}
              className="absolute top-24 right-0 bottom-0 w-2/3 cursor-pointer focus-visible:outline-none"
            />
          </div>
        )}
      </dialog>
    </>
  );
}
