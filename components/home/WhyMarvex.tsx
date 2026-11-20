"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui/primitives";

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

const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WhyMarvex() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="cv-auto border-y border-neutral-800 bg-black py-20 text-white lg:py-28"
      aria-label="How we operate"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: expoOut }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <Eyebrow dark>How we operate</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
              Clear scope, solid engineering, and long-term ownership.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
              We focus on shipping software that holds up in production, backed
              by straightforward communication and measurable delivery.
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800">
            <div className="grid gap-px sm:grid-cols-2">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={
                    prefersReduced ? false : { opacity: 0, y: 28, scale: 0.98 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.62,
                    delay: i * 0.08,
                    ease: expoOut,
                  }}
                  className="flex h-full flex-col justify-between bg-[#0a0a0a] p-7 transition-colors duration-200 hover:bg-[#111111] sm:p-8"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                      {p.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
