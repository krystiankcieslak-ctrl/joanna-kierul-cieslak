import type { Transition } from "framer-motion";

import {
  motionRevealOffset,
  motionRevealTransition,
  motionRevealViewport,
} from "@/lib/motion";

type RevealMotionOptions = {
  prefersReducedMotion: boolean | null;
  shouldAnimate: boolean;
  delay?: number;
};

type RevealMotionResult = {
  initial: false | { opacity: number; y: number };
  animate?: { opacity: number; y: number };
  whileInView?: { opacity: number; y: number };
  viewport?: typeof motionRevealViewport;
  transition?: Transition;
};

function getRevealMotion({
  prefersReducedMotion,
  shouldAnimate,
  delay = 0,
}: RevealMotionOptions): RevealMotionResult {
  if (prefersReducedMotion || !shouldAnimate) {
    return {
      initial: false,
      animate: { opacity: 1, y: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: motionRevealOffset },
    whileInView: { opacity: 1, y: 0 },
    viewport: motionRevealViewport,
    transition: { ...motionRevealTransition, delay },
  };
}

export { getRevealMotion };
export type { RevealMotionOptions, RevealMotionResult };
