// Zentrale Stammdaten der Website. Änderungen hier wirken auf alle Seiten.

export const site = {
  name: "Story Base Agency",
  legalName: "Story Base Agency UG (haftungsbeschränkt)",
  url: "https://story-base.de",
  description:
    "Berliner Social-Media-Agentur aus Spandau. Strategie, Content-Produktion und Umsetzung aus einer Hand – mit dem AI-Ready Growth System.",
  phone: {
    display: "0160 / 7534434",
    international: "+49 160 7534434",
    href: "tel:+491607534434",
  },
  email: "info@story-base.de",
  // Adresse des Büros (Kontaktbereich der bisherigen Website)
  office: {
    street: "Pichelsdorfer Straße 129",
    zip: "13595",
    city: "Berlin",
    district: "Spandau",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Pichelsdorfer+Stra%C3%9Fe+129%2C+13595+Berlin",
  },
  // Anschrift laut bisherigem Impressum
  legalAddress: {
    street: "Pichelsdorfer Straße 59",
    zip: "13595",
    city: "Berlin",
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
  { href: "/#about", label: "Über uns" },
  { href: "/#mehrwert", label: "Ihr Mehrwert" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#contact", label: "Kontakt" },
] as const;
