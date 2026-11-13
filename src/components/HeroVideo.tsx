"use client";

import { useEffect, useRef, useState } from "react";
import { heroSpots } from "@/lib/content";

// Hero-Video: die drei Story-Base-Spots laufen stumm nacheinander in Schleife.
// Zuerst steht ein Standbild (schnelles Laden), das Video legt sich darüber,
// sobald es spielt. Außerhalb des Bildes pausiert es; bei „Bewegung reduzieren“
// bleibt das Standbild stehen.
export function HeroVideo({ className = "" }: { className?: string }) {
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
        fetchPriority="high"
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
