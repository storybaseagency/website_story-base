import { janReferences } from "@/lib/content";
import { BackgroundVideo } from "./BackgroundVideo";
import { Card, Reveal, SectionHeader } from "./ui";

/** Die drei Kundenstimmen zu Jans Arbeit als Zitat-Karten. */
export function JanQuotes({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-6 md:grid-cols-3 ${className}`}>
      {janReferences.map((r, i) => (
        <li key={r.name}>
          <Reveal delay={i * 120} className="h-full">
            <Card className="h-full p-7">
              <figure className="flex h-full flex-col gap-4">
                <span aria-hidden className="h-5 text-5xl leading-[0.6] font-extrabold text-accent">
                  “
                </span>
                <blockquote className="leading-relaxed text-pretty text-ink-700">{r.quote}</blockquote>
                <figcaption className="mt-auto pt-2">
                  <span className="block font-bold text-ink-950">{r.name}</span>
                  <span className="block text-sm text-ink-500">{r.role}</span>
                </figcaption>
              </figure>
            </Card>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Verbindet die Stimmen mit dem, was eine Praxis davon hat. */
export function PracticeBenefit({ className = "" }: { className?: string }) {
  return (
    <p className={`rounded-2xl bg-accent-tint px-6 py-5 leading-relaxed text-ink-700 ${className}`}>
      <strong className="text-ink-950">Was das für Ihre Praxis heißt:</strong> Drehs, die ruhig und professionell
      ablaufen, auch wenn nebenan Sprechstunde ist. Klare Absprachen vorher. Und Videos, die am Ende einfach
      funktionieren.
    </p>
  );
}

export const janReferencesTitle = {
  eyebrow: "Referenzen aus 20 Jahren Bewegtbild",
  title: "Die Erfahrung hinter Ihren Praxisvideos",
};

/** Referenz-Abschnitt der Startseite: Stimmen zu Jans Arbeit vor bewegtem Hintergrund. */
export function JanReferences() {
  return (
    <section
      id="referenzen"
      aria-labelledby="referenzen-title"
      className="relative overflow-hidden bg-navy py-24 text-white sm:py-32"
    >
      <div aria-hidden className="absolute inset-0">
        <BackgroundVideo
          src="/videos/eindruecke.mp4"
          mobileSrc="/videos/eindruecke-mobil.mp4"
          poster="/images/eindruecke-poster.webp"
          className="object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink-950/75 via-navy/65 to-ink-950/85" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader id="referenzen-title" dark {...janReferencesTitle} />
        </Reveal>
        <JanQuotes className="mt-12" />
        <Reveal>
          <PracticeBenefit className="mt-8" />
        </Reveal>
        <p className="mt-6 text-xs text-white/45">Hintergrund: Beispielaufnahmen</p>
      </div>
    </section>
  );
}
