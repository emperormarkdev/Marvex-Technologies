import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyMarvex from "@/components/home/WhyMarvex";
import { EngagementModels, ProcessStrip } from "@/components/home/Sections";
import { BigCta, Faq } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";
import { faqs } from "@/data/content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <RevealObserver />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <WhyMarvex />
      <ProcessStrip />
      <EngagementModels />
      <Faq />
      <BigCta />
    </>
  );
}
