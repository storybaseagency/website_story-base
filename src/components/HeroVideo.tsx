"use client";

import { useEffect, useRef, useState } from "react";
import { heroSpots } from "@/lib/content";

// Hero-Video: die drei Story-Base-Spots laufen stumm nacheinander in Schleife.
// Zuerst steht ein Standbild (schnelles Laden), das Video legt sich darüber,
// sobald es spielt. Außerhalb des Bildes pausiert es; bei „Bewegung reduzieren“
// bleibt das Standbild stehen.
export function HeroVideo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  // Zähler der gespielten Spots; der aktuelle ergibt sich per Modulo
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const inView = useRef(false);
  const allowed = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    allowed.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!allowed.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Nächsten Spot laden und weiterspielen
  useEffect(() => {
    const v = ref.current;
    if (!v || step === 0 || !allowed.current) return;
    v.load();
    if (inView.current) void v.play().catch(() => {});
  }, [step]);

  const spot = heroSpots[step % heroSpots.length];

  return (
    <div className={`relative overflow-hidden bg-paper ${className}`}>
      <img
        src={heroSpots[0].poster}
        alt="Story Base Agency: Video und Praxismarketing für Ärztinnen und Ärzte"
        width={720}
        height={1280}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        className="absolute inset-0 size-full object-cover"
      />
      <video
        ref={ref}
        aria-hidden
        tabIndex={-1}
        src={spot.src}
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        onEnded={() => setStep((s) => s + 1)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/** Die Spots in einem Handy-Rahmen mit leichtem Leuchten dahinter. */
export function PhoneSpots({ priority = false }: { priority?: boolean }) {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-10 rounded-full bg-accent/35 blur-3xl" />
      <div className="relative rounded-[2.75rem] bg-ink-950 p-[9px] shadow-image ring-1 ring-ink-950/10">
        <span aria-hidden className="absolute top-28 -left-[3px] h-9 w-[3px] rounded-l bg-ink-800" />
        <span aria-hidden className="absolute top-40 -left-[3px] h-14 w-[3px] rounded-l bg-ink-800" />
        <span aria-hidden className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-ink-800" />
        <HeroVideo priority={priority} className="aspect-[9/16] w-full rounded-[2.2rem]" />
        <span aria-hidden className="absolute top-[18px] left-1/2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink-950" />
      </div>
    </>
  );
}
