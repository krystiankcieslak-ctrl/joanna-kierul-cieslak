"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { sectionStack } from "@/constants/layout";
import { aboutTimeline } from "@/constants/about";
import { cn } from "@/lib/utils";

/**
 * Oś czasu kariery — pionowa na telefonach, pozioma od lg.
 * Złota linia łączy kolejne etapy; ostatni („Dzisiaj”) jest wyróżniony.
 */
function AboutTimeline() {
  const lastIndex = aboutTimeline.length - 1;

  return (
    <MotionReveal className={sectionStack}>
      <ol
        aria-label="Kluczowe etapy kariery"
        className={cn(
          "relative grid grid-cols-1 gap-7 pl-8",
          // linia pionowa (mobile)
          "before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-linear-to-b before:from-accent/60 before:to-accent/15",
          // linia pozioma (desktop)
          "lg:grid-cols-4 lg:gap-5 lg:pl-0 lg:pt-1",
          "lg:before:top-[7px] lg:before:bottom-auto lg:before:left-[12.5%] lg:before:right-[12.5%] lg:before:h-px lg:before:w-auto lg:before:bg-linear-to-r",
        )}
      >
        {aboutTimeline.map((milestone, index) => {
          const isLast = index === lastIndex;

          return (
            <li
              key={milestone.year}
              className="relative flex flex-col gap-1 lg:items-center lg:gap-2 lg:text-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1 -left-8 flex size-[15px] items-center justify-center rounded-full border-2 border-accent bg-card",
                  "lg:static lg:mb-2",
                  isLast && "bg-accent shadow-[0_0_0_5px_color-mix(in_oklab,var(--accent)_18%,transparent)]",
                )}
              />
              <p
                className={cn(
                  "font-heading text-lg font-semibold tracking-tight text-primary",
                  isLast && "text-xl",
                )}
              >
                {milestone.year}
              </p>
              <p className="max-w-xs text-sm leading-snug text-muted-foreground lg:max-w-[14rem]">
                {milestone.label}
              </p>
            </li>
          );
        })}
      </ol>
    </MotionReveal>
  );
}

export { AboutTimeline };
