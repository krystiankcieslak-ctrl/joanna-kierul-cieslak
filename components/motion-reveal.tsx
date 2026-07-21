"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { getRevealMotion } from "@/lib/get-reveal-motion";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionProps = getRevealMotion({ prefersReducedMotion, delay });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export { MotionReveal };
