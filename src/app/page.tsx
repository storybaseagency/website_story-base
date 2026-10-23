import type { ReactNode } from "react";
import { site } from "@/lib/site";
import {
  ArrowIcon,
  CalendarIcon,
  ClockIcon,
  GearIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  RocketIcon,
  TargetIcon,
} from "@/components/icons";

const benefits = [
  {
    icon: ClockIcon,
    title: "Weniger Aufwand, mehr Wirkung",
    text: "Sie sparen wertvolle Zeit, weil wir Strategie, Produktion und Umsetzung komplett übernehmen.",
  },
  {
    icon: GearIcon,
    title: "Effiziente Prozesse statt teurer Umwege",
    text: "Durch klare Strukturen und ein eingespieltes Team vermeiden Sie zusätzliche Kosten und lange Abstimmungsrunden.",
  },
  {
    icon: TargetIcon,
    title: "Sichtbarkeit, die ankommt",
    text: "Ihre Botschaften erreichen die Menschen, die wirklich zählen: Kunden, Partner und Mitarbeiter.",
  },
  {
    icon: RocketIcon,
    title: "Mehr Freiraum fürs Kerngeschäft",
    text: "Während wir Ihren Auftritt optimieren, können Sie sich voll auf das konzentrieren, was Umsatz bringt.",
  },
];

