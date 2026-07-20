"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sectionStack } from "@/constants/layout";
import { aboutValues } from "@/constants/about";
import { getRevealMotion } from "@/lib/get-reveal-motion";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = useFinePointer();
  const motionProps = getRevealMotion({
    prefersReducedMotion,
    shouldAnimate,
    delay,
  });

  if (prefersReducedMotion || !shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

function AboutValues() {
  return (
    <MotionReveal className={cn(sectionStack)}>
      <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {aboutValues.map((value) => (
          <li key={value.title} className="h-full">
            <Card className="h-full">
              <CardHeader className="gap-2">
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Check className="size-3 text-accent" strokeWidth={2.5} />
                  </span>
                  <CardTitle>{value.title}</CardTitle>
                </div>
                <CardDescription>{value.description}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </MotionReveal>
  );
}

export { AboutValues, MotionReveal };
