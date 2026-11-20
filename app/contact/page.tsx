"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import RevealObserver from "@/components/ui/RevealObserver";
import { services, siteConfig } from "@/data/content";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand focus:outline-none";

const timeSlots = [
  { label: "10:00 AM", hour: 10, minute: 0 },
  { label: "11:30 AM", hour: 11, minute: 30 },
  { label: "2:00 PM", hour: 14, minute: 0 },
  { label: "3:30 PM", hour: 15, minute: 30 },
  { label: "5:00 PM", hour: 17, minute: 0 },
] as const;

const callTopics = [
  "Technical discovery call",
  "Product & platform architecture",
  "AI, data & automation scoping",
  "Enterprise ERP or retail rollout",
  "Ongoing engineering & SLA",
];

function getUpcomingBusinessDays(count: number) {
  const days: { iso: string; dayLabel: string; dateLabel: string; date: Date }[] =
    [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);

  while (days.length < count) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      const d = new Date(cursor);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
      const dateLabel = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      days.push({ iso, dayLabel, dateLabel, date: d });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function formatIcsUtc(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function downloadCalendarInvite({
  date,
  hour,
  minute,
  topic,
  name,
  company,
  phone,
}: {
  date: Date;
  hour: number;
  minute: number;
  topic: string;
  name: string;
  company: string;
  phone: string;
}) {
  // Convert WAT (UTC+1) to UTC by subtracting 1 hour
  const startUtc = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hour - 1,
      minute,
      0
    )
  );
  const endUtc = new Date(startUtc.getTime() + 30 * 60 * 1000);
  const nowUtc = new Date();

  const summary = `${siteConfig.name}: ${topic}`;
  const description = [
    `Consultation with ${siteConfig.name}`,
    `Client: ${name}${company ? ` (${company})` : ""}`,
    `Phone: ${phone}`,
    `Direct line: ${siteConfig.phoneDisplay}`,
    `Email: ${siteConfig.email}`,
  ].join("\\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${siteConfig.name}//Consultation//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@marvextechnologies.vercel.app`,
    `DTSTAMP:${formatIcsUtc(nowUtc)}`,
    `DTSTART:${formatIcsUtc(startUtc)}`,
    `DTEND:${formatIcsUtc(endUtc)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:Phone / Video Call (${siteConfig.phoneDisplay})`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "marvex-discovery-call.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

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
  const prefersReduced = useReducedMotion();

  const [mode, setMode] = useState<"inquiry" | "call">("inquiry");

  // Inquiry state
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    service: preselected,
    message: "",
  });
  const [submittedChannel, setSubmittedChannel] = useState<
    "whatsapp" | "email" | null
  >(null);

  // Call scheduler state
  const upcomingDays = useMemo(() => getUpcomingBusinessDays(6), []);
  const [selectedDayIso, setSelectedDayIso] = useState(
    () => upcomingDays[0]?.iso ?? ""
  );
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);
  const [callTopic, setCallTopic] = useState(callTopics[0]);
  const [callForm, setCallForm] = useState({
    name: "",
    company: "",
    phone: "",
  });
  const [callBooked, setCallBooked] = useState(false);

  const selectedDay =
    upcomingDays.find((d) => d.iso === selectedDayIso) ?? upcomingDays[0];
  const selectedSlot = timeSlots[selectedSlotIdx] ?? timeSlots[0];

  const inquiryText = useMemo(() => {
    const selectedService =
      services.find((s) => s.slug === form.service)?.title ?? form.service;
    return [
      `New Project Inquiry`,
      `Name: ${form.name}`,
      form.company ? `Organization: ${form.company}` : "",
      `Phone: ${form.phone}`,
      selectedService ? `Capability: ${selectedService}` : "",
      ``,
      `Details:`,
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
  }, [form]);

  const mailtoUrl = useMemo(() => {
    const subject = `Project Inquiry from ${form.name || form.company || "Website"}`;
    return `mailto:${siteConfig.emailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryText)}`;
  }, [form.name, form.company, inquiryText]);

  const whatsappInquiryUrl = useMemo(
    () =>
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(inquiryText)}`,
    [inquiryText]
  );

  const callSummaryText = useMemo(() => {
    const dateStr = selectedDay
      ? `${selectedDay.dayLabel}, ${selectedDay.dateLabel}`
      : "";
    return [
      `Discovery Call Booking`,
      `Date: ${dateStr} at ${selectedSlot.label} (WAT)`,
      `Topic: ${callTopic}`,
      `Name: ${callForm.name}`,
      callForm.company ? `Organization: ${callForm.company}` : "",
      `Phone: ${callForm.phone}`,
    ]
      .filter(Boolean)
      .join("\n");
  }, [selectedDay, selectedSlot, callTopic, callForm]);

  const whatsappBookingUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(callSummaryText)}`;
  const emailBookingUrl = `mailto:${siteConfig.emailRecipient}?subject=${encodeURIComponent(`Discovery Call: ${callTopic}`)}&body=${encodeURIComponent(callSummaryText)}`;

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const triggerInviteDownload = () => {
    if (!selectedDay) return;
    downloadCalendarInvite({
      date: selectedDay.date,
      hour: selectedSlot.hour,
      minute: selectedSlot.minute,
      topic: callTopic,
      name: callForm.name,
      company: callForm.company,
      phone: callForm.phone,
    });
  };

  return (
    <>
      <RevealObserver />
      <section className="border-b border-line bg-surface py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Contact</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Start a project conversation.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Send a message on WhatsApp or email, or book a 30-minute call.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
            <Reveal>
              <div className="rounded-2xl border border-line bg-surface-card p-6 sm:p-10">
                <div
                  role="tablist"
                  aria-label="Contact options"
                  className="mb-8 inline-flex rounded-xl border border-line bg-mist p-1"
                >
                  {(
                    [
                      { id: "inquiry", label: "Send an inquiry" },
                      { id: "call", label: "Book a discovery call" },
                    ] as const
                  ).map((tab) => {
                    const active = mode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setMode(tab.id)}
                        className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          active ? "text-ink" : "text-muted hover:text-ink"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId={
                              prefersReduced ? undefined : "contact-tab"
                            }
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 34,
                            }}
                            className="absolute inset-0 rounded-lg bg-surface-elevated shadow-xs ring-1 ring-line"
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {mode === "inquiry" ? (
                    <motion.div
                      key="inquiry"
                      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {submittedChannel ? (
                        <div className="flex min-h-80 flex-col items-center justify-center text-center">
                          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                            <CheckCircle2 size={28} aria-hidden="true" />
                          </span>
                          <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                            Inquiry ready to send
                          </h2>
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                            {submittedChannel === "whatsapp"
                              ? "WhatsApp has been opened with your formatted project details. Send the message and our team will reply promptly."
                              : `Your email app has been opened with your inquiry. You can also message us directly on ${siteConfig.phoneDisplay}.`}
                          </p>
                          <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <a
                              href={whatsappInquiryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-press inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
                            >
                              <MessageCircle size={15} aria-hidden="true" />
                              Open WhatsApp
                            </a>
                            <button
                              type="button"
                              onClick={() => setSubmittedChannel(null)}
                              className="btn-press rounded-xl border border-line bg-surface-elevated px-5 py-2.5 text-sm font-medium text-ink hover:border-brand"
                            >
                              Edit details
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            window.open(
                              whatsappInquiryUrl,
                              "_blank",
                              "noopener,noreferrer"
                            );
                            setSubmittedChannel("whatsapp");
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
                              placeholder="Adaeze Okafor"
                              className={inputCls}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="company"
                              className="mb-2 block text-xs font-medium text-ink"
                            >
                              Organization
                            </label>
                            <input
                              id="company"
                              autoComplete="organization"
                              value={form.company}
                              onChange={set("company")}
                              placeholder="Shopmax Ltd"
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
                              title="Please enter a valid phone number using digits only"
                              value={form.phone}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(
                                  /[^0-9+\s]/g,
                                  ""
                                );
                                setForm((f) => ({ ...f, phone: cleaned }));
                              }}
                              placeholder="+234 904 044 7548"
                              className={inputCls}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="service"
                              className="mb-2 block text-xs font-medium text-ink"
                            >
                              Primary capability
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
                              placeholder="Outline what you want to build, modernize, or automate..."
                              className={`${inputCls} resize-y`}
                            />
                          </div>

                          <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row">
                            <button
                              type="submit"
                              className="btn-press inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
                            >
                              <MessageCircle size={16} aria-hidden="true" />
                              Send via WhatsApp
                              <ArrowRight size={15} aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                const formEl = e.currentTarget.form;
                                if (formEl && !formEl.reportValidity()) return;
                                window.location.href = mailtoUrl;
                                setSubmittedChannel("email");
                              }}
                              className="btn-press inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-surface-elevated px-6 py-3.5 text-sm font-medium text-ink hover:border-brand"
                            >
                              <Mail size={15} aria-hidden="true" />
                              Send via Email
                            </button>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="call"
                      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {callBooked ? (
                        <div className="flex min-h-80 flex-col items-center justify-center text-center">
                          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                            <Calendar size={26} aria-hidden="true" />
                          </span>
                          <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                            Calendar invite downloaded
                          </h2>
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                            Your <strong>.ics</strong> calendar invite for{" "}
                            <strong className="text-ink">
                              {selectedDay?.dayLabel}, {selectedDay?.dateLabel}{" "}
                              at {selectedSlot.label} (WAT)
                            </strong>{" "}
                            has been saved. Confirm your slot on WhatsApp or
                            email so our engineer locks it in.
                          </p>
                          <div className="mt-6 flex flex-wrap justify-center gap-3">
                            <a
                              href={whatsappBookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-press inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
                            >
                              <MessageCircle size={15} aria-hidden="true" />
                              Confirm on WhatsApp
                            </a>
                            <a
                              href={emailBookingUrl}
                              className="btn-press inline-flex items-center gap-2 rounded-xl border border-line bg-surface-elevated px-5 py-3 text-sm font-medium text-ink hover:border-brand"
                            >
                              <Mail size={15} aria-hidden="true" />
                              Confirm via Email
                            </a>
                            <button
                              type="button"
                              onClick={triggerInviteDownload}
                              className="btn-press inline-flex items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-medium text-muted hover:border-brand hover:text-ink"
                            >
                              <Download size={15} aria-hidden="true" />
                              Download .ics again
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            triggerInviteDownload();
                            setCallBooked(true);
                          }}
                          className="space-y-6"
                        >
                          <div>
                            <p className="mb-2.5 text-xs font-medium text-ink">
                              Day
                            </p>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                              {upcomingDays.map((d) => {
                                const active = d.iso === selectedDayIso;
                                return (
                                  <button
                                    key={d.iso}
                                    type="button"
                                    onClick={() => setSelectedDayIso(d.iso)}
                                    aria-pressed={active}
                                    className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                                      active
                                        ? "border-brand bg-brand text-neutral-950"
                                        : "border-line bg-surface text-ink hover:border-brand"
                                    }`}
                                  >
                                    <span className="block text-[11px] font-medium opacity-80">
                                      {d.dayLabel}
                                    </span>
                                    <span className="mt-0.5 block text-sm font-semibold">
                                      {d.dateLabel}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <p className="mb-2.5 text-xs font-medium text-ink">
                              Time (WAT)
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {timeSlots.map((slot, idx) => {
                                const active = idx === selectedSlotIdx;
                                return (
                                  <button
                                    key={slot.label}
                                    type="button"
                                    onClick={() => setSelectedSlotIdx(idx)}
                                    aria-pressed={active}
                                    className={`min-h-10 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                                      active
                                        ? "border-brand bg-brand text-neutral-950"
                                        : "border-line bg-surface text-ink hover:border-brand"
                                    }`}
                                  >
                                    {slot.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="call-topic"
                                className="mb-2 block text-xs font-medium text-ink"
                              >
                                Consultation topic
                              </label>
                              <select
                                id="call-topic"
                                value={callTopic}
                                onChange={(e) => setCallTopic(e.target.value)}
                                className={inputCls}
                              >
                                {callTopics.map((t) => (
                                  <option
                                    key={t}
                                    value={t}
                                    className="bg-surface-card text-ink"
                                  >
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor="call-name"
                                className="mb-2 block text-xs font-medium text-ink"
                              >
                                Your Name *
                              </label>
                              <input
                                id="call-name"
                                autoComplete="name"
                                required
                                value={callForm.name}
                                onChange={(e) =>
                                  setCallForm((f) => ({
                                    ...f,
                                    name: e.target.value,
                                  }))
                                }
                                placeholder="Adaeze Okafor"
                                className={inputCls}
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="call-company"
                                className="mb-2 block text-xs font-medium text-ink"
                              >
                                Organization
                              </label>
                              <input
                                id="call-company"
                                autoComplete="organization"
                                value={callForm.company}
                                onChange={(e) =>
                                  setCallForm((f) => ({
                                    ...f,
                                    company: e.target.value,
                                  }))
                                }
                                placeholder="Shopmax Ltd"
                                className={inputCls}
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="call-phone"
                                className="mb-2 block text-xs font-medium text-ink"
                              >
                                Phone / WhatsApp Number *
                              </label>
                              <input
                                id="call-phone"
                                type="tel"
                                inputMode="numeric"
                                autoComplete="tel"
                                required
                                pattern="^\+?[0-9\s]{7,20}$"
                                title="Please enter a valid phone number using digits only"
                                value={callForm.phone}
                                onChange={(e) => {
                                  const cleaned = e.target.value.replace(
                                    /[^0-9+\s]/g,
                                    ""
                                  );
                                  setCallForm((f) => ({
                                    ...f,
                                    phone: cleaned,
                                  }));
                                }}
                                placeholder="+234 904 044 7548"
                                className={inputCls}
                              />
                            </div>
                          </div>

                          <div className="pt-1">
                            <button
                              type="submit"
                              className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-7 py-4 text-sm font-medium text-surface hover:bg-brand hover:text-neutral-950 sm:w-auto"
                            >
                              <Calendar size={16} aria-hidden="true" />
                              Reserve slot &amp; download .ics invite
                              <ArrowRight size={15} aria-hidden="true" />
                            </button>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <aside className="flex h-full flex-col gap-5">
                <div className="rounded-2xl border border-line bg-surface-card p-7 sm:p-8">
                  <p className="text-xs font-semibold text-brand-dark">
                    Reach us directly
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
                    Need a structured brief first?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Use our scope builder to list your capabilities and save a
                    clean PDF brief.
                  </p>
                  <Link
                    href="/scope"
                    className="btn-press mt-5 inline-flex items-center gap-2 rounded-xl border border-line bg-surface-elevated px-4 py-2.5 text-sm font-medium text-ink hover:border-brand"
                  >
                    Open scope builder
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
