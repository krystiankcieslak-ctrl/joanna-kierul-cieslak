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
      "Indywidualne korepetycje z języka polskiego, przygotowanie do matury i egzaminu ósmoklasisty — z planem dopasowanym do Twoich celów, tempa i poziomu. Zajęcia w Słupsku lub online.",
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
      "Doradztwo metodyczne, warsztaty i wsparcie w awansie zawodowym nauczycieli — oparte na wieloletnim doświadczeniu w oświacie i współpracy z MEN. Konsultacje także online.",
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
      "Język polski jako obcy — skuteczna nauka w przyjaznej atmosferze, online lub w Słupsku, niezależnie od poziomu startowego i celu, jaki chcesz osiągnąć.",
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
      "Precyzyjna korekta i redakcja prac dyplomowych, tekstów naukowych i publikacji — z dbałością o styl, spójność merytoryczną i poprawność językową.",
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
      "Szkolenia dla nauczycieli i zespołów nauczycielskich, warsztaty oraz programy rozwojowe — dopasowane do potrzeb Twojej placówki.",
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
