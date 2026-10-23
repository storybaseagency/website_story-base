import type { ReactNode } from "react";
import { ContactForm } from "@/components/ContactForm";
import { StickyCta } from "@/components/StickyCta";
import { SystemTabs } from "@/components/SystemTabs";
import { Button, Card, Dot, Eyebrow, Icon, IconTile, Reveal, Section, SectionHeader } from "@/components/ui";
import { facts, faq, fields, goals, problems, profile, steps, testimonials } from "@/lib/content";
import { homeSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }} />
      <Hero />
      <FieldsTicker />
      <Problem />
      <System />
      <Goals />
      {testimonials.length > 0 && <Testimonials />}
      <Process />
      <About />
      <Faq />
      <Contact />
      <StickyCta />
    </>
  );
}

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-paper pt-[152px] pb-24">
      <div aria-hidden className="pointer-events-none absolute -top-30 -right-40 size-[560px] rounded-full bg-accent/22 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-65 -left-50 size-[512px] rounded-full bg-navy/8 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-950/14 bg-white/70 px-4 py-1.5 text-sm font-medium text-ink-700 backdrop-blur">
              <span className="size-2 rounded-full bg-accent" />
              Agentur für Praxismarketing · Berlin-Spandau
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1
              id="hero-title"
              className="text-[40px] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance text-ink-950 sm:text-[56px] lg:text-[64px]"
            >
              Marketing für Arztpraxen, das{" "}
              <span className="relative whitespace-nowrap text-accent-dark">
                Privatpatienten
                <svg
                  aria-hidden
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="draw-underline absolute -bottom-1 left-0 h-3 w-full text-accent"
                >
                  <path d="M2 9C60 3 140 2 298 6" pathLength={1} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <span className="text-accent-dark">und Fachkräfte</span> bringt.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-[560px] text-xl leading-[1.6] text-pretty text-ink-600">
              Videoproduktion, Social Media und Ads aus einer Hand – mit dem{" "}
              <strong className="font-bold text-accent-deep">AI-Ready Growth System</strong>. Sie behandeln, wir
              sorgen dafür, dass die richtigen Patienten und Bewerber Ihre Praxis finden.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={site.calendlyUrl} external>
                Praxis-Check vereinbaren
              </Button>
              <Button href={site.phone.href} variant="outline" icon="phone">
                {site.phone.display}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
              <li className="flex items-center gap-2">
                <Dot />
                30 Minuten, persönlich mit {site.managingDirector}
              </li>
              <li className="flex items-center gap-2">
                <Dot />
                Für Privat- und Selbstzahlerpraxen
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={250} distance={48}>
          <div className="relative pt-6 pb-10 pl-6">
            <div className="relative aspect-[4/4.4] overflow-hidden rounded-3xl bg-ink-800 shadow-image">
              <img
                src="/images/videodreh-arztpraxis-studio-berlin.webp"
                alt="Kamera beim Videodreh im Story Base Studio in Berlin-Spandau"
                width={1280}
                height={720}
                fetchPriority="high"
                className="size-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-b from-ink-950/30 via-ink-950/0 via-30% to-ink-950/0" />
              <div className="absolute top-5 right-5 flex items-center gap-2.5 rounded-full bg-ink-950/45 px-3.5 py-2 text-white backdrop-blur">
                <span aria-hidden className="size-2.5 animate-pulse-dot rounded-full bg-accent" />
                <span className="text-[13px] font-semibold tracking-[0.02em] sm:text-sm">Eigenes Video- und Podcast-Studio</span>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex animate-fade-in items-center gap-2.5 rounded-full border border-ink-950/8 bg-white/90 py-2.5 pr-4 pl-2.5 shadow-card backdrop-blur [animation-delay:700ms]">
              <IconTile name="pin" small />
              <span className="text-sm leading-[18px]">
                <span className="block text-ink-500">Studio &amp; Büro</span>
                <strong className="text-ink-950">Berlin-Spandau</strong>
              </span>
            </div>
            <div className="absolute -right-2 bottom-0 max-w-[260px] animate-fade-in rounded-3xl border border-ink-950/8 bg-white/92 p-5 shadow-card-hover backdrop-blur [animation-delay:950ms]">
              <p className="text-xs font-semibold tracking-widest text-accent-deep uppercase">Aus einer Hand</p>
              <p className="mt-2 leading-[1.45] font-bold text-ink-950">Video + Social Media + Ads = planbar mehr Anfragen</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FieldsTicker() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
      {fields.map((f) => (
        <li
          key={f}
          className="inline-flex items-center gap-3 rounded-full bg-sand px-5 py-2 text-[15px] font-semibold whitespace-nowrap text-ink-700"
        >
          <Dot />
          {f}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="border-y border-ink-950/8 bg-white py-5">
      <h2 className="sr-only">Fachrichtungen, die wir betreuen</h2>
      <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <Section id="problem" labelledBy="problem-title">
      <Reveal>
        <SectionHeader
          id="problem-title"
          eyebrow="Die Ausgangslage"
          title="Volle Wartezimmer, aber die falschen Patienten?"
          subtitle="Viele Praxen sind ausgelastet – und wachsen trotzdem nicht in die Richtung, die sie sich wünschen. Drei Gründe hören wir in fast jedem Praxis-Check."
        />
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <Card className="h-full p-8">
              <IconTile name={p.icon} />
              <h3 className="mt-6 text-xl leading-7 font-bold tracking-[-0.01em]">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{p.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={100}>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-4xl bg-sand p-8 sm:p-10">
          <p className="max-w-[720px] text-[22px] leading-[1.3] font-extrabold tracking-[-0.02em] text-balance text-ink-950 sm:text-3xl">
            Ihre medizinische Expertise + unser System{" "}
            <span className="text-accent-dark">= Patienten, die zu Ihrer Praxis passen.</span>
          </p>
          <Button href="#system" variant="dark" arrow>
            So funktioniert es
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

function System() {
  return (
    <Section id="system" bg="inverse" glow labelledBy="system-title">
      <Reveal>
        <SectionHeader
          id="system-title"
          dark
          eyebrow="Das System"
          title="Das AI-Ready Growth System: Ihr Weg zu mehr Privatpatienten"
          subtitle="Fünf Bausteine, die ineinandergreifen. Sie entscheiden, wir setzen um – und Sie sehen jederzeit, was es Ihrer Praxis bringt."
        />
      </Reveal>
      <SystemTabs />
      <Reveal>
        <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-white/60">
          <strong className="text-white/85">Warum „AI-Ready“?</strong> Immer mehr Patienten fragen ChatGPT, Gemini
          oder Perplexity nach einer passenden Praxis. Wir bereiten Ihre Inhalte so auf, dass nicht nur Google, sondern
          auch KI-Assistenten Ihre Praxis verstehen, zitieren und empfehlen können.
        </p>
      </Reveal>
    </Section>
  );
}

function Goals() {
  return (
    <Section id="ziele" labelledBy="ziele-title">
      <Reveal>
        <SectionHeader
          id="ziele-title"
          eyebrow="Ihr Ziel"
          title="Zwei Richtungen, ein System"
          subtitle="Ob Sie mehr Selbstzahler gewinnen oder Ihr Team verstärken wollen – die Bausteine bleiben gleich, die Geschichte ändert sich."
        />
      </Reveal>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {goals.map((g, i) => (
          <Reveal key={g.id} delay={i * 120}>
            <Card tint={g.tint} className="flex h-full flex-col gap-5 p-8 sm:p-10">
              <article id={g.id} aria-labelledby={`${g.id}-title`} className="flex h-full flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <IconTile name={g.icon} />
                  <span className="text-sm font-semibold text-ink-500">{g.tag}</span>
                </div>
                <h3 id={`${g.id}-title`} className="text-[30px] leading-[1.15] font-extrabold tracking-tight text-balance">
                  {g.title}
                </h3>
                <p className="text-[17px] leading-relaxed text-ink-600">{g.text}</p>
                <ul className="grid gap-3">
                  {g.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 leading-6 text-ink-700">
                      <Dot className="mt-[9px]" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Button href="#contact" variant="link">
                    {g.cta}
                  </Button>
                </div>
              </article>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section id="stimmen" bg="alt" labelledBy="stimmen-title" className="!py-24">
      <Reveal>
        <SectionHeader id="stimmen-title" eyebrow="Stimmen" title="Was Ärztinnen und Ärzte über die Zusammenarbeit sagen" />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <Card className="flex h-full flex-col gap-6 p-8">
              <figure className="flex h-full flex-col gap-6">
                <span aria-hidden className="h-6 text-[56px] leading-[0.6] font-extrabold text-accent">
                  “
                </span>
                <blockquote className="text-lg leading-[1.6] font-medium text-pretty">{t.quote}</blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  {t.avatar && <img src={t.avatar} alt="" width={44} height={44} className="size-11 rounded-full object-cover" />}
                  <span>
                    <span className="block font-bold">{t.name}</span>
                    <span className="block text-sm text-ink-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section id="ablauf" labelledBy="ablauf-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <SectionHeader
            id="ablauf-title"
            eyebrow="Ablauf"
            title="In drei Schritten zur sichtbaren Praxis"
            subtitle="Klar geplant, damit Ihr Praxisalltag weiterläuft. Bei jedem Schritt wissen Sie vorher, wie viel Zeit er Sie kostet."
          />
        </Reveal>
        <Button href={site.calendlyUrl} external>
          Jetzt Schritt 1 machen
        </Button>
      </div>
      <ol className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 120} className="flex h-full flex-col gap-3">
              <Card className="h-full p-8">
                <span className="block text-5xl leading-none font-extrabold text-accent-dark">0{i + 1}</span>
                <h3 className="mt-4 text-xl leading-7 font-bold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{s.text}</p>
              </Card>
              <p className="flex items-center gap-2.5 rounded-full bg-accent-tint px-5 py-3 text-sm font-semibold text-accent-deep">
                <Icon name="clock" className="size-4" />
                Ihr Aufwand: {s.time}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" bg="alt" glow labelledBy="about-title">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative pr-12 pb-12">
            <img
              src="/images/jan-bruchwalski-praxismarketing-berlin.webp"
              alt="Jan Bruchwalski, Geschäftsführer der Story Base Agency"
              width={400}
              height={400}
              loading="lazy"
              className="block aspect-[4/5] w-full rounded-3xl object-cover shadow-image"
            />
            <img
              src="/images/studio-story-base-berlin-spandau.webp"
              alt="Ladengeschäft und Studio der Story Base Agency in der Pichelsdorfer Straße, Berlin-Spandau"
              width={506}
              height={338}
              loading="lazy"
              className="absolute right-0 bottom-0 aspect-square w-[46%] rounded-3xl border-6 border-sand object-cover shadow-card-hover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col gap-5">
            <Eyebrow>Über uns</Eyebrow>
            <h2 id="about-title" className="text-[34px] leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl">
              Warum wir uns auf Arztpraxen spezialisiert haben
            </h2>
            <p className="text-lg leading-relaxed text-ink-600">
              Ich bin {site.managingDirector}, Geschäftsführer von Story Base. Wir haben mit vielen Branchen gearbeitet –
              und gemerkt: Nirgends entscheidet Vertrauen so sehr wie bei der Wahl einer Ärztin oder eines Arztes. Genau
              das lässt sich mit Video zeigen, bevor der erste Termin stattfindet.
            </p>
            <p className="text-lg leading-relaxed text-ink-600">
              Deshalb kennen wir die Regeln des Heilmittelwerbegesetzes, sprechen die Sprache von Praxisteams und drehen
              in unserem eigenen Studio in der Pichelsdorfer Straße – oder direkt bei Ihnen in der Praxis.
            </p>
            <ul className="mt-2 flex flex-wrap gap-3">
              {facts.map((f) => (
                <li key={f} className="rounded-full border border-ink-950/8 bg-white px-4 py-2 text-sm font-semibold text-ink-700">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-20 rounded-4xl border border-ink-950/8 bg-white p-8 shadow-card sm:p-10">
          <h3 className="text-xl font-bold">Story Base auf einen Blick</h3>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-600">{site.positioning}</p>
          <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {profile.map((p) => (
              <div key={p.term} className="border-t border-ink-950/8 pt-4">
                <dt className="text-sm font-semibold tracking-widest text-accent-deep uppercase">{p.term}</dt>
                <dd className="mt-1 leading-relaxed text-ink-700">{p.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
        <div className="flex flex-[1_1_300px] flex-col gap-6 lg:sticky lg:top-28">
          <SectionHeader
            id="faq-title"
            eyebrow="FAQ"
            title="Häufige Fragen zum Praxismarketing"
            subtitle="Ihre Frage ist nicht dabei? Fragen Sie uns direkt – im Praxis-Check ist dafür Zeit."
          />
          <div>
            <Button href={site.phone.href} variant="outline" icon="phone">
              Jetzt anrufen
            </Button>
          </div>
        </div>
        <div className="min-w-0 flex-[2_1_520px] border-t border-ink-950/14">
          {faq.map((f, i) => (
            <details key={f.q} className="faq-item group border-b border-ink-950/14" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left">
                <h3 className="text-lg leading-7 font-bold text-ink-950 sm:text-xl">{f.q}</h3>
                <span
                  aria-hidden
                  className="faq-icon relative flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-deep"
                >
                  <span className="absolute h-0.5 w-3.5 rounded-sm bg-current" />
                  <span className="faq-bar-v absolute h-0.5 w-3.5 rotate-90 rounded-sm bg-current" />
                </span>
              </summary>
              <p className="pr-0 pb-6 leading-relaxed text-ink-600 sm:pr-16">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative grid gap-12 overflow-hidden rounded-4xl bg-linear-135 from-ink-800 to-navy p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
            <div aria-hidden className="pointer-events-none absolute -top-50 -right-30 size-[512px] rounded-full bg-accent/16 blur-3xl" />
            <div className="relative flex flex-col gap-6">
              <Eyebrow dark>Kontakt</Eyebrow>
              <h2 id="contact-title" className="text-[34px] leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl">
                Bereit für mehr Privatpatienten?
              </h2>
              <p className="text-lg leading-relaxed text-white/75">
                Im 30-minütigen Praxis-Check schauen wir gemeinsam auf Ihre Ziele und Ihren Auftritt – und Sie gehen mit
                drei konkreten nächsten Schritten raus. Auch wenn wir danach nicht zusammenarbeiten.
              </p>
              <div>
                <Button href={site.calendlyUrl} external>
                  Praxis-Check vereinbaren
                </Button>
                <p className="mt-3 text-[13px] text-white/60">Die Terminbuchung öffnet sich bei unserem Partner Calendly.</p>
              </div>
              <address className="mt-2 grid gap-3 not-italic">
                <ContactItem icon="phone" label="Telefon" href={site.phone.href}>
                  {site.phone.display}
                </ContactItem>
                <ContactItem icon="mail" label="E-Mail" href={`mailto:${site.email}`}>
                  {site.email}
                </ContactItem>
                <ContactItem icon="pin" label="Studio & Büro" href={site.address.mapsUrl} external>
                  {site.address.street}, {site.address.zip} {site.address.city}
                </ContactItem>
              </address>
            </div>

            <div className="relative self-start rounded-3xl bg-white p-6 text-ink-950 shadow-image sm:p-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  href,
  external,
  children,
}: {
  icon: "phone" | "mail" | "pin";
  label: string;
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-950/40 p-5 transition duration-150 hover:border-accent/55"
    >
      <IconTile name={icon} small dark />
      <span>
        <span className="block text-sm text-white/55">{label}</span>
        <span className="block text-lg leading-7 font-semibold">{children}</span>
      </span>
    </a>
  );
}
