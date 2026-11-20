"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import {
  Container,
  Eyebrow,
  Reveal,
  SectionHeading,
} from "@/components/ui/primitives";
import { faqs } from "@/data/content";

const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="cv-auto bg-surface py-20 lg:py-28" aria-label="FAQ">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Questions & answers"
                title="Answers before we begin."
                sub="Straightforward details on scoping, delivery timelines, code ownership, and post-launch support."
              />
              <Link
                href="/contact"
                className="group btn-press mt-7 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-medium text-surface hover:bg-brand hover:text-neutral-950"
              >
                Talk to our team
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>

          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface-card">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <div key={f.q}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-mist sm:px-7"
                    >
                      <span className="font-display text-base font-semibold tracking-[-0.025em] text-ink">
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.22, ease: expoOut }}
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                          isOpen
                            ? "bg-brand text-neutral-950"
                            : "border border-line bg-surface-elevated text-ink"
                        }`}
                        aria-hidden="true"
                      >
                        <Plus size={15} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={
                          prefersReduced
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          prefersReduced
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.28, ease: expoOut }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:px-7">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function BigCta() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <section
      className="cv-auto bg-surface pb-20 lg:pb-28"
      aria-label="Call to action"
    >
      <Container>
        <div ref={containerRef}>
          <motion.div
            style={prefersReduced ? undefined : { scale, opacity }}
            className="dark-bento relative overflow-clip rounded-2xl px-6 py-16 text-center text-white will-change-transform sm:px-12 lg:py-22"
          >
            <Eyebrow dark>Start a project</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
              Ready to build your next platform or system?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              Share what you want to build or modernize. We will review your
              requirements and come back with a clear plan and fixed terms.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
              <Link
                href="/contact"
                className="group btn-press inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
              >
                Start a project
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/process"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-8 py-4 text-sm font-medium text-white hover:border-white hover:bg-neutral-800"
              >
                Review methodology
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
