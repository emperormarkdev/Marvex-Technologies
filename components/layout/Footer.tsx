import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Navbar";
import Year from "./Year";
import { navLinks, services, siteConfig } from "@/data/content";

function WhatsAppIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-white"
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_0.9fr_1.1fr_1.3fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              We design and build modern websites, mobile apps, online stores,
              and custom software that help your business run and grow.
            </p>
          </div>

          <nav aria-label="Company">
            <h3 className="text-xs font-semibold text-neutral-400">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-200 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-neutral-200 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="text-xs font-semibold text-neutral-400">
              What We Build
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-neutral-200 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold text-neutral-400">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-200">
              <li className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="mt-0.5 shrink-0 text-white"
                  aria-hidden="true"
                />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-white"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.emailRecipient}`}
                  aria-label={`Email ${siteConfig.email}`}
                  className="break-all transition-colors hover:text-brand"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-white"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  aria-label={`Call ${siteConfig.phoneDisplay}`}
                  className="transition-colors hover:text-brand"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon />
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${siteConfig.phoneDisplay}`}
                  className="transition-colors hover:text-brand"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="btn-press mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Start a Project
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 text-xs text-neutral-400">
          <p>
            © <Year /> {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
