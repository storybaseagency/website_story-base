// Texte der Startseite. Werden sowohl gerendert als auch für die
// strukturierten Daten (FAQPage, Service) verwendet.

import { site } from "./site";

export type IconName = "target" | "calendar" | "clock" | "rocket" | "pin" | "gear" | "phone" | "mail";

export const fields = [
  "Ästhetische Medizin",
  "Zahnmedizin & Implantologie",
  "Dermatologie",
  "Orthopädie",
  "Kieferorthopädie",
  "Plastische Chirurgie",
  "Augenheilkunde",
  "Privatärztliche Allgemeinmedizin",
];

export const problems: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "Zu wenige Privat- und Selbstzahler",
    text: "Ihre IGeL- und Privatleistungen sind gut – aber online kaum sichtbar. Wer sucht, landet bei der Praxis mit dem überzeugenderen Auftritt.",
  },
  {
    icon: "calendar",
    title: "Offene MFA- und Arztstellen",
    text: "Stellenanzeigen bleiben unbeantwortet, der Dienstplan hat Lücken. Gute Fachkräfte wechseln dorthin, wo sie das Team schon vorher kennenlernen.",
  },
  {
    icon: "clock",
    title: "Keine Zeit für Social Media",
    text: "Zwischen Sprechstunde, Abrechnung und Team bleibt kein Abend für Reels, Texte und Ads – und halbherzige Posts schaden mehr, als sie nützen.",
  },
];

export const blocks = [
  {
    id: "strategie",
    title: "Positionierung & Strategie",
    short: "Wen Sie erreichen wollen – und womit",
    tun: "Wir klären, welche Patientengruppen und Leistungen Ihre Praxis wirklich voranbringen, und entwickeln daraus Botschaften, Themen und einen Redaktionsplan – HWG-konform von Anfang an.",
    nutzen:
      "Ein klares Profil, das Selbstzahler anspricht und sich von Praxen in Ihrer Nähe abhebt. Alle weiteren Inhalte zahlen auf dieses Ziel ein.",
    aufwand: "30-Minuten-Praxis-Check + ein Strategietermin",
  },
  {
    id: "video",
    title: "Videoproduktion",
    short: "Im Studio oder direkt in Ihrer Praxis",
    tun: "Arzt-Erklärvideos, Praxis-Rundgang, Team-Porträts und Recruiting-Clips – vorbereitet mit Drehplan, gedreht an einem Tag, geschnitten für jede Plattform.",
    nutzen:
      "Patienten und Bewerber lernen Sie kennen, bevor sie das erste Mal Ihre Praxis betreten. Vertrauen entsteht schon online.",
    aufwand: "ein halber Drehtag pro Quartal",
  },
  {
    id: "social-media",
    title: "Social Media",
    short: "Regelmäßig präsent, ohne Ihren Abend",
    tun: "Wir planen, texten und veröffentlichen Ihre Beiträge auf Instagram, Facebook, TikTok und LinkedIn und betreuen Kommentare nach abgestimmten Regeln.",
    nutzen:
      "Ein lebendiger, professioneller Auftritt, der Woche für Woche Ihre Expertise zeigt – ohne dass Ihr Team dafür Zeit freischaufeln muss.",
    aufwand: "Freigabe per Link, ca. 15 Minuten pro Woche",
  },
  {
    id: "ads",
    title: "Ads & Anfragen",
    short: "Gezielt Patienten und Bewerber gewinnen",
    tun: "Wir schalten Meta- und Google-Kampagnen mit Ihren Videos, bauen passende Landingpages und leiten Anfragen direkt an Ihre Terminbuchung oder Ihr Praxisteam.",
    nutzen:
      "Planbare Anfragen für genau die Leistungen und Stellen, die Sie besetzen wollen – statt Streuverlust und Zufall.",
    aufwand: "keiner – Sie erhalten nur die Anfragen",
  },
  {
    id: "optimierung",
    title: "KI-gestützte Optimierung",
    short: "Daten, die jeden Monat besser machen",
    tun: "Wir werten Reichweite, Anfragen und Kosten aus, testen neue Varianten und strukturieren Ihre Inhalte so, dass Google und KI-Assistenten wie ChatGPT Ihre Praxis finden und empfehlen.",
    nutzen:
      "Ihr Marketing wird mit jedem Monat effizienter. Sie sehen klar, welcher Euro wie viele Anfragen bringt.",
    aufwand: "ein 20-minütiger Monatsreport",
  },
];

