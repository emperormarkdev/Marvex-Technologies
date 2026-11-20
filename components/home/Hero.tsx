import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const pillars = [
  {
    index: "01",
    tag: "PLATFORMS & COMMERCE",
    title: "Web Flagships & Digital Commerce",
    desc: "High-speed corporate platforms, online storefronts, and marketplaces engineered for conversion and reliability.",
    href: "/services#websites",
  },
  {
    index: "02",
    tag: "PRODUCT ENGINEERING",
    title: "Mobile & Full-Stack Web Applications",
    desc: "Native-quality iOS, Android, and cloud web applications built for scale, security, and seamless user experience.",
    href: "/services#mobile-apps",
  },
  {
    index: "03",
    tag: "OPERATIONS & AUTOMATION",
    title: "Enterprise Systems & Retail Infrastructure",
    desc: "Custom ERP platforms, multi-branch retail systems, and automated integrations that unify your entire operation.",
    href: "/services#management-systems",
  },
];

export default function Hero() {
  return (
    <section className="hero-glow overflow-clip border-b border-line pt-12 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="flex flex-col items-start text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.08em] text-brand-dark uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand"
                aria-hidden="true"
              />
              Software Engineering &amp; Digital Systems
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.4rem,1.65rem+3.2vw,4.35rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-ink">
              Software engineered for{" "}
              <span className="text-brand-dark">ambitious businesses.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed tracking-[-0.015em] text-muted sm:text-lg">
              We architect and build digital platforms, mobile applications,
              commerce infrastructure, and custom enterprise software with the
              precision and reliability modern organizations demand.
            </p>

            <div className="mt-9 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
              <Link
                href="/contact"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-7 py-4 text-sm font-medium text-surface shadow-sm hover:bg-brand hover:text-neutral-950"
              >
                Start a Consultation
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-card px-7 py-4 text-sm font-medium text-ink hover:border-brand"
              >
                Explore Capabilities
              </Link>
            </div>
          </div>

          <div className="dark-bento overflow-hidden rounded-2xl text-white shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
              <span className="font-mono text-[11px] tracking-[0.12em] text-neutral-400 uppercase">
                Core Practice Areas
              </span>
              <span className="font-mono text-[11px] text-brand">
                03 DISCIPLINES
              </span>
            </div>

            <div className="divide-y divide-neutral-800">
              {pillars.map((p) => (
                <Link
                  key={p.title}
                  href={p.href}
                  className="group flex flex-col gap-2 px-6 py-6 transition-colors hover:bg-neutral-900/70"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] tracking-[0.08em] text-brand">
                      {p.index} / {p.tag}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-white">
                    {p.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {p.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
