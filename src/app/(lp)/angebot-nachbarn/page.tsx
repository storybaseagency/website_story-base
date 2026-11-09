import type { Metadata } from "next";
import { Jojo } from "@/components/Jojo";
import { KiCheckLanding } from "@/components/KiCheckLanding";
import { Button, Eyebrow, Reveal, Section } from "@/components/ui";
import type { KiCheckCampaign } from "@/lib/kicheck";
import { site } from "@/lib/site";

// Paket-Aktion in der Nachbarschaft: Arztpraxen in Spandau bekommen ein Jojo
// mit Karte (QR-Code bzw. Kurzadresse story-base.de/angebot-nachbarn). Ziel: KI-Check.
// Nur für Empfänger des Pakets gedacht – deshalb nicht in Suchmaschinen.
const campaign: KiCheckCampaign = {
  slug: "angebot-nachbarn",
  badge: "Ein Gruß aus der Nachbarschaft · Berlin-Spandau",
  headline: "Ein Jojo kommt immer zurück.",
  headlineAccent: "Ihre Patienten auch – wenn sie Ihre Praxis finden.",
  subline:
    "Immer mehr Patienten fragen ChatGPT, welche Praxis in Spandau sie wählen sollen. Wir prüfen kostenlos, ob Ihre Praxis dabei genannt wird – persönlich ausgewertet von Ihren Nachbarn aus der Pichelsdorfer Straße.",
  defaultStadt: "Berlin-Spandau",
};

export const metadata: Metadata = {
  title: { absolute: "Ein Gruß aus der Nachbarschaft | Story Base" },
  description: campaign.subline,
  robots: { index: false, follow: true },
};

export default function AngebotNachbarnPage() {
  return (
    <KiCheckLanding
      campaign={campaign}
      heroDecoration={<Jojo className="absolute -top-[612px] right-0 hidden lg:block" />}
    >
      <Section labelledBy="nachbarn-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl pt-20">
              <Jojo className="absolute -top-[560px] right-10 z-10" />
              <img
                src="/images/studio-story-base-berlin-spandau.webp"
                alt="Ladengeschäft und Studio der Story Base Agency in der Pichelsdorfer Straße, Berlin-Spandau"
                width={506}
                height={338}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-image"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Von Ihren Nachbarn</Eyebrow>
            <h2
              id="nachbarn-title"
              className="mt-3 text-[30px] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-4xl"
            >
              Grüße aus der Pichelsdorfer Straße
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                Das Jojo kam von uns: Story Base, die Agentur für Praxismarketing mit eigenem Video- und
                Podcast-Studio – ganz in Ihrer Nähe in Spandau.
              </p>
              <p>
                Statt einer Werbebroschüre schenken wir Ihnen einen Blick von außen: Wir schauen nach, ob ChatGPT,
                Perplexity und Gemini Ihre Praxis empfehlen, wenn Patienten aus Spandau nach Ihren Leistungen fragen.
                Kostenlos und unverbindlich.
              </p>
              <p className="font-semibold text-ink-950">Lieber persönlich? Kommen Sie auf einen Kaffee vorbei.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#ki-check-form">Kostenlosen Check anfordern</Button>
              <Button href={site.address.mapsUrl} external variant="outline" icon="pin" arrow={false}>
                {site.address.street}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </KiCheckLanding>
  );
}
