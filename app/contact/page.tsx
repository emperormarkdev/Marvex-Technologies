"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
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

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function toIsoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getFirstAvailableBusinessDay(): Date {
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);
  while (cursor.getDay() === 0 || cursor.getDay() === 6) {
    cursor.setDate(cursor.getDate() + 1);
  }
  return cursor;
}

function buildCalendarMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert JS Sunday=0..Saturday=6 into Monday=0..Sunday=6
  const startOffset = (firstOfMonth.getDay() + 6) % 7;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);

  const cells: Array<{
    iso: string;
    dayNumber: number;
    date: Date;
    isToday: boolean;
    disabled: boolean;
  } | null> = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const isPastOrToday = d.getTime() <= today.getTime();
    const isTooFar = d.getTime() > maxDate.getTime();

    cells.push({
      iso: toIsoDate(d),
      dayNumber: day,
      date: d,
      isToday: d.getTime() === today.getTime(),
      disabled: isWeekend || isPastOrToday || isTooFar,
    });
  }

  return cells;
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
  email,
  company,
  phone,
}: {
  date: Date;
  hour: number;
  minute: number;
  topic: string;
  name: string;
  email: string;
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
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    `Direct line: ${siteConfig.phoneDisplay}`,
    `Contact: ${siteConfig.email}`,
  ]
    .filter(Boolean)
    .join("\\n");

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
    email: "",
    company: "",
    phone: "",
    service: preselected,
    message: "",
    website: "",
  });
  const [inquiryStatus, setInquiryStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");
  const [inquiryDelivered, setInquiryDelivered] = useState(true);
  const [inquiryMailto, setInquiryMailto] = useState("");
  const [inquiryError, setInquiryError] = useState("");

  // Interactive month calendar state
  const initialDate = useMemo(() => getFirstAvailableBusinessDay(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [viewYear, setViewYear] = useState<number>(() =>
    initialDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState<number>(() =>
    initialDate.getMonth()
  );
  const [selectedSlotIdx, setSelectedSlotIdx] = useState(0);
  const [callTopic, setCallTopic] = useState(callTopics[0]);
  const [callForm, setCallForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
  });
  const [callStatus, setCallStatus] = useState<
    "idle" | "submitting" | "booked" | "error"
  >("idle");
  const [callDelivered, setCallDelivered] = useState(true);
  const [callMailto, setCallMailto] = useState("");
  const [callError, setCallError] = useState("");

  const selectedIso = useMemo(() => toIsoDate(selectedDate), [selectedDate]);
  const selectedSlot = timeSlots[selectedSlotIdx] ?? timeSlots[0];

  const monthCells = useMemo(
    () => buildCalendarMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const monthLabel = useMemo(
    () =>
      new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    [viewYear, viewMonth]
  );

  const formattedSelectedDate = useMemo(
    () =>
      selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [selectedDate]
  );

  const canGoPrevMonth = useMemo(() => {
    const now = new Date();
    return (
      viewYear > now.getFullYear() ||
      (viewYear === now.getFullYear() && viewMonth > now.getMonth())
    );
  }, [viewYear, viewMonth]);

  const canGoNextMonth = useMemo(() => {
    const limit = new Date();
    limit.setMonth(limit.getMonth() + 3);
    return (
      viewYear < limit.getFullYear() ||
      (viewYear === limit.getFullYear() && viewMonth < limit.getMonth())
    );
  }, [viewYear, viewMonth]);

  const shiftMonth = (delta: -1 | 1) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const triggerInviteDownload = () => {
    downloadCalendarInvite({
      date: selectedDate,
      hour: selectedSlot.hour,
      minute: selectedSlot.minute,
      topic: callTopic,
      name: callForm.name,
      email: callForm.email,
      company: callForm.company,
      phone: callForm.phone,
    });
  };

  async function handleInquirySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInquiryStatus("submitting");
    setInquiryError("");

    const selectedService =
      services.find((s) => s.slug === form.service)?.title ?? form.service;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "inquiry",
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          service: selectedService,
          message: form.message,
          website: form.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        delivered?: boolean;
        subject?: string;
        text?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setInquiryError(
          data.error || "Unable to send your inquiry. Please try again."
        );
        setInquiryStatus("error");
        return;
      }
      setInquiryDelivered(Boolean(data.delivered));
      if (!data.delivered && data.subject && data.text) {
        setInquiryMailto(
          `mailto:${siteConfig.emailRecipient}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.text)}`
        );
      }
      setInquiryStatus("sent");
    } catch {
      setInquiryError(
        "Network error while sending your inquiry. Please try again."
      );
      setInquiryStatus("error");
    }
  }

  async function handleCallSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCallStatus("submitting");
    setCallError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "call",
          date: formattedSelectedDate,
          time: selectedSlot.label,
          topic: callTopic,
          name: callForm.name,
          email: callForm.email,
          company: callForm.company,
          phone: callForm.phone,
          website: callForm.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        delivered?: boolean;
        subject?: string;
        text?: string;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setCallError(
          data.error || "Unable to reserve your call slot. Please try again."
        );
        setCallStatus("error");
        return;
      }
      setCallDelivered(Boolean(data.delivered));
      if (!data.delivered && data.subject && data.text) {
        setCallMailto(
          `mailto:${siteConfig.emailRecipient}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.text)}`
        );
      }
      setCallStatus("booked");
      triggerInviteDownload();
    } catch {
      setCallError(
        "Network error while booking your call. Please try again."
      );
      setCallStatus("error");
    }
  }

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
                Send us your project details or reserve a 30-minute technical
                discovery call. We respond within one business day.
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
                      {inquiryStatus === "sent" ? (
                        <div
                          className="flex min-h-80 flex-col items-center justify-center text-center"
                          role="status"
                          aria-live="polite"
                        >
                          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                            <CheckCircle2 size={28} aria-hidden="true" />
                          </span>
                          <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                            Inquiry received
                          </h2>
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                            Thank you,{" "}
                            <strong className="text-ink">{form.name}</strong>.
                            Our engineering team has received your project
                            details and will reply to{" "}
                            <strong className="text-ink">{form.email}</strong>{" "}
                            within one business day.
                          </p>
                          <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {!inquiryDelivered && inquiryMailto && (
                              <a
                                href={inquiryMailto}
                                className="btn-press inline-flex items-center justify-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
                              >
                                Send copy via email app
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setForm({
                                  name: "",
                                  email: "",
                                  company: "",
                                  phone: "",
                                  service: preselected,
                                  message: "",
                                  website: "",
                                });
                                setInquiryStatus("idle");
                              }}
                              className="btn-press rounded-xl border border-line bg-surface-elevated px-5 py-2.5 text-sm font-medium text-ink hover:border-brand"
                            >
                              Send another inquiry
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleInquirySubmit}
                          className="grid gap-5 sm:grid-cols-2"
                        >
                          <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={form.website}
                            onChange={set("website")}
                            className="hidden"
                            aria-hidden="true"
                          />

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
                              htmlFor="email"
                              className="mb-2 block text-xs font-medium text-ink"
                            >
                              Work Email *
                            </label>
                            <input
                              id="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={form.email}
                              onChange={set("email")}
                              placeholder="adaeze@shopmax.com"
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
                              Phone Number
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              inputMode="numeric"
                              autoComplete="tel"
                              pattern="^(\+?[0-9\s]{7,20})?$"
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

                          <div className="sm:col-span-2">
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

                          {inquiryError && (
                            <p
                              role="alert"
                              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-400 sm:col-span-2"
                            >
                              {inquiryError}
                            </p>
                          )}

                          <div className="pt-2 sm:col-span-2">
                            <button
                              type="submit"
                              disabled={inquiryStatus === "submitting"}
                              aria-busy={inquiryStatus === "submitting"}
                              className="btn-press inline-flex items-center justify-center rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              {inquiryStatus === "submitting"
                                ? "Sending inquiry..."
                                : "Submit inquiry"}
                            </button>
                            <p className="mt-3 text-xs text-muted">
                              By submitting, you agree to our{" "}
                              <Link
                                href="/privacy"
                                className="underline decoration-line underline-offset-4 hover:text-ink"
                              >
                                Privacy Policy
                              </Link>
                              .
                            </p>
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
                      {callStatus === "booked" ? (
                        <div
                          className="flex min-h-80 flex-col items-center justify-center text-center"
                          role="status"
                          aria-live="polite"
                        >
                          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                            <Calendar size={26} aria-hidden="true" />
                          </span>
                          <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                            Discovery call scheduled
                          </h2>
                          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                            Your booking for{" "}
                            <strong className="text-ink">
                              {formattedSelectedDate} at {selectedSlot.label}{" "}
                              (WAT)
                            </strong>{" "}
                            has been sent to our team. We&apos;ll send a meeting
                            confirmation to{" "}
                            <strong className="text-ink">
                              {callForm.email}
                            </strong>{" "}
                            and your <strong>.ics</strong> calendar invite has
                            been downloaded.
                          </p>
                          <div className="mt-6 flex flex-wrap justify-center gap-3">
                            {!callDelivered && callMailto && (
                              <a
                                href={callMailto}
                                className="btn-press inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
                              >
                                Send copy via email app
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={triggerInviteDownload}
                              className="btn-press inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-neutral-950 hover:bg-[#00db89]"
                            >
                              Download .ics again
                            </button>
                            <button
                              type="button"
                              onClick={() => setCallStatus("idle")}
                              className="btn-press rounded-xl border border-line bg-surface-elevated px-5 py-3 text-sm font-medium text-ink hover:border-brand"
                            >
                              Book another time
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleCallSubmit} className="space-y-6">
                          <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={callForm.website}
                            onChange={(e) =>
                              setCallForm((f) => ({
                                ...f,
                                website: e.target.value,
                              }))
                            }
                            className="hidden"
                            aria-hidden="true"
                          />

                          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                            {/* Monthly calendar date picker */}
                            <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
                              <div className="flex items-center justify-between gap-2 pb-3">
                                <p className="font-display text-sm font-semibold tracking-[-0.02em] text-ink">
                                  {monthLabel}
                                </p>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => shiftMonth(-1)}
                                    disabled={!canGoPrevMonth}
                                    aria-label="Previous month"
                                    className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface-card text-ink transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-35"
                                  >
                                    <ChevronLeft size={15} aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => shiftMonth(1)}
                                    disabled={!canGoNextMonth}
                                    aria-label="Next month"
                                    className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface-card text-ink transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-35"
                                  >
                                    <ChevronRight
                                      size={15}
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>

                              <div
                                className="grid grid-cols-7 gap-1 border-t border-line pt-3 text-center text-[11px] font-medium text-muted"
                                aria-hidden="true"
                              >
                                {WEEKDAYS.map((wd) => (
                                  <span key={wd} className="py-1">
                                    {wd}
                                  </span>
                                ))}
                              </div>

                              <div
                                role="grid"
                                aria-label={monthLabel}
                                className="mt-1 grid grid-cols-7 gap-1"
                              >
                                {monthCells.map((cell, idx) => {
                                  if (!cell) {
                                    return (
                                      <span
                                        key={`empty-${idx}`}
                                        className="h-9"
                                        aria-hidden="true"
                                      />
                                    );
                                  }
                                  const active = cell.iso === selectedIso;
                                  return (
                                    <button
                                      key={cell.iso}
                                      type="button"
                                      disabled={cell.disabled}
                                      onClick={() => setSelectedDate(cell.date)}
                                      aria-pressed={active}
                                      aria-label={cell.date.toLocaleDateString(
                                        "en-US",
                                        {
                                          weekday: "long",
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        }
                                      )}
                                      className={`relative flex h-9 w-full items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                                        active
                                          ? "bg-brand font-semibold text-neutral-950"
                                          : cell.disabled
                                            ? "cursor-not-allowed text-muted/35"
                                            : "text-ink hover:bg-mist hover:ring-1 hover:ring-brand"
                                      }`}
                                    >
                                      {cell.dayNumber}
                                      {cell.isToday && !active && (
                                        <span
                                          className="absolute bottom-1 h-1 w-1 rounded-full bg-brand-dark"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              <p className="mt-3 border-t border-line pt-2.5 text-[11px] text-muted">
                                Available Monday – Friday · West Africa Time
                                (WAT)
                              </p>
                            </div>

                            {/* Time slot picker & selected summary */}
                            <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-4 sm:p-5">
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-display text-sm font-semibold tracking-[-0.02em] text-ink">
                                    Select time (WAT)
                                  </p>
                                  <span className="inline-flex items-center gap-1 text-xs text-muted">
                                    <Clock size={13} aria-hidden="true" />
                                    30 min
                                  </span>
                                </div>

                                <div className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-1">
                                  {timeSlots.map((slot, idx) => {
                                    const active = idx === selectedSlotIdx;
                                    return (
                                      <button
                                        key={slot.label}
                                        type="button"
                                        onClick={() => setSelectedSlotIdx(idx)}
                                        aria-pressed={active}
                                        className={`flex min-h-10 items-center justify-between rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors ${
                                          active
                                            ? "border-brand bg-brand font-semibold text-neutral-950"
                                            : "border-line bg-surface-card text-ink hover:border-brand"
                                        }`}
                                      >
                                        <span>{slot.label}</span>
                                        <span
                                          className={`text-[11px] ${
                                            active
                                              ? "text-neutral-900"
                                              : "text-muted"
                                          }`}
                                        >
                                          WAT
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="mt-4 rounded-xl border border-line bg-mist px-3.5 py-3">
                                <p className="text-[11px] font-medium text-muted">
                                  Selected slot
                                </p>
                                <p className="mt-0.5 text-xs font-semibold text-ink">
                                  {formattedSelectedDate} · {selectedSlot.label}{" "}
                                  WAT
                                </p>
                              </div>
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
                                htmlFor="call-email"
                                className="mb-2 block text-xs font-medium text-ink"
                              >
                                Work Email *
                              </label>
                              <input
                                id="call-email"
                                type="email"
                                autoComplete="email"
                                required
                                value={callForm.email}
                                onChange={(e) =>
                                  setCallForm((f) => ({
                                    ...f,
                                    email: e.target.value,
                                  }))
                                }
                                placeholder="adaeze@shopmax.com"
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

                            <div>
                              <label
                                htmlFor="call-phone"
                                className="mb-2 block text-xs font-medium text-ink"
                              >
                                Phone Number *
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

                          {callError && (
                            <p
                              role="alert"
                              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-400"
                            >
                              {callError}
                            </p>
                          )}

                          <div className="pt-1">
                            <button
                              type="submit"
                              disabled={callStatus === "submitting"}
                              aria-busy={callStatus === "submitting"}
                              className="btn-press inline-flex w-full items-center justify-center rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                            >
                              {callStatus === "submitting"
                                ? "Reserving slot..."
                                : "Reserve discovery call"}
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
                    What happens next
                  </h2>
                  <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
                    <li>
                      1. An engineer reviews your note within one business day.
                    </li>
                    <li>2. We schedule a focused 30-minute technical call.</li>
                    <li>
                      3. You receive a written architecture plan and fixed
                      terms.
                    </li>
                  </ol>
                  <Link
                    href="/process"
                    className="btn-press mt-5 inline-flex items-center justify-center rounded-xl border border-line bg-surface-elevated px-4 py-2.5 text-sm font-medium text-ink hover:border-brand"
                  >
                    View methodology
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
