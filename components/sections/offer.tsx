import { OfferItem } from "@/components/sections/offer-item";
import { MotionReveal } from "@/components/motion-reveal";
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
        <MotionReveal className={sectionIntro}>
          <Heading id="offer-heading" level="h2">
            Oferta
          </Heading>
          <p className={sectionSubtitle}>
            Wybierz formę wsparcia najlepiej dopasowaną do Twoich potrzeb.
          </p>
        </MotionReveal>

        <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
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
