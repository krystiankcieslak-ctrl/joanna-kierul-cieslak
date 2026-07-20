import { AudienceCard } from "@/components/sections/audience-card";
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
        <div className={sectionIntro}>
          <Heading id="audience-heading" level="h2">
            Komu pomagam?
          </Heading>
          <p className={sectionSubtitle}>
            Wspieram uczniów, nauczycieli i osoby rozwijające kompetencje
            językowe. Wybierz obszar, który Cię interesuje.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audienceGroups.map((group) => (
            <li key={group.id} className="h-full">
              <AudienceCard
                id={group.id}
                title={group.title}
                description={group.description}
                href={group.href}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export { Audience };
