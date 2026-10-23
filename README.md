# story-base.de

Website der Story Base Agency, gebaut mit Next.js (App Router), TypeScript und Tailwind CSS.
Die Seite wird als **statischer Export** gebaut und bei All-Inkl gehostet.

## Entwicklung

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
```

Stammdaten (Telefon, Adresse, Calendly-Link, Social Media, Cookiebot- und Analytics-ID)
stehen zentral in `src/lib/site.ts`.

## Veröffentlichen bei All-Inkl

1. `npm run build` – erzeugt den Ordner `out/`.
2. Im KAS bzw. per FTP den **Inhalt** von `out/` in das Verzeichnis der Domain
   `story-base.de` hochladen (inklusive der versteckten Datei `.htaccess`).
3. Alte Dateien der bisherigen Website (`tooplate-titan-*`, `DatenschutzImpressum.html`,
   `videos/hero-video.mp4` …) können danach gelöscht werden. Die `.htaccess` leitet
   `DatenschutzImpressum.html` dauerhaft auf `/impressum/` um.

Die `.htaccess` (Quelle: `public/.htaccess`) erzwingt HTTPS, leitet `www.` auf
`story-base.de` um, setzt Cache-Header und die 404-Seite.

## Struktur

```
src/app/            Seiten: Start, /impressum, /datenschutz, 404, sitemap.xml, robots.txt
src/components/     Header, Footer, Consent (Cookiebot + Google Analytics), Icons
src/lib/site.ts     Stammdaten
public/             Bilder (WebP), Hero-Video (MP4 + WebM), .htaccess
```

## Cookies & Analytics

Cookiebot läuft im manuellen Modus. Google Analytics wird erst geladen, wenn Besucher der
Kategorie „Statistiken“ zustimmen (`src/components/Consent.tsx`).
