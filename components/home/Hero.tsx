"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const overview = [
  {
    title: "Web & Mobile",
    desc: "Corporate platforms, SaaS products, and iOS & Android apps.",
    href: "/services#digital-platforms",
  },
  {
    title: "AI & Data",
    desc: "Private document search, AI assistants, and live BI reporting.",
    href: "/services#ai-engineering",
  },
  {
    title: "Commerce & FinTech",
    desc: "Storefronts, multi-branch retail, wallets, and payment rails.",
    href: "/services#fintech-payments",
  },
  {
    title: "Cloud & Security",
    desc: "Resilient infrastructure, DevOps, access governance, and migrations.",
    href: "/services#cloud-devops",
  },
];

const headlineLines = [
  "Software, AI systems,",
  "and digital platforms",
  "built to last.",
];

const expoOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="border-b border-line bg-surface pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <div className="max-w-4xl">
          <h1 className="font-display text-[clamp(2.6rem,1.7rem+3.6vw,4.75rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-ink">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={prefersReduced ? false : { y: "105%", opacity: 0.2 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.72,
                    delay: i * 0.09,
                    ease: expoOut,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: expoOut }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            We design, engineer, and maintain web platforms, mobile
            applications, financial systems, internal operations software, and
            cloud infrastructure for serious organizations.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: expoOut }}
            className="mt-10 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row"
          >
            <Link
              href="/contact"
              className="group btn-press inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-7 py-4 text-sm font-medium text-surface hover:bg-brand hover:text-neutral-950"
            >
              Start a project
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/services"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-card px-7 py-4 text-sm font-medium text-ink hover:border-brand"
            >
              Explore capabilities
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-line pt-10 sm:mt-22">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {overview.map((item, i) => (
              <motion.div
                key={item.title}
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.58,
                  delay: 0.44 + i * 0.07,
                  ease: expoOut,
                }}
              >
                <Link
                  href={item.href}
                  className="group block space-y-2 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <h2 className="font-display text-base font-semibold tracking-[-0.025em] text-ink transition-colors group-hover:text-brand-dark">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
