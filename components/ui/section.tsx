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
        spacing === "default" && "py-14 md:py-20 lg:py-24",
        spacing === "compact" && "py-10 md:py-12",
        className,
      )}
      {...props}
    />
  );
}

export { Section };
