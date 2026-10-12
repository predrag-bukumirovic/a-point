import Image from "next/image";
import { getDictionary } from "@/content";
import { localePath, type Locale } from "@/content/site";
import { ContactMethods } from "../Contact";
import EnquiryForm from "../EnquiryForm";
import SiteFrame from "../SiteFrame";
import { Heading, delay } from "../ui";
import styles from "./ContactPage.module.scss";

export default function ContactPage({ locale }: { locale: Locale }) {
  const { contact, contactPage: c, aboutPage } = getDictionary(locale);
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
    <SiteFrame locale={locale} header="solid">
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
            <ContactMethods locale={locale} />
          </div>

          <div className={styles.block}>
            <p className="label r-fade" style={delay(0.45)}>
              {contact.studiosLabel}
            </p>
            <ul className={styles.studios}>
              {contact.studios.map((studio, i) => (
                <li key={studio.city} className="r-fade" style={delay(0.5 + i * 0.08)}>
                  <span className={styles.city}>{studio.city}</span>
                  <span className={styles.country}>{studio.country}</span>
                  {studio.address && <span className={styles.address}>{studio.address}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.block}>
            <p className="label r-fade" style={delay(0.55)}>
              {contact.postal.label}
            </p>
            <p className={`${styles.postal} r-fade`} style={delay(0.6)}>
              {contact.postal.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </div>

          <div className={styles.block}>
            <p className="label r-fade" style={delay(0.65)}>
              {contact.directorsLabel}
            </p>
            <ul className={styles.directors}>
              {aboutPage.team.people.map((person, i) => (
                <li key={person.email} className="r-fade" style={delay(0.7 + i * 0.08)}>
                  <span className={styles.directorName}>{person.name}</span>
                  <span className={styles.country}>{person.role}</span>
                  <a href={`mailto:${person.email}`} dir="ltr">
                    {person.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.formCard}>
          <div data-reveal>
            <p className="label r-fade">{contact.form.label}</p>
            <Heading lines={contact.form.lines} className={styles.formTitle} />
          </div>
          <EnquiryForm locale={locale} form={contact.form} privacyHref={localePath(locale, "/privacy")} />
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.faqHead}>
          <div data-reveal>
            <p className="label r-fade">{c.faq.label}</p>
            <Heading lines={c.faq.lines} />
          </div>
          <div className={styles.faqMedia} data-reveal>
            <div className={`${styles.frame} r-img`} style={delay(0.2)}>
              <Image src={c.image.src} alt={c.image.alt} fill sizes="(max-width: 900px) 100vw, 30vw" placeholder="blur" />
            </div>
          </div>
        </div>
        <div className={styles.questions} data-reveal>
          {c.faq.items.map((item, i) => (
            <details key={item.q} className="r-fade" style={delay(0.1 + i * 0.07)}>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
    </SiteFrame>
  );
}
