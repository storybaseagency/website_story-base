import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { Button, Eyebrow, IconTile, Reveal } from "./ui";

export function ContactSection({ title = "Bereit für mehr Privatpatienten?" }: { title?: string }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative grid gap-12 overflow-hidden rounded-4xl bg-linear-135 from-ink-800 to-navy p-8 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
            <div aria-hidden className="pointer-events-none absolute -top-50 -right-30 size-[512px] rounded-full bg-accent/16 blur-3xl" />
            <div className="relative flex flex-col gap-6">
              <Eyebrow dark>Kontakt</Eyebrow>
              <h2 id="contact-title" className="text-[34px] leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl">
                {title}
              </h2>
              <p className="text-lg leading-relaxed text-white/75">
                Im 30-minütigen Praxis-Check schauen wir gemeinsam auf Ihre Ziele und Ihren Auftritt – und Sie gehen mit
                drei konkreten nächsten Schritten raus. Auch wenn wir danach nicht zusammenarbeiten.
              </p>
              <div>
                <Button href={site.calendlyUrl} external>
                  Praxis-Check vereinbaren
                </Button>
                <p className="mt-3 text-[13px] text-white/60">Die Terminbuchung öffnet sich bei unserem Partner Calendly.</p>
              </div>
              <address className="mt-2 grid gap-3 not-italic">
                <ContactItem icon="phone" label="Telefon" href={site.phone.href}>
                  {site.phone.display}
                </ContactItem>
                <ContactItem icon="mail" label="E-Mail" href={`mailto:${site.email}`}>
                  {site.email}
                </ContactItem>
                <ContactItem icon="pin" label="Studio & Büro" href={site.address.mapsUrl} external>
                  {site.address.street}, {site.address.zip} {site.address.city}
                </ContactItem>
              </address>
            </div>

            <div className="relative self-start rounded-3xl bg-white p-6 text-ink-950 shadow-image sm:p-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  href,
  external,
  children,
}: {
  icon: "phone" | "mail" | "pin";
  label: string;
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-950/40 p-5 transition duration-150 hover:border-accent/55"
    >
      <IconTile name={icon} small dark />
      <span>
        <span className="block text-sm text-white/55">{label}</span>
        <span className="block text-lg leading-7 font-semibold">{children}</span>
      </span>
    </a>
  );
}
