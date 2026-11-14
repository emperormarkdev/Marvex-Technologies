import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { services } from "@/data/content";

export const metadata = {
  title: "Services | Marvex Technologies",
  description:
    "Company websites, mobile apps, custom web apps, online stores, business software, POS systems, UI/UX design, automation, and ongoing support.",
};

export default function ServicesPage() {
  return (
    <>
      <RevealObserver />
      <section className="hero-glow border-b border-line py-14 lg:py-22">
        <Container className="text-center">
          <Reveal>
            <Eyebrow>Our Services</Eyebrow>
            <h1 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.1rem,1.5rem+2.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-ink">
              Websites, apps, and custom software built for your business.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Every project starts with a clear plan, a fixed delivery date, and
              a fixed price so you know what you are getting from day one.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <div className="space-y-6">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i, 2) * 60}>
                <article
                  id={s.slug}
                  className="scroll-mt-24 rounded-3xl border border-line bg-surface-card p-7 sm:p-10"
                >
                  <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark">
                        <Clock size={13} aria-hidden="true" />
                        Ready in {s.timeline}
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
                        {s.title}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-muted">
                        {s.description}
                      </p>
                      <Link
                        href={`/contact?service=${s.slug}`}
                        className="btn-press mt-7 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-medium text-surface hover:bg-brand hover:text-white"
                      >
                        Request this service
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>

                    <div className="rounded-2xl border border-line bg-mist p-6 sm:p-7">
                      <p className="text-xs font-semibold text-ink">
                        What&apos;s included
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
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <BigCta />
    </>
  );
}
