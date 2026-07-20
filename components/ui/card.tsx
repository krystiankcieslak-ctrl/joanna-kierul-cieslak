"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cardHoverMotion, cardHoverTransitionClass } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { cardPadding, cardSurface } from "@/constants/layout";

function Card({ className, ...props }: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      data-slot="card"
      initial={false}
      whileHover={cardHoverMotion}
      className={cn(
        "flex flex-col gap-5 overflow-hidden rounded-2xl bg-card text-card-foreground shadow-(--shadow-card)",
        cardSurface,
        cardPadding,
        "transition-shadow hover:shadow-(--shadow-card-hover)",
        cardHoverTransitionClass,
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-lg leading-snug font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto self-start", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("text-base leading-relaxed", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-4 border-t border-border pt-6",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
