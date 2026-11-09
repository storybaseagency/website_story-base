import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KiCheckLanding } from "@/components/KiCheckLanding";
import { kiCheck, kiCheckVariants } from "@/lib/kicheck";
import { site } from "@/lib/site";

// Varianten je Fachrichtung für Google-Ads-Anzeigengruppen, z. B. /ki-check/zahnmedizin/.
// Inhaltlich gleich wie /ki-check/ – deshalb zeigt der Canonical dorthin.
export const dynamicParams = false;

export function generateStaticParams() {
  return kiCheckVariants.map((v) => ({ fach: v.slug }));
}

function findVariant(slug: string) {
  return kiCheckVariants.find((v) => v.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ fach: string }> }): Promise<Metadata> {
  const variant = findVariant((await params).fach);
  if (!variant) return {};
  const title = `KI-Sichtbarkeits-Check: ${variant.fachrichtung} | Story Base`;
  return {
    title: { absolute: title },
    description: kiCheck.metaDescription,
    alternates: { canonical: kiCheck.path },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: site.name,
      title,
      description: kiCheck.metaDescription,
      url: `${kiCheck.path}${variant.slug}/`,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function KiCheckVariantPage({ params }: { params: Promise<{ fach: string }> }) {
  const variant = findVariant((await params).fach);
  if (!variant) notFound();
  return <KiCheckLanding variant={variant} />;
}
