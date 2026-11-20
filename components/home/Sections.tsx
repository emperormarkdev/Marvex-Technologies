"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { engagementModels, processSteps } from "@/data/content";

export function ProcessStrip() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = processSteps[activeIdx] ?? processSteps[0];

  return (
    <section
      className="cv-auto bg-surface py-20 lg:py-28"
      aria-label="Methodology"
    >
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Delivery Methodology</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
              Five disciplined phases from architecture to production.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Select any phase below to inspect deliverables, stakeholder
              inputs, and typical execution windows.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-stretch">
          <div
            className="flex flex-col gap-2.5"
            role="tablist"
            aria-label="Delivery phases"
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
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all ${
                    isSelected
                      ? "border-brand bg-surface-elevated ring-1 ring-brand"
                      : "border-line bg-surface-card hover:border-brand"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-brand text-neutral-950"
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
                    className={`shrink-0 transition-transform ${
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
            className="flex flex-col justify-between rounded-2xl border border-line bg-surface-card p-8 sm:p-10"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6">
                <span className="font-mono text-xs font-semibold tracking-[0.08em] text-brand-dark uppercase">
                  Phase {current.no} / 05
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-muted">
                  <Clock
                    size={14}
                    className="text-brand-dark"
                    aria-hidden="true"
                  />
                  Window: {current.duration}
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
                  <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.06em] text-brand-dark uppercase">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    Key Deliverable
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink">
                    {current.output}
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-mist p-5">
                  <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.06em] text-brand-dark uppercase">
                    <Sparkles size={14} aria-hidden="true" />
                    Client Input
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink">
                    {current.needs}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex items-center gap-1">
                {processSteps.map((step, idx) => (
                  <button
                    key={step.no}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`View phase ${step.no}`}
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
  return (
    <section
      className="cv-auto border-t border-line bg-mist py-20 lg:py-28"
      aria-label="Engagement models"
    >
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Engagement Models</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
              Structured around your roadmap and scale.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Engage us for a focused product launch, an organization-wide
              systems transformation, or ongoing SLA engineering support.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-line">
          <div className="grid gap-px md:grid-cols-3">
            {engagementModels.map((m, i) => {
              const featured = i === 1;
              return (
                <div
                  key={m.title}
                  className={`flex h-full flex-col justify-between p-8 sm:p-9 ${
                    featured
                      ? "bg-black text-white"
                      : "bg-surface-card text-ink"
                  }`}
                >
                  <div>
                    <p
                      className={`font-mono text-[11px] font-semibold tracking-[0.08em] uppercase ${
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
                      className={`btn-press inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold ${
                        featured
                          ? "bg-brand text-neutral-950 hover:bg-[#00db89]"
                          : "border border-line bg-surface-elevated text-ink hover:border-brand hover:bg-brand hover:text-neutral-950"
                      }`}
                    >
                      Discuss scope
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
