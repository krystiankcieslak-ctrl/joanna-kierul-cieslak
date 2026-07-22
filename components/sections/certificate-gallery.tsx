"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { StatisticValue } from "@/components/sections/statistic-value";
import { Card, CardContent } from "@/components/ui/card";
import {
  certificateStats,
  certificatesGalleryCaption,
} from "@/constants/certificates";
import type { CertificateImage } from "@/lib/certificates";
import {
  motionDurationPanel,
  motionDurationReveal,
  motionEase,
  motionRevealOffset,
  staggerDelay,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type CertificateGalleryProps = {
  images: CertificateImage[];
};

const statVariants = {
  hidden: { opacity: 0, y: motionRevealOffset },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurationReveal, ease: motionEase },
  },
};

const thumbVariants = {
  hidden: { opacity: 0, y: motionRevealOffset },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDurationReveal, ease: motionEase },
  },
};

const thumbWidthClass = cn(
  "snap-start shrink-0",
  "w-[calc((100vw-2rem)/1.5)] max-w-[255px]",
  "md:w-[calc((100vw-3rem)/3.5)] md:max-w-[240px]",
  "lg:w-[calc((min(100vw,var(--container-max))-4rem)/5)] lg:max-w-[220px]",
);

const thumbButtonClass = cn(
  "block w-full overflow-hidden rounded-xl border border-border/40 bg-card outline-none",
  "shadow-[0_6px_28px_rgba(24,49,83,0.10)]",
  "transition-all duration-300 ease-out",
  "hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(24,49,83,0.14)]",
  "focus-visible:ring-3 focus-visible:ring-ring/50",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);

