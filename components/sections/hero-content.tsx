"use client";

import { ArrowRight, Award, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { checkWrap } from "@/constants/layout";
import { heroCredibilityPoints } from "@/constants/hero";
import { ctaLink } from "@/constants/navigation";
import {
  motionDurationReveal,
  motionEase,
  motionRevealOffset,
  staggerDelay,
} from "@/lib/motion";

const itemVariants = {
  hidden: { opacity: 0, y: motionRevealOffset },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurationReveal, ease: motionEase },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: staggerDelay },
  },
};

function HeroContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-5 md:gap-6"
      initial={prefersReducedMotion ? false : "hidden"}
      animate="show"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Award aria-hidden="true" className="size-4 text-accent" />
          <span>35 lat doświadczenia w edukacji</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Heading id="hero-heading" level="h1" className="max-w-xl">
          Ekspert edukacyjny, któremu ufają{" "}
          <span className="relative whitespace-nowrap text-primary">
            rodzice, uczniowie
            <svg
              aria-hidden="true"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute -bottom-1.5 left-0 h-2.5 w-full text-accent/70 md:-bottom-2 md:h-3"
            >
              <path
                d="M2 9c60-6 140-8 296-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          i nauczyciele
        </Heading>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg md:leading-relaxed">
          Prowadzę korepetycje z języka polskiego, przygotowuję do matury
          i egzaminu ósmoklasisty oraz wspieram nauczycieli w rozwoju zawodowym —
          w Słupsku i online, z wiedzą opartą na dekadach praktyki w szkole
          i egzaminatorstwie.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
          <Link
            href={ctaLink.href}
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Umów konsultację
          </Link>
          <Link
            href="#oferta"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Poznaj ofertę
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ul
          aria-label="Kluczowe kwalifikacje"
          className="flex flex-col gap-2.5 border-t border-border/70 pt-5"
        >
          {heroCredibilityPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm leading-snug text-foreground md:text-base"
            >
              <span aria-hidden="true" className={checkWrap}>
                <Check className="size-3 text-accent" strokeWidth={2.5} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export { HeroContent };
