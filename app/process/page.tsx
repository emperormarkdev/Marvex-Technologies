import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { processSteps } from "@/data/content";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Five disciplined phases from technical discovery and system architecture to production launch and SLA-backed reliability.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Methodology | Marvex Technologies",
    description:
      "Our five-phase engineering methodology: discovery, fixed-scope architecture, iterative builds, QA & deployment, and managed reliability.",
    url: "https://marvextechnologies.vercel.app/process",
  },
};

export default function ProcessPage() {
  return (
    <>
      <RevealObserver />
      <section className="hero-glow border-b border-line py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Methodology</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Disciplined execution from blueprint to production.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Full technical visibility at every milestone. You know the exact
                architecture, delivery schedule, and commercial scope before
                engineering begins.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <ol className="overflow-hidden rounded-2xl border border-line bg-line grid gap-px">
            {processSteps.map((s) => (
              <li key={s.no} className="bg-surface-card p-7 sm:p-10">
                <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr_1fr] lg:gap-10">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand font-mono text-xs font-semibold text-neutral-950">
                      {s.no}
                    </span>
                    <div>
                      <p className="font-mono text-xs font-medium text-brand-dark">
                        {s.duration}
                      </p>
                      <h2 className="mt-0.5 font-display text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl">
                        {s.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted">{s.text}</p>

                  <div className="space-y-2.5 rounded-xl border border-line bg-mist p-5 text-sm">
                    <p>
                      <strong className="font-semibold text-ink">
                        Deliverable:{" "}
                      </strong>
                      <span className="text-muted">{s.output}</span>
                    </p>
                    <p>
                      <strong className="font-semibold text-ink">
                        Client input:{" "}
                      </strong>
                      <span className="text-muted">{s.needs}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <Reveal className="mt-10">
            <div className="dark-bento flex flex-col items-center justify-between gap-6 rounded-2xl px-7 py-9 text-center text-white sm:px-10 lg:flex-row lg:text-left">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                  Locked architecture and commercial terms upfront.
                </h2>
                <p className="mt-1.5 text-sm text-neutral-300">
                  Every milestone, deliverable, and investment is documented and
                  approved before a single sprint begins.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-press inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
              >
                Start a Consultation
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="cv-auto bg-surface py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Post-Launch SLA</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                Engineered for continuous uptime.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Structured response tiers keep production systems fast, patched,
                and evolving smoothly after deployment.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-line">
            <div className="grid gap-px sm:grid-cols-3">
              {[
                [
                  "P1 / CRITICAL",
                  "Production incidents affecting core operations or checkout availability",
                  "Same-day engineering response",
                ],
                [
                  "P2 / OPERATIONAL",
                  "Non-blocking workflow defects, branch sync issues, or integration alerts",
                  "Within 24 to 48 hours",
                ],
                [
                  "P3 / ENHANCEMENT",
                  "New product modules, reporting views, and scheduled platform upgrades",
                  "Planned sprint delivery",
                ],
              ].map(([level, desc, time]) => (
                <div
                  key={level}
                  className="flex h-full flex-col justify-between bg-surface-card p-8"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-[0.08em] text-brand-dark">
                      {level}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {desc}
                    </p>
                  </div>
                  <p className="mt-6 font-display text-lg font-semibold tracking-[-0.025em] text-ink">
                    {time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <BigCta />
    </>
  );
}
