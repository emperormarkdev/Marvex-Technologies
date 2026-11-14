import {
  Building2,
  ShoppingBag,
  Sprout,
  Store,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import {
  Container,
  Eyebrow,
  Reveal,
  SectionHeading,
} from "@/components/ui/primitives";
import TrustBar from "@/components/home/TrustBar";
import { EngagementModels } from "@/components/home/Sections";
import { BigCta } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { sectors } from "@/data/content";

export const metadata = {
  title: "Companies We Keep | Marvex Technologies",
  description:
    "Trusted by shops, restaurants, farms, and growing businesses.",
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
      <section className="hero-glow border-b border-line py-14 lg:py-22">
        <Container className="text-center">
          <Reveal>
            <Eyebrow>Our Clients</Eyebrow>
            <h1 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.1rem,1.5rem+2.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-ink">
              Companies we keep running.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Our clients stay with us because we build easy websites and
              software, train their staff properly, and stay available whenever
              they need support.
            </p>
          </Reveal>
        </Container>
      </section>

      <TrustBar />

      <section className="bg-surface py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Who We Work With"
              title="Built for the way your business works."
              sub="Every business is different. We learn how your team works first, then set up the right tools around your daily routine."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => {
              const Icon = sectorIcons[i] ?? Building2;
              return (
                <Reveal key={s.title} delay={(i % 3) * 70}>
                  <div className="flex h-full flex-col rounded-3xl border border-line bg-surface-card p-7 transition-colors hover:border-brand">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <EngagementModels />
      <BigCta />
    </>
  );
}
