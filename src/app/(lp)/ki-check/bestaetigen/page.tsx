import type { Metadata } from "next";
import { MarketingConsentAction } from "@/components/MarketingConsent";

export const metadata: Metadata = {
  title: "Werbe-Einwilligung bestätigen",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketingConsentAction action="bestaetigen" />;
}
