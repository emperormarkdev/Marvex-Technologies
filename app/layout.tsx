import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services, siteConfig } from "@/data/content";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://marvextechnologies.vercel.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marvex Technologies | Websites, Mobile Apps & Custom Software",
    template: "%s | Marvex Technologies",
  },
  description:
    "Marvex Technologies designs and builds modern company websites, mobile apps (iOS & Android), online stores, POS systems, and custom business software in Port Harcourt and across Nigeria.",
  keywords: [
    "Marvex Technologies",
    "software company in Port Harcourt",
    "software company in Nigeria",
    "website design Port Harcourt",
    "web development company Nigeria",
    "mobile app development Nigeria",
    "custom business software",
    "POS software Nigeria",
    "supermarket POS system",
    "online store development",
    "ecommerce website Nigeria",
    "UI UX design agency",
    "business automation",
  ],
  authors: [{ name: "Marvex Technologies", url: siteUrl }],
  creator: "Marvex Technologies",
  publisher: "Marvex Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marvex Technologies | Websites, Mobile Apps & Custom Software",
    description:
      "From company websites and mobile apps to online stores and custom software for your daily operations, we design it, build it, train your team, and stay to support you.",
    url: siteUrl,
    siteName: "Marvex Technologies",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marvex Technologies | Websites, Mobile Apps & Custom Software",
    description:
      "Modern websites, mobile apps, online stores, and custom business software built to help your business grow.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteUrl,
      email: siteConfig.email,
      telephone: siteConfig.phoneHref,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nde Street, Rumukwurushi Pipeline",
        addressLocality: "Port Harcourt",
        addressRegion: "Rivers State",
        addressCountry: "NG",
      },
      areaServed: [
        { "@type": "City", name: "Port Harcourt" },
        { "@type": "Country", name: "Nigeria" },
      ],
      sameAs: [`https://wa.me/${siteConfig.whatsapp}`],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software & Digital Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: `${siteUrl}/services#${s.slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.tagline,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=document.querySelector('meta[name="color-scheme"]');if(m)m.content=localStorage.getItem("color-scheme")??"light dark";}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-sans text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
