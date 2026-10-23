"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-ink-950/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/logo.webp" alt="" width={36} height={36} className="size-9" />
          <span className="text-lg font-bold tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phone.href}
            className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-soft"
          >
            <PhoneIcon className="size-4" />
            {site.phone.display}
          </a>
          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-soft"
          >
            Termin buchen
          </a>
        </div>

        <button
          type="button"
          className="relative -mr-2 flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition ${open ? "rotate-45" : "-translate-y-2"}`}
          />
          <span className={`absolute h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`absolute h-0.5 w-6 bg-white transition ${open ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile Navigation"
        hidden={!open}
        className="border-t border-white/10 px-4 pt-2 pb-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg font-medium text-white/90"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-3">
          <a
            href={site.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-3 text-center font-semibold text-ink-950"
          >
            Beratungsgespräch vereinbaren
          </a>
          <a
            href={site.phone.href}
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 font-semibold"
          >
            <PhoneIcon className="size-4" />
            {site.phone.display}
          </a>
        </div>
      </nav>
    </header>
  );
}
