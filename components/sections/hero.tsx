import { Award, Check } from "lucide-react";
import Link from "next/link";

import { HeroPortrait } from "@/components/sections/hero-portrait";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { checkWrap, twoColumnGrid } from "@/constants/layout";
import { heroCredibilityPoints } from "@/constants/hero";
import { ctaLink } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const heroPortraitSrc = "/images/joanna-kierul-cieslak.jpg";

function Hero() {
  return (
    <Section
      id="hero"
      aria-labelledby="hero-heading"
      spacing="default"
      className="pt-8 md:pt-10 lg:pt-12"
    >
      <Container>
        <div className={cn(twoColumnGrid, "items-center")}>
          <div className="flex flex-col gap-6 md:gap-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Award aria-hidden="true" className="size-4 text-accent" />
              <span>35 lat doświadczenia w edukacji</span>
            </div>

            <Heading id="hero-heading" level="h1" className="max-w-xl">
              Ekspert edukacyjny, któremu ufają rodzice, uczniowie i nauczyciele
            </Heading>

            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
              Wspieram w nauce języka polskiego, przygotowaniu do matury i
              rozwoju kariery zawodowej — z indywidualnym podejściem,
              empatią i wiedzą opartą na dekadach praktyki w szkole i
              egzaminatorstwie.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <Link
                href={ctaLink.href}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Umów konsultację
              </Link>
              <Link
                href="#oferta"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Poznaj ofertę
              </Link>
            </div>

            <ul
              aria-label="Kluczowe kwalifikacje"
              className="flex flex-col gap-2.5 pt-1"
            >
              {heroCredibilityPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-snug text-foreground md:text-base"
                >
                  <span aria-hidden="true" className={checkWrap}>
                    <Check className="size-3 text-accent" strokeWidth={2.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <HeroPortrait src={heroPortraitSrc} />
        </div>
      </Container>
    </Section>
  );
}

export { Hero };
