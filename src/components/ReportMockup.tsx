// Beispielhafte Vorschau des Reports (reines HTML/SVG, keine echten Praxisdaten)

const SCORE = 38;
const rows = [
  { q: "Praxis für Implantate in …", marks: ["2", "–", "1"] },
  { q: "Erfahrener Arzt für …", marks: ["–", "–", "3"] },
  { q: "Beste Praxis für Privatpatienten …", marks: ["–", "4", "–"] },
];

export function ReportMockup() {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <figure className="relative mx-auto w-full max-w-md" aria-label="Beispiel eines KI-Sichtbarkeits-Reports">
      <div className="rounded-3xl border border-ink-950/8 bg-white p-6 shadow-image sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-accent-deep uppercase">KI-Sichtbarkeits-Check</p>
            <p className="mt-1 font-bold text-ink-950">Praxis Dr. Muster, Berlin</p>
          </div>
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink-600">Beispiel</span>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <div className="relative size-32 shrink-0">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
              <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="12" className="text-ink-950/8" />
              <circle
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke="#e0a43a"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - SCORE / 100)}
                className="score-ring"
                style={{ ["--ring-length" as string]: c }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl leading-none font-extrabold text-ink-950">{SCORE}</span>
              <span className="text-xs text-ink-500">von 100</span>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fbf0d9] px-3 py-1 text-xs font-semibold text-[#8a5a00]">
              <span className="size-2 rounded-full bg-[#e0a43a]" />
              Gelb
            </span>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Sie werden genannt, aber nicht zuverlässig.
            </p>
          </div>
        </div>

        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-ink-500">
              <th className="pb-2 font-medium">Patientenfrage</th>
              <th className="pb-2 text-center font-medium">ChatGPT</th>
              <th className="pb-2 text-center font-medium">Perplexity</th>
              <th className="pb-2 text-center font-medium">Gemini</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.q} className="border-t border-ink-950/8">
                <td className="py-2 pr-2 text-ink-700">{row.q}</td>
                {row.marks.map((m, i) => (
                  <td key={i} className="py-2 text-center font-semibold">
                    {m === "–" ? <span className="text-ink-300">–</span> : <span className="text-accent-deep">✓ ({m})</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute -right-2 -bottom-8 w-60 rotate-1 rounded-2xl border border-ink-950/8 bg-white/95 p-4 shadow-card-hover backdrop-blur sm:-right-6">
        <p className="text-xs font-semibold tracking-widest text-accent-deep uppercase">Wer stattdessen empfohlen wird</p>
        <ol className="mt-2 space-y-1.5 text-sm text-ink-700">
          {["Praxis A", "Praxis B", "Praxis C"].map((p, i) => (
            <li key={p} className="flex items-center justify-between gap-3">
              <span>
                {i + 1}. {p}
              </span>
              <span className="text-xs text-ink-500">{[9, 6, 4][i]}× genannt</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
