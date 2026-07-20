import { OfferItem } from "@/components/sections/offer-item";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { sectionIntro, sectionSubtitle } from "@/constants/layout";
import { offers } from "@/constants/offer";

function Offer() {
  return (
    <Section
      id="oferta"
      aria-labelledby="offer-heading"
      spacing="default"
    >
      <Container>
        <div className={sectionIntro}>
          <Heading id="offer-heading" level="h2">
            Oferta
          </Heading>
          <p className={sectionSubtitle}>
            Wybierz formę wsparcia najlepiej dopasowaną do Twoich potrzeb.
          </p>
        </div>

        <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
          {offers.map((offer, index) => (
            <OfferItem
              key={offer.id}
              {...offer}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { Offer };
