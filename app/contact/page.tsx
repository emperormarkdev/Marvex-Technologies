"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
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
    email: "",
    phone: "",
    service: preselected,
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg(null);

    const selectedService =
      services.find((s) => s.slug === form.service)?.title ?? form.service;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service: selectedService,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setErrorMsg(
          data.error ?? "Could not send message. Please try again shortly."
        );
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg("Network error while sending message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <RevealObserver />
      <section className="hero-glow border-b border-line py-14 lg:py-22">
        <Container className="text-center">
          <Reveal>
            <Eyebrow>Contact Us</Eyebrow>
            <h1 className="mx-auto mt-3 max-w-3xl font-display text-[clamp(2.1rem,1.5rem+2.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-ink">
              Let&apos;s talk about your project.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Send us a direct message below or reach out by phone or email. We
              respond within one business day.
            </p>
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
                      Message sent directly to our team
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      Thank you for reaching out. We have received your message
                      and will get back to you within one business day. You can
                      also call us on {siteConfig.phoneDisplay}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          company: "",
                          email: "",
                          phone: "",
                          service: preselected,
                          message: "",
                        });
                      }}
                      className="btn-press mt-6 rounded-xl border border-line bg-surface-elevated px-5 py-2.5 text-sm font-medium text-ink hover:border-brand"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
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
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Adaeze Okafor"
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
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Shopmax Ltd"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-medium text-ink"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@company.com"
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
                        required
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+234 904 044 7548"
                        className={inputCls}
                      />
                    </div>

                    <div className="sm:col-span-2">
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

                    {errorMsg && (
                      <div
                        role="alert"
                        className="sm:col-span-2 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-500"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        disabled={sending}
                        className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-8 py-4 text-sm font-medium text-surface hover:bg-brand hover:text-white disabled:opacity-60 sm:w-auto"
                      >
                        {sending ? (
                          <>
                            <Loader2
                              size={16}
                              className="animate-spin"
                              aria-hidden="true"
                            />
                            Sending message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight size={16} aria-hidden="true" />
                          </>
                        )}
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
                  <ul className="mt-5 space-y-4 text-sm text-ink">
                    <li className="flex items-start gap-3">
                      <Mail
                        size={18}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${siteConfig.emailRecipient}`}
                        aria-label={`Email ${siteConfig.email}`}
                        className="break-all hover:text-brand-dark"
                      >
                        {siteConfig.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone
                        size={18}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <a
                        href={`tel:${siteConfig.phoneHref}`}
                        className="hover:text-brand-dark"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin
                        size={18}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <span>{siteConfig.location}</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-line bg-surface-card p-7 sm:p-8">
                  <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                    What happens next?
                  </h2>
                  <ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                    <li>
                      <strong className="font-semibold text-ink">1.</strong> We
                      reply within one business day.
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">2.</strong> We
                      have a quick chat to understand your business.
                    </li>
                    <li>
                      <strong className="font-semibold text-ink">3.</strong> You
                      get a clear plan, delivery date, and fixed price.
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
