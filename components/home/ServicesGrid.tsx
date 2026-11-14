import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  Check,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Palette,
  Receipt,
  ShoppingBag,
  Smartphone,
  Zap,
} from "lucide-react";
import { Container, Reveal, SectionHeading } from "@/components/ui/primitives";
import { services } from "@/data/content";

const icons: Record<string, typeof Globe> = {
  websites: Globe,
  "mobile-apps": Smartphone,
  "web-apps": LayoutDashboard,
  ecommerce: ShoppingBag,
  "management-systems": Boxes,
  "pos-systems": Receipt,
  "ui-ux-design": Palette,
  automation: Zap,
  support: LifeBuoy,
};

export default function ServicesGrid() {
  return (
    <section className="cv-auto bg-mist py-20 lg:py-28" aria-label="Services">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Build"
            title="Everything we design, build, and support."
            sub="Whether you need a company website, a mobile app on iOS and Android, an online store, or custom software to run your operations, we build it around your business."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.slug] ?? Globe;
            return (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group row-span-4 grid grid-rows-[auto_auto_1fr_auto] rounded-3xl border border-line bg-surface-card p-7 transition-all hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_40px_-15px_rgba(0,196,122,0.16)] sm:p-8 [grid-template-rows:subgrid]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-pale text-brand-dark transition-colors group-hover:bg-brand group-hover:text-neutral-950">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                </div>

                <div className="pt-5">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.035em] text-ink group-hover:text-brand-dark">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.short}
                  </p>
                </div>

                <ul className="my-5 space-y-2.5 border-t border-line pt-5 text-xs text-ink">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark">
                    Read details
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
