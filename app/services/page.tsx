import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Digital platforms, mobile engineering (iOS & Android), custom web applications, commerce infrastructure, enterprise ERP software, product design, automation, and cloud reliability.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Capabilities | Marvex Technologies",
    description:
      "Full-spectrum software engineering: web flagships, mobile applications, commerce platforms, enterprise systems, and cloud infrastructure.",
    url: "https://marvextechnologies.vercel.app/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <RevealObserver />
      <section className="hero-glow border-b border-line py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Capabilities</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Full-spectrum software engineering and digital infrastructure.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Every engagement is backed by a documented technical blueprint,
                weekly staging deliveries, and fixed commercial milestones.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-line bg-line">
            <div className="grid gap-px">
              {services.map((s, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <article
                    key={s.slug}
                    id={s.slug}
                    className="scroll-mt-24 bg-surface-card p-7 sm:p-10 lg:p-12"
                  >
                    <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-xs font-semibold tracking-[0.1em] text-brand-dark">
                            {num}
                          </span>
                          <span
                            className="h-3 w-px bg-line"
                            aria-hidden="true"
                          />
                          <p className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-muted">
                            <Clock size={13} aria-hidden="true" />
                            Typical window: {s.timeline}
                          </p>
                        </div>
                        <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
                          {s.title}
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-muted">
                          {s.description}
                        </p>
                        <Link
                          href={`/contact?service=${s.slug}`}
                          className="btn-press mt-7 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-medium text-surface hover:bg-brand hover:text-neutral-950"
                        >
                          Scope this capability
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      </div>

                      <div className="rounded-xl border border-line bg-mist p-6 sm:p-7">
                        <p className="font-mono text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                          Core Deliverables
                        </p>
                        <ul className="mt-4 space-y-3">
                          {s.deliverables.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-3 text-sm text-ink"
                            >
                              <Check
                                size={16}
                                strokeWidth={2.5}
                                className="mt-0.5 shrink-0 text-brand-dark"
                                aria-hidden="true"
                              />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <BigCta />
    </>
  );
}
