"use client";

import { useReducedMotion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";
import { motionDurationCounter } from "@/lib/motion";

type StatisticValueProps = {
  value: string;
  label: string;
};

function StatisticValue({ value, label }: StatisticValueProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, display } = useCountUp(value, {
    duration: motionDurationCounter * 1000,
    enabled: !prefersReducedMotion,
  });

  return (
    <Card className="h-full gap-0 p-4 sm:p-5">
      <CardContent className="flex flex-col gap-1.5 p-0">
        <p
          ref={ref}
          className="font-heading text-5xl font-bold tracking-tight text-primary tabular-nums sm:text-6xl"
        >
          {display}
        </p>
        <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
          {label}
        </p>
        <span className="sr-only">
          {value} {label}
        </span>
      </CardContent>
    </Card>
  );
}

export { StatisticValue };
