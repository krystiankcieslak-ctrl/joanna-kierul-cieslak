"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo-mark";
import { ctaLink, mobileNavLinks, navLinks } from "@/constants/navigation";
import { navLinkActiveClass, navLinkClass } from "@/lib/motion";
import { cn } from "@/lib/utils";

function Navbar() {
  const menuId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sectionHrefs = [...navLinks.map((link) => link.href), ctaLink.href];
    const sectionIds = sectionHrefs.map((href) => href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktopQuery.addEventListener("change", onDesktop);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktopQuery.removeEventListener("change", onDesktop);
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-[250ms] ease-out",
        scrolled
          ? "border-b border-border/60 bg-background/95 shadow-[0_1px_12px_rgba(24,49,83,0.06)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/85"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="px-5 sm:px-6">
        <nav
          className="flex h-[4.25rem] items-center justify-between gap-3 sm:h-16 lg:h-20"
          aria-label="Główne menu"
        >
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-lg text-primary outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:gap-3"
            aria-label="Joanna Kierul-Cieślak — strona główna"
          >
            <LogoMark className="size-11 sm:size-10" />
            <span className="truncate font-semibold tracking-tight text-foreground sm:inline">
              Joanna Kierul-Cieślak
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={activeHref === link.href ? "true" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    navLinkClass,
                    activeHref === link.href && navLinkActiveClass,
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={ctaLink.href}
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              {ctaLink.label}
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-11 rounded-xl border border-border/60 bg-background/50 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
              ) : (
                <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
              )}
            </Button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobilne"
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden"
          >
            <Container className="px-5 py-5 sm:px-6">
              <ul className="flex flex-col gap-1.5">
                {mobileNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      aria-current={activeHref === link.href ? "true" : undefined}
                      className={cn(
                        "block rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors duration-[220ms] hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        activeHref === link.href && "bg-muted/60 text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Pasek postępu czytania — cienka złota linia pod menu. */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-accent/70 to-accent transition-opacity duration-300",
          scrolled && !prefersReducedMotion ? "opacity-100" : "opacity-0",
        )}
        style={{ scaleX: progress }}
      />
    </header>
  );
}

export { Navbar };
