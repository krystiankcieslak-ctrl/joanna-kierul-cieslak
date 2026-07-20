"use client";

import { Star } from "lucide-react";

import { MotionReveal } from "@/components/sections/about-values";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { sectionIntro, sectionStack, sectionSubtitle } from "@/constants/layout";
import {
  testimonialTrustMetrics,
  testimonials,
  testimonialsHeading,
  testimonialsSubtitle,
} from "@/constants/testimonials";
import { cn } from "@/lib/utils";

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      <span className="sr-only">Ocena 5 na 5 gwiazdek</span>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-accent text-accent"
            strokeWidth={0}
          />
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <Section
      id="opinie"
      aria-labelledby="testimonials-heading"
      spacing="default"
      className="scroll-mt-24"
    >
      <Container>
        <div className={sectionIntro}>
          <Heading id="testimonials-heading" level="h2">
            {testimonialsHeading}
          </Heading>
          <p className={sectionSubtitle}>{testimonialsSubtitle}</p>
        </div>

        <MotionReveal>
          <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <li key={item.id} className="h-full">
                <Card className="h-full">
                  <CardHeader className="gap-4">
                    <StarRating />
                    <CardDescription className="max-w-prose text-base leading-relaxed text-foreground">
                      &ldquo;{item.text}&rdquo;
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="mt-auto items-end justify-between gap-3 border-0 p-0 pt-0">
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="font-heading text-base font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>

                    {item.badge ? (
                      <span className="shrink-0 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-primary">
                        {item.badge}
                      </span>
                    ) : null}
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </MotionReveal>

        <MotionReveal className={sectionStack}>
          <div
            aria-label="Kluczowe wskaźniki zaufania"
            className={cn(
              "grid grid-cols-1 gap-6 rounded-2xl bg-secondary/30 px-6 py-8",
              "sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8 lg:py-9",
            )}
          >
            {testimonialTrustMetrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <p
                  className={cn(
                    "font-heading font-semibold tracking-tight text-primary",
                    metric.value === "★★★★★"
                      ? "text-xl text-accent"
                      : "text-2xl tabular-nums md:text-3xl",
                  )}
                  aria-hidden={metric.value === "★★★★★" ? true : undefined}
                >
                  {metric.value}
                </p>
                {metric.value === "★★★★★" ? (
                  <p className="sr-only">5 na 5 — zaufanie klientów</p>
                ) : null}
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}

export { Testimonials };
