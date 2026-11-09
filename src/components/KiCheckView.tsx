"use client";

import { useEffect } from "react";
import { track, whenTrackingReady } from "@/lib/track";

// Meldet den Seitenaufruf der Landingpage, sobald Tracking erlaubt ist
export function KiCheckView() {
  useEffect(() => whenTrackingReady(() => track("ki_check_view")), []);
  return null;
}
