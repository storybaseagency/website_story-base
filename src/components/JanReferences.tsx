import { janReferences, productionPhotos } from "@/lib/content";
import { Card, Reveal, Section, SectionHeader } from "./ui";

/** Die drei Kundenstimmen zu Jans Arbeit als Zitat-Karten. */
export function JanQuotes({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-6 md:grid-cols-3 ${className}`}>
      {janReferences.map((r, i) => (
        <li key={r.name}>
          <Reveal delay={i * 120} className="h-full">
            <Card className="h-full p-7">
              <figure className="flex h-full flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-accent-deep uppercase">
                  Zusammenarbeit: {r.topic}
                </p>
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

/** Referenz-Abschnitt der Startseite: Stimmen zu Jans Arbeit plus Fotos aus Produktionen. */
export function JanReferences() {
  return (
    <Section id="referenzen" labelledBy="referenzen-title">
      <Reveal>
        <SectionHeader
          id="referenzen-title"
          eyebrow="Referenzen aus 20 Jahren Bewegtbild"
          title="Die Erfahrung hinter Ihren Praxisvideos"
          subtitle="Bevor Story Base sich auf Arztpraxen spezialisiert hat, hat Jan Bruchwalski für Agenturen, Unternehmen und Live-Produktionen gedreht, geschnitten und Regie geführt, unter anderem bei Livestreams aus den Ministergärten in Berlin. So beschreiben Auftraggeber die Zusammenarbeit:"
        />
      </Reveal>
      <JanQuotes className="mt-12" />
      <Reveal>
        <PracticeBenefit className="mt-8" />
      </Reveal>

      <Reveal>
        <h3 className="mt-20 text-xl font-bold">Eindrücke aus Produktionen</h3>
      </Reveal>
      <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        {productionPhotos.map((p, i) => (
          <li key={p.src}>
            <Reveal delay={(i % 3) * 100}>
              <figure>
                <img
                  src={p.src}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card"
                />
                <figcaption className="mt-2 text-sm text-ink-500">{p.alt}</figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
