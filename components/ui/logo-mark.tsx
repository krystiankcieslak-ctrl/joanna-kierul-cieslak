import { cn } from "@/lib/utils";

/**
 * Znak „JKC” — ten sam wzór co ikona strony (favicon): granatowy zaokrąglony
 * kwadrat, jasne litery i złota kreska pod spodem. Proporcje liczone od
 * szerokości znaku (cqw), więc wygląda tak samo w każdym rozmiarze.
 */
function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "@container relative block size-10 shrink-0 overflow-hidden rounded-[22%] bg-primary text-primary-foreground select-none",
        className,
      )}
    >
      <span className="absolute inset-x-0 top-[49%] -translate-y-1/2 text-center font-sans text-[37cqw] leading-none font-semibold tracking-normal">
        JKC
      </span>
      <span className="absolute top-[72%] left-1/2 h-[4.5%] min-h-[1.5px] w-[34%] -translate-x-1/2 rounded-full bg-accent" />
    </span>
  );
}

export { LogoMark };
