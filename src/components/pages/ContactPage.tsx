import Image from "next/image";
import { dictionary } from "@/content";
import { ContactMethods } from "../Contact";
import EnquiryForm from "../EnquiryForm";
import SiteFrame from "../SiteFrame";
import { Heading, delay } from "../ui";
import styles from "./ContactPage.module.scss";

export default function ContactPage() {
  const { contact, contactPage: c, aboutPage } = dictionary;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <SiteFrame header="solid">
      <section className={styles.top}>
        <div className={styles.intro} data-reveal>
          <p className="label r-fade">{contact.label}</p>
          <Heading as="h1" lines={contact.lines} />
          <p className="body-text r-fade" style={delay(0.3)}>
            {contact.text}
          </p>

          <div className={styles.block}>
            <p className="label r-fade" style={delay(0.35)}>
              {contact.methodsLabel}
            </p>
            <ContactMethods compact />
          </div>
        </div>

        <div className={styles.formCard}>
          <div data-reveal>
            <p className="label r-fade">{contact.form.label}</p>
            <Heading lines={contact.form.lines} className={styles.formTitle} />
          </div>
          <EnquiryForm form={contact.form} privacyHref="/privacy" />
        </div>
      </section>

      <div className={styles.details} data-reveal>
        <div className={styles.places}>
          <div>
            <p className="label r-fade">{contact.studiosLabel}</p>
            <ul className={styles.studios}>
              {contact.studios.map((studio, i) => (
                <li
                  key={studio.city}
                  className="r-fade"
                  style={delay(0.08 + i * 0.08)}
                >
                  <span className={styles.city}>{studio.city}</span>
                  <span className={styles.meta}>{studio.country}</span>
                  {studio.address && (
                    <span className={styles.meta}>{studio.address}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label r-fade" style={delay(0.12)}>
              {contact.postal.label}
            </p>
            <p className={`${styles.postal} r-fade`} style={delay(0.2)}>
              {contact.postal.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>
        </div>

        <div>
          <p className="label r-fade" style={delay(0.16)}>
            {contact.directorsLabel}
          </p>
          <ul className={styles.directors}>
            {aboutPage.team.people.map((person, i) => (
              <li
                key={person.email}
                className="r-fade"
                style={delay(0.24 + i * 0.08)}
              >
                <span className={styles.city}>{person.name}</span>
                <span className={styles.meta}>{person.role}</span>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className={styles.faq}>
        <div className={styles.faqHead}>
          <div data-reveal>
            <p className="label r-fade">{c.faq.label}</p>
            <Heading lines={c.faq.lines} />
          </div>
          <div className={styles.faqMedia} data-reveal>
            <div className={`${styles.frame} r-img`} style={delay(0.2)}>
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
        <div className={styles.questions} data-reveal>
          {c.faq.items.map((item, i) => (
            <details
              key={item.q}
              className="r-fade"
              style={delay(0.1 + i * 0.07)}
            >
              <summary>
                {item.q}
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
    </SiteFrame>
  );
}
