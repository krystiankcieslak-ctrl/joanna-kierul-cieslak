import { HeroPortrait } from "@/components/sections/hero-portrait";
import { HeroContent } from "@/components/sections/hero-content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { twoColumnGrid } from "@/constants/layout";
import { cn } from "@/lib/utils";

const heroPortraitSrc = "/images/joanna-kierul-cieslak1.jpg";

function Hero() {
  return (
    <Section
      id="hero"
      aria-labelledby="hero-heading"
      spacing="default"
      className="relative isolate overflow-hidden pt-6 md:pt-8 lg:pt-10"
    >
      <div aria-hidden="true" className="hero-backdrop absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <Container>
        <div className={cn(twoColumnGrid, "items-center")}>
          <HeroContent />
          <HeroPortrait src={heroPortraitSrc} priority />
        </div>
      </Container>
    </Section>
  );
}

export { Hero };
