import { NextResponse } from "next/server";
import { siteConfig } from "@/data/content";

type SubmissionType = "inquiry" | "call" | "scope";

interface ContactPayload {
  type?: SubmissionType;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
  // Discovery call fields
  date?: string;
  time?: string;
  topic?: string;
  // Scope builder fields
  pace?: string;
  capabilities?: string[];
  requirements?: string[];
  // Simple honeypot
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function buildPlainText(payload: ContactPayload, type: SubmissionType): string {
  const lines: string[] = [];

  if (type === "call") {
    lines.push("Discovery Call Request");
    lines.push(`Date: ${clean(payload.date, 80)} at ${clean(payload.time, 40)} (WAT)`);
    lines.push(`Topic: ${clean(payload.topic, 160)}`);
  } else if (type === "scope") {
    lines.push("Project Scope Brief");
    lines.push(`Delivery Pace: ${clean(payload.pace, 80)}`);
  } else {
    lines.push("New Project Inquiry");
    const service = clean(payload.service, 160);
    if (service) lines.push(`Primary Capability: ${service}`);
  }

  lines.push("");
  lines.push(`Name: ${clean(payload.name, 120)}`);
  lines.push(`Email: ${clean(payload.email, 160)}`);
  const company = clean(payload.company, 160);
  if (company) lines.push(`Organization: ${company}`);
  const phone = clean(payload.phone, 40);
  if (phone) lines.push(`Phone: ${phone}`);

  if (type === "scope") {
    const capabilities = Array.isArray(payload.capabilities)
      ? payload.capabilities.map((c) => clean(c, 160)).filter(Boolean)
      : [];
    const requirements = Array.isArray(payload.requirements)
      ? payload.requirements.map((r) => clean(r, 160)).filter(Boolean)
      : [];

    if (capabilities.length > 0) {
      lines.push("", "Capabilities:", ...capabilities.map((c) => `- ${c}`));
    }
    if (requirements.length > 0) {
      lines.push("", "Requirements:", ...requirements.map((r) => `- ${r}`));
    }
  }

  const message = clean(payload.message, 4000);
  if (message) {
    lines.push("", type === "scope" ? "Project Notes:" : "Project Details:", message);
  }

  return lines.join("\n");
}

function buildSubject(payload: ContactPayload, type: SubmissionType): string {
  const who = clean(payload.company, 80) || clean(payload.name, 80) || "Website";
  if (type === "call") {
    return `Discovery Call Request: ${clean(payload.topic, 80) || who}`;
  }
  if (type === "scope") {
    return `Project Scope Brief — ${who}`;
  }
  return `Project Inquiry — ${who}`;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Silently accept honeypot triggers without delivering
  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const type: SubmissionType =
    body.type === "call" || body.type === "scope" ? body.type : "inquiry";
  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const message = clean(body.message, 4000);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 }
    );
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid work email address." },
      { status: 400 }
    );
  }

  if (type === "inquiry" && !message) {
    return NextResponse.json(
      { ok: false, error: "Please include brief details about your project." },
      { status: 400 }
    );
  }

  const subject = buildSubject(body, type);
  const text = buildPlainText(body, type);
  const recipient = process.env.CONTACT_TO_EMAIL || siteConfig.emailRecipient;
  const resendApiKey = process.env.RESEND_API_KEY;
  const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (resendApiKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      `${siteConfig.name} <onboarding@resend.dev>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("[contact] Resend delivery failed:", res.status, errText);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not deliver your message right now. Please try again or email us directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  }

  if (web3FormsKey) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        subject,
        from_name: name,
        replyto: email,
        message: text,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Web3Forms delivery failed:", res.status);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not deliver your message right now. Please try again or email us directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  }

  // Fallback when no email provider env var is configured yet
  console.info("[contact] Submission received (set RESEND_API_KEY to forward via email):\n" + text);
  return NextResponse.json({ ok: true, delivered: false });
}

