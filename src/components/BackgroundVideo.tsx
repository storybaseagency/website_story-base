"use client";

import { useEffect, useRef } from "react";

// Stummes Hintergrundvideo: Szenen laufen nacheinander in Schleife. Es lädt erst,
// wenn der Abschnitt ins Bild kommt, und pausiert außerhalb. Bei „Bewegung
// reduzieren“ bleibt das Standbild stehen.
export function BackgroundVideo({
  src,
  mobileSrc,
  poster,
  className = "",
}: {
  src: string;
  mobileSrc?: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      tabIndex={-1}
      className={`pointer-events-none size-full object-cover ${className}`}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      disablePictureInPicture
    >
      {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 639px)" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
