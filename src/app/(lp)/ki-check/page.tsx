import type { Metadata } from "next";
import { KiCheckLanding } from "@/components/KiCheckLanding";
import { kiCheck } from "@/lib/kicheck";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: kiCheck.metaTitle },
  description: kiCheck.metaDescription,
  alternates: { canonical: kiCheck.path },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    title: kiCheck.metaTitle,
    description: kiCheck.metaDescription,
    url: kiCheck.path,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
};

export default function KiCheckPage() {
  return <KiCheckLanding />;
}
