import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statischer Export für das Hosting bei All-Inkl: `npm run build` erzeugt
  // den Ordner `out/`, dessen Inhalt per FTP hochgeladen wird.
  output: "export",
  trailingSlash: true,
  images: {
    // Ohne Node-Server gibt es keine Bildoptimierung zur Laufzeit;
    // die Bilder in `public/images` liegen bereits als WebP vor.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
