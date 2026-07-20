"use client";

import {
  Building2,
  Check,
  Globe,
  GraduationCap,
  PenLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import {
  badge,
  bodyText,
  checkWrap,
  twoColumnGrid,
} from "@/constants/layout";
import type { OfferBlock } from "@/constants/offer";
import { ctaLink } from "@/constants/navigation";
import { getRevealMotion } from "@/lib/get-reveal-motion";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { cn } from "@/lib/utils";

const offerIcons: Record<OfferBlock["id"], LucideIcon> = {
  uczniowie: GraduationCap,
  nauczyciele: Users,
  cudzoziemcy: Globe,
  autorzy: PenLine,
  instytucje: Building2,
};

type OfferItemProps = OfferBlock & {
  reversed?: boolean;
};

function OfferVisual({ id }: { id: OfferBlock["id"] }) {
  const Icon = offerIcons[id];

  return (
    <Card aria-hidden="true" className="gap-0 overflow-hidden p-0">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-linear-to-br from-primary/8 via-accent/12 to-background lg:aspect-[5/4]">
        <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent" />
        <div className="relative flex size-24 items-center justify-center rounded-2xl bg-background/60 text-accent shadow-sm backdrop-blur-sm sm:size-28">
          <Icon className="size-12 sm:size-14" strokeWidth={1.25} />
        </div>
      </div>
    </Card>
  );
}

function OfferItem({
  id,
  badge: badgeLabel,
  title,
  intro,
  bullets,
  cta,
  reversed = false,
}: OfferItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = useFinePointer();
  const headingId = `offer-${id}-heading`;
  const motionProps = getRevealMotion({ prefersReducedMotion, shouldAnimate });

  return (
    <motion.article
      id={`oferta-${id}`}
      aria-labelledby={headingId}
      className="scroll-mt-24"
      {...motionProps}
    >
      <div className={cn(twoColumnGrid, "items-center")}>
        <div
          className={cn(
            "order-1",
            reversed ? "lg:order-2" : "lg:order-1",
          )}
        >
          <OfferVisual id={id} />
        </div>

        <div
          className={cn(
            "order-2 flex flex-col gap-6",
            reversed ? "lg:order-1" : "lg:order-2",
          )}
        >
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
      </div>
    </motion.article>
  );
}

export { OfferItem };