export const goals: {
  id: string;
  icon: IconName;
  tag: string;
  tint: boolean;
  title: string;
  text: string;
  points: string[];
  cta: string;
}[] = [
  {
    id: "privatpatienten",
    icon: "target",
    tag: "Patientengewinnung",
    tint: true,
    title: "Mehr Privatpatienten & Selbstzahler",
    text: "Für Praxen, die ihre Privat- und IGeL-Leistungen bekannter machen und gezielt die Patienten ansprechen wollen, die dafür bereit sind.",
    points: [
      "Erklärvideos zu Ihren Selbstzahlerleistungen",
      "Kampagnen in Ihrem Einzugsgebiet",
      "Anfragen direkt in Ihre Terminbuchung",
    ],
    cta: "Praxis-Check zu Privatpatienten",
  },
  {
    id: "recruiting",
    icon: "rocket",
    tag: "Recruiting",
    tint: false,
    title: "Fachkräfte & MFA gewinnen",
    text: "Für Praxen mit offenen Stellen, die zeigen wollen, warum es sich lohnt, genau in diesem Team zu arbeiten.",
    points: [
      "Recruiting-Videos mit Ihrem echten Team",
      "Ausspielung auf Instagram, Facebook und TikTok",
      "Bewerbung in unter zwei Minuten",
    ],
    cta: "Praxis-Check zum Recruiting",
  },
];

// Nur echte, schriftlich freigegebene Stimmen eintragen – der Abschnitt
// „Stimmen“ erscheint automatisch, sobald hier mindestens ein Eintrag steht.
export const testimonials: { quote: string; name: string; role: string; avatar?: string }[] = [];

export const steps = [
  {
    title: "Praxis-Check",
    text: "Wir sprechen über Ihre Ziele, Ihre Leistungen und Ihren heutigen Auftritt. Sie erhalten eine ehrliche Einschätzung, was für Ihre Praxis realistisch ist.",
    time: "30 Minuten",
  },
  {
    title: "Strategie & Drehplan",
    text: "Wir entwickeln Botschaften, Themen und einen konkreten Drehplan. Sie geben frei – alles Weitere bereiten wir vor.",
    time: "eine Freigabe",
  },
  {
    title: "Dreh, Ausspielung, Optimierung",
    text: "Wir drehen, schneiden, veröffentlichen und schalten Ads. Jeden Monat optimieren wir anhand echter Zahlen.",
    time: "ein halber Drehtag pro Quartal",
  },
];

export const facts = ["Eigenes Video- & Podcast-Studio", "HWG-konforme Inhalte", "Persönlicher Ansprechpartner"];

// Zitierfähiger Steckbrief – kurze, faktische Aussagen für Google und KI-Assistenten
export const profile: { term: string; detail: string }[] = [
  { term: "Wer", detail: `${site.legalName}, Agentur für Praxismarketing` },
  {
    term: "Für wen",
    detail: "Privat- und Selbstzahlerpraxen sowie gemischte Praxen in ganz Deutschland",
  },
  {
    term: "Leistungen",
    detail: "Positionierung, Videoproduktion, Social Media, Meta- und Google-Ads, KI-gestützte Optimierung",
  },
  { term: "Ziel", detail: "Mehr Privatpatienten, Selbstzahler und Fachkräfte wie MFA" },
  {
    term: "Standort",
    detail: `Eigenes Video- und Podcast-Studio, ${site.address.street}, ${site.address.zip} ${site.address.city}-${site.address.district}`,
  },
  { term: "Ansprechpartner", detail: `${site.managingDirector}, Geschäftsführer` },
];

