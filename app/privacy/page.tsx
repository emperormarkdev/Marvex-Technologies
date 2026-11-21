import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Marvex Technologies collects, uses, protects, and manages personal and business information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Marvex Technologies",
    description:
      "How Marvex Technologies collects, uses, protects, and manages personal and business information.",
    url: "https://marvextechnologies.vercel.app/privacy",
  },
};

const sections = [
  {
    title: "1. Information we collect",
    paragraphs: [
      "When you submit a project inquiry, request a discovery call, or contact us directly by email, phone, or WhatsApp, we collect the information you choose to provide—such as your name, work email address, organization name, phone number, and project details.",
      "Our website does not require account registration and does not use invasive third-party advertising trackers. We store your light/dark theme preference locally in your browser via localStorage.",
    ],
  },
  {
    title: "2. How we use your information",
    paragraphs: [
      "We use the information you provide strictly to respond to your inquiry, scope potential engagements, schedule discovery calls, prepare proposals, and deliver contracted engineering services.",
      "We do not sell, rent, or trade your personal or organizational information to third parties for marketing purposes.",
    ],
  },
  {
    title: "3. Legal basis & data protection",
    paragraphs: [
      "We process personal data in line with applicable data protection laws, including the Nigeria Data Protection Act (NDPA), based on your consent when submitting an inquiry, our legitimate interest in responding to business requests, or the performance of a contract with your organization.",
    ],
  },
  {
    title: "4. Data sharing & infrastructure",
    paragraphs: [
      "We only share inquiry data with trusted infrastructure providers necessary to operate our website and business communications (such as cloud hosting and transactional email delivery). All providers are selected for strong security and confidentiality standards.",
      "Project code, credentials, and business records shared during active client engagements are governed by mutual confidentiality terms and remain the property of the client.",
    ],
  },
  {
    title: "5. Retention & security",
    paragraphs: [
      "We retain inquiry and correspondence records only for as long as needed to evaluate or support a business relationship, comply with legal obligations, or maintain audit records.",
      "We apply technical and organizational safeguards—including encrypted transport (HTTPS/TLS), access controls, and least-privilege handling—to protect data against unauthorized access or disclosure.",
    ],
  },
  {
    title: "6. Your rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of the personal information you have submitted to us at any time, or withdraw consent for further communication.",
      `To exercise any of these rights or ask questions about this policy, email us at ${siteConfig.email}.`,
    ],
  },
  {
    title: "7. Updates to this policy",
    paragraphs: [
      "We may update this Privacy Policy as our services or legal requirements evolve. Any revisions will be posted on this page with an updated effective date.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line bg-surface py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,1.5rem+2.8vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-ink">
              Privacy Policy
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              How {siteConfig.name} collects, uses, and safeguards the
              information you share with us.
            </p>
            <p className="mt-4 text-xs font-medium text-muted">
              Last updated: November 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl space-y-8 rounded-2xl border border-line bg-surface-card p-7 sm:p-10 lg:p-12">
            {sections.map((section) => (
              <div key={section.title} className="space-y-3">
                <h2 className="font-display text-lg font-semibold tracking-[-0.025em] text-ink sm:text-xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p
                    key={p}
                    className="text-sm leading-relaxed text-muted sm:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}

            <div className="border-t border-line pt-6">
              <p className="text-sm text-muted">
                <strong className="font-semibold text-ink">
                  {siteConfig.name}
                </strong>
                <br />
                {siteConfig.location}
                <br />
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.emailRecipient}`}
                  className="text-ink underline decoration-line underline-offset-4 hover:text-brand-dark"
                >
                  {siteConfig.email}
                </a>
              </p>
              <Link
                href="/contact"
                className="btn-press mt-6 inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-medium text-surface hover:bg-brand hover:text-neutral-950"
              >
                Contact our team
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
