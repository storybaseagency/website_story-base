import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Consent } from "@/components/Consent";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import { consentAndCookiebotScript, gtmScript } from "@/lib/tagging";
import "./globals.css";

// next/font lädt die Schrift beim Build herunter und liefert sie selbst aus –
// Besucher stellen also keine Verbindung zu Google her.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.managingDirector }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Marketing für Arztpraxen",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${site.url}/`,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Story Base – Marketing für Arztpraxen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/og.jpg"],
  },
  icons: {
    apple: "/images/logo.png",
  },
  // Lokale Signale für Berlin-Spandau
  other: {
    "geo.region": "DE-BE",
    "geo.placename": `${site.address.city}-${site.address.district}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${manrope.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Reihenfolge siehe src/lib/tagging.ts. Das erste Skript aktiviert außerdem die
            Scroll-Animationen (Klasse „js“) – ohne JavaScript bleibt alles sichtbar. */}
        <script dangerouslySetInnerHTML={{ __html: consentAndCookiebotScript }} />
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-semibold focus:text-ink-950"
        >
          Zum Inhalt springen
        </a>
        {children}
        <RevealObserver />
        <Consent />
      </body>
    </html>
  );
}
