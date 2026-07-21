"use client";

import { Check } from "lucide-react";

import { MotionReveal } from "@/components/motion-reveal";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sectionStack } from "@/constants/layout";
import { aboutValues } from "@/constants/about";
import { cardIconHoverClass } from "@/lib/motion";
import { cn } from "@/lib/utils";

function AboutValues() {
  return (
    <MotionReveal className={cn(sectionStack)}>
      <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {aboutValues.map((value) => (
          <li key={value.title} className="h-full">
            <Card className="h-full">
              <CardHeader className="gap-2">
                <div className="flex items-start gap-3">
                  <span aria-hidden="true" className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15", cardIconHoverClass)}>
                    <Check className="size-3 text-accent" strokeWidth={2.5} />
                  </span>
                  <CardTitle>{value.title}</CardTitle>
                </div>
                <CardDescription>{value.description}</CardDescription>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </MotionReveal>
  );
}

export { AboutValues };
