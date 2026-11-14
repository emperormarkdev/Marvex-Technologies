import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyMarvex from "@/components/home/WhyMarvex";
import { EngagementModels, ProcessStrip } from "@/components/home/Sections";
import { BigCta, Faq } from "@/components/home/Closing";
import RevealObserver from "@/components/ui/RevealObserver";

export default function Home() {
  return (
    <>
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
