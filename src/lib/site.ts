// Zentrale Stammdaten der Website. Änderungen hier wirken auf alle Seiten,
// die strukturierten Daten (JSON-LD) und llms.txt.

export const site = {
  name: "Story Base Agency",
  shortName: "Story Base",
  legalName: "Story Base Agency UG (haftungsbeschränkt)",
  url: "https://story-base.de",
  // Positionierungssatz – überall identisch verwenden (Website, Google-Profil, LinkedIn, Instagram)
  positioning:
    "Story Base ist die Video- und Ads-Agentur für Privat- und Selbstzahlerpraxen – mit dem AI-Ready Growth System gewinnen Praxen planbar Privatpatienten und Fachkräfte.",
  title: "Marketing für Arztpraxen | Video & Ads | Story Base Berlin",
  description:
    "Mehr Privatpatienten und Fachkräfte für Ihre Praxis: Praxisvideos, Social Media und Ads aus einer Hand – mit dem AI-Ready Growth System. Studio in Berlin-Spandau.",
  phone: {
    display: "0160 / 7534434",
    international: "+49 160 7534434",
    href: "tel:+491607534434",
  },
  email: "info@story-base.de",
  address: {
    street: "Pichelsdorfer Straße 129",
    zip: "13595",
    city: "Berlin",
    district: "Spandau",
    region: "Berlin",
    country: "DE",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pichelsdorfer+Stra%C3%9Fe+129%2C+13595+Berlin",
  },
  managingDirector: "Jan Bruchwalski",
  register: {
    court: "Amtsgericht Charlottenburg",
    number: "HRB 280520 B",
  },
  taxNumber: "29/548/30386",
  calendlyUrl: "https://calendly.com/bruchwalski-story-base/skalierungs-call",
  social: {
    linkedin: "https://www.linkedin.com/company/story-base-agency/",
    instagram: "https://www.instagram.com/story_base_agency/",
  },
  cookiebotId: "6654f03a-c2b5-4f72-b05f-fd727a7aede2",
  gaId: "G-SPBN9MV6KZ",
} as const;

export const navigation = [
  { href: "/#system", label: "Leistungen" },
  { href: "/#ziele", label: "Für Praxen" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#about", label: "Über uns" },
  { href: "/#faq", label: "FAQ" },
] as const;
