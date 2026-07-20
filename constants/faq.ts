export const faqHeading = "Najczęściej zadawane pytania";

export const faqSubtitle =
  "Odpowiedzi na pytania, które najczęściej pojawiają się przed rozpoczęciem współpracy.";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: readonly FaqItem[] = [
  {
    id: "faq-online",
    question: "Czy zajęcia odbywają się online?",
    answer:
      "Tak — większość spotkań prowadzę online, w dogodnym dla Ciebie terminie. Po uzgodnieniu szczegółów otrzymasz link i materiały potrzebne do zajęć.",
  },
  {
    id: "faq-first-meeting",
    question: "Jak wygląda pierwsze spotkanie?",
    answer:
      "Pierwsze spotkanie to spokojna rozmowa o Twoich celach, oczekiwaniach i obecnej sytuacji. Na tej podstawie wspólnie ustalamy dalszy plan współpracy.",
  },
  {
    id: "faq-duration",
    question: "Jak długo trwają zajęcia?",
    answer:
      "Standardowe spotkanie trwa 60 minut. W zależności od potrzeb możliwe są również krótsze konsultacje lub dłuższe sesje — ustalamy to indywidualnie.",
  },
  {
    id: "faq-matura-rozszerzona",
    question: "Czy przygotowuje Pani do matury rozszerzonej?",
    answer:
      "Tak, przygotowuję do matury podstawowej i rozszerzonej z języka polskiego, z naciskiem na strukturę wypowiedzi, analizę tekstów i bezpieczeństwo egzaminacyjne.",
  },
  {
    id: "faq-school-training",
    question: "Czy prowadzi Pani szkolenia dla szkół?",
    answer:
      "Tak, współpracuję z placówkami edukacyjnymi — prowadzę warsztaty, szkolenia i doradztwo metodyczne dopasowane do potrzeb zespołu nauczycielskiego.",
  },
  {
    id: "faq-invoices",
    question: "Czy wystawia Pani faktury?",
    answer:
      "Tak, na życzenie wystawiam fakturę. Szczegóły rozliczeń ustalamy przed rozpoczęciem współpracy.",
  },
  {
    id: "faq-sign-up",
    question: "Jak zapisać się na konsultację?",
    answer:
      "Najprościej przez formularz kontaktowy na tej stronie, e-mail lub telefon. Odpowiadam zwykle w ciągu 24 godzin i proponuję termin pierwszego spotkania.",
  },
  {
    id: "faq-single-exam",
    question: "Czy mogę przygotować się tylko do jednego egzaminu?",
    answer:
      "Oczywiście — oferuję zarówno długoterminowe wsparcie, jak i krótszą współpracę skoncentrowaną na jednym egzaminie lub konkretnym celu.",
  },
];
