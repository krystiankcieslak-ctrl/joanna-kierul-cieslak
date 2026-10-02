import { contactDetails } from "@/constants/contact";
import { faqItems } from "@/constants/faq";
import { siteConfig } from "@/constants/site";

const phone = contactDetails.find((item) => item.id === "phone");
const email = contactDetails.find((item) => item.id === "email");

/** JSON-LD (schema.org) — pomaga Google zrozumieć, kim jest autorka strony i czym się zajmuje. */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.jobTitle,
        url: siteConfig.url,
        image: `${siteConfig.url}/images/joanna-kierul-cieslak1.jpg`,
        telephone: phone?.value.replace(/\s/g, ""),
        email: email?.value,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.city,
          addressCountry: "PL",
        },
        knowsAbout: [
          "Język polski",
          "Matura z języka polskiego",
          "Egzamin ósmoklasisty",
          "Doradztwo metodyczne",
          "Awans zawodowy nauczycieli",
          "Język polski jako obcy",
          "Korekta i redakcja tekstów",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "pl-PL",
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export { StructuredData };
