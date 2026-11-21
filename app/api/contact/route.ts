import { NextResponse } from "next/server";
import { siteConfig } from "@/data/content";

type SubmissionType = "inquiry" | "call";

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
    lines.push("Discovery Call Booking Request");
    lines.push(
      `Date & Time: ${clean(payload.date, 80)} at ${clean(payload.time, 40)} (WAT)`
    );
    lines.push(`Consultation Topic: ${clean(payload.topic, 160)}`);
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

  const message = clean(payload.message, 4000);
  if (message) {
    lines.push("", "Project Details:", message);
  }

  return lines.join("\n");
}

function buildSubject(payload: ContactPayload, type: SubmissionType): string {
  const who =
    clean(payload.company, 80) || clean(payload.name, 80) || "Website";
  if (type === "call") {
    return `Discovery Call: ${clean(payload.topic, 80) || who} (${clean(payload.date, 40)})`;
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
    return NextResponse.json({ ok: true, delivered: true });
  }

  const type: SubmissionType = body.type === "call" ? "call" : "inquiry";
  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const company = clean(body.company, 160);
  const phone = clean(body.phone, 40);
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

  // 1. Resend API (when RESEND_API_KEY is configured)
  if (resendApiKey) {
    try {
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

      if (res.ok) {
        return NextResponse.json({ ok: true, delivered: true });
      }
      console.error("[contact] Resend failed:", res.status);
    } catch (err) {
      console.error("[contact] Resend error:", err);
    }
  }

  // 2. Web3Forms API (when WEB3FORMS_ACCESS_KEY is configured)
  if (web3FormsKey) {
    try {
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

      if (res.ok) {
        return NextResponse.json({ ok: true, delivered: true });
      }
      console.error("[contact] Web3Forms failed:", res.status);
    } catch (err) {
      console.error("[contact] Web3Forms error:", err);
    }
  }

  // 3. Zero-config FormSubmit AJAX delivery straight to siteConfig.emailRecipient
  try {
    const origin =
      request.headers.get("origin") ||
      "https://marvextechnologies.vercel.app";
    const referer =
      request.headers.get("referer") ||
      "https://marvextechnologies.vercel.app/contact";

    const payload: Record<string, string> = {
      _subject: subject,
      _replyto: email,
      _template: "table",
      _captcha: "false",
      Type: type === "call" ? "Discovery Call Booking" : "Project Inquiry",
      Name: name,
      Email: email,
    };
    if (company) payload.Organization = company;
    if (phone) payload.Phone = phone;
    if (type === "call") {
      payload["Requested Slot"] = `${clean(body.date, 80)} at ${clean(body.time, 40)} (WAT)`;
      payload.Topic = clean(body.topic, 160);
    } else {
      const service = clean(body.service, 160);
      if (service) payload.Capability = service;
      payload.Details = message;
    }

    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: referer,
        },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
      };
      if (data.success === true || data.success === "true") {
        return NextResponse.json({ ok: true, delivered: true });
      }
    }
  } catch (err) {
    console.error("[contact] FormSubmit fallback error:", err);
  }

  console.info("[contact] Submission logged:\n" + text);
  return NextResponse.json({
    ok: true,
    delivered: false,
    recipient,
    subject,
    text,
  });
}
