"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "./icons";

const FORM_ID = "ki-check-form";

// Fester Button am unteren Rand (nur Handy/Tablet): erscheint nach dem Hero und
// verschwindet, sobald das Formular im Bild ist.
export function KiCheckStickyCta() {
  const [formVisible, setFormVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const form = document.getElementById(FORM_ID);
    const io = form
      ? new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
      : null;
    if (form) io!.observe(form);
    const onScroll = () => setScrolled(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visible = scrolled && !formVisible;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink-950/8 bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-header backdrop-blur transition-all duration-300 ease-(--ease-out-soft) lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={`#${FORM_ID}`}
        tabIndex={visible ? 0 : -1}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-ink-950 shadow-button transition hover:bg-accent-dark"
      >
        Kostenlosen Check anfordern
        <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
