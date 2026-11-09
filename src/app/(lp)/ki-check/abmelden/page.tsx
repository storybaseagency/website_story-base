import type { Metadata } from "next";
import { MarketingConsentAction } from "@/components/MarketingConsent";

export const metadata: Metadata = {
  title: "Von Werbe-Mails abmelden",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketingConsentAction action="abmelden" />;
}
