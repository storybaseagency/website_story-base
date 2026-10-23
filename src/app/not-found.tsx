import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-accent-deep uppercase">Fehler 404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink-950">Seite nicht gefunden</h1>
      <p className="mt-4 text-ink-600">Diese Seite gibt es leider nicht (mehr).</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-7 py-3.5 font-semibold text-ink-950 shadow-button hover:bg-accent-dark"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
