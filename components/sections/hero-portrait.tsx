"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { heroPortraitAlt } from "@/constants/hero";
import {
  heroPortraitOffset,
  motionDurationHeroPortrait,
  motionEase,
  portraitZoomClass,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroPortraitProps = {
  src: string;
  className?: string;
  /** Tylko dla zdjęcia widocznego od razu (hero) — przyspiesza LCP. */
  priority?: boolean;
  alt?: string;
};

function HeroPortrait({
  src,
  className,
  priority = false,
  alt = heroPortraitAlt,
}: HeroPortraitProps) {
  const prefersReducedMotion = useReducedMotion();

  const imageBlock = (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-border/40 shadow-(--shadow-card) lg:aspect-[3/4]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 520px"
        className={cn(
          "object-cover object-[center_22%] lg:object-[center_18%]",
          portraitZoomClass,
        )}
      />
    </div>
  );

  return (
    <div
      className={cn(
        "group relative mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-0",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-[20px] bg-linear-to-br from-primary/8 via-accent/12 to-primary/5"
      />

      {!prefersReducedMotion ? (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 -right-3 size-20 rounded-full bg-accent/15 blur-2xl md:size-24"
            animate={{ y: [0, -6, 0], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 -left-4 size-24 rounded-full bg-primary/8 blur-2xl md:size-28"
            animate={{ y: [0, 8, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            initial={{ opacity: 0, x: heroPortraitOffset }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: motionDurationHeroPortrait,
              ease: motionEase,
            }}
          >
            {imageBlock}
          </motion.div>
        </>
      ) : (
        imageBlock
      )}
    </div>
  );
}

export { HeroPortrait };
