"use client";

import { useEffect, useRef, useState } from "react";
import { kiCheckVideo } from "@/lib/kicheck";
import { track } from "@/lib/track";

// Erklärvideo zum KI-Check: Desktop 16:9, Handy 9:16. Beide laden nichts außer dem
// Vorschaubild (preload="none") – erst der Klick startet den Download.

// Der Hinweis im Hero löst dieses Ereignis aus; der sichtbare Player startet dann
// sofort (noch im Klick, sonst blockiert Safari den Ton) und scrollt ins Bild.
const PLAY_EVENT = "sb:play-ki-video";
export function KiCheckVideo() {
  return (
    <>
      <div className="hidden md:block">
        <Player src={kiCheckVideo.landscape} poster={kiCheckVideo.landscapePoster} aspect="aspect-video" />
      </div>
      <div className="mx-auto max-w-sm md:hidden">
        {/* Im Hochformat stehen die Untertitel in der Bildmitte – Play-Button deshalb unten */}
        <Player
          src={kiCheckVideo.portrait}
          poster={kiCheckVideo.portraitPoster}
          aspect="aspect-[9/16]"
          buttonClass="items-end pb-[9%]"
        />
      </div>
    </>
  );
}

function Player({
  src,
  poster,
  aspect,
  buttonClass = "items-center",
}: {
  src: string;
  poster: string;
  aspect: string;
  buttonClass?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const wrap = useRef<HTMLDivElement>(null);

  const start = (quelle: "video" | "hero" = "video") => {
    setStarted(true);
    void ref.current?.play();
    track("ki_check_video_play", { quelle });
  };

  useEffect(() => {
    const onPlayRequest = () => {
      const el = wrap.current;
      if (!el || el.offsetParent === null) return; // nur die gerade sichtbare Version
      start("hero");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener(PLAY_EVENT, onPlayRequest);
    return () => window.removeEventListener(PLAY_EVENT, onPlayRequest);
  }, []);

  return (
    <div ref={wrap} className={`relative overflow-hidden rounded-3xl bg-ink-800 shadow-image ${aspect}`}>
      <video
        ref={ref}
        className="size-full object-cover"
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        onPlay={() => setStarted(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!started && (
        <button
          type="button"
          onClick={() => start()}
          aria-label={`Video abspielen: ${kiCheckVideo.title} (${kiCheckVideo.durationLabel})`}
          className={`group absolute inset-0 flex cursor-pointer justify-center bg-ink-950/15 transition hover:bg-ink-950/5 ${buttonClass}`}
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-accent text-ink-950 shadow-button ring-8 ring-white/40 transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-ink-950/70 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
            {kiCheckVideo.durationLabel}
          </span>
        </button>
      )}
    </div>
  );
}

/** Kleiner Hinweis im Hero: zeigt, dass es ein Video gibt, und startet es per Klick. */
export function KiCheckVideoTeaser() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(PLAY_EVENT))}
      className="group flex w-fit cursor-pointer items-center gap-4 rounded-2xl border border-ink-950/8 bg-white/80 p-2 pr-5 text-left shadow-card backdrop-blur transition hover:border-accent/40 hover:shadow-card-hover"
    >
      <span className="relative h-14 w-24 shrink-0 overflow-hidden rounded-xl bg-ink-800">
        <img src={kiCheckVideo.landscapePoster} alt="" width={96} height={56} className="size-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-ink-950/20">
          <span className="flex size-8 items-center justify-center rounded-full bg-accent text-ink-950 shadow-button transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-0.5 size-4" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </span>
      </span>
      <span className="leading-tight">
        <span className="block font-semibold text-ink-950">In 1 Minute erklärt</span>
        <span className="text-sm text-ink-500">Video ansehen · {kiCheckVideo.durationLabel}</span>
      </span>
    </button>
  );
}
