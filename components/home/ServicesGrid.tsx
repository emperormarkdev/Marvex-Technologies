import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import { services } from "@/data/content";

export default function ServicesGrid() {
  return (
    <section
      className="cv-auto bg-mist py-20 lg:py-28"
      aria-label="Capabilities"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                Twelve practices covering software, AI, data, and cloud.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                From customer-facing products to internal infrastructure, our
                teams handle design, engineering, security, and long-term
                reliability.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 text-sm font-medium text-brand-dark hover:underline"
            >
              View all capabilities
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-line">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group flex flex-col justify-between bg-surface-card p-7 transition-colors hover:bg-surface-elevated sm:p-8"
              >
                <div>
                  <p className="text-xs font-medium text-brand-dark">
                    {s.category}
                  </p>

                  <h3 className="mt-3 font-display text-lg font-semibold tracking-[-0.03em] text-ink group-hover:text-brand-dark sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {s.short}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-line pt-5 text-xs text-ink">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-brand-dark"
                          aria-hidden="true"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex items-center justify-end pt-2">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-dark">
                    Read details
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
