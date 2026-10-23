import type { CSSProperties, ReactNode } from "react";
import type { IconName } from "@/lib/content";
import {
  ArrowIcon,
  CalendarIcon,
  ClockIcon,
  GearIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  RocketIcon,
  TargetIcon,
} from "./icons";

const icons = {
  target: TargetIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  rocket: RocketIcon,
  pin: PinIcon,
  gear: GearIcon,
  phone: PhoneIcon,
  mail: MailIcon,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = icons[name];
  return <Cmp className={className} />;
}

type ButtonVariant = "primary" | "dark" | "outline" | "link";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-ink-950 shadow-button hover:bg-accent-dark",
  dark: "bg-ink-950 text-white hover:bg-ink-700",
  outline: "border border-ink-950/14 text-ink-950 hover:border-ink-950/28 hover:bg-white",
  link: "!p-0 text-accent-deep hover:text-accent-dark",
};

export function Button({
  href,
  variant = "primary",
  external,
  icon,
  arrow,
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  external?: boolean;
  icon?: IconName;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const showArrow = arrow ?? (variant === "primary" || variant === "link");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base leading-6 font-semibold whitespace-nowrap transition duration-150 ${buttonStyles[variant]} ${className}`}
    >
      {icon && <Icon name={icon} className="size-5" />}
      {children}
      {showArrow && (
        <ArrowIcon className="size-5 transition-transform duration-150 group-hover:translate-x-1" />
      )}
    </a>
  );
}

export function Eyebrow({ dark, className = "", children }: { dark?: boolean; className?: string; children: ReactNode }) {
  return (
    <p
      className={`text-sm leading-5 font-semibold tracking-widest uppercase ${dark ? "text-accent" : "text-accent-deep"} ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  dark,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`mt-3 text-[34px] leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl ${dark ? "text-white" : "text-ink-950"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-7 ${dark ? "text-white/70" : "text-ink-600"}`}>{subtitle}</p>
      )}
    </div>
  );
}

const sectionBg = {
  page: "bg-paper text-ink-950",
  alt: "bg-sand text-ink-950",
  inverse: "bg-ink-950 text-white",
};

export function Section({
  id,
  bg = "page",
  glow,
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  bg?: keyof typeof sectionBg;
  glow?: boolean;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden py-24 sm:py-32 ${sectionBg[bg]} ${className}`}
    >
      {glow && (
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full blur-3xl ${bg === "inverse" ? "bg-accent/10" : "bg-accent/18"}`}
        />
      )}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function Card({
  tint,
  className = "",
  children,
}: {
  tint?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-3xl border transition-all duration-300 ease-(--ease-out-soft) ${
        tint
          ? "border-accent/20 bg-accent-tint hover:border-accent/50"
          : "border-ink-950/8 bg-white shadow-card hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function IconTile({ name, small, dark }: { name: IconName; small?: boolean; dark?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-accent/15 ${
        small ? "size-11 rounded-xl" : "size-12 rounded-2xl"
      } ${dark ? "text-accent" : "text-accent-deep"}`}
    >
      <Icon name={name} className={small ? "size-5" : "size-6"} />
    </span>
  );
}

/** Blendet Inhalte beim Scrollen ein (siehe RevealObserver und .reveal in globals.css). */
export function Reveal({
  delay = 0,
  distance,
  className = "",
  children,
}: {
  delay?: number;
  distance?: number;
  className?: string;
  children: ReactNode;
}) {
  const style = {
    "--reveal-delay": `${delay}ms`,
    ...(distance !== undefined && { "--reveal-distance": `${distance}px` }),
  } as CSSProperties;
  return (
    <div className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`size-1.5 shrink-0 rounded-full bg-accent ${className}`} />;
}
