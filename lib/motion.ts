/** Shared motion tokens — keep animations consistent across sections. */

export const motionEase = "easeOut" as const;

export const motionRevealTransition = {
  duration: 0.45,
  ease: motionEase,
} as const;

export const motionRevealViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -5% 0px",
} as const;

export const motionRevealOffset = 16;

export const cardHoverMotion = {
  y: -2,
  transition: { duration: 0.2, ease: motionEase },
} as const;

export const cardHoverTransitionClass = "duration-200";
