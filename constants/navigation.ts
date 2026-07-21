export const navLinks = [
  { label: "Komu pomagam", href: "#dla-kogo" },
  { label: "Oferta", href: "#oferta" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Opinie", href: "#opinie" },
  { label: "FAQ", href: "#faq" },
] as const;

export const ctaLink = { label: "Kontakt", href: "#kontakt" } as const;

/** Mobile menu: nav links + Kontakt as a regular list item. */
export const mobileNavLinks = [...navLinks, ctaLink] as const;
