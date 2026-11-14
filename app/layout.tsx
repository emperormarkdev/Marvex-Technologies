import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marvex Technologies | Websites, Mobile Apps & Custom Software",
  description:
    "We design and build modern websites, mobile apps, online stores, and custom business software.",
  openGraph: {
    title: "Marvex Technologies | Built to help your business grow",
    description:
      "Modern websites, mobile apps, online stores, and custom business software designed, built, and supported for your team.",
    type: "website",
  },
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
      </head>
      <body className="min-h-full flex flex-col bg-surface font-sans text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
