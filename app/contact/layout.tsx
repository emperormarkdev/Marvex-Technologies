import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start a project with Marvex Technologies. Reach us by email, phone, or our project inquiry form in Port Harcourt, Nigeria.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Marvex Technologies",
    description:
      "Tell us what you want to build or improve for your business. We respond within one business day.",
    url: "https://marvextechnologies.vercel.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
