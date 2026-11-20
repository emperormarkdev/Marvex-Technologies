import type { Metadata } from "next";
import {
  Building2,
  ShoppingBag,
  Sprout,
  Store,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import TrustBar from "@/components/home/TrustBar";
import { EngagementModels } from "@/components/home/Sections";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { sectors } from "@/data/content";

export const metadata: Metadata = {
  title: "Companies We Keep",
  description:
    "Trusted by organizations across commerce, logistics, hospitality, agribusiness, high-growth ventures, and enterprise services.",
  alternates: {
    canonical: "/clients",
  },
  openGraph: {
    title: "Companies We Keep | Marvex Technologies",
    description:
      "Organizations and industries that rely on Marvex Technologies for digital platforms, mobile applications, and operational software.",
    url: "https://marvextechnologies.vercel.app/clients",
  },
};

const sectorIcons = [
  Store,
  UtensilsCrossed,
  Truck,
  Sprout,
  ShoppingBag,
  Building2,
];

export default function ClientsPage() {
  return (
    <>
      <RevealObserver />
      <section className="hero-glow border-b border-line py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Clients &amp; Sectors</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Organizations we engineer for.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Partners stay with us for disciplined engineering, reliable
                deployments, and long-term technical ownership across their core
                operations.
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
              <Eyebrow>Industries Served</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-ink">
                Systems engineered around real operational demands.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                Every sector carries distinct workflows, compliance needs, and
                scale constraints. We model software directly around how your
                organization operates.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-line">
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((s, i) => {
                const Icon = sectorIcons[i] ?? Building2;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <div
                    key={s.title}
                    className="flex h-full flex-col justify-between bg-surface-card p-7 sm:p-8"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs font-medium tracking-[0.08em] text-muted">
                          {num}
                        </span>
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-pale text-brand-dark">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">
                        {s.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <EngagementModels />
      <BigCta />
    </>
  );
}
