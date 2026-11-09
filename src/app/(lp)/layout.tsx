import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettingsButton } from "@/components/Consent";
import { LandingHeader } from "@/components/LandingHeader";
import { site } from "@/lib/site";

// Rahmen für Werbe-Landingpages: keine Hauptnavigation, damit nichts vom Formular ablenkt
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LandingHeader />
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
