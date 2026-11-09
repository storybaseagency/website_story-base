import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/Consent";
import { PhoneIcon } from "@/components/icons";
import { site } from "@/lib/site";

// Rahmen für Werbe-Landingpages: keine Hauptnavigation, damit nichts vom Formular ablenkt
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
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
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-ink-950/8 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.legalName} · {site.address.street}, {site.address.zip}{" "}
            {site.address.city}
          </p>
          <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/impressum/" className="hover:text-ink-950">
              Impressum
            </Link>
            <Link href="/datenschutz/" className="hover:text-ink-950">
              Datenschutz
            </Link>
            <CookieSettingsButton className="cursor-pointer hover:text-ink-950" />
          </nav>
        </div>
      </footer>
    </>
  );
}
