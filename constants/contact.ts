export const contactHeading = "Kontakt";

export const contactSubtitle =
  "Masz pytania lub chcesz porozmawiać o współpracy? Chętnie pomogę dobrać najlepszą formę wsparcia.";

export const contactIntro =
  "Napisz wiadomość lub zadzwoń — wspólnie ustalimy, jak mogę Ci najlepiej pomóc.";

export const contactDetails = [
  {
    id: "phone",
    label: "Telefon",
    value: "+48 507 248 868",
    href: "tel:+48507248868",
  },
  {
    id: "email",
    label: "E-mail",
    value: "joannakierulcieslak@gmail.com",
    href: "mailto:joannakierulcieslak@gmail.com",
  },
  {
    id: "location",
    label: "Lokalizacja",
    value: "Słupsk / Online",
  },
  {
    id: "response",
    label: "Czas odpowiedzi",
    value: "Odpowiadam zwykle w ciągu 24 godzin.",
  },
] as const;

export const contactHighlight = {
  title: "Preferujesz kontakt telefoniczny?",
  cta: "Zadzwoń",
} as const;

export const contactForm = {
  title: "Wyślij wiadomość",
  submitLabel: "Wyślij wiadomość",
  fields: {
    name: {
      label: "Imię",
      name: "name",
      autoComplete: "given-name",
      required: true,
    },
    email: {
      label: "Adres e-mail",
      name: "email",
      type: "email",
      autoComplete: "email",
      required: true,
    },
    phone: {
      label: "Telefon",
      name: "phone",
      type: "tel",
      autoComplete: "tel",
      required: false,
    },
    subject: {
      label: "Temat",
      name: "subject",
      autoComplete: "off",
      required: true,
    },
    message: {
      label: "Wiadomość",
      name: "message",
      required: true,
    },
  },
  consent: {
    label:
      "Wyrażam zgodę na przetwarzanie moich danych w celu odpowiedzi na wiadomość.",
    linkLabel: "Polityka prywatności",
    href: "/polityka-prywatnosci",
  },
  errors: {
    name: "Podaj swoje imię.",
    email: "Podaj poprawny adres e-mail.",
    subject: "Wpisz temat wiadomości.",
    message: "Napisz kilka słów o tym, w czym mogę pomóc.",
    consent: "Zaznacz zgodę, abym mogła odpowiedzieć na wiadomość.",
  },
  status: {
    sending: "Wysyłanie…",
    success: {
      title: "Dziękuję za wiadomość!",
      text: "Odpowiadam zwykle w ciągu 24 godzin.",
      again: "Wyślij kolejną wiadomość",
    },
    mailto: {
      title: "Otwieram program pocztowy",
      text: "Wiadomość jest gotowa do wysłania — wystarczy kliknąć „Wyślij” w swojej poczcie.",
    },
    error:
      "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na adres e-mail.",
  },
} as const;
