"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  badge,
  bodyText,
  checkWrap,
} from "@/constants/layout";
import type { OfferBlock } from "@/constants/offer";
import { ctaLink } from "@/constants/navigation";
import type { OfferImage } from "@/lib/offer-images";
import {
  motionDurationReveal,
  motionEase,
  motionRevealOffset,
  motionRevealViewport,
  staggerDelay,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Uniform crop for all offer photos — consistent gallery rhythm. */
const OFFER_IMAGE_ASPECT = "aspect-[4/3]";

type OfferItemProps = OfferBlock & {
  image?: OfferImage;
  reversed?: boolean;
  index?: number;
};

function OfferImageVisual({ image }: { image: OfferImage }) {
  return (
    <div
      className={cn(
        "group/image relative w-full overflow-hidden rounded-xl",
        OFFER_IMAGE_ASPECT,
        "shadow-[0_4px_20px_rgba(24,49,83,0.10)]",
      )}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "transition-transform duration-300 ease-out",
          "group-hover/image:scale-[1.03]",
          "motion-reduce:transition-none motion-reduce:group-hover/image:scale-100",
        )}
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
          style={{ objectPosition: image.objectPosition }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/12 via-transparent to-transparent"
      />
    </div>
  );
}

function OfferItem({
  id,
  badge: badgeLabel,
  title,
  intro,
  bullets,
  cta,
  image,
  reversed = false,
  index = 0,
}: OfferItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = `offer-${id}-heading`;
  const cardDelay = index * staggerDelay;

  const imageReveal = {
    hidden: {
      opacity: 0,
      x: reversed ? motionRevealOffset : -motionRevealOffset,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: motionDurationReveal,
        ease: motionEase,
        delay: cardDelay,
      },
    },
  };

  const contentReveal = {
    hidden: {
      opacity: 0,
      x: reversed ? -motionRevealOffset : motionRevealOffset,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: motionDurationReveal,
        ease: motionEase,
        delay: cardDelay + 0.06,
      },
    },
  };

  const imageColumn = image ? (
    <OfferImageVisual image={image} />
  ) : (
    <div
      className={cn(
        "w-full rounded-xl bg-linear-to-br from-primary/8 via-accent/10 to-background",
        OFFER_IMAGE_ASPECT,
      )}
    />
  );

  const contentColumn = (
    <div className="flex flex-col justify-center gap-4 md:gap-5 lg:gap-6">
      <div className={badge}>{badgeLabel}</div>

      <Heading id={headingId} level="h3" className="max-w-xl">
        {title}
      </Heading>

      <p className={cn("max-w-xl", bodyText)}>{intro}</p>

      <ul className="flex flex-col gap-2.5" aria-label={`Zakres: ${title}`}>
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-sm leading-snug text-foreground md:text-base"
          >
            <span aria-hidden="true" className={checkWrap}>
              <Check className="size-3 text-accent" strokeWidth={2.5} />
            </span>
            {bullet}
          </li>
        ))}
      </ul>

      <div className="pt-1">
        <Link
          href={ctaLink.href}
          className={cn(
            buttonVariants({ variant: "primary", size: "lg" }),
            "w-full sm:w-fit",
          )}
        >
          {cta}
        </Link>
      </div>
    </div>
  );

  return (
    <article
      id={`oferta-${id}`}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl border border-border/40 bg-card",
        "shadow-[0_6px_32px_rgba(24,49,83,0.08)]",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-7 p-5 sm:p-6 md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] md:gap-9 lg:gap-11 lg:p-8",
        )}
      >
        {prefersReducedMotion ? (
          <>
            <div
              className={cn(
                "order-1 w-full",
                reversed ? "md:order-2" : "md:order-1",
              )}
            >
              {imageColumn}
            </div>
            <div
              className={cn(
                "order-2 w-full",
                reversed ? "md:order-1" : "md:order-2",
              )}
            >
              {contentColumn}
            </div>
          </>
        ) : (
          <>
            <motion.div
              className={cn(
                "order-1 w-full",
                reversed ? "md:order-2" : "md:order-1",
              )}
              initial="hidden"
              whileInView="show"
              viewport={motionRevealViewport}
              variants={imageReveal}
            >
              {imageColumn}
            </motion.div>
            <motion.div
              className={cn(
                "order-2 w-full",
                reversed ? "md:order-1" : "md:order-2",
              )}
              initial="hidden"
              whileInView="show"
              viewport={motionRevealViewport}
              variants={contentReveal}
            >
              {contentColumn}
            </motion.div>
          </>
        )}
      </div>
    </article>
  );
}

export { OfferItem };
