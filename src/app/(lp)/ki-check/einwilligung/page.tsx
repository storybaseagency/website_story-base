import type { Metadata } from "next";
import { MarketingConsentResult } from "@/components/MarketingConsent";

export const metadata: Metadata = {
  title: "Einwilligung",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MarketingConsentResult />;
}
