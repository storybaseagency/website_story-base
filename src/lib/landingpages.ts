// Inhalte der Leistungs-Unterseiten. Jede Seite wird über src/components/LandingPage.tsx
// gerendert; strukturierte Daten, Sitemap und llms.txt lesen ebenfalls von hier.

import type { IconName } from "./content";

export type LandingPageData = {
  slug: string;
  navLabel: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  lead: string;
  answer: { question: string; text: string };
  intro: { title: string; paragraphs: string[] };
  points: { eyebrow: string; title: string; subtitle: string; items: { icon: IconName; title: string; text: string }[] };
  process: { title: string; subtitle: string; steps: { title: string; text: string; time: string }[] };
  deliverables: { title: string; items: string[] };
  rules: { title: string; paragraphs: string[] };
  faq: { q: string; a: string }[];
  ctaTitle: string;
};

export const landingPages: LandingPageData[] = [
  {
    slug: "privatpatienten-gewinnen",
    navLabel: "Privatpatienten gewinnen",
    serviceName: "Marketing zur Gewinnung von Privatpatienten und Selbstzahlern",
    metaTitle: "Privatpatienten gewinnen: Marketing für Praxen | Story Base",
    metaDescription:
      "Mehr Privatpatienten und Selbstzahler für Ihre Praxis: Erklärvideos, Social Media und Ads in Ihrem Einzugsgebiet – HWG-konform geplant. Praxis-Check in 30 Minuten.",
    eyebrow: "Patientengewinnung",
    h1: "Privatpatienten und Selbstzahler gewinnen –",
    h1Accent: "mit Videos und gezielten Ads",
    lead: "Ihre Privat- und IGeL-Leistungen sind gut. Wir sorgen dafür, dass genau die Menschen davon erfahren, die dafür bereit sind – in Ihrem Einzugsgebiet, verständlich erklärt und rechtlich sauber.",
    answer: {
      question: "Wie gewinnt eine Arztpraxis mehr Privatpatienten?",
      text: "Privatpatienten und Selbstzahler entscheiden sich für die Praxis, der sie schon vor dem ersten Termin vertrauen. Am wirksamsten ist deshalb eine Kombination aus Erklärvideos zu Ihren Leistungen, einem klaren Profil in Social Media und gezielten Anzeigen in Ihrem Einzugsgebiet, die Interessierte direkt zur Terminbuchung führen.",
    },
    intro: {
      title: "Warum gute Leistungen allein nicht reichen",
      paragraphs: [
        "Viele Praxen bieten Leistungen an, die Patienten selbst bezahlen würden – von ästhetischen Behandlungen über Vorsorgeuntersuchungen bis zu hochwertiger Zahnmedizin. Doch die Entscheidung dafür fällt heute selten im Wartezimmer. Sie fällt vorher: bei der Suche auf Google, beim Scrollen durch Instagram oder bei der Frage an einen KI-Assistenten.",
        "Wer dort nicht sichtbar ist oder nur eine Leistungsliste zeigt, verliert gegen die Praxis mit dem überzeugenderen Auftritt – auch wenn die eigene Behandlung besser ist. Selbstzahler wägen besonders sorgfältig ab, denn sie investieren eigenes Geld. Sie wollen verstehen, was sie erwartet, und sie wollen wissen, wer sie behandelt.",
        "Genau hier setzt Video an: Ein kurzes Erklärvideo, in dem Sie eine Leistung sachlich erläutern, beantwortet die wichtigsten Fragen und zeigt gleichzeitig Sie als Ärztin oder Arzt. Über gezielte Ads erreicht dieses Video Menschen in Ihrer Umgebung, die sich bereits für das Thema interessieren.",
      ],
    },
    points: {
      eyebrow: "Unser Ansatz",
      title: "Drei Hebel für mehr Selbstzahler",
      subtitle: "Wir verbinden Inhalte, Reichweite und einen einfachen Weg zum Termin – damit aus Interesse eine Buchung wird.",
      items: [
        {
          icon: "target",
          title: "Leistungen verständlich erklären",
          text: "Erklärvideos und Beiträge zu Ihren Privat- und IGeL-Leistungen: Was ist das, für wen eignet es sich, wie läuft es ab? Sachlich, ohne Heilversprechen – und genau deshalb glaubwürdig.",
        },
        {
          icon: "pin",
          title: "Gezielt im Einzugsgebiet werben",
          text: "Meta- und Google-Ads mit Ihren Videos, ausgespielt an Menschen in dem Umkreis, aus dem Ihre Patienten realistisch kommen. Kein Streuverlust in ganz Deutschland.",
        },
        {
          icon: "calendar",
          title: "Direkt zum Termin führen",
          text: "Eine passende Landingpage pro Leistung und ein kurzer Weg zur Terminbuchung oder zum Rückruf. Anfragen landen gebündelt bei Ihrem Praxisteam.",
        },
      ],
    },
    process: {
      title: "So gehen wir vor",
      subtitle: "Sie behalten den Überblick und investieren nur so viel Zeit, wie wirklich nötig ist.",
      steps: [
        {
          title: "Leistungen und Zielgruppe klären",
          text: "Im Praxis-Check besprechen wir, welche Selbstzahlerleistungen Ihre Praxis voranbringen und welche Patienten Sie dafür erreichen wollen.",
          time: "30 Minuten",
        },
        {
          title: "Botschaften und Drehplan",
          text: "Wir entwickeln Themen und Skripte für Ihre Erklärvideos und planen die Kampagnen – HWG-konform von Anfang an. Sie geben frei.",
          time: "eine Freigabe",
        },
        {
          title: "Dreh, Kampagne, Optimierung",
          text: "Wir drehen in Ihrer Praxis oder in unserem Studio, schalten die Ads und werten monatlich aus, welche Leistung wie viele Anfragen bringt.",
          time: "ein halber Drehtag pro Quartal",
        },
      ],
    },
    deliverables: {
      title: "Was Sie von uns bekommen",
      items: [
        "Positionierung Ihrer Selbstzahlerleistungen und klare Kernbotschaften",
        "Erklärvideos zu ausgewählten Leistungen, geschnitten für Website, Instagram, Facebook und Ads",
        "Social-Media-Beiträge, die Ihre Expertise regelmäßig zeigen",
        "Meta- und Google-Kampagnen in Ihrem Einzugsgebiet",
        "Landingpages je Leistung mit direktem Weg zur Terminbuchung",
        "Monatlicher Report: Reichweite, Anfragen und Kosten je Leistung",
      ],
    },
    rules: {
      title: "Werben für Selbstzahlerleistungen – aber rechtssicher",
      paragraphs: [
        "Ärztliche Werbung ist in Deutschland durch die Berufsordnungen der Landesärztekammern und das Heilmittelwerbegesetz (HWG) geregelt. Sachliche Information über Ihre Leistungen ist erlaubt; anpreisende, irreführende oder vergleichende Werbung ist es nicht. Heilversprechen sind tabu, und für operative plastisch-chirurgische Eingriffe ohne medizinische Notwendigkeit dürfen keine Vorher-nachher-Bilder gezeigt werden.",
        "Wir planen alle Inhalte von Anfang an innerhalb dieser Grenzen: Wir erklären, statt zu versprechen, und zeigen Sie und Ihr Team statt austauschbarer Werbebilder. Bei Grenzfällen empfehlen wir eine kurze Prüfung durch eine Fachanwältin oder einen Fachanwalt für Medizinrecht – unsere Inhalte ersetzen keine Rechtsberatung.",
      ],
    },
    faq: [
      {
        q: "Wie erreiche ich Privatversicherte und Selbstzahler online?",
        a: "Privatversicherte und Selbstzahler erreichen Sie am besten über Inhalte, die ihre Fragen beantworten, und über Anzeigen in Ihrem Einzugsgebiet. Erklärvideos zu Ihren Leistungen schaffen Vertrauen; Meta- und Google-Ads sorgen dafür, dass genau die Menschen sie sehen, die sich bereits für das Thema interessieren.",
      },
      {
        q: "Darf ich IGeL-Leistungen bewerben?",
        a: "Ja, über IGeL-Leistungen dürfen Sie sachlich informieren. Nicht erlaubt sind nach Berufsordnung und Heilmittelwerbegesetz unter anderem anpreisende oder irreführende Aussagen und Heilversprechen. Wir gestalten Ihre Inhalte informativ und zurückhaltend – das wirkt bei Selbstzahlern ohnehin glaubwürdiger.",
      },
      {
        q: "Lohnen sich Google Ads für Selbstzahlerleistungen?",
        a: "Google Ads lohnen sich vor allem für Leistungen, nach denen Menschen aktiv suchen. Für Leistungen, die erst erklärt werden müssen, wirken Videos über Instagram und Facebook oft besser. Welche Mischung für Ihre Praxis sinnvoll ist, klären wir im Praxis-Check anhand Ihrer Leistungen und Ihres Standorts.",
      },
      {
        q: "Wie viel Zeit kostet mich das als Ärztin oder Arzt?",
        a: "In der Regel ein Gespräch von 30 Minuten zum Start, eine Freigabe der Themen und einen halben Drehtag pro Quartal. Planung, Schnitt, Kampagnen und Auswertung übernehmen wir.",
      },
      {
        q: "Wann kommen die ersten Anfragen?",
        a: "Anzeigen können schon wenige Wochen nach dem Dreh erste Anfragen bringen. Wie schnell und wie viele, hängt von Leistung, Standort und Budget ab. Im Praxis-Check geben wir Ihnen eine ehrliche Einschätzung – ohne Versprechen, die wir nicht halten können.",
      },
    ],
    ctaTitle: "Mehr Selbstzahler für Ihre Praxis?",
  },
  {
    slug: "fachkraefte-arztpraxis",
    navLabel: "Fachkräfte & MFA finden",
    serviceName: "Recruiting-Videos und Kampagnen für Arztpraxen",
    metaTitle: "MFA finden: Recruiting für Arztpraxen | Story Base",
    metaDescription:
      "Offene MFA- und Arztstellen besetzen: Recruiting-Videos mit Ihrem echten Team, Kampagnen auf Instagram, Facebook und TikTok und eine Bewerbung in unter zwei Minuten.",
    eyebrow: "Recruiting",
    h1: "MFA und Fachkräfte für Ihre Praxis finden –",
    h1Accent: "mit Ihrem echten Team im Video",
    lead: "Gute Medizinische Fachangestellte wechseln dorthin, wo sie das Team schon vorher kennenlernen. Wir zeigen, warum es sich lohnt, genau bei Ihnen zu arbeiten – und bringen die Stelle zu den Menschen, die nicht aktiv suchen.",
    answer: {
      question: "Wie findet eine Arztpraxis MFA und Fachkräfte?",
      text: "Arztpraxen finden MFA und Fachkräfte heute vor allem über Social Media statt über klassische Stellenportale. Wirksam sind kurze Recruiting-Videos mit dem echten Praxisteam, gezielte Anzeigen auf Instagram, Facebook und TikTok in der Region und eine Bewerbung, die nur wenige Minuten dauert.",
    },
    intro: {
      title: "Warum Stellenanzeigen allein nicht mehr funktionieren",
      paragraphs: [
        "Der Fachkräftemangel trifft Arztpraxen besonders: Medizinische Fachangestellte werden überall gesucht, und wer gut ist, hat die Wahl. Viele von ihnen schauen gar nicht aktiv in Stellenportale – sie sind grundsätzlich zufrieden, aber offen für einen Wechsel, wenn das Angebot passt.",
        "Diese Menschen erreichen Sie dort, wo sie ohnehin unterwegs sind: auf Instagram, Facebook und TikTok. Eine Stellenanzeige als Textblock geht dort unter. Was funktioniert, ist ein ehrlicher Einblick: Wie ist das Team? Wie sieht ein normaler Tag aus? Was ist bei Ihnen anders als in der Praxis nebenan?",
        "Recruiting-Videos mit Ihrem echten Team beantworten genau diese Fragen. Kombiniert mit regional ausgespielten Anzeigen und einer Bewerbung ohne Anschreiben senken Sie die Hürde für einen Wechsel deutlich.",
      ],
    },
    points: {
      eyebrow: "Unser Ansatz",
      title: "So wird Ihre Praxis zum Wunscharbeitgeber",
      subtitle: "Arbeitgebermarke, Reichweite und ein einfacher Bewerbungsweg – aus einer Hand.",
      items: [
        {
          icon: "rocket",
          title: "Recruiting-Videos mit Ihrem Team",
          text: "Kolleginnen und Kollegen erzählen selbst, was die Arbeit bei Ihnen ausmacht. Authentisch statt Hochglanz – denn Bewerberinnen merken sofort, ob ein Video echt ist.",
        },
        {
          icon: "target",
          title: "Kampagnen in Ihrer Region",
          text: "Wir spielen die Videos auf Instagram, Facebook und TikTok gezielt an Fachkräfte im Umkreis Ihrer Praxis aus – auch an diejenigen, die gerade nicht aktiv suchen.",
        },
        {
          icon: "clock",
          title: "Bewerbung in unter zwei Minuten",
          text: "Ein kurzes Formular statt Anschreiben und Lebenslauf. Bewerbungen landen direkt bei Ihnen, und Sie melden sich zeitnah zurück.",
        },
      ],
    },
    process: {
      title: "So gehen wir vor",
      subtitle: "Ihr Praxisbetrieb läuft weiter – der Dreh passt in einen halben Tag.",
      steps: [
        {
          title: "Stellen und Stärken klären",
          text: "Im Praxis-Check besprechen wir, welche Stellen offen sind und was Ihre Praxis als Arbeitgeber auszeichnet.",
          time: "30 Minuten",
        },
        {
          title: "Konzept und Drehplan",
          text: "Wir planen Fragen, Szenen und Ansprechpartner aus Ihrem Team und bereiten Anzeigen und Bewerbungsformular vor. Sie geben frei.",
          time: "eine Freigabe",
        },
        {
          title: "Dreh, Kampagne, Bewerbungen",
          text: "Wir drehen in Ihrer Praxis, starten die Kampagne und optimieren laufend. Sie erhalten die Bewerbungen und führen die Gespräche.",
          time: "ein halber Drehtag",
        },
      ],
    },
    deliverables: {
      title: "Was Sie von uns bekommen",
      items: [
        "Klares Arbeitgeberprofil: Was macht Ihre Praxis als Arbeitsplatz aus?",
        "Recruiting-Videos mit Ihrem Team, geschnitten für Instagram, Facebook, TikTok und Ihre Website",
        "Regional ausgespielte Kampagnen für Ihre offenen Stellen",
        "Bewerbungsformular ohne Anschreiben, das Bewerbungen direkt an Sie weiterleitet",
        "Laufende Optimierung und monatlicher Überblick über Reichweite und Bewerbungen",
        "Die Videos gehören Ihnen und bleiben für künftige Stellen nutzbar",
      ],
    },
    rules: {
      title: "Fair und rechtlich sauber ausschreiben",
      paragraphs: [
        "Auch für Stellenanzeigen gelten Regeln: Ausschreibungen müssen nach dem Allgemeinen Gleichbehandlungsgesetz (AGG) neutral formuliert sein, etwa geschlechtsneutral oder ohne Altersvorgaben. Wir formulieren Anzeigen und Videotexte entsprechend.",
        "Für Mitarbeitende, die im Video zu sehen sind, holen wir vorab eine schriftliche Einwilligung ein. Patientinnen und Patienten zeigen wir in Recruiting-Videos grundsätzlich nicht – es geht um Ihr Team und den Arbeitsalltag.",
      ],
    },
    faq: [
      {
        q: "Welche Plattform eignet sich, um MFA zu finden?",
        a: "Für MFA eignen sich vor allem Instagram und Facebook, für jüngere Zielgruppen und Auszubildende zunehmend auch TikTok. Entscheidend ist weniger die einzelne Plattform als ein authentisches Video und eine regionale Ausspielung. Wir empfehlen die Mischung passend zu Ihrer Stelle und Ihrem Standort.",
      },
      {
        q: "Wie schnell kommen Bewerbungen?",
        a: "Sobald die Kampagne läuft, können die ersten Bewerbungen innerhalb weniger Wochen eingehen. Wie viele es werden, hängt von Stelle, Region und Budget ab. Im Praxis-Check geben wir Ihnen eine realistische Einschätzung.",
      },
      {
        q: "Müssen meine Mitarbeitenden vor die Kamera?",
        a: "Nur wer möchte. Meist finden sich ein oder zwei Kolleginnen oder Kollegen, die gern erzählen; wir bereiten sie vor und nehmen ihnen die Nervosität. Alle Mitwirkenden geben vorab schriftlich ihr Einverständnis.",
      },
      {
        q: "Können wir die Videos später erneut nutzen?",
        a: "Ja. Die Videos gehören Ihnen und eignen sich auch für Ihre Karriereseite, für künftige Stellen oder für Social Media. Die genauen Nutzungsrechte halten wir im Vertrag fest.",
      },
      {
        q: "Funktioniert das auch für Arztstellen oder Auszubildende?",
        a: "Ja. Das Vorgehen ist dasselbe, nur Botschaften und Ausspielung ändern sich: Ärztinnen und Ärzte interessieren sich eher für Fachrichtung, Arbeitsmodell und Team, Auszubildende für Einstieg, Betreuung und Atmosphäre.",
      },
    ],
    ctaTitle: "Offene Stellen in Ihrer Praxis?",
  },
  {
    slug: "videomarketing-arztpraxis",
    navLabel: "Videomarketing",
    serviceName: "Videoproduktion und Videomarketing für Arztpraxen",
    metaTitle: "Videomarketing für Arztpraxen | Praxisvideos | Story Base",
    metaDescription:
      "Praxisvideos, die Vertrauen schaffen: Arzt-Erklärvideos, Praxis-Rundgang und Team-Porträts – gedreht in Ihrer Praxis oder in unserem Studio in Berlin-Spandau.",
    eyebrow: "Videomarketing",
    h1: "Videomarketing für Arztpraxen:",
    h1Accent: "Vertrauen, bevor der erste Termin stattfindet",
    lead: "Patienten und Bewerber wollen wissen, wer sie erwartet. Mit Praxisvideos lernen sie Sie kennen, bevor sie Ihre Praxis betreten – gedreht an einem Tag, bei Ihnen vor Ort oder in unserem eigenen Studio.",
    answer: {
      question: "Was bringt Videomarketing einer Arztpraxis?",
      text: "Videomarketing zeigt Ärztin oder Arzt, Team und Praxis, bevor Patienten oder Bewerber zum ersten Mal kommen. Das baut Vertrauen auf, beantwortet häufige Fragen vorab und hebt die Praxis von Wettbewerbern ab. Ausgespielt über Website, Social Media und Anzeigen erreichen Praxisvideos gezielt neue Patienten und Fachkräfte.",
    },
    intro: {
      title: "Warum Video für Praxen so gut funktioniert",
      paragraphs: [
        "Die Wahl einer Ärztin oder eines Arztes ist eine Vertrauensfrage. Fotos und Texte können Leistungen beschreiben – aber erst im Video sehen Menschen, wie Sie sprechen, wie Sie erklären und wie Ihr Team miteinander umgeht. Diese Eindrücke entscheiden oft darüber, wo jemand einen Termin bucht.",
        "Gleichzeitig ist Video das Format, das auf Instagram, Facebook, TikTok und YouTube die meiste Aufmerksamkeit bekommt. Ein gut gemachtes Praxisvideo lässt sich mehrfach nutzen: auf der Website, in Social Media, in Anzeigen und sogar im Wartezimmer.",
        "Der größte Einwand ist meist die Zeit. Deshalb planen wir jeden Dreh so vor, dass er in einen halben Tag passt – mit Drehplan, vorbereiteten Fragen und einem Team, das weiß, wie Praxisalltag funktioniert.",
      ],
    },
    points: {
      eyebrow: "Formate",
      title: "Praxisvideos, die wir produzieren",
      subtitle: "Vom kurzen Clip für Social Media bis zum Imagefilm – immer passend zu Ihrem Ziel.",
      items: [
        {
          icon: "target",
          title: "Arzt-Erklärvideos",
          text: "Sie erklären eine Leistung, eine Untersuchung oder ein häufiges Beschwerdebild – sachlich, verständlich und in Ihren eigenen Worten.",
        },
        {
          icon: "pin",
          title: "Praxis-Rundgang & Imagefilm",
          text: "Ein Blick in Ihre Räume und Abläufe nimmt neuen Patienten die Unsicherheit vor dem ersten Besuch.",
        },
        {
          icon: "rocket",
          title: "Team-Porträts & Recruiting-Clips",
          text: "Ihr Team stellt sich vor – für Patienten, die wissen wollen, wer sie betreut, und für Fachkräfte, die einen neuen Arbeitsplatz suchen.",
        },
      ],
    },
    process: {
      title: "Vom Drehplan zum fertigen Video",
      subtitle: "Gut vorbereitet, an einem Tag gedreht, für jede Plattform geschnitten.",
      steps: [
        {
          title: "Ziele und Themen",
          text: "Im Praxis-Check klären wir, wen Ihre Videos erreichen sollen und welche Themen dafür am wichtigsten sind.",
          time: "30 Minuten",
        },
        {
          title: "Drehplan und Vorbereitung",
          text: "Wir schreiben Fragen und Abläufe, planen Szenen und Drehort – in Ihrer Praxis oder in unserem Studio in Berlin-Spandau. Sie geben frei.",
          time: "eine Freigabe",
        },
        {
          title: "Dreh, Schnitt, Ausspielung",
          text: "Wir drehen, schneiden für Website, Social Media und Ads und veröffentlichen auf Wunsch direkt – inklusive Untertiteln.",
          time: "ein halber Drehtag pro Quartal",
        },
      ],
    },
    deliverables: {
      title: "Was Sie von uns bekommen",
      items: [
        "Konzept, Themen und Drehplan für Ihre Videos",
        "Dreh in Ihrer Praxis oder in unserem Video- und Podcast-Studio in Berlin-Spandau",
        "Schnitt in allen nötigen Formaten: quer für Website und YouTube, hoch für Reels, Stories und TikTok",
        "Untertitel – wichtig, weil viele Videos ohne Ton angesehen werden",
        "Auf Wunsch Veröffentlichung, Social-Media-Betreuung und Anzeigen",
        "Die fertigen Videos zur Nutzung auf allen Kanälen",
      ],
    },
    rules: {
      title: "Was in Praxisvideos erlaubt ist",
      paragraphs: [
        "Auch Videos unterliegen der ärztlichen Berufsordnung und dem Heilmittelwerbegesetz: Sachliche Information ist erlaubt, Heilversprechen und irreführende Darstellungen sind es nicht. Für operative plastisch-chirurgische Eingriffe ohne medizinische Notwendigkeit sind Vorher-nachher-Darstellungen nicht zulässig.",
        "Sollen Patientinnen oder Patienten im Video erscheinen, braucht es ihre ausdrückliche schriftliche Einwilligung, und die ärztliche Schweigepflicht muss gewahrt bleiben. Wir planen Drehs so, dass niemand ungewollt im Bild ist, und empfehlen bei Grenzfällen eine kurze medizinrechtliche Prüfung.",
      ],
    },
    faq: [
      {
        q: "Wie lang sollte ein Praxisvideo sein?",
        a: "Für Social Media und Anzeigen funktionieren meist 15 bis 60 Sekunden am besten, für Erklärvideos auf der Website auch zwei bis drei Minuten. Wir schneiden aus einem Dreh mehrere Längen, sodass jede Plattform die passende Version bekommt.",
      },
      {
        q: "Dürfen Patienten im Video vorkommen?",
        a: "Ja, aber nur mit ausdrücklicher, schriftlicher Einwilligung und unter Wahrung der Schweigepflicht. Häufig ist es einfacher und genauso wirksam, Ärztin, Arzt und Team zu zeigen und Abläufe nachzustellen.",
      },
      {
        q: "Wem gehören die Videos?",
        a: "Die Videos gehören Ihnen. Sie erhalten die fertigen Dateien zur Nutzung auf Ihrer Website, in Social Media, in Anzeigen und in der Praxis. Die genauen Nutzungsrechte halten wir im Vertrag fest.",
      },
      {
        q: "Drehen Sie in unserer Praxis oder im Studio?",
        a: "Beides ist möglich. In Ihrer Praxis wirken Rundgänge und Team-Szenen am authentischsten; Erklärvideos und Interviews lassen sich auch in unserem Studio in Berlin-Spandau drehen. Praxen außerhalb Berlins besuchen wir für den Dreh vor Ort.",
      },
      {
        q: "Ich bin nicht gern vor der Kamera – geht das trotzdem?",
        a: "Ja, das geht den meisten Ärztinnen und Ärzten so. Wir bereiten Fragen vor, drehen im Gesprächsformat statt mit auswendig gelernten Texten und nehmen uns Zeit. Nach den ersten Minuten fühlt es sich für die meisten ganz normal an.",
      },
    ],
    ctaTitle: "Bereit für Ihr erstes Praxisvideo?",
  },
];

export function getLandingPage(slug: string) {
  const page = landingPages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unbekannte Unterseite: ${slug}`);
  return page;
}
