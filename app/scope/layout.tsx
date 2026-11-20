import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Scope Builder",
  description:
    "Configure your software, mobile, AI, FinTech, or cloud requirements and generate a structured technical scope brief you can save as PDF or send directly to our engineering team.",
  alternates: {
    canonical: "/scope",
  },
  openGraph: {
    title: "Project Scope Builder | Marvex Technologies",
    description:
      "Build a clear technical project brief in minutes, save it as a PDF, or send it directly to our engineering team via WhatsApp or Email.",
    url: "https://marvextechnologies.vercel.app/scope",
  },
};

export default function ScopeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