export const faq = [
  {
    q: "Was ist das AI-Ready Growth System?",
    a: "Das AI-Ready Growth System ist unser Komplettsystem für Praxismarketing: Wir entwickeln Ihre Positionierung, produzieren Videos, spielen sie über Social Media und Ads aus und optimieren alles laufend datenbasiert. „AI-Ready“ heißt, dass Ihre Inhalte so aufgebaut sind, dass auch Google und KI-Assistenten Ihre Praxis verstehen und empfehlen können.",
  },
  {
    q: "Für welche Praxen eignet sich Story Base?",
    a: "Story Base eignet sich für Privat- und Selbstzahlerpraxen sowie gemischte Praxen, die gezielt mehr Privatpatienten oder Fachkräfte gewinnen wollen – zum Beispiel in Ästhetik, Zahnmedizin, Dermatologie, Orthopädie oder Kieferorthopädie. Entscheidend ist nicht die Fachrichtung, sondern ein klares Wachstumsziel.",
  },
  {
    q: "Wie gewinnt man mit Videos mehr Privatpatienten?",
    a: "Videos zeigen Arzt, Team und Praxis, bevor der Patient da ist. Das schafft Vertrauen – und Vertrauen gibt bei Selbstzahlerleistungen den Ausschlag. Über gezielte Ads erreichen diese Videos Menschen in Ihrem Einzugsgebiet, die sich bereits für Ihre Leistungen interessieren.",
  },
  {
    q: "Wie hilft Videomarketing bei der Suche nach MFA und Fachkräften?",
    a: "Recruiting-Videos zeigen echte Kolleginnen und Kollegen und den Praxisalltag. Ausgespielt auf Instagram, Facebook und TikTok erreichen sie auch Fachkräfte, die gerade nicht aktiv suchen, aber offen für einen Wechsel sind. Die Bewerbung dauert dann nur wenige Minuten.",
  },
  {
    q: "Wie viel Zeit muss ich als Arzt investieren?",
    a: "In der Regel ein Strategiegespräch von 30 Minuten und einen halben Drehtag pro Quartal. Planung, Schnitt, Texte, Posting und Ads übernehmen wir. Freigaben erledigen Sie bequem per Link – meist in wenigen Minuten pro Woche.",
  },
  {
    q: "Was darf eine Arztpraxis auf Social Media werben?",
    a: "Ärztliche Werbung ist durch das Heilmittelwerbegesetz (HWG) und die Berufsordnung geregelt – etwa bei Vorher-nachher-Bildern oder Heilversprechen. Wir kennen diese Regeln und planen alle Inhalte von Anfang an so, dass sie sachlich informieren und rechtlich sicher bleiben.",
  },
  {
    q: "Wann sehe ich erste Ergebnisse?",
    a: "Ads können schon wenige Wochen nach dem Dreh erste Anfragen bringen. Organische Reichweite und Rankings bei Google bauen sich über mehrere Monate auf. Im Praxis-Check besprechen wir, was in Ihrer Situation realistisch ist – ohne Versprechen, die wir nicht halten können.",
  },
  {
    q: "Wem gehören die Videos?",
    a: "Die Videos gehören Ihnen. Sie erhalten die fertigen Videos zur Nutzung auf Ihrer Website, in Social Media und in der Praxis. Die genauen Nutzungsrechte halten wir im Vertrag transparent fest.",
  },
  {
    q: "Arbeiten Sie nur mit Praxen in Berlin?",
    a: "Nein. Unser Studio und Büro sind in Berlin-Spandau, gedreht wird bei Ihnen vor Ort oder bei uns. Strategie, Social Media und Ads betreuen wir für Praxen in ganz Deutschland.",
  },
];
