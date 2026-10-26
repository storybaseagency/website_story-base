// FAQ-Akkordeon auf Basis von <details>: Antworten stehen immer im HTML
// und sind ohne JavaScript für Suchmaschinen und KI-Crawler lesbar.
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-ink-950/14">
      {items.map((f, i) => (
        <details key={f.q} className="faq-item group border-b border-ink-950/14" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left">
            <h3 className="text-lg leading-7 font-bold text-ink-950 sm:text-xl">{f.q}</h3>
            <span
              aria-hidden
              className="faq-icon relative flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-deep"
            >
              <span className="absolute h-0.5 w-3.5 rounded-sm bg-current" />
              <span className="faq-bar-v absolute h-0.5 w-3.5 rotate-90 rounded-sm bg-current" />
            </span>
          </summary>
          <p className="pr-0 pb-6 leading-relaxed text-ink-600 sm:pr-16">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
