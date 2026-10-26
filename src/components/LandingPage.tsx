import Link from "next/link";
import type { LandingPageData } from "@/lib/landingpages";
import { landingPages } from "@/lib/landingpages";
import { landingSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { ContactSection } from "./ContactSection";
import { FaqList } from "./FaqList";
import { ArrowIcon } from "./icons";
import { StickyCta } from "./StickyCta";
import { Button, Card, Dot, Eyebrow, Icon, IconTile, Reveal, Section, SectionHeader } from "./ui";

export function LandingPage({ page }: { page: LandingPageData }) {
  const related = landingPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingSchema(page)) }} />

      {/* Hero */}
      <section aria-labelledby="page-title" className="relative overflow-hidden bg-paper pt-[136px] pb-20">
        <div aria-hidden className="pointer-events-none absolute -top-30 -right-40 size-[520px] rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Brotkrumen" className="text-sm text-ink-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink-950">
                  Startseite
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-ink-700">
                {page.navLabel}
              </li>
            </ol>
          </nav>
          <div className="mt-8 grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-6">
              <Reveal>
                <Eyebrow>{page.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={100}>
                <h1
                  id="page-title"
                  className="text-[36px] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-ink-950 sm:text-5xl lg:text-[56px]"
                >
                  {page.h1} <span className="text-accent-dark">{page.h1Accent}</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="max-w-2xl text-xl leading-[1.6] text-pretty text-ink-600">{page.lead}</p>
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
            </div>

            {/* Direkte Antwort – der Absatz, den Google und KI-Assistenten zitieren */}
            <Reveal delay={250}>
              <aside aria-labelledby="answer-title" className="rounded-3xl border border-ink-950/8 bg-white p-7 shadow-card">
                <p className="text-xs font-semibold tracking-widest text-accent-deep uppercase">Kurz erklärt</p>
                <h2 id="answer-title" className="mt-2 text-lg leading-snug font-bold text-ink-950">
                  {page.answer.question}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-600">{page.answer.text}</p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Einordnung */}
      <Section bg="alt" labelledBy="intro-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionHeader id="intro-title" eyebrow="Die Ausgangslage" title={page.intro.title} />
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-ink-600">
            {page.intro.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Ansatz */}
      <Section labelledBy="points-title">
        <Reveal>
          <SectionHeader id="points-title" eyebrow={page.points.eyebrow} title={page.points.title} subtitle={page.points.subtitle} />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {page.points.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <Card className="h-full p-8">
                <IconTile name={item.icon} />
                <h3 className="mt-6 text-xl leading-7 font-bold tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{item.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Ablauf + Leistungsumfang */}
      <Section bg="inverse" glow labelledBy="process-title">
        <Reveal>
          <SectionHeader id="process-title" dark eyebrow="Ablauf" title={page.process.title} subtitle={page.process.subtitle} />
        </Reveal>
        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {page.process.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 120} className="flex h-full flex-col gap-3">
                <div className="h-full rounded-3xl border border-white/10 bg-white/4 p-8 transition hover:border-accent/40 hover:bg-white/6">
                  <span className="block text-5xl leading-none font-extrabold text-accent/80">0{i + 1}</span>
                  <h3 className="mt-4 text-xl leading-7 font-bold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/70">{s.text}</p>
                </div>
                <p className="flex items-center gap-2.5 rounded-full bg-accent/15 px-5 py-3 text-sm font-semibold text-accent">
                  <Icon name="clock" className="size-4" />
                  Ihr Aufwand: {s.time}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="mt-16 rounded-4xl border border-white/10 bg-linear-135 from-ink-800 to-navy p-8 sm:p-10">
            <h3 className="text-2xl font-extrabold tracking-tight">{page.deliverables.title}</h3>
            <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {page.deliverables.items.map((d) => (
                <li key={d} className="flex items-start gap-3 leading-relaxed text-white/80">
                  <Dot className="mt-[10px]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Rechtlicher Rahmen */}
      <Section labelledBy="rules-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionHeader id="rules-title" eyebrow="Rechtlicher Rahmen" title={page.rules.title} />
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 rounded-3xl bg-sand p-8 text-lg leading-relaxed text-ink-600">
              {page.rules.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="alt" labelledBy="faq-title">
        <div className="flex flex-wrap items-start gap-x-16 gap-y-12">
          <div className="flex flex-[1_1_300px] flex-col gap-6 lg:sticky lg:top-28">
            <SectionHeader
              id="faq-title"
              eyebrow="FAQ"
              title="Häufige Fragen"
              subtitle="Ihre Frage ist nicht dabei? Im Praxis-Check ist dafür Zeit."
            />
            <div>
              <Button href={site.phone.href} variant="outline" icon="phone">
                Jetzt anrufen
              </Button>
            </div>
          </div>
          <div className="min-w-0 flex-[2_1_520px]">
            <FaqList items={page.faq} />
          </div>
        </div>
      </Section>

      {/* Interne Verlinkung */}
      <Section labelledBy="related-title" className="!pb-16">
        <Reveal>
          <SectionHeader
            id="related-title"
            eyebrow="Passend dazu"
            title="Ein System, mehrere Ziele"
            subtitle="Alle Leistungen greifen im AI-Ready Growth System ineinander."
          />
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <RelatedCard href={`/${r.slug}/`} eyebrow={r.eyebrow} title={r.navLabel} text={r.metaDescription} />
            </li>
          ))}
          <li>
            <RelatedCard
              href="/#system"
              eyebrow="Überblick"
              title="Das AI-Ready Growth System"
              text="Positionierung, Video, Social Media, Ads und KI-gestützte Optimierung – alle fünf Bausteine im Überblick."
            />
          </li>
        </ul>
      </Section>

      <ContactSection title={page.ctaTitle} />
      <StickyCta />
    </>
  );
}

function RelatedCard({ href, eyebrow, title, text }: { href: string; eyebrow: string; title: string; text: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-3 rounded-3xl border border-ink-950/8 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
    >
      <span className="text-xs font-semibold tracking-widest text-accent-deep uppercase">{eyebrow}</span>
      <span className="text-xl font-bold text-ink-950">{title}</span>
      <span className="leading-relaxed text-ink-600">{text}</span>
      <span className="mt-auto flex items-center gap-2 pt-2 font-semibold text-accent-deep">
        Mehr erfahren
        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
