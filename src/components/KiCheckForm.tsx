"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { KI_CHECK_STORAGE_KEY, kiCheckFachrichtungen, kiCheckZiele } from "@/lib/kicheck";
import { site } from "@/lib/site";
import { track } from "@/lib/track";
import { ArrowIcon } from "./icons";

const TRACKING_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid"] as const;

type Values = Record<string, string>;
type Status = "idle" | "sending" | "error";

const inputClass =
  "w-full rounded-xl border bg-paper px-4 py-3.5 text-base text-ink-950 placeholder:text-ink-400 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent";

/** Ergänzt https:// und prüft grob, ob es wie eine Domain aussieht. */
export function normalizeWebsite(raw: string) {
  const v = raw.trim();
  if (!v) return "";
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const url = new URL(withScheme);
    return url.hostname.includes(".") ? url.toString().replace(/\/$/, "") : "";
  } catch {
    return "";
  }
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function validateStep1(v: Values) {
  const e: Values = {};
  if (!v.praxisname?.trim()) e.praxisname = "Bitte geben Sie den Namen Ihrer Praxis an.";
  if (!v.fachrichtung) e.fachrichtung = "Bitte wählen Sie Ihre Fachrichtung.";
  if (!v.stadt?.trim()) e.stadt = "Bitte geben Sie Ort oder Stadtteil an.";
  if (!v.leistung?.trim()) e.leistung = "Bitte nennen Sie Ihre wichtigste Selbstzahlerleistung.";
  if (!normalizeWebsite(v.website ?? "")) e.website = "Bitte geben Sie eine gültige Website an, z. B. praxis-muster.de.";
  return e;
}

function validateStep2(v: Values) {
  const e: Values = {};
  if (!v.vorname?.trim()) e.vorname = "Bitte geben Sie Ihren Vornamen an.";
  if (!v.nachname?.trim()) e.nachname = "Bitte geben Sie Ihren Nachnamen an.";
  if (!isEmail(v.email ?? "")) e.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  if (!v.ziel) e.ziel = "Bitte wählen Sie Ihr Ziel.";
  if (v.datenschutz !== "1") e.datenschutz = "Bitte bestätigen Sie, dass Sie die Datenschutzerklärung gelesen haben.";
  return e;
}

