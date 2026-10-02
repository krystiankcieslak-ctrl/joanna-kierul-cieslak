"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { contactDetails } from "@/constants/contact";
import { ctaLink } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const phone = contactDetails.find((item) => item.id === "phone");

/**
 * Przyklejony pasek akcji na telefonach: „Zadzwoń” + „Umów konsultację”.
 * Pojawia się po przewinięciu sekcji hero, chowa się przy kontakcie i stopce.
 */
function MobileCtaBar() {
  const prefersReducedMotion = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [nearContact, setNearContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const targets = [
      document.getElementById("kontakt"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el !== null);

    const visibleTargets = new Set<Element>();

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry?.isIntersecting),
      { threshold: 0, rootMargin: "-35% 0px 0px 0px" },
    );

    const contactObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleTargets.add(entry.target);
          else visibleTargets.delete(entry.target);
        }
        setNearContact(visibleTargets.size > 0);
      },
      { threshold: 0 },
    );

    if (hero) heroObserver.observe(hero);
    for (const target of targets) contactObserver.observe(target);

    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !nearContact;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="mobile-cta"
          className="fixed inset-x-0 bottom-0 z-40 pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] md:hidden"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="mx-auto flex w-full max-w-md min-w-0 items-center gap-2 rounded-2xl border border-border/60 bg-background/85 p-2 shadow-[0_8px_32px_rgba(24,49,83,0.16)] backdrop-blur-xl backdrop-saturate-150">
            {phone && "href" in phone ? (
              <a
                href={phone.href}
                aria-label={`Zadzwoń: ${phone.value}`}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "default" }),
                  // Węższe odstępy, by oba przyciski mieściły się od 360px; poniżej 350px chowamy ikony.
                  "h-11 shrink-0 gap-1.5 px-3 max-[349px]:[&_svg]:hidden",
                )}
              >
                <Phone aria-hidden="true" />
                Zadzwoń
              </a>
            ) : null}
            <Link
              href={ctaLink.href}
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
                "h-11 min-w-0 flex-1 shrink gap-1.5 px-3 max-[349px]:[&_svg]:hidden",
              )}
            >
              <CalendarCheck aria-hidden="true" />
              <span className="truncate">Umów konsultację</span>
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export { MobileCtaBar };
