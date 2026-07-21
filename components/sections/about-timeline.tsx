"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { sectionStack } from "@/constants/layout";
import { aboutTimeline } from "@/constants/about";

function AboutTimeline() {
  return (
    <MotionReveal className={sectionStack}>
      <ol
        aria-label="Kluczowe etapy kariery"
        className="grid grid-cols-1 gap-6 border-t border-accent/30 pt-6 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-5 lg:pt-8"
      >
        {aboutTimeline.map((milestone) => (
          <li
            key={milestone.year}
            className="flex flex-col gap-2 lg:items-center lg:text-center"
          >
            <div
              aria-hidden="true"
              className="size-2 rounded-full bg-accent lg:mx-auto"
            />
            <p className="font-heading text-lg font-semibold tracking-tight text-primary">
              {milestone.year}
            </p>
            <p className="max-w-xs text-sm leading-snug text-muted-foreground lg:max-w-none">
              {milestone.label}
            </p>
          </li>
        ))}
      </ol>
    </MotionReveal>
  );
}

export { AboutTimeline };
