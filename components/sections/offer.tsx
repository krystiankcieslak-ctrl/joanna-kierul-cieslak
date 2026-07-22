import { OfferItem } from "@/components/sections/offer-item";
import { MotionReveal } from "@/components/motion-reveal";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { sectionIntro, sectionSubtitle } from "@/constants/layout";
import { offers } from "@/constants/offer";
import { getOfferImagesById } from "@/lib/offer-images";

function Offer() {
  const offerImagesById = getOfferImagesById();
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

        <div className="flex flex-col gap-14 md:gap-16 lg:gap-20">
          {offers.map((offer, index) => (
            <OfferItem
              key={offer.id}
              {...offer}
              image={offerImagesById[offer.id]}
              reversed={index % 2 === 1}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { Offer };
