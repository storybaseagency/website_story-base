"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { ArrowIcon } from "./icons";

// Schwebender Termin-Button: erscheint nach dem Hero, verschwindet vor dem Kontaktbereich.
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setVisible(window.scrollY > 700 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 transition-all duration-300 ease-(--ease-out-soft) sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <a
        href={site.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-ink-950 shadow-button ring-4 ring-paper/60 transition hover:bg-accent-dark"
      >
        Praxis-Check buchen
        <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
