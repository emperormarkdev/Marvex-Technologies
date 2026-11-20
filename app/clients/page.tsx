import type { Metadata } from "next";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import TrustBar from "@/components/home/TrustBar";
import { EngagementModels } from "@/components/home/Sections";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { sectors } from "@/data/content";

export const metadata: Metadata = {
  title: "Companies We Keep",
  description:
    "Trusted by organizations across commerce, financial services, logistics, hospitality, agribusiness, and high-growth ventures.",
  alternates: {
    canonical: "/clients",
  },
  openGraph: {
    title: "Companies We Keep | Marvex Technologies",
    description:
      "Organizations and industries that rely on Marvex Technologies for web platforms, mobile apps, and operational software.",
    url: "https://marvextechnologies.vercel.app/clients",
  },
};

export default function ClientsPage() {
  return (
    <>
      <RevealObserver />
      <section className="border-b border-line bg-surface py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Clients &amp; sectors</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Organizations we build for.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Partners stay with us for reliable engineering, clean
                deployments, and direct technical accountability across their
                core operations.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <TrustBar />

      <section className="cv-auto bg-surface py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Industries served</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                Software shaped around how each industry operates.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Every sector carries its own workflows, compliance rules, and
                volume demands. We build software directly around your real
                operations.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-line">
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((s) => (
                <div
                  key={s.title}
                  className="flex h-full flex-col justify-between bg-surface-card p-7 sm:p-8"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <EngagementModels />
      <BigCta />
    </>
  );
}
