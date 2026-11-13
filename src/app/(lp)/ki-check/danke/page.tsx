import type { Metadata } from "next";
import { KiCheckThanks } from "@/components/KiCheckThanks";

export const metadata: Metadata = {
  title: "Danke, Ihr KI-Check läuft",
  robots: { index: false, follow: false },
};

export default function KiCheckDanke() {
  return <KiCheckThanks />;
}
