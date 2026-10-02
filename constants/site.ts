/**
 * Global site configuration (SEO, structured data, integrations).
 *
 * NEXT_PUBLIC_SITE_URL — docelowy adres strony (np. https://www.joannakierulcieslak.pl).
 * NEXT_PUBLIC_CONTACT_FORM_ENDPOINT — adres usługi formularzy (np. Formspree / Web3Forms).
 *   Bez niego formularz otwiera program pocztowy z gotową wiadomością (mailto).
 */

export const siteConfig = {
  name: "Joanna Kierul-Cieślak",
  title: "Korepetycje z polskiego i matura – Słupsk i online | Joanna Kierul-Cieślak",
  description:
    "Korepetycje z języka polskiego, przygotowanie do matury i egzaminu ósmoklasisty, język polski jako obcy i szkolenia dla nauczycieli. Słupsk i online.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.joannakierulcieslak.pl").replace(/\/$/, ""),
  locale: "pl_PL",
  city: "Słupsk",
  jobTitle: "Ekspert edukacyjny, egzaminator maturalny, doradca metodyczny",
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "",
} as const;
