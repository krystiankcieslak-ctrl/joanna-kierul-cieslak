import { HeroPortrait } from "@/components/sections/hero-portrait";
import { AboutTimeline } from "@/components/sections/about-timeline";
import {
  AboutValues,
  MotionReveal,
} from "@/components/sections/about-values";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { badge, bodyText, twoColumnGrid } from "@/constants/layout";
import {
  aboutBadge,
  aboutHeading,
  aboutQuote,
  aboutStory,
} from "@/constants/about";
import { heroPortraitSrc } from "@/lib/hero-portrait";
import { cn } from "@/lib/utils";

function About() {
  return (
    <Section
      id="o-mnie"
      aria-labelledby="about-heading"
      spacing="default"
      className="scroll-mt-24 bg-secondary/20"
    >
      <Container>
        <div
          className={cn(
            twoColumnGrid,
            "lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]",
          )}
        >
          <MotionReveal className="order-1 flex flex-col gap-6">
            <HeroPortrait
              src={heroPortraitSrc}
              className="mx-auto w-full max-w-[520px] lg:mx-0"
            />

            <Card className="gap-3">
              <p className="font-heading text-lg font-semibold tracking-tight text-primary">
                {aboutQuote.highlight}
              </p>
              <blockquote className="border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-muted-foreground italic md:text-base">
                &ldquo;{aboutQuote.text}&rdquo;
              </blockquote>
            </Card>
          </MotionReveal>

          <MotionReveal
            className="order-2 flex flex-col gap-6"
            delay={0.05}
          >
            <div className={badge}>{aboutBadge}</div>

            <Heading id="about-heading" level="h2" className="max-w-xl">
              {aboutHeading}
            </Heading>

            <div className="flex max-w-xl flex-col gap-4">
              {aboutStory.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className={bodyText}>
                  {paragraph}
                </p>
              ))}
            </div>
          </MotionReveal>
        </div>

        <AboutValues />
        <AboutTimeline />
      </Container>
    </Section>
  );
}

export { About };
