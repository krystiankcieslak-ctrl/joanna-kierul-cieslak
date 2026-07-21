import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { audienceGroups } from "@/constants/audience";
import { contactDetails } from "@/constants/contact";
import { bodyText } from "@/constants/layout";
import { cn } from "@/lib/utils";

const footerNavLinks = [
  { label: "Hero", href: "#hero" },
  { label: "Oferta", href: "#oferta" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Opinie", href: "#opinie" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "FAQ", href: "#faq" },
] as const;

const offerLinkLabels: Record<(typeof audienceGroups)[number]["id"], string> = {
  uczniowie: "Uczniowie",
  nauczyciele: "Nauczyciele",
  cudzoziemcy: "Cudzoziemcy",
  autorzy: "Autorzy",
  instytucje: "Instytucje",
};

const footerContactItems = contactDetails.filter(
  (item) => item.id === "phone" || item.id === "email" || item.id === "location",
);

const footerLinkClass =
  "text-sm text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm";

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="font-heading text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-secondary/30">
      <Container className="py-10 md:py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-6 xl:gap-8">
          <FooterColumn title="Joanna Kierul-Cieślak" className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="mx-auto inline-flex items-center gap-2.5 sm:mx-0"
              aria-label="Joanna Kierul-Cieślak — strona główna"
            >
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold tracking-wide text-primary-foreground"
              >
                JKC
              </span>
              <span className="font-semibold tracking-tight text-foreground">
                Joanna Kierul-Cieślak
              </span>
            </Link>
            <p className={cn("max-w-xs mx-auto sm:mx-0", bodyText, "text-sm md:text-base")}>
              Edukacja oparta na doświadczeniu, zaufaniu i indywidualnym
              podejściu.
            </p>
          </FooterColumn>

          <FooterColumn title="Nawigacja">
            <ul className="flex flex-col gap-2.5">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Oferta">
            <ul className="flex flex-col gap-2.5">
              {audienceGroups.map((group) => (
                <li key={group.id}>
                  <Link href={group.href} className={footerLinkClass}>
                    {offerLinkLabels[group.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Kontakt">
            <ul className="flex flex-col gap-2.5">
              {footerContactItems.map((item) => (
                <li key={item.id}>
                  {"href" in item && item.href ? (
                    <a href={item.href} className={footerLinkClass}>
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {year} Joanna Kierul-Cieślak. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <Link href="#" className={footerLinkClass}>
              Polityka prywatności
            </Link>
            <Link href="#" className={footerLinkClass}>
              Ustawienia cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
