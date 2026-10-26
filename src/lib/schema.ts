// Schema.org-Daten (JSON-LD) als verknüpfter @graph – Grundlage dafür, dass
// Google und KI-Assistenten die Agentur als eindeutige Entität erkennen.

import { blocks, faq, fields } from "./content";
import type { LandingPageData } from "./landingpages";
import { site } from "./site";

const id = (frag: string) => `${site.url}/#${frag}`;

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  postalCode: site.address.zip,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": id("organization"),
        name: site.name,
        alternateName: site.shortName,
        legalName: site.legalName,
        slogan: "AI-Ready Growth System",
        description: site.positioning,
        url: `${site.url}/`,
        logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png`, width: 350, height: 350 },
        image: `${site.url}/images/studio-story-base-berlin-spandau.webp`,
        telephone: site.phone.international,
        email: site.email,
        address,
        hasMap: site.address.mapsUrl,
        areaServed: [
          { "@type": "Country", name: "Deutschland" },
          { "@type": "City", name: "Berlin" },
        ],
        knowsAbout: [
          "Praxismarketing",
          "Marketing für Arztpraxen",
          "Videomarketing für Arztpraxen",
          "Privatpatienten gewinnen",
          "Recruiting für Arztpraxen",
          "MFA finden",
          "Social Media für Ärzte",
          "Google Ads für Ärzte",
          "Meta Ads",
          "Heilmittelwerbegesetz",
          "Generative Engine Optimization",
        ],
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Privat- und Selbstzahlerpraxen",
          name: fields.join(", "),
        },
        employee: { "@id": id("jan-bruchwalski") },
        sameAs: [site.social.linkedin, site.social.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Beratung",
          telephone: site.phone.international,
          email: site.email,
          availableLanguage: "de",
          areaServed: "DE",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI-Ready Growth System",
          itemListElement: blocks.map((b) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": id(`service-${b.id}`),
              name: b.title,
              description: `${b.tun} ${b.nutzen}`,
              serviceType: "Praxismarketing",
              provider: { "@id": id("organization") },
              areaServed: { "@type": "Country", name: "Deutschland" },
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": id("jan-bruchwalski"),
        name: site.managingDirector,
        jobTitle: "Geschäftsführer",
        image: `${site.url}/images/jan-bruchwalski-praxismarketing-berlin.webp`,
        worksFor: { "@id": id("organization") },
        knowsAbout: ["Praxismarketing", "Videomarketing", "Social Media", "Performance-Marketing"],
      },
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: `${site.url}/`,
        name: site.name,
        inLanguage: "de-DE",
        publisher: { "@id": id("organization") },
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: `${site.url}/`,
        name: site.title,
        description: site.description,
        inLanguage: "de-DE",
        isPartOf: { "@id": id("website") },
        about: { "@id": id("organization") },
        primaryImageOfPage: `${site.url}/images/og.jpg`,
        mainEntity: { "@id": id("faq") },
      },
      {
        "@type": "FAQPage",
        "@id": id("faq"),
        inLanguage: "de-DE",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

export function landingSchema(page: LandingPageData) {
  const url = `${site.url}/${page.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.metaTitle,
        description: page.metaDescription,
        inLanguage: "de-DE",
        isPartOf: { "@id": id("website") },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#faq` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.serviceName,
        description: page.answer.text,
        serviceType: "Praxismarketing",
        provider: { "@id": id("organization") },
        areaServed: { "@type": "Country", name: "Deutschland" },
        audience: { "@type": "BusinessAudience", audienceType: "Arztpraxen" },
        url,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "de-DE",
        mainEntity: [page.answer, ...page.faq.map((f) => ({ question: f.q, text: f.a }))].map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.text },
        })),
      },
      { ...breadcrumbSchema(page.navLabel, `/${page.slug}/`), "@context": undefined, "@id": `${url}#breadcrumb` },
    ],
  };
}
