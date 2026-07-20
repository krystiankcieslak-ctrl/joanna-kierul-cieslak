export const contactHeading = "Kontakt";

export const contactSubtitle =
  "Masz pytania lub chcesz porozmawiać o współpracy? Chętnie pomogę dobrać najlepszą formę wsparcia.";

export const contactIntro =
  "Napisz wiadomość lub zadzwoń — wspólnie ustalimy, jak mogę Ci najlepiej pomóc.";

export const contactDetails = [
  {
    id: "phone",
    label: "Telefon",
    value: "+48 000 000 000",
    href: "tel:+48000000000",
  },
  {
    id: "email",
    label: "E-mail",
    value: "kontakt@joannakierulcieslak.pl",
    href: "mailto:kontakt@joannakierulcieslak.pl",
  },
  {
    id: "location",
    label: "Lokalizacja",
    value: "Wrocław / Online",
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
} as const;
