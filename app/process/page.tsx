import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { processSteps } from "@/data/content";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Five clear stages from technical discovery and system architecture to production launch and ongoing support.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Methodology | Marvex Technologies",
    description:
      "Our five-stage delivery process: discovery, fixed-scope architecture, weekly staging builds, QA & launch, and ongoing support.",
    url: "https://marvextechnologies.vercel.app/process",
  },
};

export default function ProcessPage() {
  return (
    <>
      <RevealObserver />
      <section className="border-b border-line bg-surface py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Methodology</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Clear execution from blueprint to production.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Full visibility at every stage. You review and approve the
                architecture, delivery schedule, and total investment before
                development starts.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {processSteps.map((s) => (
              <li key={s.no} className="bg-surface-card p-7 sm:p-10">
                <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr_1fr] lg:gap-10">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand font-display text-sm font-semibold text-neutral-950">
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
                  Written scope and fixed terms before work begins.
                </h2>
                <p className="mt-1.5 text-sm text-neutral-300">
                  Every milestone, deliverable, and cost is agreed upfront with
                  no surprise additions later.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-press inline-flex shrink-0 items-center justify-center rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
              >
                Start a project
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="cv-auto bg-surface py-20 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Post-launch support</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                Dependable coverage after go-live.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Clear response tiers keep production systems fast, secure, and
                evolving smoothly after deployment.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-line">
            <div className="grid gap-px sm:grid-cols-3">
              {[
                [
                  "Critical incidents",
                  "Production issues affecting core operations, payments, or availability",
                  "Same-day engineering response",
                ],
                [
                  "Operational issues",
                  "Non-blocking workflow bugs, sync delays, or integration errors",
                  "Within 24 to 48 hours",
                ],
                [
                  "Scheduled upgrades",
                  "New modules, reporting views, and planned feature releases",
                  "Planned sprint delivery",
                ],
              ].map(([level, desc, time]) => (
                <div
                  key={level}
                  className="flex h-full flex-col justify-between bg-surface-card p-8"
                >
                  <div>
                    <p className="text-xs font-semibold text-brand-dark">
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
