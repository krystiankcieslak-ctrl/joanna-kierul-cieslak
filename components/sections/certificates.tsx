import { CertificateGallery } from "@/components/sections/certificate-gallery";
import { MotionReveal } from "@/components/motion-reveal";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import {
  certificatesHeading,
  certificatesSubtitle,
} from "@/constants/certificates";
import { sectionIntro, sectionStack, sectionSubtitle } from "@/constants/layout";
import { certificateImages } from "@/lib/certificates";
import { cn } from "@/lib/utils";

function Certificates() {
  return (
    <Section
      id="certyfikaty"
      aria-labelledby="certificates-heading"
      spacing="default"
      className="scroll-mt-24 bg-secondary/20"
    >
      <Container>
        <MotionReveal className={sectionIntro}>
          <Heading id="certificates-heading" level="h2">
            {certificatesHeading}
          </Heading>
          <p className={sectionSubtitle}>{certificatesSubtitle}</p>
        </MotionReveal>

        <MotionReveal className={cn(sectionStack)}>
          <CertificateGallery images={certificateImages} />
        </MotionReveal>
      </Container>
    </Section>
  );
}

export { Certificates };
