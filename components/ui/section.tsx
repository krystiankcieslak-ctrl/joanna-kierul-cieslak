import * as React from "react";

import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  spacing?: "default" | "compact";
};

function Section({
  className,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(
        spacing === "default" && "py-16 md:py-24 lg:py-32",
        spacing === "compact" && "py-12 md:py-16",
        className,
      )}
      {...props}
    />
  );
}

export { Section };
