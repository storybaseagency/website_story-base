import type { MetadataRoute } from "next";
import { landingPages } from "@/lib/landingpages";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...landingPages.map((p) => ({
      url: `${site.url}/${p.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/impressum/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/datenschutz/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
