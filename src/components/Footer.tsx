import Link from "next/link";
import { landingPages } from "@/lib/landingpages";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "./Consent";
import { InstagramIcon, LinkedInIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/logo.webp" alt="" width={32} height={32} className="size-8" />
              <span className="font-bold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Agentur für Praxismarketing
              <br />
              {site.address.street}, {site.address.zip} {site.address.city}
            </p>
            <div className="mt-5 flex items-center gap-3">
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

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <nav aria-label="Leistungen">
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">Leistungen</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white">
                    Marketing für Arztpraxen
                  </Link>
                </li>
                {landingPages.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/${p.slug}/`} className="text-white/70 hover:text-white">
                      {p.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Kontakt und Rechtliches">
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">Kontakt</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={site.phone.href} className="text-white/70 hover:text-white">
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="break-all text-white/70 hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li>
                  <Link href="/impressum/" className="text-white/70 hover:text-white">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz/" className="text-white/70 hover:text-white">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton className="cursor-pointer text-white/70 hover:text-white" />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </div>
    </footer>
  );
}
