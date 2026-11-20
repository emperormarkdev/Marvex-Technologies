"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { services } from "@/data/content";

export default function ServicesGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const pendingIdxRef = useRef<number | null>(null);
  const settledIdxRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  const [activeIdx, setActiveIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const getNearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return 0;

    const trackLeft = track.getBoundingClientRect().left;
    const style = window.getComputedStyle(track);
    const padLeft = parseFloat(style.paddingLeft) || 0;
    const anchorX = trackLeft + padLeft;

    let bestIdx = 0;
    let bestDist = Infinity;
    slides.forEach((slide, i) => {
      const dist = Math.abs(slide.getBoundingClientRect().left - anchorX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    return bestIdx;
  }, []);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
    const ratio = Math.max(0, Math.min(1, track.scrollLeft / maxScroll));
    setProgress(ratio);

    const nextCanPrev = track.scrollLeft > 4;
    const nextCanNext = track.scrollLeft < maxScroll - 4;

    setCanPrev((prev) => {
      if (
        prev &&
        !nextCanPrev &&
        document.activeElement === prevBtnRef.current
      ) {
        nextBtnRef.current?.focus();
      }
      return nextCanPrev;
    });
    setCanNext((prev) => {
      if (
        prev &&
        !nextCanNext &&
        document.activeElement === nextBtnRef.current
      ) {
        prevBtnRef.current?.focus();
      }
      return nextCanNext;
    });
  }, []);

  const scrollToSlide = useCallback((targetIdx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const clamped = Math.max(0, Math.min(slides.length - 1, targetIdx));
    const slide = slides[clamped];
    if (!slide) return;

    const trackLeft = track.getBoundingClientRect().left;
    const style = window.getComputedStyle(track);
    const padLeft = parseFloat(style.paddingLeft) || 0;
    const delta = slide.getBoundingClientRect().left - (trackLeft + padLeft);

    pendingIdxRef.current = clamped;
    setActiveIdx(clamped);
    track.scrollBy({ left: delta });
  }, []);

  const handleStep = useCallback(
    (direction: -1 | 1) => {
      const base =
        pendingIdxRef.current !== null
          ? pendingIdxRef.current
          : getNearestIndex();
      scrollToSlide(base + direction);
    },
    [getNearestIndex, scrollToSlide]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    const supportsScrollEnd = "onscrollend" in window;

    const onSettled = () => {
      pendingIdxRef.current = null;
      const idx = getNearestIndex();
      setActiveIdx(idx);
      syncEdges();
      if (idx !== settledIdxRef.current) {
        settledIdxRef.current = idx;
        setAnnouncement(
          `Slide ${idx + 1} of ${services.length}: ${services[idx]?.title ?? ""}`
        );
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          syncEdges();
          if (pendingIdxRef.current === null) {
            const idx = getNearestIndex();
            setActiveIdx((prev) => (prev === idx ? prev : idx));
          }
        });
      }
      if (!supportsScrollEnd) {
        if (fallbackTimer) clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(onSettled, 140);
      }
    };

    syncEdges();
    track.addEventListener("scroll", onScroll, { passive: true });
    if (supportsScrollEnd) {
      track.addEventListener("scrollend", onSettled);
    }
    window.addEventListener("resize", syncEdges, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (supportsScrollEnd) {
        track.removeEventListener("scrollend", onSettled);
      }
      window.removeEventListener("resize", syncEdges);
      if (rafId) cancelAnimationFrame(rafId);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [getNearestIndex, syncEdges]);

  return (
    <section
      className="cv-auto bg-mist py-20 lg:py-28"
      aria-roledescription="carousel"
      aria-label="Capabilities"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                Twelve practices covering software, AI, data, and cloud.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Scroll or swipe across our core disciplines, or view the full
                breakdown on our capabilities page.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  ref={prevBtnRef}
                  type="button"
                  onClick={() => handleStep(-1)}
                  disabled={!canPrev}
                  aria-label="Previous capability"
                  className="btn-press grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-line bg-surface-card text-ink transition-colors hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  ref={nextBtnRef}
                  type="button"
                  onClick={() => handleStep(1)}
                  disabled={!canNext}
                  aria-label="Next capability"
                  className="btn-press grid h-11 w-11 touch-manipulation place-items-center rounded-full border border-line bg-surface-card text-ink transition-colors hover:border-brand hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>

              <Link
                href="/services"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-brand-dark hover:underline"
              >
                View all capabilities
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>

      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Capability cards"
        className="capabilities-track mt-12 pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
      >
        {services.map((s, idx) => (
          <motion.div
            key={s.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${services.length}`}
            className="capabilities-slide"
            whileHover={prefersReduced ? undefined : { y: -6 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
          >
            <Link
              href={`/services#${s.slug}`}
              className="group flex h-full min-h-[370px] flex-col justify-between rounded-2xl border border-line bg-surface-card p-7 transition-colors duration-200 hover:border-brand sm:p-8"
            >
              <div>
                <p className="text-xs font-semibold text-brand-dark">
                  {s.category}
                </p>

                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.03em] text-ink transition-colors group-hover:text-brand-dark">
                  {s.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.short}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-xs text-ink">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs font-medium text-muted">
                  {idx + 1} / {services.length}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-dark">
                  Read details
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      <Container>
        <div className="mt-6 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div
            className="h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-line"
            aria-hidden="true"
          >
            <div
              className="h-full origin-left rounded-full bg-brand transition-transform duration-100 ease-out"
              style={{ transform: `scaleX(${Math.max(0.08, progress)})` }}
            />
          </div>

          <nav
            aria-label="Choose a capability"
            className="flex flex-wrap items-center justify-center gap-0.5"
          >
            {services.map((s, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Go to ${s.title}`}
                  className="group flex h-8 min-w-7 cursor-pointer touch-manipulation items-center justify-center rounded-full px-1"
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? "w-7 bg-brand"
                        : "w-2 bg-line group-hover:bg-muted"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </Container>
    </section>
  );
}
