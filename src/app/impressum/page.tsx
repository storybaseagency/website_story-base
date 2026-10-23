import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum/" },
};

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("Impressum", "/impressum/")) }}
      />
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.zip} {site.address.city}
        <br />
        Deutschland
      </p>

      <h3>Vertreten durch</h3>
      <p>{site.managingDirector} (Geschäftsführer)</p>

      <h3>Kontakt</h3>
      <p>
        Telefon: <a href={site.phone.href}>{site.phone.international}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h3>Registereintrag</h3>
      <p>
        Registergericht: {site.register.court}
        <br />
        Registernummer: {site.register.number}
      </p>

      <h3>Steuernummer</h3>
      <p>{site.taxNumber}</p>

      <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
      <p>
        {site.managingDirector}
        <br />
        Anschrift wie oben
      </p>

      <h3>Haftung für Links</h3>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
        externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
        verantwortlich.
      </p>

      <h3>Verbraucherstreitbeilegung</h3>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalPage>
  );
}
