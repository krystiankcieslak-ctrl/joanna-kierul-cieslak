import { Card, CardContent } from "@/components/ui/card";
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
        <div className={sectionIntro}>
          <Heading id="statistics-heading" level="h2">
            Doświadczenie, które buduje zaufanie
          </Heading>
          <p className={sectionSubtitle}>
            Ponad trzy dekady pracy w edukacji — od egzaminatora po doradcę
            metodycznego.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {statistics.map((item) => (
            <li key={item.label}>
              <Card className="h-full gap-0">
                <CardContent className="flex flex-col gap-1.5 p-0">
                  <p className="font-heading text-5xl font-bold tracking-tight text-primary tabular-nums sm:text-6xl">
                    {item.value}
                  </p>
                  <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                    {item.label}
                  </p>
                  <span className="sr-only">
                    {item.value} {item.label}
                  </span>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export { Statistics };
