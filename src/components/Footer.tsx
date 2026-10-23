import Link from "next/link";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "./Consent";
import { InstagramIcon, LinkedInIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.webp" alt="" width={32} height={32} className="size-8" />
          <div className="text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} {site.legalName}
            </p>
            <p>
              Agentur für Praxismarketing · {site.address.street}, {site.address.zip} {site.address.city}
            </p>
          </div>
        </div>

        <nav aria-label="Rechtliches" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link href="/impressum/" className="text-white/70 hover:text-white">
            Impressum
          </Link>
          <Link href="/datenschutz/" className="text-white/70 hover:text-white">
            Datenschutz
          </Link>
          <CookieSettingsButton className="cursor-pointer text-white/70 hover:text-white" />
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Story Base Agency auf LinkedIn"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-accent hover:text-accent"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Story Base Agency auf Instagram"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-accent hover:text-accent"
          >
            <InstagramIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
