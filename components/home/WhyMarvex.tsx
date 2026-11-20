import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";

const principles = [
  {
    title: "Single-team accountability",
    text: "Architecture, interface design, engineering, data migration, and cloud deployment are handled by one team so nothing gets lost between vendors.",
  },
  {
    title: "Real adoption across your teams",
    text: "Software only pays off when people actually use it. Every major delivery includes practical training and clear documentation for staff and leadership.",
  },
  {
    title: "Full ownership of code and data",
    text: "Your source code, cloud accounts, domains, and records belong strictly to your company. No proprietary lock-in and no surprise per-seat licensing.",
  },
  {
    title: "Written scope before work begins",
    text: "Every engagement starts with a documented blueprint, weekly staging reviews, and agreed commercial terms so you always know where things stand.",
  },
];

export default function WhyMarvex() {
  return (
    <section
      className="cv-auto border-y border-neutral-800 bg-black py-20 text-white lg:py-28"
      aria-label="How we operate"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Eyebrow dark>How we operate</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
                Clear scope, solid engineering, and long-term ownership.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
                We focus on shipping software that holds up in production,
                backed by straightforward communication and measurable delivery.
              </p>
            </div>
          </Reveal>

          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800">
            <div className="grid gap-px sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div className="flex h-full flex-col justify-between bg-[#0a0a0a] p-7 sm:p-8">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-white">
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