const steps = [
  {
    title: "Beratungsgespräch",
    text: "Im Skalierungs-Call lernen wir Ihr Unternehmen, Ihre Ziele und Ihre Zielgruppe kennen.",
  },
  {
    title: "Strategie",
    text: "Wir entwickeln ein Konzept, das zu Ihrer Marke passt und auf Ihre Ziele einzahlt.",
  },
  {
    title: "Produktion & Umsetzung",
    text: "Unser Team produziert den Content – auf Wunsch in unserem Studio in Spandau – und spielt ihn aus.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  image: `${site.url}/images/og.jpg`,
  description: site.description,
  telephone: site.phone.international,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.office.street,
    postalCode: site.office.zip,
    addressLocality: site.office.city,
    addressCountry: "DE",
  },
  areaServed: "DE",
  sameAs: [site.social.linkedin, site.social.instagram],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Benefits />
      <Process />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <video
        className="absolute inset-0 -z-20 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
        aria-hidden
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/70 via-ink-950/55 to-ink-950" />

      <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-20 sm:px-6">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur">
          <span className="size-2 rounded-full bg-accent" />
          Social-Media-Agentur aus Berlin-Spandau
        </p>
        <h1 className="max-w-3xl text-4xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-6xl">
          Durchstarten mit dem <span className="text-accent">AI-Ready Growth System</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">
          Strategie, Content-Produktion und Umsetzung aus einer Hand – damit Ihre Marke online wirkt
          und im Gedächtnis bleibt.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton href={site.calendlyUrl} external>
            Beratungsgespräch vereinbaren
          </PrimaryButton>
          <a
            href={site.phone.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 font-semibold backdrop-blur transition hover:border-white/50"
          >
            <PhoneIcon className="size-5" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Über uns"
          title="Von Gedanken zu Wirkung"
          subtitle="Ihr digitaler Auftritt, unser kreativer Touch – einzigartig wie ein Fingerabdruck."
        />

        <div className="reveal mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-white/75">
            <p>
              Wir sind eine Berliner Social-Media-Agentur mit Leidenschaft – die steckt bei uns schon
              seit den Kinderschuhen im Blut. Wir sorgen dafür, dass Marken online wirken.
            </p>
            <p>
              Kreative Köpfe, Tech-Wissen und jede Menge Ideen sind das Rezept für Ihr
              Online-Storytelling. Bleiben Sie im Gedächtnis.
            </p>
            <p>
              Unser Büro in Spandau bietet vielseitige Möglichkeiten: Ob Podcast-Studio,
              Workshop-Raum oder Treffpunkt für unser Netzwerk – hier entstehen Konzepte und Content.{" "}
              <span className="font-semibold text-white">Kommen Sie gern vorbei!</span>
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <figure className="col-span-2 self-end">
              <img
                src="/images/jan.webp"
                alt="Jan Bruchwalski, Geschäftsführer der Story Base Agency"
                width={400}
                height={400}
                loading="lazy"
                className="aspect-square w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
              />
              <figcaption className="mt-3 text-sm text-white/60">
                <span className="font-semibold text-white">Jan Bruchwalski</span>
                <br />
                Geschäftsführer
              </figcaption>
            </figure>
            <figure className="col-span-3">
              <img
                src="/images/buero.webp"
                alt="Ladenfront der Story Base Agency in der Pichelsdorfer Straße, Berlin-Spandau"
                width={506}
                height={338}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
              />
              <figcaption className="mt-3 text-sm text-white/60">
                <span className="font-semibold text-white">Unser Büro</span>
                <br />
                Pichelsdorfer Straße, Spandau
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="reveal mt-20 grid gap-6 md:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">Mission</p>
            <p className="mt-3 text-xl font-semibold text-white">
              Ihr Unternehmen bekommt eine Online-Ausstrahlung, die passt und die wirklich einzigartig
              ist.
            </p>
          </Card>
          <Card>
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">Vision</p>
            <p className="mt-3 text-xl font-semibold text-white">
              Eine Welt, in der Sie Ihre digitale Persönlichkeit voll entfalten können.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="mehrwert" className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Ihr Mehrwert"
          title="Kreative Stärke + technisches Verständnis"
          subtitle="= Inhalte, die Ergebnisse liefern."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="reveal">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-white/70">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="ablauf" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Ablauf"
          title="In drei Schritten zum starken Auftritt"
          subtitle="Klar strukturiert, ohne lange Abstimmungsrunden."
        />
        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="reveal relative">
              <Card className="h-full">
                <span className="text-5xl font-extrabold text-accent/80">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <PrimaryButton href={site.calendlyUrl} external>
            Jetzt Schritt 1 machen
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-800 via-ink-800 to-navy/60">
          <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="text-sm font-semibold tracking-widest text-accent uppercase">Kontakt</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
                Lassen Sie uns zusammenarbeiten
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                Wir freuen uns darauf, neue Projekte zu realisieren und mit inspirierenden Menschen
                zusammenzuarbeiten. Ob Sie bereits eine konkrete Idee haben oder erste Möglichkeiten
                ausloten möchten: Wir beraten Sie persönlich und bringen Ihr nächstes Projekt
                gemeinsam erfolgreich auf den Weg.
              </p>
              <div className="mt-10">
                <PrimaryButton href={site.calendlyUrl} external>
                  <CalendarIcon className="size-5" />
                  Beratungsgespräch vereinbaren
                </PrimaryButton>
                <p className="mt-3 text-sm text-white/50">
                  Die Terminbuchung öffnet sich bei unserem Partner Calendly.
                </p>
              </div>
            </div>

            <ul className="flex flex-col justify-center gap-4">
              <ContactItem icon={PhoneIcon} label="Telefon" href={site.phone.href}>
                {site.phone.display}
              </ContactItem>
              <ContactItem icon={MailIcon} label="E-Mail" href={`mailto:${site.email}`}>
                {site.email}
              </ContactItem>
              <ContactItem icon={PinIcon} label="Hier finden Sie uns" href={site.office.mapsUrl} external>
                {site.office.street}
                <br />
                {site.office.zip} {site.office.city}-{site.office.district}
              </ContactItem>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="reveal max-w-2xl">
      <p className="text-sm font-semibold tracking-widest text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h2>
      <p className="mt-4 text-lg text-white/70">{subtitle}</p>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-accent/40 hover:bg-white/[0.06] ${className}`}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-ink-950 shadow-lg shadow-accent/20 transition hover:bg-accent-soft"
    >
      {children}
      <ArrowIcon className="size-5 transition group-hover:translate-x-1" />
    </a>
  );
}

function ContactItem({
  icon: Icon,
  label,
  href,
  external,
  children,
}: {
  icon: typeof PhoneIcon;
  label: string;
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-950/40 p-5 transition hover:border-accent/50"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Icon className="size-5" />
        </span>
        <span>
          <span className="block text-sm text-white/55">{label}</span>
          <span className="block text-lg font-semibold">{children}</span>
        </span>
      </a>
    </li>
  );
}
