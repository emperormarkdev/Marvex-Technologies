import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Web platforms, mobile apps, custom SaaS, AI systems, data and BI, FinTech and payments, omnichannel commerce, enterprise ERP, cloud DevOps, cybersecurity, legacy modernization, and product design.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Capabilities | Marvex Technologies",
    description:
      "Twelve software, AI, data, financial systems, cloud, and cybersecurity practices under one roof.",
    url: "https://marvextechnologies.vercel.app/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <RevealObserver />
      <section className="border-b border-line bg-surface py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Capabilities</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Software, AI, data, and cloud infrastructure.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Twelve specialized practices built to take digital products and
                internal systems from initial design through long-term
                operation.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-line bg-line">
            <div className="grid gap-px">
              {services.map((s) => (
                <article
                  key={s.slug}
                  id={s.slug}
                  className="scroll-mt-24 bg-surface-card p-7 sm:p-10 lg:p-12"
                >
                  <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                    <div>
                      <p className="text-xs font-semibold text-brand-dark">
                        {s.category}
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
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
                      <p className="text-xs font-semibold text-ink">
                        Key deliverables
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
              ))}
            </div>
          </div>
        </Container>
      </section>

      <BigCta />
    </>
  );
}
