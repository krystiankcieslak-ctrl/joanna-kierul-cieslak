/** Shared motion tokens — keep animations consistent across sections. */

export const motionEase = "easeOut" as const;

/** 200ms — buttons, icons, form focus */
export const motionDurationFast = 0.2;

/** 250ms — cards, navbar scroll */
export const motionDurationMedium = 0.25;

/** 300ms — FAQ chevron, panel opacity */
export const motionDurationPanel = 0.3;

/** 0.6–0.8s — scroll section reveals */
export const motionDurationReveal = 0.7;

/** 700ms — hero portrait entrance */
export const motionDurationHeroPortrait = 0.7;

/** 1000ms — stat counters */
export const motionDurationCounter = 1;

/** 80ms — hero + testimonial stagger */
export const staggerDelay = 0.08;

export const motionRevealTransition = {
  duration: motionDurationReveal,
  ease: motionEase,
} as const;

export const motionRevealViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -5% 0px",
} as const;

/** Section scroll reveal offset */
export const motionRevealOffset = 24;

/** Hero portrait entrance offset */
export const heroPortraitOffset = 20;

/** CSS class strings — hover utilities in globals.css */
export const microTransitionClass =
  "transition-all duration-200 ease-out motion-reduce:transition-none";

export const cardInteractiveClass = "card-interactive";

export const cardIconHoverClass = "card-icon-hover";

export const portraitZoomClass = "portrait-zoom";

export const navLinkClass =
  "nav-link-hover relative text-sm font-medium text-foreground/80 transition-colors duration-[250ms] ease-out after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-accent after:transition-transform after:duration-[250ms] after:ease-out";

export const navLinkActiveClass = "text-primary after:scale-x-100";

export const formFieldClass =
  "transition-[border-color,box-shadow] duration-200 ease-out focus-visible:border-accent focus-visible:shadow-[0_2px_12px_rgba(200,169,106,0.15)]";

export const btnPrimaryHoverClass = "btn-primary-hover";

export const btnSecondaryHoverClass = "btn-secondary-hover";

/** @deprecated use staggerDelay */
export const heroStaggerDelay = staggerDelay;
