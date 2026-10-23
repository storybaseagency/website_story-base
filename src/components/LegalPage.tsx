import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight break-words hyphens-auto text-ink-950 sm:text-5xl">{title}</h1>
      <div className="legal mt-8">{children}</div>
    </div>
  );
}
