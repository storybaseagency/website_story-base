"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { blocks } from "@/lib/content";
import { IconTile } from "./ui";

const INTERVAL = 7000;

// Alle fünf Panels werden ins HTML gerendert (inaktive mit `hidden`),
// damit Suchmaschinen und KI-Crawler jeden Baustein lesen können.
export function SystemTabs() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Kein automatisches Weiterschalten bei „Bewegung reduzieren“
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % blocks.length), INTERVAL);
    return () => clearTimeout(t);
  }, [auto, active]);

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + blocks.length) % blocks.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-16 grid items-start gap-6 lg:grid-cols-2">
      <div role="tablist" aria-label="Bausteine des AI-Ready Growth System" aria-orientation="vertical" className="flex flex-col gap-2" onKeyDown={onKeyDown}>
        {blocks.map((b, i) => {
          const sel = i === active;
          return (
            <button
              key={b.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${b.id}`}
              aria-selected={sel}
              aria-controls={`panel-${b.id}`}
              tabIndex={sel ? 0 : -1}
              onClick={() => select(i)}
              className={`relative flex w-full cursor-pointer items-center gap-5 overflow-hidden rounded-2xl border px-6 py-5 text-left transition-colors duration-300 ${
                sel ? "border-accent/45 bg-white/7" : "border-white/8 bg-transparent hover:bg-white/4"
              }`}
            >
              <span
                className={`min-w-10 text-[28px] leading-none font-extrabold tabular-nums transition-colors duration-300 ${sel ? "text-accent" : "text-white/30"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-lg leading-[26px] font-bold">{b.title}</span>
                <span className="text-sm text-white/60">{b.short}</span>
              </span>
              {sel && auto && (
                <span
                  key={`progress-${active}`}
                  aria-hidden
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left animate-progress bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>

      {blocks.map((b, i) => (
        <div
          key={b.id}
          role="tabpanel"
          id={`panel-${b.id}`}
          aria-labelledby={`tab-${b.id}`}
          hidden={i !== active}
          className="flex flex-col gap-8 rounded-4xl border border-white/10 bg-linear-135 from-ink-800 to-navy p-8 shadow-image sm:p-10"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-7xl leading-none font-extrabold tracking-tight text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-white/60">Baustein {i + 1} von {blocks.length}</span>
          </div>
          <h3 className="text-[28px] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-[32px]">{b.title}</h3>
          <div className="grid gap-6">
            <div className="grid gap-1.5">
              <span className="text-[13px] font-semibold tracking-widest text-accent uppercase">Was wir tun</span>
              <p className="text-[17px] leading-relaxed text-white/80">{b.tun}</p>
            </div>
            <div className="grid gap-1.5">
              <span className="text-[13px] font-semibold tracking-widest text-accent uppercase">Was Sie davon haben</span>
              <p className="text-[17px] leading-relaxed text-white/80">{b.nutzen}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-950/35 px-5 py-4">
            <IconTile name="clock" small dark />
            <span className="text-[15px] leading-[22px]">
              <span className="block text-white/60">Ihr Aufwand</span>
              <strong>{b.aufwand}</strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
