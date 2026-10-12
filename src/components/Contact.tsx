import { getDictionary } from "@/content";
import { CONTACT, localePath, telHref, whatsappHref, type Locale } from "@/content/site";
import { Arrow, Heading, TextLink, delay } from "./ui";
import styles from "./Contact.module.scss";

/** Načini kontakta; prikazuju se samo oni koji su upisani u CONTACT (site.ts). */
export function ContactMethods({ locale }: { locale: Locale }) {
  const { ui, contact } = getDictionary(locale);

  const methods = [
    CONTACT.whatsapp && {
      label: ui.whatsapp,
      value: ui.whatsappChat,
      href: whatsappHref(CONTACT.whatsapp, ui.whatsappMessage),
      external: true,
    },
    CONTACT.phone && { label: ui.call, value: CONTACT.phone, href: telHref(CONTACT.phone), ltr: true },
    CONTACT.email && { label: ui.email, value: CONTACT.email, href: `mailto:${CONTACT.email}`, ltr: true },
    {
      label: ui.instagram,
      value: CONTACT.instagramHandle,
      title: contact.instagramDm,
      href: CONTACT.instagramDm,
      external: true,
      ltr: true,
    },
  ].filter(Boolean) as { label: string; value: string; href: string; title?: string; external?: boolean; ltr?: boolean }[];

  return (
    <ul className={styles.methods}>
      {methods.map((m, i) => (
        <li key={m.label} className="r-fade" style={delay(0.15 + i * 0.08)}>
          <a
            href={m.href}
            title={m.title}
            className={styles.method}
            {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className={styles.methodLabel}>{m.label}</span>
            <span className={styles.methodValue} dir={m.ltr ? "ltr" : undefined}>
              {m.value}
            </span>
            <Arrow className={styles.methodArrow} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Kontakt na početnoj: uvod i studiji levo, načini kontakta i link ka formi desno. */
export default function Contact({ locale }: { locale: Locale }) {
  const { contact } = getDictionary(locale);

  return (
    <section className={styles.contact}>
      <div className={styles.intro} data-reveal>
        <p className="label r-fade">{contact.label}</p>
        <Heading lines={contact.lines} />
        <p className="body-text r-fade" style={delay(0.35)}>
          {contact.text}
        </p>
        <div className={`${styles.studios} r-fade`} style={delay(0.45)}>
          <p className="label">{contact.studiosLabel}</p>
          <ul>
            {contact.studios.map((studio) => (
              <li key={studio.city}>
                <span className={styles.city}>{studio.city}</span>
                <span className={styles.country}>{studio.country}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.side} data-reveal>
        <p className="label r-fade">{contact.methodsLabel}</p>
        <ContactMethods locale={locale} />
        <TextLink
          href={localePath(locale, "/contact")}
          label={contact.enquiryCta}
          className={`${styles.enquiry} r-fade`}
          style={delay(0.5)}
        />
      </div>
    </section>
  );
}
