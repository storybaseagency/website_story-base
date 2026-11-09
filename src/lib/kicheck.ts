// Inhalte und Formular-Optionen der Landingpage /ki-check/

import { fields } from "./content";

export const kiCheck = {
  path: "/ki-check/",
  metaTitle: "Kostenloser KI-Sichtbarkeits-Check für Arztpraxen | Story Base",
  metaDescription:
    "Empfehlen ChatGPT, Perplexity und Gemini Ihre Praxis – oder Ihre Konkurrenz? Kostenloser KI-Sichtbarkeits-Check mit Score, Konkurrenzvergleich und drei Maßnahmen. Report in 2 Werktagen.",
  headline: "Ihre Patienten fragen ChatGPT nach einem Arzt.",
  headlineAccent: "Wird Ihre Praxis genannt?",
  subline:
    "Der kostenlose KI-Sichtbarkeits-Check zeigt Ihnen in 2 Werktagen, ob ChatGPT, Perplexity und Gemini Ihre Praxis empfehlen – oder Ihre Konkurrenz.",
  trust: ["Kostenlos", "1 Minute Aufwand", "Persönlich ausgewertet von Story Base, Berlin-Spandau"],
  problem: {
    title: "Google ist nicht mehr der einzige Weg zu Ihrer Praxis",
    text: "Immer mehr Patienten fragen KI-Assistenten, welche Praxis sie für eine Behandlung wählen sollen. Die KI nennt dann meist zwei, drei Praxen – und die anderen existieren für diesen Patienten nicht. Ob Ihre Praxis dabei ist, hängt nicht von Ihrer medizinischen Qualität ab, sondern davon, wie Ihre Praxis im Netz beschrieben ist.",
  },
  benefits: [
    {
      icon: "target" as const,
      title: "Ihr KI-Sichtbarkeits-Score",
      text: "Von 0 bis 100, über drei KI-Assistenten und typische Patientenfragen hinweg.",
    },
    {
      icon: "rocket" as const,
      title: "Wer stattdessen empfohlen wird",
      text: "Welche Praxen in Ihrer Umgebung genannt werden, wenn Ihre fehlt.",
    },
    {
      icon: "gear" as const,
      title: "Drei konkrete Maßnahmen",
      text: "Was Sie ändern können, damit KI Ihre Praxis versteht und empfiehlt.",
    },
  ],
  steps: [
    { title: "Formular ausfüllen", text: "Praxis, Stadt, wichtigste Leistung. Dauert eine Minute." },
    {
      title: "Wir prüfen",
      text: "Typische Patientenfragen in ChatGPT, Perplexity und Gemini, persönlich ausgewertet.",
    },
    {
      title: "Sie erhalten Ihren Report",
      text: "Innerhalb von 2 Werktagen per E-Mail. Auf Wunsch besprechen wir ihn in 20 Minuten.",
    },
  ],
  about:
    "Story Base ist die Video- und Ads-Agentur für Privat- und Selbstzahlerpraxen, mit eigenem Studio in Berlin-Spandau. Mit dem AI-Ready Growth System sorgen wir dafür, dass Patienten und Fachkräfte Ihre Praxis finden – bei Google und bei KI-Assistenten.",
  faq: [
    { q: "Was kostet der Check?", a: "Nichts. Sie gehen keine Verpflichtung ein." },
    {
      q: "Wie viel Zeit kostet mich das?",
      a: "Eine Minute für das Formular. Die Besprechung des Reports ist freiwillig und dauert 20 Minuten.",
    },
    {
      q: "Wie genau ist das Ergebnis?",
      a: "KI-Antworten ändern sich laufend. Der Report ist eine Stichprobe mit Datum, die zeigt, wie KI Ihre Praxis heute sieht. Genau deshalb prüfen wir mehrere Fragen und mehrere Assistenten.",
    },
    {
      q: "Brauchen Sie Patientendaten?",
      a: "Nein. Wir arbeiten ausschließlich mit öffentlich verfügbaren Informationen über Ihre Praxis.",
    },
    {
      q: "Was passiert danach?",
      a: "Sie erhalten Ihren Report. Wenn Sie möchten, zeigen wir Ihnen in 20 Minuten, was die Ergebnisse für Ihre Praxis bedeuten.",
    },
  ],
  closingTitle: "Finden Sie heraus, was KI über Ihre Praxis sagt",
};

export const kiCheckFachrichtungen = [...fields, "Andere"];

// Varianten je Fachrichtung für Google-Ads-Anzeigengruppen: eigene URL
// /ki-check/{slug}/, passende Überschrift, vorausgewählte Fachrichtung.
export type KiCheckVariant = {
  slug: string;
  fachrichtung: (typeof fields)[number];
  headline: string;
  leistungPlaceholder: string;
};

export const kiCheckVariants: KiCheckVariant[] = [
  {
    slug: "zahnmedizin",
    fachrichtung: "Zahnmedizin & Implantologie",
    headline: "Ihre Patienten fragen ChatGPT nach einem Zahnarzt.",
    leistungPlaceholder: "z. B. Implantate, Aligner, Bleaching",
  },
  {
    slug: "dermatologie",
    fachrichtung: "Dermatologie",
    headline: "Ihre Patienten fragen ChatGPT nach einem Hautarzt.",
    leistungPlaceholder: "z. B. Faltenbehandlung, Laser, Hautkrebs-Screening",
  },
  {
    slug: "aesthetik",
    fachrichtung: "Ästhetische Medizin",
    headline: "Ihre Patienten fragen ChatGPT nach einer Praxis für ästhetische Behandlungen.",
    leistungPlaceholder: "z. B. Faltenbehandlung, Hyaluron, Lasertherapie",
  },
  {
    slug: "orthopaedie",
    fachrichtung: "Orthopädie",
    headline: "Ihre Patienten fragen ChatGPT nach einem Orthopäden.",
    leistungPlaceholder: "z. B. Stoßwellentherapie, PRP, Sportmedizin",
  },
  {
    slug: "kieferorthopaedie",
    fachrichtung: "Kieferorthopädie",
    headline: "Ihre Patienten fragen ChatGPT nach einem Kieferorthopäden.",
    leistungPlaceholder: "z. B. Aligner, Erwachsenen-Kieferorthopädie",
  },
  {
    slug: "plastische-chirurgie",
    fachrichtung: "Plastische Chirurgie",
    headline: "Ihre Patienten fragen ChatGPT nach einem plastischen Chirurgen.",
    leistungPlaceholder: "z. B. Lidstraffung, Fettabsaugung",
  },
  {
    slug: "augenheilkunde",
    fachrichtung: "Augenheilkunde",
    headline: "Ihre Patienten fragen ChatGPT nach einem Augenarzt.",
    leistungPlaceholder: "z. B. Lasik, Linsen-OP, Glaukom-Vorsorge",
  },
  {
    slug: "privatarzt",
    fachrichtung: "Privatärztliche Allgemeinmedizin",
    headline: "Ihre Patienten fragen ChatGPT nach einem Privatarzt.",
    leistungPlaceholder: "z. B. Check-up, Vorsorge, Reisemedizin",
  },
];
export const kiCheckZiele = ["Mehr Privatpatienten", "Mehr Fachkräfte", "Beides"];

// Übergabe von Vorname/E-Mail an die Danke-Seite, ohne sie in die URL zu schreiben
export const KI_CHECK_STORAGE_KEY = "sb-ki-check";
