"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { engagementModels, processSteps } from "@/data/content";

const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProcessStrip() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = processSteps[activeIdx] ?? processSteps[0];
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="cv-auto bg-surface py-20 lg:py-28"
      aria-label="Methodology"
    >
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
              Five clear stages from discovery to production.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Select a stage below to see what we produce, what we need from
              your team, and how work moves forward.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-stretch">
          <div
            className="flex flex-col gap-2.5"
            role="tablist"
            aria-label="Delivery stages"
          >
            {processSteps.map((s, i) => {
              const isSelected = i === activeIdx;
              return (
                <button
                  key={s.no}
                  type="button"
                  role="tab"
                  id={`step-tab-${s.no}`}
                  aria-selected={isSelected}
                  aria-controls={`step-panel-${s.no}`}
                  onClick={() => setActiveIdx(i)}
                  className="group relative flex w-full items-center gap-4 rounded-2xl border border-line bg-surface-card p-5 text-left transition-colors hover:border-brand"
                >
                  {isSelected && (
                    <motion.span
                      layoutId={
                        prefersReduced ? undefined : "process-active-tab"
                      }
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="pointer-events-none absolute inset-0 rounded-2xl border border-brand bg-surface-elevated ring-1 ring-brand"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-brand text-neutral-950"
                        : "bg-brand-pale text-brand-dark"
                    }`}
                  >
                    {s.no}
                  </span>
                  <div className="relative z-10 min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold tracking-[-0.03em] text-ink sm:text-lg">
                      {s.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-muted sm:text-sm">
                      {s.summary}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`relative z-10 shrink-0 transition-transform ${
                      isSelected
                        ? "translate-x-0.5 text-brand-dark"
                        : "text-muted group-hover:translate-x-0.5 group-hover:text-ink"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`step-panel-${current.no}`}
            aria-labelledby={`step-tab-${current.no}`}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface-card p-8 sm:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.no}
                initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: expoOut }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6">
                  <span className="text-sm font-semibold text-brand-dark">
                    Stage {Number(current.no)} of 5
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                    <Clock
                      size={14}
                      className="text-brand-dark"
                      aria-hidden="true"
                    />
                    {current.duration}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  {current.text}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-mist p-5">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold text-brand-dark">
                      <CheckCircle2 size={14} aria-hidden="true" />
                      Key deliverable
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink">
                      {current.output}
                    </p>
                  </div>

                  <div className="rounded-xl border border-line bg-mist p-5">
                    <p className="text-xs font-semibold text-brand-dark">
                      Client input
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink">
                      {current.needs}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex items-center gap-1">
                {processSteps.map((step, idx) => (
                  <button
                    key={step.no}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`View stage ${Number(step.no)}`}
                    className="group flex h-8 min-w-8 items-center justify-center rounded-full px-1"
                  >
                    <span
                      className={`h-2.5 rounded-full transition-all ${
                        idx === activeIdx
                          ? "w-7 bg-brand"
                          : "w-2.5 bg-line group-hover:bg-muted"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <Link
                href="/process"
                className="inline-flex min-h-8 items-center gap-2 text-sm font-medium text-brand-dark hover:underline"
              >
                Full methodology
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function EngagementModels() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="cv-auto border-t border-line bg-mist py-20 lg:py-28"
      aria-label="Ways to work together"
    >
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Engagement models</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
              Structured around your team and roadmap.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Work with us on a focused product launch, a full systems rollout,
              or an ongoing engineering retainer.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-line">
          <div className="grid gap-px md:grid-cols-3">
            {engagementModels.map((m, i) => {
              const featured = i === 1;
              return (
                <motion.div
                  key={m.title}
                  initial={prefersReduced ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.58,
                    delay: i * 0.09,
                    ease: expoOut,
                  }}
                  className={`flex h-full flex-col justify-between p-8 sm:p-9 ${
                    featured
                      ? "bg-black text-white"
                      : "bg-surface-card text-ink"
                  }`}
                >
                  <div>
                    <p
                      className={`text-xs font-semibold ${
                        featured ? "text-brand" : "text-brand-dark"
                      }`}
                    >
                      {m.label}
                    </p>
                    <h3
                      className={`mt-4 font-display text-2xl font-semibold tracking-[-0.035em] ${
                        featured ? "text-white" : "text-ink"
                      }`}
                    >
                      {m.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        featured ? "text-neutral-300" : "text-muted"
                      }`}
                    >
                      {m.text}
                    </p>
                  </div>

                  <div className="mt-9">
                    <Link
                      href="/contact"
                      className={`group btn-press inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold ${
                        featured
                          ? "bg-brand text-neutral-950 hover:bg-[#00db89]"
                          : "border border-line bg-surface-elevated text-ink hover:border-brand hover:bg-brand hover:text-neutral-950"
                      }`}
                    >
                      Discuss scope
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
