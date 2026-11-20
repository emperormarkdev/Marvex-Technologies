import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";

const principles = [
  {
    no: "01",
    title: "End-to-End Accountability",
    text: "Architecture, interface design, engineering, data migration, and cloud deployment executed by one cohesive team with zero fragmented handoffs.",
  },
  {
    no: "02",
    title: "Structured Organizational Adoption",
    text: "Software only creates value when teams use it effectively. Every delivery includes tailored onboarding, role-based training, and operational documentation.",
  },
  {
    no: "03",
    title: "Complete IP & Infrastructure Ownership",
    text: "Your source code, cloud accounts, domains, and business data belong strictly to your organization. Zero proprietary lock-in or recurring seat tax.",
  },
  {
    no: "04",
    title: "Fixed Scope & Transparent Milestones",
    text: "Every engagement is governed by a documented technical blueprint, weekly staging reviews, and agreed commercial terms before development begins.",
  },
];

export default function WhyMarvex() {
  return (
    <section
      className="cv-auto border-y border-neutral-800 bg-black py-20 text-white lg:py-28"
      aria-label="Engineering principles"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow dark>Engineering Standards</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
                Built to endure. Delivered with precision.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
                We combine disciplined software engineering with clear
                commercial governance so every system ships on schedule and
                scales cleanly over time.
              </p>
            </div>
          </Reveal>

          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800">
            <div className="grid gap-px sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div className="flex h-full flex-col justify-between bg-[#0a0a0a] p-7 sm:p-8">
                    <div>
                      <span className="font-mono text-xs font-medium tracking-[0.1em] text-brand">
                        {p.no}
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.03em] text-white">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
