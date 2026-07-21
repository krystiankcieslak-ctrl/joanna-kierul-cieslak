"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { MotionReveal } from "@/components/motion-reveal";
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
import {
  motionDurationReveal,
  motionEase,
  motionRevealOffset,
  staggerDelay,
} from "@/lib/motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: motionRevealOffset },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurationReveal, ease: motionEase },
  },
};

function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="opinie"
      aria-labelledby="testimonials-heading"
      spacing="default"
      className="scroll-mt-24"
    >
      <Container>
        <MotionReveal className={sectionIntro}>
          <Heading id="testimonials-heading" level="h2">
            {testimonialsHeading}
          </Heading>
          <p className={sectionSubtitle}>{testimonialsSubtitle}</p>
        </MotionReveal>

        {prefersReducedMotion ? (
          <ul className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <li key={item.id} className="h-full">
                <Card className="h-full">
                  <CardHeader className="gap-3">
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
        ) : (
          <motion.ul
            className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -5% 0px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: staggerDelay } },
            }}
          >
            {testimonials.map((item) => (
              <motion.li
                key={item.id}
                className="h-full"
                variants={cardVariants}
              >
                <Card className="h-full">
                  <CardHeader className="gap-3">
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
              </motion.li>
            ))}
          </motion.ul>
        )}

        <MotionReveal className={sectionStack}>
          <div
            aria-label="Kluczowe wskaźniki zaufania"
            className={cn(
              "grid grid-cols-1 gap-4 rounded-2xl bg-secondary/30 px-5 py-6",
              "sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-6 lg:py-7",
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
