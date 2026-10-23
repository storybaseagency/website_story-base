"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { ArrowIcon } from "./icons";
import { Button, IconTile } from "./ui";

const goalOptions = ["Privatpatienten", "Fachkräfte", "Beides"];

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "rounded-xl border border-ink-950/14 bg-paper px-4 py-3.5 text-base text-ink-950 placeholder:text-ink-400 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

// Sendet an /kontakt.php (PHP läuft bei All-Inkl). Ohne JavaScript schickt das
// Formular klassisch ab und PHP leitet auf /danke/ weiter.
export function ContactForm() {
  const [goal, setGoal] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.set("ziel", goalOptions[goal]);
    data.set("t", String(Math.round((Date.now() - startedAt) / 1000)));
    try {
      const res = await fetch("/kontakt.php", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex animate-fade-in flex-col gap-4 py-6" role="status">
        <IconTile name="calendar" />
        <h3 className="text-[26px] leading-tight font-extrabold tracking-tight">Danke – wir melden uns.</h3>
        <p className="leading-relaxed text-ink-600">
          Ihre Anfrage ist bei uns angekommen. Wenn es schneller gehen soll, buchen Sie Ihren Praxis-Check direkt
          online.
        </p>
        <div>
          <Button href={site.calendlyUrl} external>
            Termin buchen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form action="/kontakt.php" method="post" onSubmit={onSubmit} className="flex flex-col gap-4">
      <div>
        <h3 className="text-[22px] leading-tight font-extrabold tracking-tight">Lieber zurückgerufen werden?</h3>
        <p className="mt-1.5 text-[15px] leading-normal text-ink-600">
          Vier Felder, und wir melden uns persönlich bei Ihnen.
        </p>
      </div>
      <label className="grid gap-1.5 text-sm font-semibold text-ink-700">
        Ihr Name
        <input required name="name" autoComplete="name" placeholder="Dr. med. Anna Beispiel" className={inputClass} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-ink-700">
        Praxis &amp; Fachrichtung
        <input name="praxis" autoComplete="organization" placeholder="Hautarztpraxis, Berlin" className={inputClass} />
      </label>
      <label className="grid gap-1.5 text-sm font-semibold text-ink-700">
        Telefon oder E-Mail
        <input required name="kontakt" placeholder="So erreichen wir Sie am besten" className={inputClass} />
      </label>
      {/* Honeypot gegen Spam-Bots – für Menschen unsichtbar */}
      <label className="absolute -left-[9999px]" aria-hidden>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-semibold text-ink-700">Ihr Ziel</legend>
        <input type="hidden" name="ziel" value={goalOptions[goal]} />
        <div className="flex flex-wrap gap-2">
          {goalOptions.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={goal === i}
              onClick={() => setGoal(i)}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold text-ink-950 transition duration-150 ${
                goal === i ? "border-accent bg-accent-tint" : "border-ink-950/14 bg-white hover:border-ink-950/28"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-ink-950 shadow-button transition hover:bg-accent-dark disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Wird gesendet …" : "Rückruf anfordern"}
        <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
      </button>
      {status === "error" && (
        <p className="text-sm text-accent-deep" role="alert">
          Das hat leider nicht geklappt. Bitte rufen Sie uns an unter{" "}
          <a href={site.phone.href} className="font-semibold underline">
            {site.phone.display}
          </a>{" "}
          oder schreiben Sie an{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}
      <p className="text-xs leading-normal text-ink-500">
        Ihre Angaben nutzen wir nur für die Kontaktaufnahme. Mehr in der{" "}
        <Link href="/datenschutz/" className="text-accent-deep underline">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
