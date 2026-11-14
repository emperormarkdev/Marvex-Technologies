import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`text-sm font-semibold tracking-[-0.015em] ${
        dark ? "text-brand" : "text-brand-dark"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  dark = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";
  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignCls}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-[clamp(1.85rem,1.3rem+2.2vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.04em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`max-w-2xl text-base leading-relaxed tracking-[-0.015em] sm:text-lg ${
            dark ? "text-white/70" : "text-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
