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

### Automatisch über GitHub (empfohlen)

Jeder Push auf `main` startet `.github/workflows/deploy.yml`: Die Seite wird gebaut und per
FTPS zu All-Inkl hochgeladen. Dafür einmalig im Repo unter
**Settings → Secrets and variables → Actions → New repository secret** anlegen:

| Secret           | Wert                                                       |
| ---------------- | ---------------------------------------------------------- |
| `FTP_SERVER`     | FTP-Server aus dem KAS, z. B. `w0123456.kasserver.com`     |
| `FTP_USERNAME`   | FTP-Benutzername                                           |
| `FTP_PASSWORD`   | FTP-Passwort                                               |
| `FTP_SERVER_DIR` | optional: Zielordner der Domain, z. B. `/story-base.de/`   |

Empfehlung: Im KAS unter „FTP“ einen eigenen FTP-Benutzer anlegen, der nur auf den Ordner
der Domain zugreifen darf. Der Upload überträgt nur geänderte Dateien und löscht keine
fremden Dateien auf dem Server. Manuell starten: Tab „Actions“ → „Build & Deploy“ →
„Run workflow“.

### Manuell per FTP

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
