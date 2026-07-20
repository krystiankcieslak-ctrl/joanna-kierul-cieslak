"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { sectionIntro, sectionSubtitle, cardSurface } from "@/constants/layout";
import { faqHeading, faqItems, faqSubtitle } from "@/constants/faq";
import { cn } from "@/lib/utils";

/**
 * DEBUG BUILD — animations intentionally removed to isolate the mobile bug.
 * Remove FAQ_DEBUG banner and restore MotionReveal + panel animation after fix.
 */
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
  const headingId = `${id}-heading`;
  const panelId = `${id}-panel`;

  function handleToggle() {
    console.log("FAQ button clicked", { id, question });
    onToggle();
  }

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <h3>
        <button
          type="button"
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleToggle}
          className={cn(
            "flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left",
            "text-base font-medium text-foreground md:text-lg",
            "cursor-pointer outline-none hover:text-primary",
            "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <span>{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-5 shrink-0 text-muted-foreground",
              isOpen && "rotate-180 text-accent",
            )}
          />
        </button>
      </h3>

      {isOpen ? (
        <div id={panelId} role="region" aria-labelledby={headingId}>
          <p className="pb-5 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed">
            {answer}
          </p>
        </div>
      ) : null}
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
      className="scroll-mt-24"
    >
      <Container>
        <div className={sectionIntro}>
          <Heading id="faq-heading" level="h2">
            {faqHeading}
          </Heading>
          <p className={sectionSubtitle}>{faqSubtitle}</p>
        </div>

        <p
          aria-live="polite"
          className="mx-auto mb-4 max-w-3xl rounded-lg border border-dashed border-accent/50 bg-accent/5 px-4 py-2 font-mono text-xs text-foreground"
        >
          FAQ DEBUG — openId: {openId ?? "null"}
        </p>

        <div
          className={cn(
            "mx-auto w-full max-w-3xl rounded-2xl bg-card px-5 shadow-(--shadow-card) sm:px-7 md:px-8",
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
                setOpenId((current) => {
                  const next = current === item.id ? null : item.id;
                  console.log("FAQ isOpen", {
                    itemId: item.id,
                    isOpen: next === item.id,
                    openId: next,
                  });
                  return next;
                })
              }
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { Faq };
