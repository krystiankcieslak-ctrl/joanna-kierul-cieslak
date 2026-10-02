import { AudienceCard } from "@/components/sections/audience-card";
import { MotionReveal } from "@/components/motion-reveal";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { sectionIntro, sectionSubtitle } from "@/constants/layout";
import { audienceGroups } from "@/constants/audience";

function Audience() {
  return (
    <Section
      id="dla-kogo"
      aria-labelledby="audience-heading"
      spacing="default"
    >
      <Container>
        <MotionReveal className={sectionIntro}>
          <Heading id="audience-heading" level="h2">
            Komu pomagam?
          </Heading>
          <p className={sectionSubtitle}>
            Wspieram uczniów, nauczycieli i osoby rozwijające kompetencje
            językowe. Wybierz obszar, który Cię interesuje.
          </p>
        </MotionReveal>

        <MotionReveal>
          {/* flex-wrap + justify-center: ostatni rząd (2 z 5 kart) jest wyśrodkowany, bez „dziury”. */}
          <ul className="flex flex-wrap justify-center gap-4">
            {audienceGroups.map((group) => (
              <li
                key={group.id}
                className="w-full md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
              >
                <AudienceCard
                  id={group.id}
                  title={group.title}
                  description={group.description}
                  href={group.href}
                />
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}

export { Audience };
