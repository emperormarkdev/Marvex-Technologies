"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { navLinks, siteConfig } from "@/data/content";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-baseline select-none"
      aria-label="Marvex Technologies home"
    >
      <span
        className={`font-display text-2xl font-bold leading-none tracking-[-0.06em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        Marvex
      </span>
      <span
        className="ml-0.5 inline-block h-2 w-2 rounded-full bg-brand transition-transform duration-200 group-hover:scale-125"
        aria-hidden="true"
      />
    </Link>
  );
}

function ThemeToggle() {
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "color-scheme") {
        const meta = document.querySelector<HTMLMetaElement>(
          'meta[name="color-scheme"]'
        );
        if (meta) {
          meta.content = e.newValue ?? "light dark";
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleScheme = () => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="color-scheme"]'
    );
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const systemScheme = systemDark ? "dark" : "light";

    let stored: string | null = null;
    try {
      stored = localStorage.getItem("color-scheme");
    } catch {
      stored = null;
    }

    const currentRendered =
      stored === "dark" || stored === "light" ? stored : systemScheme;
    const target = currentRendered === "dark" ? "light" : "dark";

    if (target === systemScheme) {
      try {
        localStorage.removeItem("color-scheme");
      } catch {}
      if (meta) meta.content = "light dark";
    } else {
      try {
        localStorage.setItem("color-scheme", target);
      } catch {}
      if (meta) meta.content = target;
    }
  };

  return (
    <button
      type="button"
      onClick={toggleScheme}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface-card text-ink transition-colors hover:border-brand hover:text-brand-dark"
    >
      <span className="theme-icon-sun items-center justify-center">
        <Sun size={17} aria-hidden="true" />
        <span className="sr-only">Switch to light theme</span>
      </span>
      <span className="theme-icon-moon items-center justify-center">
        <Moon size={17} aria-hidden="true" />
        <span className="sr-only">Switch to dark theme</span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-surface transition-all ${
        scrolled ? "shadow-xs" : ""
      }`}
    >
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-1 rounded-full border border-line bg-mist p-1.5 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium tracking-[-0.02em] transition-all ${
                  active
                    ? "bg-surface-elevated text-ink shadow-xs ring-1 ring-line"
                    : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn-press inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-medium tracking-[-0.02em] text-surface hover:bg-brand hover:text-white"
          >
            Start a Project
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface-card text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-surface px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-2.5 text-sm font-medium ${
                      active
                        ? "bg-surface-elevated text-ink ring-1 ring-line"
                        : "text-muted hover:bg-mist hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-press flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-center text-sm font-medium text-surface"
              >
                Start a Project
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export { siteConfig };
