"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

// Meldet den Seitenaufruf der Landingpage an den Tag Manager
export function KiCheckView() {
  useEffect(() => track("ki_check_view"), []);
  return null;
}
