import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Container,
  Eyebrow,
  Reveal,
  SectionHeading,
} from "@/components/ui/primitives";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { processSteps } from "@/data/content";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Five simple steps from your first chat to launch, staff training, and ongoing support, with a clear plan and fixed price upfront.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "How We Work | Marvex Technologies",
    description:
      "Our five step process: listen & learn, clear plan & fixed price, design & build with weekly previews, launch & staff training, and ongoing support.",
    url: "https://marvextechnologies.vercel.app/process",
  },
};

export default function ProcessPage() {
  return (
    <>
      <RevealObserver />
      <section className="hero-glow border-b border-line py-14 lg:py-22">
        <Container className="text-center">
          <Reveal>
            <Eyebrow>How We Work</Eyebrow>
            <h1 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.1rem,1.5rem+2.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-ink">
              Simple, clear, and stress free from day one.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              We keep you in the loop at every step. You always know what we are
              building, what it costs, and when it will be ready.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <ol className="space-y-5">
            {processSteps.map((s, i) => (
              <Reveal key={s.no} delay={Math.min(i, 2) * 60}>
                <li className="rounded-3xl border border-line bg-surface-card p-7 sm:p-9">
                  <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr_1fr] lg:gap-10">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-base font-semibold text-white">
                        {s.no}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-brand-dark">
                          {s.duration}
                        </p>
                        <h2 className="mt-0.5 font-display text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
                          {s.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-muted">
                      {s.text}
                    </p>

                    <div className="space-y-2.5 rounded-2xl border border-line bg-mist p-5 text-sm">
                      <p>
                        <strong className="font-semibold text-ink">
                          What you get:{" "}
                        </strong>
                        <span className="text-muted">{s.output}</span>
                      </p>
                      <p>
                        <strong className="font-semibold text-ink">
                          What we need:{" "}
                        </strong>
                        <span className="text-muted">{s.needs}</span>
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            <div className="dark-bento flex flex-col items-center justify-between gap-6 rounded-3xl px-7 py-9 text-center text-white sm:px-10 lg:flex-row lg:text-left">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                  Clear plan and fixed price before we start.
                </h2>
                <p className="mt-1.5 text-sm text-neutral-300">
                  No guesswork and no surprise bills. You approve the plan and
                  exact cost upfront.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-press inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-medium text-white hover:bg-brand-dark"
              >
                Start a Project
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="After Launch"
              title="We stay available whenever you need us."
              sub="Once your website or software is live, you can count on us for updates, backups, and fast support."
            />
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              [
                "Urgent Help",
                "If something stops your shop from working",
                "Same day support",
              ],
              [
                "Quick Fixes",
                "If a feature or branch needs attention",
                "Within 24 to 48 hours",
              ],
              [
                "Updates & Additions",
                "Adding new pages, reports, or products",
                "Within a few days",
              ],
            ].map(([level, desc, time]) => (
              <Reveal key={level}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface-card p-7 text-center">
                  <div>
                    <p className="text-xs font-semibold text-brand-dark">
                      {level}
                    </p>
                    <p className="mt-3 text-sm text-muted">{desc}</p>
                  </div>
                  <p className="mt-5 font-display text-lg font-semibold tracking-[-0.025em] text-ink">
                    {time}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <BigCta />
    </>
  );
}
