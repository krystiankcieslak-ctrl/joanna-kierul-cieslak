"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

import { MotionReveal } from "@/components/motion-reveal";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { sectionIntro, sectionSubtitle, cardSurface } from "@/constants/layout";
import { faqHeading, faqItems, faqSubtitle } from "@/constants/faq";
import { cn } from "@/lib/utils";

function FaqAccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = `${id}-heading`;
  const panelId = `${id}-panel`;

  return (
    <div
      className={cn(
        "border-b border-border/40 transition-colors duration-300 last:border-b-0",
        isOpen && "border-accent/30",
      )}
    >
      <h3>
        <button
          type="button"
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "flex min-h-12 w-full touch-manipulation items-center justify-between gap-4 py-3 text-left",
            "text-base font-medium text-foreground md:text-lg",
            "cursor-pointer outline-none transition-colors duration-200 ease-out hover:text-primary",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <span>{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out",
              isOpen && "rotate-180 text-accent",
            )}
          />
        </button>
      </h3>

      {prefersReducedMotion ? (
        isOpen ? (
          <div id={panelId} role="region" aria-labelledby={headingId}>
            <p className="pb-4 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
              {answer}
            </p>
          </div>
        ) : null
      ) : (
        <div
          id={panelId}
          role="region"
          aria-labelledby={headingId}
          aria-hidden={!isOpen}
          className={cn(
            "grid",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <p
              className={cn(
                "pb-4 text-sm leading-relaxed text-muted-foreground transition-opacity ease-out md:text-base md:leading-relaxed",
              )}
              style={{
                opacity: isOpen ? 1 : 0,
                transitionDuration: "300ms",
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Faq() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section
      id="faq"
      aria-labelledby="faq-heading"
      spacing="default"
    >
      <Container>
        <MotionReveal className={sectionIntro}>
          <Heading id="faq-heading" level="h2">
            {faqHeading}
          </Heading>
          <p className={sectionSubtitle}>{faqSubtitle}</p>
        </MotionReveal>

        <MotionReveal>
          <div
            className={cn(
              "mx-auto w-full max-w-3xl rounded-2xl bg-card px-4 shadow-(--shadow-card) sm:px-6 md:px-7",
              cardSurface,
            )}
          >
            {faqItems.map((item) => (
              <FaqAccordionItem
                key={item.id}
                id={`${baseId}-${item.id}`}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onToggle={() =>
                  setOpenId((current) =>
                    current === item.id ? null : item.id,
                  )
                }
              />
            ))}
          </div>

          <p className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-muted-foreground md:text-base">
            Masz inne pytanie?
            <Link
              href="#kontakt"
              className="group inline-flex items-center gap-1.5 rounded-sm font-medium text-primary underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Napisz do mnie
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </p>
        </MotionReveal>
      </Container>
    </Section>
  );
}

export { Faq };
