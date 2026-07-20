import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-heading font-semibold tracking-tight text-foreground", {
  variants: {
    level: {
      h1: "text-4xl leading-tight sm:text-5xl lg:text-6xl",
      h2: "text-3xl leading-tight sm:text-4xl lg:text-5xl",
      h3: "text-2xl leading-snug sm:text-3xl",
      h4: "text-xl leading-snug sm:text-2xl",
    },
    tone: {
      default: "text-foreground",
      muted: "font-normal text-muted-foreground",
      accent: "text-accent",
    },
  },
  defaultVariants: {
    level: "h2",
    tone: "default",
  },
});

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

type HeadingProps = Omit<React.ComponentProps<"h1">, "ref"> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingLevel;
  };

function Heading({
  className,
  level = "h2",
  tone,
  as,
  ...props
}: HeadingProps) {
  const sharedProps = {
    "data-slot": "heading",
    className: cn(headingVariants({ level, tone, className })),
    ...props,
  };

  switch (as ?? level) {
    case "h1":
      return <h1 {...sharedProps} />;
    case "h3":
      return <h3 {...sharedProps} />;
    case "h4":
      return <h4 {...sharedProps} />;
    default:
      return <h2 {...sharedProps} />;
  }
}

export { Heading, headingVariants };
