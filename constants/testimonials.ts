export type TestimonialCategory =
  | "Uczeń"
  | "Nauczyciel"
  | "Cudzoziemiec"
  | "Instytucja";

export type TestimonialBadge = "Matura" | "Awans zawodowy" | "Warsztaty";

export type Testimonial = {
  id: string;
  text: string;
  name: string;
  category: TestimonialCategory;
  badge?: TestimonialBadge;
};

export const testimonialsHeading = "Opinie";

export const testimonialsSubtitle =
  "Poznaj doświadczenia osób, które skorzystały z mojego wsparcia.";

export const testimonials: readonly Testimonial[] = [
  {
    id: "testimonial-1",
    text: "Dzięki indywidualnemu podejściu Pani Joasi po raz pierwszy poczułam, że matura z polskiego nie musi być stresem. Spokojnie, konkretnie i z empatią — dokładnie tego potrzebowałam.",
    name: "Anna",
    category: "Uczeń",
    badge: "Matura",
  },
  {
    id: "testimonial-2",
    text: "Wsparcie w awansie zawodowym było nieocenione. Pomogła mi uporządkować dokumentację i spokojnie przejść przez cały proces — z wiedzą eksperta, który zna system od środka.",
    name: "Piotr",
    category: "Nauczyciel",
    badge: "Awans zawodowy",
  },
  {
    id: "testimonial-3",
    text: "Gdy przeprowadziłam się do Polski, bałam się mówić po polsku. Lekcje były dopasowane do mojego tempa, a atmosfera tak swobodna, że szybko zaczęłam czuć się pewniej.",
    name: "Maria",
    category: "Cudzoziemiec",
  },
  {
    id: "testimonial-4",
    text: "Warsztaty dla naszego zespołu nauczycielskiego były konkretne, praktyczne i bardzo dobrze przygotowane. Wróciliśmy do szkoły z narzędziami, które od razu wykorzystaliśmy na lekcjach.",
    name: "Katarzyna",
    category: "Instytucja",
    badge: "Warsztaty",
  },
];

export const testimonialTrustMetrics = [
  {
    value: "35+",
    label: "lat doświadczenia",
  },
  {
    value: "25",
    label: "lat egzaminatora",
  },
  {
    value: "1000+",
    label: "uczniów i nauczycieli",
  },
  {
    value: "★★★★★",
    label: "zaufanie klientów",
  },
] as const;
