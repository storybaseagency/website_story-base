import { blocks, faq, fields, profile } from "@/lib/content";
import { landingPages } from "@/lib/landingpages";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt: kompakte Beschreibung für KI-Assistenten (https://llmstxt.org)
export function GET() {
  const text = `# ${site.name}

> ${site.positioning}

${profile.map((p) => `- ${p.term}: ${p.detail}`).join("\n")}
- Telefon: ${site.phone.international}
- E-Mail: ${site.email}
- Website: ${site.url}/

## AI-Ready Growth System – die fünf Bausteine

${blocks.map((b, i) => `${i + 1}. **${b.title}** – ${b.tun} Aufwand für die Praxis: ${b.aufwand}.`).join("\n")}

## Fachrichtungen

${fields.join(", ")}

## Häufige Fragen

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Wichtige Seiten

- [Startseite: Marketing für Arztpraxen](${site.url}/)
${landingPages.map((p) => `- [${p.navLabel}](${site.url}/${p.slug}/): ${p.answer.text}`).join("\n")}
- [Praxis-Check buchen (30 Minuten)](${site.calendlyUrl})
- [Impressum](${site.url}/impressum/)
- [Datenschutz](${site.url}/datenschutz/)
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
