"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import RevealObserver from "@/components/ui/RevealObserver";
import { services, siteConfig } from "@/data/content";

const inputCls =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand focus:outline-none";

export default function ContactPage() {
  return (
    <Suspense>
      <ContactInner />
    </Suspense>
  );
}

function ContactInner() {
  const params = useSearchParams();
  const preselected = params.get("service") ?? "";
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    service: preselected,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mailtoUrl = useMemo(() => {
    const selectedService =
      services.find((s) => s.slug === form.service)?.title ?? form.service;
    const subject = `New Project Inquiry from ${form.name || form.company || "Website"}`;
    const body = [
      `Name: ${form.name}`,
      form.company ? `Business: ${form.company}` : "",
      `Phone: ${form.phone}`,
      selectedService ? `Service: ${selectedService}` : "",
      ``,
      `Message:`,
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${siteConfig.emailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <RevealObserver />
      <section className="hero-glow border-b border-line py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Contact</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Start a technical consultation.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Outline your objectives below or reach our team directly. We
                respond within one business day with next steps.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
            <Reveal>
              <div className="rounded-3xl border border-line bg-surface-card p-7 sm:p-10">
                {submitted ? (
                  <div className="flex min-h-80 flex-col items-center justify-center text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                      <CheckCircle2 size={28} aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                      Thank you for reaching out
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      Your email app has been opened with your project details.
                      You can also call us directly on {siteConfig.phoneDisplay}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn-press mt-6 rounded-xl border border-line bg-surface-elevated px-5 py-2.5 text-sm font-medium text-ink hover:border-brand"
                    >
                      Edit message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      window.location.href = mailtoUrl;
                      setSubmitted(true);
                    }}
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Full Name"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        Business Name
                      </label>
                      <input
                        id="company"
                        autoComplete="organization"
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Company/Brand Name"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        required
                        pattern="^\+?[0-9\s]{7,20}$"
                        title="Please enter a valid phone number"
                        value={form.phone}
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(
                            /[^0-9+\s]/g,
                            ""
                          );
                          setForm((f) => ({ ...f, phone: cleaned }));
                        }}
                        placeholder="+234 904 000 0000"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        What do you need help with?
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={set("service")}
                        className={inputCls}
                      >
                        <option
                          value=""
                          className="bg-surface-card text-ink"
                        >
                          Not sure yet
                        </option>
                        {services.map((s) => (
                          <option
                            key={s.slug}
                            value={s.slug}
                            className="bg-surface-card text-ink"
                          >
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="message"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        Tell us about your project *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Tell us what you want to build or improve for your business..."
                        className={`${inputCls} resize-y`}
                      />
                    </div>

                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-8 py-4 text-sm font-medium text-surface hover:bg-brand hover:text-neutral-950 sm:w-auto"
                      >
                        Send Message
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            <Reveal delay={90}>
              <aside className="flex h-full flex-col gap-5">
                <div className="rounded-3xl border border-line bg-surface-card p-7 sm:p-8">
                  <p className="text-xs font-semibold text-brand-dark">
                    Reach Us Directly
                  </p>
                  <ul className="mt-5 space-y-3 text-sm text-ink">
                    <li className="flex items-center gap-3">
                      <Mail
                        size={18}
                        className="shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${siteConfig.emailRecipient}`}
                        aria-label={`Email ${siteConfig.email}`}
                        className="inline-flex min-h-7 items-center py-1 break-all hover:text-brand-dark"
                      >
                        {siteConfig.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone
                        size={18}
                        className="shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <a
                        href={`tel:${siteConfig.phoneHref}`}
                        className="inline-flex min-h-7 items-center py-1 hover:text-brand-dark"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </li>
                    <li className="flex items-start gap-3 py-1">
                      <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <span>{siteConfig.location}</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-line bg-surface-card p-7 sm:p-8">
                  <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                    Next Steps
                  </h2>
                  <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                    <li>
                      <strong className="font-mono text-xs font-semibold text-brand-dark">
                        01.
                      </strong>{" "}
                      Our engineering team responds within one business day.
                    </li>
                    <li>
                      <strong className="font-mono text-xs font-semibold text-brand-dark">
                        02.
                      </strong>{" "}
                      We schedule a technical discovery session to review scope.
                    </li>
                    <li>
                      <strong className="font-mono text-xs font-semibold text-brand-dark">
                        03.
                      </strong>{" "}
                      You receive a clear blueprint, schedule, and fixed terms.
                    </li>
                  </ol>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
