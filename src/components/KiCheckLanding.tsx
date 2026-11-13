import { FaqList } from "./FaqList";
import { JanQuotes } from "./JanReferences";
import { KiCheckForm } from "./KiCheckForm";
import { KiCheckStickyCta } from "./KiCheckStickyCta";
import { KiCheckVideo, KiCheckVideoTeaser } from "./KiCheckVideo";
import { KiCheckView } from "./KiCheckView";
import { ReportMockup } from "./ReportMockup";
import { Button, Card, Dot, Eyebrow, IconTile, Reveal, Section, SectionHeader } from "./ui";
import type { ReactNode } from "react";
import { kiCheck, type KiCheckCampaign, type KiCheckVariant } from "@/lib/kicheck";
import { kiCheckSchema } from "@/lib/schema";
import { site } from "@/lib/site";

// Inhalt der Landingpage – für /ki-check/, die Fachrichtungs-Varianten und
// Kampagnen wie /angebot-nachbarn/ (eigener Hero-Text, Deko im Hero, Zusatzabschnitt).
export function KiCheckLanding({
  variant,
  campaign,
  heroDecoration,
  children,
}: {
  variant?: KiCheckVariant;
  campaign?: KiCheckCampaign;
  heroDecoration?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(kiCheckSchema({ withVideo: !campaign })) }} />
      <KiCheckView />
      <KiCheckStickyCta />

      {/* Hero mit Formular */}
      <section aria-labelledby="ki-title" className="relative overflow-hidden bg-paper pt-28 pb-20 sm:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-30 -right-40 size-[560px] rounded-full bg-accent/22 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-65 -left-50 size-[512px] rounded-full bg-navy/8 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className={`relative flex flex-col gap-6 lg:pt-8 ${heroDecoration ? "lg:pr-24" : ""}`}>
            {heroDecoration}
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-950/14 bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-700 backdrop-blur">
                <span className="size-2 animate-pulse-dot rounded-full bg-accent" />
                {campaign?.badge ?? "Kostenloser KI-Sichtbarkeits-Check für Arztpraxen"}
              </span>
            </Reveal>
            <h1
              id="ki-title"
              className="text-[36px] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-ink-950 sm:text-5xl lg:text-[56px]"
            >
              {campaign?.headline ?? variant?.headline ?? kiCheck.headline}{" "}
              <span className="text-accent-dark">{campaign?.headlineAccent ?? kiCheck.headlineAccent}</span>
            </h1>
            <p className="max-w-xl text-xl leading-[1.6] text-pretty text-ink-600">{campaign?.subline ?? kiCheck.subline}</p>
            <Reveal delay={300} className="lg:hidden">
              <Button href="#ki-check-form">Kostenlosen Check anfordern</Button>
            </Reveal>
            {!campaign && (
              <Reveal delay={320}>
                <KiCheckVideoTeaser />
              </Reveal>
            )}
            <Reveal delay={350}>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
                {kiCheck.trust.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Dot />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={200} distance={32}>
            <KiCheckForm
              defaultFachrichtung={variant?.fachrichtung}
              leistungPlaceholder={variant?.leistungPlaceholder}
              variant={campaign?.slug ?? variant?.slug}
              defaultStadt={campaign?.defaultStadt}
            />
            {/* Persönlicher Absender direkt am Formular */}
            <div className="mt-5 flex items-center gap-4 px-2">
              <img
                src="/images/jan-bruchwalski-praxismarketing-berlin.webp"
                alt=""
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full object-cover ring-2 ring-white shadow-card"
              />
              <p className="text-sm leading-snug text-ink-600">
                <span className="font-semibold text-ink-950">„Ich werte Ihren Check persönlich aus.“</span>
                <br />
                {site.managingDirector}, Geschäftsführer Story Base
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {children}

      {/* Erklärvideo – nur auf /ki-check/ und den Fachrichtungs-Seiten, nicht in Kampagnen */}
      {!campaign && (
        <Section labelledBy="video-title" className="!pt-8 sm:!pt-12">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <Eyebrow>In einer Minute erklärt</Eyebrow>
                <h2
                  id="video-title"
                  className="mt-3 text-[28px] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-4xl"
                >
                  Warum KI-Assistenten über neue Patienten mitentscheiden
                </h2>
              </div>
              <KiCheckVideo />
              <div className="mt-8 flex justify-center">
                <Button href="#ki-check-form">Kostenlosen Check anfordern</Button>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Problem */}
      <Section bg="alt" labelledBy="problem-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SectionHeader id="problem-title" eyebrow="Warum das wichtig ist" title={kiCheck.problem.title} />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-xl leading-relaxed text-ink-600">{kiCheck.problem.text}</p>
          </Reveal>
        </div>
      </Section>

      {/* Was Sie bekommen */}
      <Section labelledBy="benefits-title">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeader
                id="benefits-title"
                eyebrow="Ihr Report"
                title="Was Sie bekommen"
                subtitle="Ein persönlicher Report mit Datum – kompakt auf drei bis vier Seiten."
              />
            </Reveal>
            <ul className="mt-10 grid gap-4">
              {kiCheck.benefits.map((b, i) => (
                <li key={b.title}>
                  <Reveal delay={i * 100}>
                    <Card className="flex items-start gap-5 p-6">
                      <IconTile name={b.icon} />
                      <div>
                        <h3 className="text-lg leading-7 font-bold">{b.title}</h3>
                        <p className="mt-1 leading-relaxed text-ink-600">{b.text}</p>
                      </div>
                    </Card>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={150} className="pb-10">
            <ReportMockup />
          </Reveal>
        </div>
      </Section>

      {/* So funktioniert es */}
      <Section bg="inverse" glow labelledBy="steps-title">
        <Reveal>
          <SectionHeader id="steps-title" dark eyebrow="Ablauf" title="So funktioniert es" />
        </Reveal>
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {kiCheck.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 120} className="h-full">
                <div className="h-full rounded-3xl border border-white/10 bg-white/4 p-8">
                  <span className="block text-5xl leading-none font-extrabold text-accent/80">0{i + 1}</span>
                  <h3 className="mt-4 text-xl leading-7 font-bold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/70">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Über Story Base */}
      <Section bg="alt" labelledBy="about-title">
        <div className="grid items-center gap-12 md:grid-cols-[280px_1fr]">
          <Reveal>
            <img
              src="/images/jan-bruchwalski-praxismarketing-berlin.webp"
              alt="Jan Bruchwalski, Geschäftsführer der Story Base Agency"
              width={400}
              height={400}
              loading="lazy"
              className="mx-auto aspect-square w-56 rounded-3xl object-cover shadow-image md:w-full"
            />
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Über Story Base</Eyebrow>
            <h2
              id="about-title"
              className="mt-3 text-[30px] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-4xl"
            >
              Persönlich ausgewertet – nicht von einem Automaten
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">{kiCheck.about}</p>
            <p className="mt-5 font-semibold text-ink-950">
              {site.managingDirector}, Geschäftsführer
              <span className="block text-sm font-normal text-ink-500">
                Mediengestalter mit 20 Jahren Erfahrung in Kamera, Bildregie und Videoproduktion
              </span>
            </p>
          </Reveal>
        </div>
        <Reveal>
          <h3 className="mt-16 text-xl font-bold">Was Kunden über Jans Arbeit sagen</h3>
          <p className="mt-2 text-ink-600">Stimmen aus Jans Arbeit als Kameramann und Bildregisseur für Agenturen und Live-Produktionen.</p>
        </Reveal>
        <JanQuotes className="mt-8" />
      </Section>

      {/* FAQ */}
      <Section labelledBy="faq-title">
        <div className="flex flex-wrap items-start gap-x-16 gap-y-10">
          <div className="flex-[1_1_280px]">
            <SectionHeader id="faq-title" eyebrow="FAQ" title="Häufige Fragen zum Check" />
          </div>
          <div className="min-w-0 flex-[2_1_520px]">
            <FaqList items={kiCheck.faq} />
          </div>
        </div>
      </Section>

      {/* Abschluss */}
      <section aria-labelledby="closing-title" className="bg-paper px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-linear-135 from-ink-800 to-navy p-8 text-center text-white sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-50 -right-30 size-[512px] rounded-full bg-accent/16 blur-3xl"
            />
            <h2
              id="closing-title"
              className="relative mx-auto max-w-2xl text-[30px] leading-[1.15] font-extrabold tracking-tight text-balance sm:text-5xl"
            >
              {kiCheck.closingTitle}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/75">
              Kostenlos, unverbindlich und in einer Minute angefragt.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button href="#ki-check-form">Kostenlosen Check anfordern</Button>
              <a
                href={site.phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold transition hover:border-white/50"
              >
                {site.phone.display}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
