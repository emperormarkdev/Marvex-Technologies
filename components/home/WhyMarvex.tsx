import {
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { Container, Reveal, SectionHeading } from "@/components/ui/primitives";

const points = [
  {
    icon: HeartHandshake,
    title: "Set up for you, start to finish",
    text: "We do not just send you a link and walk away. We set everything up, move your existing product lists or records over, and make sure it works for your business.",
  },
  {
    icon: GraduationCap,
    title: "Practical training for your team",
    text: "We teach your cashiers, managers, and staff how to use everything step by step so your whole team feels confident from day one.",
  },
  {
    icon: ShieldCheck,
    title: "100% yours, with no lock in",
    text: "Your website, your domain name, and all your business records belong completely to you. No hidden monthly seat fees.",
  },
  {
    icon: FileCheck2,
    title: "Clear plan & fixed price upfront",
    text: "You get a clear plan showing what we are building, when it will be ready, and the exact cost before we begin, with no surprise charges.",
  },
];

export default function WhyMarvex() {
  return (
    <section
      className="border-y border-line bg-surface py-20 lg:py-28"
      aria-label="Why choose Marvex"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Businesses Choose Us"
            title="Built around your business, not just handed over."
            sub="We make technology simple and stress free, handling the design, setup, staff training, and ongoing care so you can focus on running your business."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface-card p-7 transition-colors hover:border-brand">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                    <p.icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {p.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
