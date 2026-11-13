"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatClips } from "@/lib/content";
import { ArrowIcon } from "./icons";
import { Reveal, Section, SectionHeader } from "./ui";

// Drei stumme Hochformat-Clips. Sie laden erst, wenn sie ins Bild kommen, laufen
// in Schleife und pausieren außerhalb des Bildes. Bei „Bewegung reduzieren“
// bleibt das Vorschaubild stehen.
function LoopClip({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="aspect-[9/16] w-full rounded-3xl bg-paper object-cover shadow-image"
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function FormatShowcase() {
  return (
    <Section id="formate" bg="alt" labelledBy="formate-title">
      <Reveal>
        <SectionHeader
          id="formate-title"
          eyebrow="Formate"
          title="So sehen unsere Formate aus"
          subtitle="Drei Beispiele im Story-Base-Look, umgesetzt mit Beispielmaterial. Für Ihre Praxis drehen wir mit Ihnen und Ihrem Team."
        />
      </Reveal>
      <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
        {formatClips.map((c, i) => (
          <li key={c.slug} className="w-[72%] shrink-0 snap-center sm:w-[45%] md:w-auto">
            <Reveal delay={i * 120}>
              <LoopClip src={c.src} poster={c.poster} label={`Beispielvideo: ${c.title}`} />
              <p className="mt-4 text-xs font-semibold tracking-widest text-accent-deep uppercase">{c.tag}</p>
              <h3 className="mt-1 text-lg leading-snug font-bold">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{c.text}</p>
              {c.href && (
                <Link
                  href={c.href}
                  className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep hover:text-accent-dark"
                >
                  Mehr erfahren
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
