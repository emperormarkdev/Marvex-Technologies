"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Container, Reveal, SectionHeading } from "@/components/ui/primitives";
import { engagementModels, processSteps } from "@/data/content";

export function ProcessStrip() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = processSteps[activeIdx] ?? processSteps[0];

  return (
    <section className="bg-surface py-20 lg:py-28" aria-label="How we work">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How We Work"
            title="Five simple steps from idea to launch."
            sub="Click any step below to see what happens, what you receive, and how long it takes."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-stretch">
          <div
            className="flex flex-col gap-3"
            role="tablist"
            aria-label="Project steps"
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
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all ${isSelected
                      ? "border-brand bg-surface-elevated ring-1 ring-brand shadow-[0_12px_32px_-12px_rgba(0,196,122,0.22)]"
                      : "border-line bg-surface-card hover:border-brand"
                    }`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold transition-colors ${isSelected
                        ? "bg-brand text-white"
                        : "bg-brand-pale text-brand-dark"
                      }`}
                  >
                    {s.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold tracking-[-0.03em] text-ink sm:text-lg">
                      {s.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-muted sm:text-sm">
                      {s.summary}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`shrink-0 transition-transform ${isSelected
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
            className="flex flex-col justify-between rounded-3xl border border-line bg-surface-card p-8 sm:p-10"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6">
                <span className="font-display text-sm font-semibold text-brand-dark">
                  Step {current.no} of 05
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                  <Clock
                    size={14}
                    className="text-brand-dark"
                    aria-hidden="true"
                  />
                  Typical timeframe: {current.duration}
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {current.text}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-mist p-5">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold text-brand-dark">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    What you get
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {current.output}
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-mist p-5">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold text-brand-dark">
                    <Sparkles size={14} aria-hidden="true" />
                    What we need from you
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {current.needs}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex items-center gap-2">
                {processSteps.map((step, idx) => (
                  <button
                    key={step.no}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`View step ${step.no}`}
                    className={`h-2 rounded-full transition-all ${idx === activeIdx
                        ? "w-7 bg-brand"
                        : "w-2 bg-line hover:bg-muted"
                      }`}
                  />
                ))}
              </div>

              <Link
                href="/process"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark hover:underline"
              >
                Read full process guide
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
  return (
    <section
      className="border-t border-line bg-mist py-20 lg:py-28"
      aria-label="Ways to work with us"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Ways to Work Together"
            title="Start small or set up your whole business."
            sub="Choose the pace that fits your business today. Every option comes with a fixed price and full support."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {engagementModels.map((m, i) => {
            const featured = i === 1;
            return (
              <Reveal key={m.title} delay={i * 70}>
                <div
                  className={`flex h-full flex-col justify-between rounded-3xl border p-8 ${featured
                      ? "border-brand bg-surface-elevated text-ink ring-1 ring-brand shadow-[0_16px_40px_-15px_rgba(0,196,122,0.22)]"
                      : "border-line bg-surface-card text-ink"
                    }`}
                >
                  <div>
                    <p className="text-xs font-semibold text-brand-dark">
                      {m.label}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em] text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {m.text}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className={`btn-press inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium ${featured
                          ? "bg-brand text-white hover:bg-brand-dark"
                          : "border border-line bg-surface-elevated text-ink hover:border-brand hover:bg-brand hover:text-white"
                        }`}
                    >
                      Get started
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
