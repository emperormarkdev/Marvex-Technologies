import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/data/content";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, message } = body as {
      name?: string;
      company?: string;
      email?: string;
      phone?: string;
      service?: string;
      message?: string;
    };

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, phone number, and project message." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "RESEND_API_KEY is not configured yet. Please add RESEND_API_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const subject = `New Project Inquiry from ${name}${company ? ` (${company})` : ""}`;

    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Marvex Website <onboarding@resend.dev>",
      to: [siteConfig.emailRecipient],
      replyTo: email || undefined,
      subject,
      html: `
        <div style="font-family: sans-serif; color: #0b101b; line-height: 1.6; max-width: 600px;">
          <h2 style="margin-bottom: 16px;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          ${company ? `<p><strong>Business:</strong> ${company}</p>` : ""}
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          <p><strong>Phone:</strong> ${phone}</p>
          ${service ? `<p><strong>Service Requested:</strong> ${service}</p>` : ""}
          <hr style="border: 0; border-top: 1px solid #e6eaf0; margin: 20px 0;" />
          <p><strong>Project Details:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not send your message right now. Please try again." },
      { status: 500 }
    );
  }
}

