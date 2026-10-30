import { dictionary } from "@/content";
import {
  BRAND,
  CONTACT,
  FOUNDED,
  LEGAL_NAME,
  POSTAL,
  SITE_URL,
} from "@/content/site";

export default function JsonLd() {
  const { meta } = dictionary;
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#studio`,
    name: BRAND,
    legalName: LEGAL_NAME,
    foundingDate: FOUNDED,
    founder: [
      {
        "@type": "Person",
        name: "Michael Pokroy",
        jobTitle: "Managing Director",
      },
      {
        "@type": "Person",
        name: "Dimitrije Dukic",
        jobTitle: "Design Director",
      },
    ],
    description: meta.description,
    url: SITE_URL + "/",
    logo: `${SITE_URL}/media/logo.svg`,
    image: `${SITE_URL}/media/og.jpg`,
    inLanguage: "en",
    sameAs: [CONTACT.instagram],
    areaServed: [
      "Dubai",
      "Abu Dhabi",
      "United Arab Emirates",
      "Middle East",
      "Cyprus",
    ],
    knowsAbout: [
      "Architecture",
      "Interior design",
      "Villa design",
      "3D visualisation",
      "Residential developments",
    ],
    address: [
      {
        "@type": "PostalAddress",
        postOfficeBoxNumber: POSTAL.box,
        addressLocality: POSTAL.city,
        addressCountry: POSTAL.country,
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Limassol",
        addressCountry: "CY",
      },
    ],
    ...(CONTACT.email && { email: CONTACT.email }),
    ...(CONTACT.phone && { telephone: CONTACT.phone }),
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
