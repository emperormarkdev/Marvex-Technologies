import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Navbar";
import Year from "./Year";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import { navLinks, services, siteConfig } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_0.9fr_1.1fr_1.3fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Software, AI systems, mobile applications, financial tools, and
              cloud infrastructure built to last.
            </p>
          </div>

          <nav aria-label="Company">
            <h3 className="text-xs font-semibold text-neutral-400">Company</h3>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-7 items-center py-1 text-neutral-200 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-7 items-center py-1 text-neutral-200 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="text-xs font-semibold text-neutral-400">
              Capabilities
            </h3>
            <ul className="mt-4 space-y-1.5 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="inline-flex min-h-7 items-center py-1 text-neutral-200 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="inline-flex min-h-7 items-center gap-1.5 py-1 font-medium text-brand transition-colors hover:text-white"
                >
                  All 12 capabilities
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold text-neutral-400">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-200">
              <li className="flex items-start gap-3 py-1">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-white"
                  aria-hidden="true"
                />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={17}
                  className="shrink-0 text-white"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.emailRecipient}`}
                  aria-label={`Email ${siteConfig.email}`}
                  className="inline-flex min-h-7 items-center py-1 break-all transition-colors hover:text-brand"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={17}
                  className="shrink-0 text-white"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  aria-label={`Call ${siteConfig.phoneDisplay}`}
                  className="inline-flex min-h-7 items-center py-1 transition-colors hover:text-brand"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppLogo size={17} className="shrink-0 text-white" />
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${siteConfig.phoneDisplay}`}
                  className="inline-flex min-h-7 items-center py-1 transition-colors hover:text-brand"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="btn-press mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-neutral-800 pt-6 text-xs text-neutral-400 sm:flex-row sm:items-center">
          <p>
            © <Year /> {siteConfig.name}. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
