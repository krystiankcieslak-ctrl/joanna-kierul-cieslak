import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import {
  btnPrimaryHoverClass,
  btnSecondaryHoverClass,
  microTransitionClass,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 items-center justify-center rounded-2xl border border-transparent bg-clip-padding text-base font-medium whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    microTransitionClass,
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-primary text-primary-foreground shadow-sm",
          btnPrimaryHoverClass,
        ),
        secondary: cn(
          "border-2 border-primary/25 bg-background/70 text-primary backdrop-blur-sm [&_svg]:transition-transform [&_svg]:duration-200",
          btnSecondaryHoverClass,
        ),
        ghost: "text-foreground hover:bg-muted aria-expanded:bg-muted",
      },
      size: {
        default: "h-11 gap-2 px-6",
        sm: "h-9 gap-1.5 rounded-xl px-4 text-sm",
        lg: "h-12 gap-2 px-8",
        icon: "size-11",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
