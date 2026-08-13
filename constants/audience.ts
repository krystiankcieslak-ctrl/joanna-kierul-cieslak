export const audienceGroups = [
  {
    id: "uczniowie",
    title: "Uczniowie",
    description:
      "Przygotowanie do matury i egzaminów, rozwijanie umiejętności językowych oraz wsparcie w codziennej nauce.",
    href: "#oferta-uczniowie",
  },
  {
    id: "nauczyciele",
    title: "Nauczyciele",
    description:
      "Doradztwo metodyczne, rozwój zawodowy, awans i wsparcie w pracy z uczniami na każdym etapie edukacji.",
    href: "#oferta-nauczyciele",
  },
  {
    id: "cudzoziemcy",
    title: "Cudzoziemcy",
    description:
      "Nauka języka polskiego dostosowana do Twojego poziomu, celów i tempa — od podstaw po zaawansowany.",
    href: "#oferta-cudzoziemcy",
  },
  {
    id: "autorzy",
    title: "Autorzy i studenci",
    description:
      "Korekta i redakcja tekstów naukowych, dyplomowych i publikacji z dbałością o precyzję językową.",
    href: "#oferta-autorzy",
  },
  {
    id: "instytucje",
    title: "Instytucje edukacyjne",
    description:
      "Szkolenia, warsztaty i współpraca z placówkami oświatowymi w zakresie kompetencji humanistycznych",
    href: "#oferta-instytucje",
  },
] as const;

export type AudienceGroupId = (typeof audienceGroups)[number]["id"];
