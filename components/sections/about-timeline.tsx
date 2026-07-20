"use client";

import { motion, useReducedMotion } from "framer-motion";

import { sectionStack } from "@/constants/layout";
import { aboutTimeline } from "@/constants/about";
import { getRevealMotion } from "@/lib/get-reveal-motion";
import { useFinePointer } from "@/lib/use-fine-pointer";

function AboutTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = useFinePointer();
  const motionProps = getRevealMotion({ prefersReducedMotion, shouldAnimate });

  return (
    <motion.div className={sectionStack} {...motionProps}>
      <ol
        aria-label="Kluczowe etapy kariery"
        className="grid grid-cols-1 gap-8 border-t border-accent/30 pt-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-6 lg:pt-10"
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
    </motion.div>
  );
}

export { AboutTimeline };
