"use client";

import {
  ArrowRight,
  Building2,
  Globe,
  GraduationCap,
  PenLine,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { iconSize, iconWrap } from "@/constants/layout";
import type { AudienceGroupId } from "@/constants/audience";
import { cardIconHoverClass } from "@/lib/motion";
import { cn } from "@/lib/utils";

const audienceIcons: Record<AudienceGroupId, LucideIcon> = {
  uczniowie: GraduationCap,
  nauczyciele: Users,
  cudzoziemcy: Globe,
  autorzy: PenLine,
  instytucje: Building2,
};

type AudienceCardProps = {
  id: AudienceGroupId;
  title: string;
  description: string;
  href: string;
};

function AudienceCard({ id, title, description, href }: AudienceCardProps) {
  const Icon = audienceIcons[id];

  return (
    <Link
      href={href}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full">
        <div aria-hidden="true" className={cn(iconWrap, cardIconHoverClass)}>
          <Icon className={iconSize} strokeWidth={1.75} />
        </div>

        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardFooter className="mt-auto border-0 p-0 pt-0">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            Zobacz ofertę
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export { AudienceCard };
