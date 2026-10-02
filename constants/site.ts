/**
 * Global site configuration (SEO, structured data, integrations).
 *
 * NEXT_PUBLIC_SITE_URL — docelowy adres strony (np. https://www.joannakierulcieslak.pl).
 * NEXT_PUBLIC_CONTACT_FORM_ENDPOINT — adres usługi formularzy (np. Formspree / Web3Forms).
 *   Bez niego formularz otwiera program pocztowy z gotową wiadomością (mailto).
 */

export const siteConfig = {
  name: "Joanna Kierul-Cieślak",
  title: "Joanna Kierul-Cieślak | Ekspert edukacyjny",
  description:
    "Joanna Kierul-Cieślak — ekspert edukacyjny z 35-letnim doświadczeniem. Wsparcie dla rodziców, uczniów i nauczycieli: egzaminator, doradca metodyczny. Słupsk i online.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.joannakierulcieslak.pl").replace(/\/$/, ""),
  locale: "pl_PL",
  city: "Słupsk",
  jobTitle: "Ekspert edukacyjny, egzaminator maturalny, doradca metodyczny",
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "",
} as const;
