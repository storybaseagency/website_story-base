import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Consent } from "@/components/Consent";
import { site } from "@/lib/site";
import "./globals.css";

// next/font lädt die Schrift beim Build herunter und liefert sie selbst aus –
// Besucher stellen also keine Verbindung zu Google her.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Social-Media-Agentur in Berlin-Spandau`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} – Social-Media-Agentur in Berlin-Spandau`,
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  icons: {
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${manrope.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-semibold focus:text-ink-950"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Consent />
      </body>
    </html>
  );
}
