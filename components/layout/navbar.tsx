"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ctaLink, navLinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

function Navbar() {
  const menuId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/75"
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
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold tracking-wide text-primary-foreground sm:size-10 sm:text-sm"
            >
              JKC
            </span>
            <span className="truncate font-semibold tracking-tight text-foreground sm:inline">
              Joanna Kierul-Cieślak
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
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
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="block rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={ctaLink.href}
                onClick={closeMobile}
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "mt-4 w-full",
                )}
              >
                {ctaLink.label}
              </Link>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export { Navbar };
