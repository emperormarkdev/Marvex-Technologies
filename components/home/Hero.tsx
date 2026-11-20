import Link from "next/link";
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

export default function Hero() {
  return (
    <section className="border-b border-line bg-surface pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <div className="max-w-4xl">
          <h1 className="font-display text-[clamp(2.6rem,1.7rem+3.6vw,4.75rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-ink">
            Software, AI systems, and digital platforms built to last.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            We design, engineer, and maintain web platforms, mobile
            applications, financial systems, internal operations software, and
            cloud infrastructure for serious organizations.
          </p>

          <div className="mt-10 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <Link
              href="/contact"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-7 py-4 text-sm font-medium text-surface hover:bg-brand hover:text-neutral-950"
            >
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-card px-7 py-4 text-sm font-medium text-ink hover:border-brand"
            >
              Explore capabilities
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-10 sm:mt-22">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {overview.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block space-y-2"
              >
                <h2 className="font-display text-base font-semibold tracking-[-0.025em] text-ink transition-colors group-hover:text-brand-dark">
                  {item.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
