import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

// Liegt außerhalb der Routengruppen und bringt deshalb Header und Footer selbst mit
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
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
      </main>
      <Footer />
    </>
  );
}
