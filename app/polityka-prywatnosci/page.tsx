import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { LogoMark } from "@/components/ui/logo-mark";
import { contactDetails } from "@/constants/contact";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Informacje o przetwarzaniu danych osobowych i plikach cookies na stronie Joanny Kierul-Cieślak.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

/**
 * UWAGA: wzór polityki prywatności — przed publikacją warto go zweryfikować
 * (np. z prawnikiem) i uzupełnić o faktycznie używane usługi (hosting, formularz).
 */
const LAST_UPDATED = "2 października 2026";

const email = contactDetails.find((item) => item.id === "email")?.value;
const phone = contactDetails.find((item) => item.id === "phone")?.value;

function PolicySection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-3 scroll-mt-24">
      <h2 className="font-heading text-xl font-semibold tracking-tight text-primary md:text-2xl">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="border-b border-border/60 bg-background/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            aria-label="Joanna Kierul-Cieślak — strona główna"
          >
            <LogoMark />
            <span className="truncate font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "shrink-0")}
          >
            <ArrowLeft aria-hidden="true" />
            Strona główna
          </Link>
        </Container>
      </header>

      <main id="main-content" className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex flex-col gap-3 md:mb-12">
            <Heading level="h1" className="text-3xl sm:text-4xl lg:text-5xl">
              Polityka prywatności
            </Heading>
            <p className="text-sm text-muted-foreground">
              Ostatnia aktualizacja: {LAST_UPDATED}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <PolicySection title="1. Administrator danych">
              <p>
                Administratorem Twoich danych osobowych jest{" "}
                <strong>{siteConfig.name}</strong>, {siteConfig.city}. W sprawach
                dotyczących danych osobowych możesz kontaktować się pod adresem{" "}
                <a className="text-primary underline underline-offset-4" href={`mailto:${email}`}>
                  {email}
                </a>{" "}
                lub telefonicznie: {phone}.
              </p>
            </PolicySection>

            <PolicySection title="2. Jakie dane przetwarzam i w jakim celu">
              <p>
                Przetwarzam wyłącznie dane, które przekazujesz mi samodzielnie —
                przez formularz kontaktowy, e-mail lub telefon:
              </p>
              <ul>
                <li>imię, adres e-mail, opcjonalnie numer telefonu,</li>
                <li>temat i treść wiadomości.</li>
              </ul>
              <p>Dane wykorzystuję, aby:</p>
              <ul>
                <li>
                  odpowiedzieć na wiadomość i przedstawić ofertę — na podstawie
                  Twojej zgody (art. 6 ust. 1 lit. a RODO) oraz działań przed
                  zawarciem umowy (art. 6 ust. 1 lit. b RODO),
                </li>
                <li>
                  realizować współpracę i wystawiać dokumenty rozliczeniowe —
                  na podstawie umowy i obowiązków prawnych (art. 6 ust. 1 lit. b
                  i c RODO).
                </li>
              </ul>
            </PolicySection>

            <PolicySection title="3. Jak długo przechowuję dane">
              <p>
                Dane z korespondencji przechowuję przez czas potrzebny do
                udzielenia odpowiedzi i prowadzenia rozmów, a w przypadku
                nawiązania współpracy — przez okres jej trwania oraz przez czas
                wymagany przepisami (np. podatkowymi).
              </p>
            </PolicySection>

            <PolicySection title="4. Komu mogą być przekazane dane">
              <p>
                Dane nie są sprzedawane ani udostępniane w celach marketingowych.
                Mogą mieć do nich dostęp wyłącznie podmioty techniczne, z których
                usług korzystam: dostawca hostingu strony, dostawca poczty e-mail
                oraz — jeśli jest używany — dostawca obsługi formularza
                kontaktowego.
              </p>
            </PolicySection>

            <PolicySection title="5. Twoje prawa">
              <p>Masz prawo do:</p>
              <ul>
                <li>dostępu do swoich danych i otrzymania ich kopii,</li>
                <li>sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
                <li>przenoszenia danych oraz wniesienia sprzeciwu,</li>
                <li>
                  cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z
                  prawem wcześniejszego przetwarzania),
                </li>
                <li>
                  wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
                </li>
              </ul>
              <p>
                Podanie danych jest dobrowolne, ale bez nich nie będę mogła
                odpowiedzieć na wiadomość.
              </p>
            </PolicySection>

            <PolicySection id="cookies" title="6. Pliki cookies">
              <p>
                Strona nie korzysta z cookies marketingowych ani analitycznych i
                nie śledzi odwiedzających. Mogą być używane wyłącznie niezbędne
                pliki techniczne, potrzebne do prawidłowego działania strony.
                Ustawienia cookies możesz w każdej chwili zmienić w swojej
                przeglądarce.
              </p>
            </PolicySection>
          </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
