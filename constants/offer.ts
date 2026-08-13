import type { AudienceGroupId } from "@/constants/audience";

export type OfferId = AudienceGroupId;

export type OfferBlock = {
  id: OfferId;
  badge: string;
  title: string;
  intro: string;
  bullets: readonly string[];
  cta: string;
};

export const offers: readonly OfferBlock[] = [
  {
    id: "uczniowie",
    badge: "Uczniowie",
    title: "Oferta dla uczniów",
    intro:
      "Indywidualne wsparcie w nauce języka polskiego i przygotowaniu do egzaminów — z planem dopasowanym do Twoich celów, tempa i poziomu zaawansowania.",
    bullets: [
      "Przygotowanie do matury podstawowej",
      "Przygotowanie do matury rozszerzonej",
      "Egzamin ósmoklasisty",
      "Rozwijanie kompetencji językowych",
      "Indywidualny plan nauki",
    ],
    cta: "Umów konsultację",
  },
  {
    id: "nauczyciele",
    badge: "Nauczyciele",
    title: "Oferta dla nauczycieli",
    intro:
      "Profesjonalne doradztwo metodyczne i wsparcie w rozwoju kariery zawodowej — oparte na wieloletnim doświadczeniu w oświacie i współpracy z MEN.",
    bullets: [
      "Doradztwo metodyczne",
      "Awans zawodowy",
      "Warsztaty",
      "Przygotowanie dokumentacji",
      "Konsultacje indywidualne",
    ],
    cta: "Umów konsultację",
  },
  {
    id: "cudzoziemcy",
    badge: "Cudzoziemcy",
    title: "Oferta dla cudzoziemców",
    intro:
      "Skuteczna nauka języka polskiego w przyjaznej atmosferze — niezależnie od poziomu startowego i celu, jaki chcesz osiągnąć.",
    bullets: [
      "Nauka języka polskiego",
      "Konwersacje",
      "Przygotowanie do egzaminów",
      "Język biznesowy",
      "Materiały indywidualne",
    ],
    cta: "Umów konsultację",
  },
  {
    id: "autorzy",
    badge: "Autorzy i studenci",
    title: "Autorzy i studenci",
    intro:
      "Precyzyjna korekta i redakcja tekstów naukowych oraz akademickich — z dbałością o styl, spójność merytoryczną i poprawność językową.",
    bullets: [
      "Korekta prac",
      "Redakcja tekstów",
      "Prace dyplomowe",
      "Publikacje",
      "Konsultacje językowe",
    ],
    cta: "Umów konsultację",
  },
  {
    id: "instytucje",
    badge: "Instytucje edukacyjne",
    title: "Instytucje edukacyjne",
    intro:
      "Kompleksowa współpraca z placówkami oświatowymi — szkolenia, warsztaty i programy rozwojowe dopasowane do potrzeb Twojej instytucji.",
    bullets: [
      "Szkolenia",
      "Warsztaty",
      "Doradztwo",
      "Programy rozwojowe",
      "Współpraca długoterminowa",
    ],
    cta: "Umów konsultację",
  },
] as const;