function CertificateStatTile({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const isNumeric = /^\d/.test(value);

  if (isNumeric) {
    return <StatisticValue value={value} label={label} />;
  }

  return (
    <Card className="h-full gap-0 p-4 sm:p-5">
      <CardContent className="flex flex-col gap-1.5 p-0">
        <p className="font-heading text-5xl font-bold tracking-tight text-primary sm:text-6xl">
          {value}
        </p>
        <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}

function CertificateThumb({
  image,
  index,
  onOpen,
}: {
  image: CertificateImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <li className={thumbWidthClass}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Otwórz certyfikat ${index + 1}`}
        className={thumbButtonClass}
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(max-width: 768px) 66vw, (max-width: 1024px) 28vw, 20vw"
            className="object-cover object-top"
          />
        </div>
      </button>
    </li>
  );
}

function CertificateLightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  images: CertificateImage[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const image = images[activeIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  if (!image) {
    return null;
  }

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: motionDurationPanel, ease: motionEase };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Podgląd certyfikatu ${activeIndex + 1} z ${images.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <button
        type="button"
        aria-label="Zamknij podgląd"
        className="absolute inset-0 bg-primary/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <button
        type="button"
        aria-label="Zamknij"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-200 ease-out hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/40"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Poprzedni certyfikat"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            className="absolute left-3 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-200 ease-out hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/40 sm:left-6 sm:size-11"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Następny certyfikat"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className="absolute right-3 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-200 ease-out hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/40 sm:right-6 sm:size-11"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </>
      ) : null}

      <motion.div
        className="relative z-10 max-h-[min(88vh,900px)] w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
        transition={transition}
      >
        <Image
          key={image.src}
          src={image.src}
          alt=""
          width={1200}
          height={1600}
          sizes="(max-width: 768px) 100vw, 896px"
          className="mx-auto max-h-[min(88vh,900px)] w-auto rounded-xl object-contain shadow-2xl"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

function CertificateGallery({ images }: CertificateGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    setCanScrollLeft(element.scrollLeft > 4);
    setCanScrollRight(element.scrollLeft < maxScrollLeft - 4);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    updateScrollState();

    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [images.length, updateScrollState]);

  const scrollGallery = useCallback((direction: "left" | "right") => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const amount = Math.max(element.clientWidth * 0.72, 240);

    element.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return current;
      }

      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return current;
      }

      return (current + 1) % images.length;
    });
  }, [images.length]);

  const galleryList = (
    <ul className="flex w-max gap-3 md:gap-4">
      {images.map((image, index) => (
        <CertificateThumb
          key={image.src}
          image={image}
          index={index}
          onOpen={openLightbox}
        />
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col">
      {prefersReducedMotion ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {certificateStats.map((item) => (
            <li key={item.label}>
              <CertificateStatTile value={item.value} label={item.label} />
            </li>
          ))}
        </ul>
      ) : (
        <motion.ul
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -5% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: staggerDelay } },
          }}
        >
          {certificateStats.map((item) => (
            <motion.li key={item.label} variants={statVariants}>
              <CertificateStatTile value={item.value} label={item.label} />
            </motion.li>
          ))}
        </motion.ul>
      )}

      {images.length > 0 ? (
        <div className="mt-12 md:mt-16">
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground md:mb-8 md:text-base">
            {certificatesGalleryCaption}
          </p>

          <div className="relative -mx-4 md:-mx-6 lg:-mx-8">
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-[color-mix(in_oklab,var(--background)_82%,var(--secondary))] to-transparent md:w-14",
                !canScrollLeft && "opacity-0",
                "transition-opacity duration-300",
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-[color-mix(in_oklab,var(--background)_82%,var(--secondary))] to-transparent md:w-14",
                !canScrollRight && "opacity-0",
                "transition-opacity duration-300",
              )}
            />

            <button
              type="button"
              aria-label="Przewiń certyfikaty w lewo"
              onClick={() => scrollGallery("left")}
              disabled={!canScrollLeft}
              className={cn(
                "absolute top-1/2 left-2 z-20 hidden -translate-y-1/2 md:flex",
                "size-10 items-center justify-center rounded-full border border-border/50 bg-card/95 text-primary shadow-(--shadow-card)",
                "transition-all duration-200 ease-out",
                "hover:border-accent/30 hover:shadow-(--shadow-card-hover)",
                "focus-visible:ring-3 focus-visible:ring-ring/50",
                "disabled:pointer-events-none disabled:opacity-0",
              )}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              aria-label="Przewiń certyfikaty w prawo"
              onClick={() => scrollGallery("right")}
              disabled={!canScrollRight}
              className={cn(
                "absolute top-1/2 right-2 z-20 hidden -translate-y-1/2 md:flex",
                "size-10 items-center justify-center rounded-full border border-border/50 bg-card/95 text-primary shadow-(--shadow-card)",
                "transition-all duration-200 ease-out",
                "hover:border-accent/30 hover:shadow-(--shadow-card-hover)",
                "focus-visible:ring-3 focus-visible:ring-ring/50",
                "disabled:pointer-events-none disabled:opacity-0",
              )}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>

            <div
              ref={scrollRef}
              className={cn(
                "overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 md:px-6 lg:px-8",
                "snap-x snap-mandatory",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {prefersReducedMotion ? (
                galleryList
              ) : (
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1, margin: "0px 0px -5% 0px" }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.12,
                      },
                    },
                  }}
                >
                  <motion.ul
                    className="flex w-max gap-3 md:gap-4"
                    variants={{
                      hidden: {},
                      show: {},
                    }}
                  >
                    {images.map((image, index) => (
                      <motion.li
                        key={image.src}
                        variants={thumbVariants}
                        className={thumbWidthClass}
                      >
                        <button
                          type="button"
                          onClick={() => openLightbox(index)}
                          aria-label={`Otwórz certyfikat ${index + 1}`}
                          className={thumbButtonClass}
                        >
                          <div className="relative aspect-[3/4] w-full">
                            <Image
                              src={image.src}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 66vw, (max-width: 1024px) 28vw, 20vw"
                              className="object-cover object-top"
                            />
                          </div>
                        </button>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {activeIndex !== null ? (
                <CertificateLightbox
                  key="certificate-lightbox"
                  images={images}
                  activeIndex={activeIndex}
                  onClose={closeLightbox}
                  onPrevious={showPrevious}
                  onNext={showNext}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

export { CertificateGallery };
