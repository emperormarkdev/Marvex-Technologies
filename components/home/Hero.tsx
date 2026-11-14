import Link from "next/link";
import { ArrowRight, Globe, LayoutGrid, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const pillars = [
  {
    icon: Globe,
    title: "Websites & Online Stores",
    desc: "Fast, modern company websites and online shops that make your business look great and turn visitors into customers.",
    href: "/services#websites",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Apps",
    desc: "Custom iPhone, Android, and web apps built from scratch for bookings, deliveries, customer portals, or your next big idea.",
    href: "/services#mobile-apps",
  },
  {
    icon: LayoutGrid,
    title: "Business & Retail Software",
    desc: "Custom management software, POS systems, and smart automation to keep your sales, stock, and staff in one simple place.",
    href: "/services#management-systems",
  },
];

export default function Hero() {
  return (
    <section className="hero-glow overflow-clip border-b border-line pt-10 pb-16 sm:pt-16 sm:pb-24">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="font-display text-[clamp(2.35rem,1.6rem+3.4vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
            We build websites, apps, and software that{" "}
            <span className="text-brand-dark">help your business grow.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed tracking-[-0.015em] text-muted sm:text-xl">
            From company websites and mobile apps to online stores and custom
            software for your daily operations, we design it, build it, train
            your team, and stay to support you.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href="/contact"
              className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-8 py-4 text-sm font-medium text-surface shadow-sm hover:bg-brand hover:text-white sm:w-auto"
            >
              Start a Project
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/services"
              className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface-card px-8 py-4 text-sm font-medium text-ink hover:border-brand sm:w-auto"
            >
              View Our Services
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-18">
          {pillars.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-surface-card p-7 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_40px_-15px_rgba(0,196,122,0.18)]"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-pale text-brand-dark transition-colors group-hover:bg-brand group-hover:text-white">
                  <p.icon size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-xl font-semibold tracking-[-0.035em] text-ink">
                  {p.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark">
                Read details
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
