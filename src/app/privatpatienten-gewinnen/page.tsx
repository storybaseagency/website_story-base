import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { getLandingPage } from "@/lib/landingpages";

const page = getLandingPage("privatpatienten-gewinnen");

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
  description: page.metaDescription,
  alternates: { canonical: "/privatpatienten-gewinnen/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Story Base Agency",
    title: page.metaTitle,
    description: page.metaDescription,
    url: "/privatpatienten-gewinnen/",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <LandingPage page={page} />;
}
