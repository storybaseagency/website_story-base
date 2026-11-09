"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

// Kopfbereich der Landingpages: bleibt oben stehen und bekommt nach dem ersten
// Scrollen einen mattierten Hintergrund, damit nichts darunter durchscheint.
export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-paper/90 shadow-header backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.webp" alt="" width={36} height={36} className="size-9" />
          <span className="text-lg font-bold tracking-tight text-ink-950">{site.name}</span>
        </Link>
        <a
          href={site.phone.href}
          className="flex items-center gap-2 text-sm font-semibold text-accent-deep hover:text-accent-dark"
        >
          <PhoneIcon className="size-4" />
          <span className="hidden sm:inline">{site.phone.display}</span>
          <span className="sr-only sm:hidden">Anrufen: {site.phone.display}</span>
        </a>
      </div>
    </header>
  );
}
