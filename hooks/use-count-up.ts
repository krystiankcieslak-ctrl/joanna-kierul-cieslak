"use client";

import { useEffect, useRef, useState } from "react";

type ParsedStat = {
  target: number;
  suffix: string;
};

function parseStatValue(value: string): ParsedStat {
  const match = value.match(/^(\d+)(.*)$/);
  return {
    target: match ? Number.parseInt(match[1], 10) : 0,
    suffix: match?.[2] ?? "",
  };
}

function useCountUp(
  value: string,
  {
    duration = 1200,
    enabled = true,
  }: { duration?: number; enabled?: boolean } = {},
) {
  const { target, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(() =>
    enabled ? `0${suffix}` : value,
  );
  const ref = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          const current = Math.round(eased * target);
          setDisplay(`${current}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.25, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, enabled, suffix, target, value]);

  return { ref, display: enabled ? display : value };
}

export { parseStatValue, useCountUp };
