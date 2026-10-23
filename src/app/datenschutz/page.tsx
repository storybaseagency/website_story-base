import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/Consent";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  alternates: { canonical: "/datenschutz/" },
};

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("Datenschutzerklärung", "/datenschutz/")) }}
      />
      <h2>1. Datenschutz auf einen Blick</h2>

      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
        personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
        sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche
        Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
        Datenschutzerklärung.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
      <p>
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
        Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser
        Datenschutzerklärung entnehmen.
      </p>
      <h4>Wie erfassen wir Ihre Daten?</h4>
      <p>
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z. B. wenn Sie uns
        per E-Mail oder Telefon kontaktieren. Andere Daten werden automatisch oder nach Ihrer
        Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem
        technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die
        Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
      </p>
      <h4>Wofür nutzen wir Ihre Daten?</h4>
      <p>
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
        gewährleisten. Andere Daten können – nur mit Ihrer Einwilligung – zur Analyse Ihres
        Nutzerverhaltens verwendet werden.
      </p>
      <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
      <p>
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
        Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die
        Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
        Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft
        widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der
        Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
        Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum
        Thema Datenschutz können Sie sich jederzeit an uns wenden.
      </p>

      <h2>2. Hosting</h2>
      <h3>ALL-INKL.COM</h3>
      <p>
        Wir hosten unsere Website bei ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich,
        Hauptstraße 68, 02742 Friedersdorf (nachfolgend „All-Inkl“). Wenn Sie unsere Website
        besuchen, erfasst All-Inkl verschiedene Logfiles inklusive Ihrer IP-Adresse. Details
        entnehmen Sie der Datenschutzerklärung von All-Inkl:{" "}
        <a href="https://all-inkl.com/datenschutzinformationen/" target="_blank" rel="noopener noreferrer">
          https://all-inkl.com/datenschutzinformationen/
        </a>
        .
      </p>
      <p>
        Die Verwendung von All-Inkl erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben
        ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Mit
        All-Inkl besteht ein Vertrag über Auftragsverarbeitung (AVV) nach Art. 28 DSGVO.
      </p>

      <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
      <h3>Datenschutz</h3>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
        behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
        Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wir weisen darauf hin, dass die
        Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken
        aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
        möglich.
      </p>

      <h3>Hinweis zur verantwortlichen Stelle</h3>
      <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
      <p>
        {site.legalName}
        <br />
        vertreten durch {site.managingDirector}
        <br />
        {site.address.street}
        <br />
        {site.address.zip} {site.address.city}
        <br />
        Telefon: {site.phone.display}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam
        mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B.
        Namen, E-Mail-Adressen o. Ä.) entscheidet.
      </p>

      <h3>Speicherdauer</h3>
      <p>
        Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
        verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung
        entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
        Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
        zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder
        handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach
        Fortfall dieser Gründe.
      </p>

      <h3>Rechtsgrundlagen der Datenverarbeitung</h3>
      <p>
        Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre
        personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit.
        a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im
        Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in
        Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a
        DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr
        Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung
        zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
        Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen
        erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des
        Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen
        Verpflichtung erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die
        Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs.
        1 lit. f DSGVO erfolgen.
      </p>

      <h3>Hinweis zur Datenweitergabe in die USA und sonstige Drittstaaten</h3>
      <p>
        Wir verwenden unter anderem Tools von Unternehmen mit Sitz in den USA oder sonstigen
        datenschutzrechtlich nicht sicheren Drittstaaten. Wenn diese Tools aktiv sind, können Ihre
        personenbezogenen Daten in diese Drittstaaten übertragen und dort verarbeitet werden. Für
        Unternehmen, die nach dem EU-US Data Privacy Framework zertifiziert sind, liegt ein
        Angemessenheitsbeschluss der EU-Kommission vor. In anderen Fällen kann nicht ausgeschlossen
        werden, dass Behörden Ihre Daten zu Überwachungszwecken verarbeiten.
      </p>

      <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
      <p>
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie
        können eine bereits erteilte Einwilligung jederzeit widerrufen – für Cookies z. B. über die{" "}
        <CookieSettingsButton className="cursor-pointer text-accent-deep underline underline-offset-2 hover:text-accent-dark" />
        . Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
        unberührt.
      </p>

      <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
      <p>
        Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben
        Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen
        die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein
        auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf der eine
        Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch
        einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei
        denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre
        Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung,
        Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
      </p>
      <p>
        Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie
        das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener
        Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es
        mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre
        personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet
        (Widerspruch nach Art. 21 Abs. 2 DSGVO).
      </p>

      <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
      <p>
        Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
        Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
        Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
        unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
      </p>

      <h3>Recht auf Datenübertragbarkeit</h3>
      <p>
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
        Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
        maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten
        an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar
        ist.
      </p>

      <h3>Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung</h3>
      <p>
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
        unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
        Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Löschung
        oder Einschränkung der Verarbeitung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
        personenbezogene Daten können Sie sich jederzeit an uns wenden.
      </p>

      <h3>SSL- bzw. TLS-Verschlüsselung</h3>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine
        verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit
        „https://“ beginnt und an dem Schloss-Symbol in Ihrer Browserzeile.
      </p>

      <h2>4. Datenerfassung auf dieser Website</h2>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
        Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und
        Browserversion, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners,
        Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen
        Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1
        lit. f DSGVO; wir haben ein berechtigtes Interesse an der technisch fehlerfreien Darstellung
        und der Optimierung unserer Website.
      </p>

      <h3>Cookies und Einwilligungsverwaltung mit Cookiebot</h3>
      <p>
        Unsere Website nutzt die Consent-Technologie von Cookiebot, um Ihre Einwilligung zur
        Speicherung bestimmter Cookies auf Ihrem Endgerät oder zum Einsatz bestimmter Technologien
        einzuholen und diese datenschutzkonform zu dokumentieren. Anbieter ist die Usercentrics A/S,
        Havnegade 39, 1058 Kopenhagen, Dänemark. Wenn Sie unsere Website betreten, wird eine
        Verbindung zu den Servern des Anbieters hergestellt, um Ihre Einwilligungen und sonstigen
        Erklärungen zur Cookie-Nutzung einzuholen. Anschließend speichert Cookiebot einen Cookie in
        Ihrem Browser, um Ihnen die erteilten Einwilligungen bzw. deren Widerruf zuordnen zu können.
        Der Einsatz erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz von
        Cookies einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. c DSGVO.
      </p>

      <h3>Rückrufformular</h3>
      <p>
        Wenn Sie uns über das Rückrufformular auf unserer Website eine Anfrage senden, verarbeiten wir
        die von Ihnen eingegebenen Daten (Name, Praxis und Fachrichtung, Telefonnummer oder E-Mail-Adresse,
        gewähltes Ziel) ausschließlich, um Sie zu kontaktieren und Ihre Anfrage zu bearbeiten. Die
        Angaben werden per E-Mail an uns übermittelt und nicht in einer Datenbank auf dem Webserver
        gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, da Ihre Anfrage der Anbahnung
        eines Vertrags dient, im Übrigen unser berechtigtes Interesse an der Bearbeitung von Anfragen
        (Art. 6 Abs. 1 lit. f DSGVO). Wir löschen die Daten, sobald Ihre Anfrage abschließend
        bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h3>Anfrage per E-Mail oder Telefon</h3>
      <p>
        Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus
        hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres
        Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre
        Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
        sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
        vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
        auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
        Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h3>Terminbuchung über Calendly</h3>
      <p>
        Für die Vereinbarung von Beratungsgesprächen verlinken wir auf den Dienst Calendly (Calendly
        LLC, 115 E Main St, Ste A1B, Buford, GA 30518, USA). Erst wenn Sie den Link anklicken, werden
        Sie auf die Website von Calendly weitergeleitet; dort gilt die Datenschutzerklärung von
        Calendly:{" "}
        <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">
          https://calendly.com/privacy
        </a>
        . Die von Ihnen bei der Buchung eingegebenen Daten verarbeiten wir zur Durchführung des
        Termins auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
      </p>

      <h2>5. Analyse-Tools</h2>
      <h3>Google Analytics</h3>
      <p>
        Diese Website nutzt – nur mit Ihrer Einwilligung – Funktionen des Webanalysedienstes Google
        Analytics. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
        Irland. Google Analytics ermöglicht es uns, das Verhalten der Websitebesucher zu analysieren.
        Dabei erhalten wir verschiedene Nutzungsdaten, wie z. B. Seitenaufrufe, Verweildauer,
        verwendete Betriebssysteme und Herkunft des Nutzers. Die erfassten Informationen werden in der
        Regel an einen Server von Google in den USA übertragen und dort gespeichert. Google ist nach
        dem EU-US Data Privacy Framework zertifiziert.
      </p>
      <p>
        Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25
        Abs. 1 TDDDG. Die Einwilligung ist jederzeit über die Cookie-Einstellungen widerrufbar.
        Weitere Informationen finden Sie in der Datenschutzerklärung von Google:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          https://policies.google.com/privacy
        </a>
        .
      </p>

      <h2>6. Social Media</h2>
      <p>
        Auf unserer Website verlinken wir auf unsere Profile bei LinkedIn und Instagram. Es handelt
        sich um einfache Links; beim Aufruf unserer Website werden keine Daten an diese Netzwerke
        übertragen. Erst wenn Sie einen Link anklicken, gelangen Sie auf die Seite des jeweiligen
        Anbieters, für die dessen Datenschutzbestimmungen gelten.
      </p>

      <h2>7. Schriftarten</h2>
      <p>
        Die auf dieser Website verwendeten Schriftarten werden lokal von unserem Server ausgeliefert.
        Eine Verbindung zu Servern von Google oder anderen Anbietern findet dabei nicht statt.
      </p>
    </LegalPage>
  );
}