export function KiCheckForm({
  id = "ki-check-form",
  defaultFachrichtung,
  leistungPlaceholder = "z. B. Implantate, Faltenbehandlung, Lasik",
  variant,
  defaultStadt,
}: {
  id?: string;
  defaultStadt?: string;
  defaultFachrichtung?: string;
  leistungPlaceholder?: string;
  variant?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Values>({
    ...(defaultFachrichtung && { fachrichtung: defaultFachrichtung }),
    ...(defaultStadt && { stadt: defaultStadt }),
  });
  const [errors, setErrors] = useState<Values>({});
  const [status, setStatus] = useState<Status>("idle");
  const [hidden, setHidden] = useState<Values>({});
  const [startedAt] = useState(() => Date.now());
  const started = useRef(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);

  // UTM-Parameter, Referrer und Variante aus der Einstiegs-URL übernehmen
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const h: Values = { referrer: document.referrer, landing_variant: params.get("variant") ?? variant ?? "a" };
    for (const key of TRACKING_PARAMS) h[key] = params.get(key) ?? "";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Werte existieren erst im Browser
    setHidden(h);
  }, [variant]);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name])
      setErrors((e) => {
        const next = { ...e };
        delete next[name];
        return next;
      });
  };

  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    track("ki_check_form_start");
  };

  const goToStep2 = () => {
    const e = validateStep1(values);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStep(2);
    track("ki_check_step2");
    requestAnimationFrame(() => stepHeading.current?.focus());
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (step === 1) return goToStep2();
    const e = validateStep2(values);
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    const data = new FormData(ev.currentTarget);
    for (const [k, v] of Object.entries(values)) data.set(k, v);
    data.set("website", normalizeWebsite(values.website ?? ""));
    data.set("t", String(Math.round((Date.now() - startedAt) / 1000)));
    try {
      const res = await fetch("/ki-check.php", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Values };
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        setStatus("error");
        return;
      }
      try {
        sessionStorage.setItem(KI_CHECK_STORAGE_KEY, JSON.stringify({ vorname: values.vorname, email: values.email }));
      } catch {
        // Ohne sessionStorage zeigt die Danke-Seite einen neutralen Text
      }
      track("ki_check_lead", { fachrichtung: values.fachrichtung, ziel: values.ziel });
      router.push("/ki-check/danke/");
    } catch {
      setStatus("error");
    }
  };

  const err = (name: string) => errors[name];

  return (
    <form
      id={id}
      action="/ki-check.php"
      method="post"
      noValidate
      onSubmit={onSubmit}
      onFocus={onFirstFocus}
      className="rounded-3xl border border-ink-950/8 bg-white p-6 shadow-card-hover sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-widest text-accent-deep uppercase">Schritt {step} von 2</p>
        <div aria-hidden className="flex gap-1.5">
          <span className="h-1.5 w-8 rounded-full bg-accent" />
          <span className={`h-1.5 w-8 rounded-full transition-colors ${step === 2 ? "bg-accent" : "bg-ink-950/10"}`} />
        </div>
      </div>

      {/* Versteckte Felder: Herkunft der Anfrage */}
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      {/* Honeypot gegen Spam-Bots – für Menschen unsichtbar */}
      <label className="absolute -left-[9999px]" aria-hidden>
        Firma
        <input name="firma_url" tabIndex={-1} autoComplete="off" />
      </label>

      {step === 1 ? (
        <fieldset className="mt-4 grid gap-4">
          <legend className="mb-1 text-[22px] leading-tight font-extrabold tracking-tight text-ink-950">Ihre Praxis</legend>
          <Field label="Name der Praxis" name="praxisname" error={err("praxisname")}>
            <input
              id="praxisname"
              name="praxisname"
              autoComplete="organization"
              placeholder="Praxis Dr. Muster"
              value={values.praxisname ?? ""}
              onChange={(e) => set("praxisname", e.target.value)}
              aria-invalid={!!err("praxisname")}
              aria-describedby={err("praxisname") ? "praxisname-error" : undefined}
              className={`${inputClass} ${err("praxisname") ? "border-accent-deep" : "border-ink-950/14"}`}
            />
          </Field>
          <Field label="Fachrichtung" name="fachrichtung" error={err("fachrichtung")}>
            <select
              id="fachrichtung"
              name="fachrichtung"
              value={values.fachrichtung ?? ""}
              onChange={(e) => set("fachrichtung", e.target.value)}
              aria-invalid={!!err("fachrichtung")}
              aria-describedby={err("fachrichtung") ? "fachrichtung-error" : undefined}
              className={`${inputClass} ${err("fachrichtung") ? "border-accent-deep" : "border-ink-950/14"} ${values.fachrichtung ? "" : "text-ink-400"}`}
            >
              <option value="" disabled>
                Bitte wählen
              </option>
              {kiCheckFachrichtungen.map((f) => (
                <option key={f} value={f} className="text-ink-950">
                  {f}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ort oder Stadtteil" name="stadt" error={err("stadt")}>
            <input
              id="stadt"
              name="stadt"
              autoComplete="address-level2"
              placeholder="Berlin-Charlottenburg"
              value={values.stadt ?? ""}
              onChange={(e) => set("stadt", e.target.value)}
              aria-invalid={!!err("stadt")}
              aria-describedby={err("stadt") ? "stadt-error" : undefined}
              className={`${inputClass} ${err("stadt") ? "border-accent-deep" : "border-ink-950/14"}`}
            />
          </Field>
          <Field label="Ihre wichtigste Selbstzahlerleistung" name="leistung" error={err("leistung")}>
            <input
              id="leistung"
              name="leistung"
              placeholder={leistungPlaceholder}
              value={values.leistung ?? ""}
              onChange={(e) => set("leistung", e.target.value)}
              aria-invalid={!!err("leistung")}
              aria-describedby={err("leistung") ? "leistung-error" : undefined}
              className={`${inputClass} ${err("leistung") ? "border-accent-deep" : "border-ink-950/14"}`}
            />
          </Field>
          <Field label="Website der Praxis" name="website" error={err("website")}>
            <input
              id="website"
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="praxis-muster.de"
              value={values.website ?? ""}
              onChange={(e) => set("website", e.target.value)}
              aria-invalid={!!err("website")}
              aria-describedby={err("website") ? "website-error" : undefined}
              className={`${inputClass} ${err("website") ? "border-accent-deep" : "border-ink-950/14"}`}
            />
          </Field>
          <SubmitButton>Weiter</SubmitButton>
          <p className="text-center text-xs text-ink-500">Kostenlos und unverbindlich · Schritt 2: Wohin der Report geht</p>
        </fieldset>
      ) : (
        <fieldset className="mt-4 grid gap-4">
          <legend className="sr-only">Kontaktdaten</legend>
          <div className="flex items-start justify-between gap-4">
            <h3
              ref={stepHeading}
              tabIndex={-1}
              className="text-[22px] leading-tight font-extrabold tracking-tight text-ink-950 focus:outline-none"
            >
              Wohin dürfen wir den Report schicken?
            </h3>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="shrink-0 cursor-pointer pt-1 text-sm font-semibold text-accent-deep underline underline-offset-2 hover:text-accent-dark"
            >
              Zurück
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Vorname" name="vorname" error={err("vorname")}>
              <input
                id="vorname"
                name="vorname"
                autoComplete="given-name"
                value={values.vorname ?? ""}
                onChange={(e) => set("vorname", e.target.value)}
                aria-invalid={!!err("vorname")}
                aria-describedby={err("vorname") ? "vorname-error" : undefined}
                className={`${inputClass} ${err("vorname") ? "border-accent-deep" : "border-ink-950/14"}`}
              />
            </Field>
            <Field label="Nachname" name="nachname" error={err("nachname")}>
              <input
                id="nachname"
                name="nachname"
                autoComplete="family-name"
                value={values.nachname ?? ""}
                onChange={(e) => set("nachname", e.target.value)}
                aria-invalid={!!err("nachname")}
                aria-describedby={err("nachname") ? "nachname-error" : undefined}
                className={`${inputClass} ${err("nachname") ? "border-accent-deep" : "border-ink-950/14"}`}
              />
            </Field>
          </div>
          <Field label="E-Mail" name="email" error={err("email")}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email ?? ""}
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!err("email")}
              aria-describedby={err("email") ? "email-error" : undefined}
              className={`${inputClass} ${err("email") ? "border-accent-deep" : "border-ink-950/14"}`}
            />
          </Field>
          <Field label="Telefon (für Rückfragen und die Besprechung Ihres Reports, optional)" name="telefon">
            <input
              id="telefon"
              name="telefon"
              type="tel"
              autoComplete="tel"
              value={values.telefon ?? ""}
              onChange={(e) => set("telefon", e.target.value)}
              className={`${inputClass} border-ink-950/14`}
            />
          </Field>
          <fieldset aria-describedby={err("ziel") ? "ziel-error" : undefined}>
            <legend className="mb-2 text-sm font-semibold text-ink-700">Ihr Ziel</legend>
            <div className="flex flex-wrap gap-2">
              {kiCheckZiele.map((z) => (
                <label
                  key={z}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold text-ink-950 transition duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent ${
                    values.ziel === z ? "border-accent bg-accent-tint" : "border-ink-950/14 bg-white hover:border-ink-950/28"
                  }`}
                >
                  <input
                    type="radio"
                    name="ziel"
                    value={z}
                    checked={values.ziel === z}
                    onChange={() => set("ziel", z)}
                    className="sr-only"
                  />
                  {z}
                </label>
              ))}
            </div>
            {err("ziel") && <ErrorText id="ziel-error">{err("ziel")}</ErrorText>}
          </fieldset>
          <Checkbox
            name="datenschutz"
            checked={values.datenschutz === "1"}
            onChange={(c) => set("datenschutz", c ? "1" : "")}
            error={err("datenschutz")}
          >
            Ich habe die{" "}
            <Link href="/datenschutz/" target="_blank" className="font-semibold text-accent-deep underline underline-offset-2">
              Datenschutzerklärung
            </Link>{" "}
            gelesen.
          </Checkbox>
          <Checkbox
            name="marketing_einwilligung"
            checked={values.marketing_einwilligung === "1"}
            onChange={(c) => set("marketing_einwilligung", c ? "1" : "")}
          >
            Ich möchte weitere Tipps zum Praxismarketing per E-Mail erhalten. Abmeldung jederzeit möglich.{" "}
            <span className="text-ink-500">(optional)</span>
          </Checkbox>
          <SubmitButton disabled={status === "sending"}>
            {status === "sending" ? "Wird gesendet …" : "Kostenlosen Check anfordern"}
          </SubmitButton>
          <p className="flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-ink-500">
            <LockIcon />
            <span>
              Keine Weitergabe Ihrer Daten. Kein Newsletter ohne Ihre Zustimmung. Wir nutzen für den Check nur
              öffentliche Angaben zu Ihrer Praxis.
            </span>
          </p>
          {status === "error" && (
            <p className="text-sm text-accent-deep" role="alert">
              Das hat leider nicht geklappt. Bitte prüfen Sie Ihre Angaben oder rufen Sie uns an unter{" "}
              <a href={site.phone.href} className="font-semibold underline">
                {site.phone.display}
              </a>
              .
            </p>
          )}
        </fieldset>
      )}
    </form>
  );
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ink-700">
        {label}
      </label>
      {children}
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1 text-sm text-accent-deep">
      {children}
    </p>
  );
}

function Checkbox({
  name,
  checked,
  onChange,
  error,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-600">
        <input
          type="checkbox"
          name={name}
          value="1"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-accent-deep"
        />
        <span>{children}</span>
      </label>
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

function SubmitButton({ disabled, children }: { disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-ink-950 shadow-button transition hover:bg-accent-dark disabled:cursor-wait disabled:opacity-60"
    >
      {children}
      <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 size-3.5 shrink-0">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
