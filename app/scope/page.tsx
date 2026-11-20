"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Printer,
  RotateCcw,
} from "lucide-react";
import { Container, Eyebrow, Reveal } from "@/components/ui/primitives";
import RevealObserver from "@/components/ui/RevealObserver";
import { services } from "@/data/content";

const requirements = [
  "User accounts & SSO",
  "Payment & billing integration",
  "AI assistant & document search",
  "Multi-branch / offline sync",
  "Data migration from old tools",
  "Live reporting dashboards",
  "Third-party API integrations",
  "Ongoing cloud & SLA support",
] as const;

const paces = ["Standard", "Accelerated", "Phased rollout"] as const;

export default function ScopePage() {
  return (
    <Suspense>
      <ScopeBuilderInner />
    </Suspense>
  );
}

function ScopeBuilderInner() {
  const params = useSearchParams();
  const preset = params.get("preset");

  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    preset === "automation"
      ? ["ai-engineering", "enterprise-erp"]
      : ["digital-platforms"]
  );
  const [selectedReqs, setSelectedReqs] = useState<string[]>(() =>
    preset === "automation"
      ? ["AI assistant & document search", "Live reporting dashboards"]
      : []
  );
  const [pace, setPace] = useState<(typeof paces)[number]>("Standard");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "sent" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug)
        ? prev.length > 1
          ? prev.filter((s) => s !== slug)
          : prev
        : [...prev, slug]
    );
  };

  const toggleReq = (item: string) => {
    setSelectedReqs((prev) =>
      prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]
    );
  };

  const resetBuilder = () => {
    setSelectedServices(["digital-platforms"]);
    setSelectedReqs([]);
    setPace("Standard");
    setClientName("");
    setClientEmail("");
    setCompanyName("");
    setNotes("");
    setSubmitStatus("idle");
    setSubmitError("");
  };

  const chosenServices = useMemo(
    () => services.filter((s) => selectedServices.includes(s.slug)),
    [selectedServices]
  );

  async function handleSubmitBrief() {
    if (!clientName.trim() || !clientEmail.trim()) {
      setSubmitError(
        "Please enter your name and work email under Delivery pace & contact details before submitting."
      );
      setSubmitStatus("error");
      const targetId = !clientName.trim() ? "scope-name" : "scope-email";
      document.getElementById(targetId)?.focus();
      return;
    }

    setSubmitStatus("submitting");
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "scope",
          name: clientName,
          email: clientEmail,
          company: companyName,
          pace,
          capabilities: chosenServices.map((s) => s.title),
          requirements: selectedReqs,
          message: notes,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setSubmitError(
          data.error || "Unable to submit your project brief. Please try again."
        );
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("sent");
    } catch {
      setSubmitError(
        "Network error while submitting your brief. Please try again."
      );
      setSubmitStatus("error");
    }
  }

  return (
    <>
      <RevealObserver />
      <section className="no-print border-b border-line bg-surface py-16 lg:py-22">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Scope</Eyebrow>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
                Build a project brief.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Pick what you need, save the brief as a PDF, or submit it
                straight to our engineering team.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-14 lg:py-22">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="no-print space-y-6">
              <div className="rounded-2xl border border-line bg-surface-card p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                    Capabilities
                  </h2>
                  <button
                    type="button"
                    onClick={resetBuilder}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-brand hover:text-ink"
                  >
                    <RotateCcw size={13} aria-hidden="true" />
                    Reset
                  </button>
                </div>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {services.map((s) => {
                    const active = selectedServices.includes(s.slug);
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => toggleService(s.slug)}
                        aria-pressed={active}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                          active
                            ? "border-brand bg-brand-pale/60 text-ink"
                            : "border-line bg-surface text-ink hover:border-brand"
                        }`}
                      >
                        <span className="text-sm font-medium text-ink">
                          {s.title}
                        </span>
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${
                            active
                              ? "border-brand bg-brand text-neutral-950"
                              : "border-line bg-surface-card"
                          }`}
                          aria-hidden="true"
                        >
                          {active && <Check size={13} strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-card p-6 sm:p-8">
                <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                  Requirements
                </h2>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {requirements.map((req) => {
                    const active = selectedReqs.includes(req);
                    return (
                      <button
                        key={req}
                        type="button"
                        onClick={() => toggleReq(req)}
                        aria-pressed={active}
                        className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "border-brand bg-brand text-neutral-950"
                            : "border-line bg-surface text-ink hover:border-brand"
                        }`}
                      >
                        {active && (
                          <Check
                            size={14}
                            strokeWidth={2.75}
                            aria-hidden="true"
                          />
                        )}
                        {req}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-card p-6 sm:p-8">
                <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">
                  Delivery pace &amp; contact details
                </h2>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {paces.map((p) => {
                    const active = pace === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPace(p)}
                        aria-pressed={active}
                        className={`min-h-10 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "border-brand bg-brand text-neutral-950"
                            : "border-line bg-surface text-ink hover:border-brand"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label
                      htmlFor="scope-name"
                      className="mb-1.5 block text-xs font-medium text-ink"
                    >
                      Your name *
                    </label>
                    <input
                      id="scope-name"
                      autoComplete="name"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (submitStatus === "error") setSubmitStatus("idle");
                      }}
                      placeholder="Adaeze Okafor"
                      className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="scope-email"
                      className="mb-1.5 block text-xs font-medium text-ink"
                    >
                      Work email *
                    </label>
                    <input
                      id="scope-email"
                      type="email"
                      autoComplete="email"
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                        if (submitStatus === "error") setSubmitStatus("idle");
                      }}
                      placeholder="adaeze@shopmax.com"
                      className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="scope-company"
                      className="mb-1.5 block text-xs font-medium text-ink"
                    >
                      Organization
                    </label>
                    <input
                      id="scope-company"
                      autoComplete="organization"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Shopmax Ltd"
                      className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="scope-notes"
                      className="mb-1.5 block text-xs font-medium text-ink"
                    >
                      Project notes
                    </label>
                    <textarea
                      id="scope-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any key details, branch count, or target launch date..."
                      className="w-full resize-y rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <aside className="rounded-2xl border border-line bg-surface-card p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                <div>
                  <p className="text-xs font-semibold text-brand-dark">
                    Project brief
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.03em] text-ink">
                    {companyName || "Scope summary"}
                  </h2>
                  {clientName && (
                    <p className="mt-0.5 text-xs text-muted">{clientName}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="no-print inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-surface-elevated px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brand"
                >
                  <Printer size={14} aria-hidden="true" />
                  Save PDF
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-mist px-4 py-3 text-sm">
                <span className="text-muted">Delivery pace</span>
                <span className="font-semibold text-ink">{pace}</span>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold text-ink">
                  Capabilities ({chosenServices.length})
                </p>
                <ul className="mt-2.5 space-y-2">
                  {chosenServices.map((s) => (
                    <li
                      key={s.slug}
                      className="flex items-start gap-2.5 text-sm text-ink"
                    >
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedReqs.length > 0 && (
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-xs font-semibold text-ink">
                    Requirements ({selectedReqs.length})
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {selectedReqs.map((r) => (
                      <li
                        key={r}
                        className="flex items-start gap-2.5 text-xs text-muted"
                      >
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          className="mt-0.5 shrink-0 text-brand-dark"
                          aria-hidden="true"
                        />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {notes.trim() && (
                <div className="mt-5 rounded-xl border border-line bg-mist p-4 text-xs leading-relaxed text-ink">
                  <p className="font-semibold">Notes</p>
                  <p className="mt-1 whitespace-pre-wrap text-muted">
                    {notes.trim()}
                  </p>
                </div>
              )}

              <div className="no-print mt-7 space-y-3 border-t border-line pt-6">
                {submitStatus === "sent" ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-xl border border-brand/40 bg-brand-pale/60 p-4 text-left"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-brand-dark"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          Project brief submitted
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          Our team has received your brief and will follow up at{" "}
                          <strong className="text-ink">{clientEmail}</strong>{" "}
                          within one business day.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {submitStatus === "error" && submitError && (
                      <p
                        role="alert"
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-600 dark:text-red-400"
                      >
                        {submitError}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleSubmitBrief}
                      disabled={submitStatus === "submitting"}
                      aria-busy={submitStatus === "submitting"}
                      className="btn-press flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-[#00db89] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitStatus === "submitting" ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                            aria-hidden="true"
                          />
                          Submitting brief...
                        </>
                      ) : (
                        <>
                          Submit project brief
                          <ArrowRight size={15} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
