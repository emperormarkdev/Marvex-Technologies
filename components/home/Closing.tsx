"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import {
  Container,
  Eyebrow,
  Reveal,
  SectionHeading,
} from "@/components/ui/primitives";
import { faqs } from "@/data/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-surface py-20 lg:py-28" aria-label="FAQ">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Questions & Answers"
                title="Common questions from business owners."
                sub="Simple, honest answers on pricing, how long projects take, staff training, and ongoing support."
              />
              <Link
                href="/contact"
                className="btn-press mt-7 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-medium text-surface hover:bg-brand hover:text-white"
              >
                Ask us a question
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="divide-y divide-line rounded-3xl border border-line bg-surface-card">
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
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${isOpen
                            ? "bg-brand text-white"
                            : "border border-line bg-surface-elevated text-ink"
                          }`}
                        aria-hidden="true"
                      >
                        {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!isOpen}
                    className="px-6 pb-6 text-sm leading-relaxed text-muted sm:px-7"
                  >
                    {f.a}
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

export function BigCta() {
  return (
    <section className="bg-surface pb-20 lg:pb-28" aria-label="Call to action">
      <Container>
        <Reveal>
          <div className="dark-bento relative overflow-clip rounded-3xl px-6 py-16 text-center text-white sm:px-12 lg:py-22">
            <Eyebrow dark>Let&apos;s Talk About Your Business</Eyebrow>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
              Ready to build your website, app, or business software?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              Tell us what you want to build or improve. We will have a quick
              chat and send you a clear plan and fixed price with zero pressure.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3.5 sm:flex-row">
              <Link
                href="/contact"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 text-sm font-medium text-white hover:bg-brand-dark"
              >
                Start a Project
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/process"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-8 py-4 text-sm font-medium text-white hover:border-white hover:bg-neutral-800"
              >
                See How We Work
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
