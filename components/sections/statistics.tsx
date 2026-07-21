import { StatisticValue } from "@/components/sections/statistic-value";
import { MotionReveal } from "@/components/motion-reveal";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { sectionIntro, sectionSubtitle } from "@/constants/layout";
import { statistics } from "@/constants/statistics";

function Statistics() {
  return (
    <Section
      id="statystyki"
      aria-labelledby="statistics-heading"
      spacing="compact"
      className="bg-secondary/40"
    >
      <Container>
        <MotionReveal className={sectionIntro}>
          <Heading id="statistics-heading" level="h2">
            Doświadczenie, które buduje zaufanie
          </Heading>
          <p className={sectionSubtitle}>
            Ponad trzy dekady pracy w edukacji — od egzaminatora po doradcę
            metodycznego.
          </p>
        </MotionReveal>

        <MotionReveal>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
            {statistics.map((item) => (
              <li key={item.label}>
                <StatisticValue value={item.value} label={item.label} />
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}

export { Statistics };
