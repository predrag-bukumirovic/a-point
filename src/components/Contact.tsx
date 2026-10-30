import { dictionary } from "@/content";
import { CONTACT, telHref, whatsappHref } from "@/content/site";
import { Arrow, Heading, TextLink, delay } from "./ui";
import styles from "./Contact.module.scss";

export function ContactMethods({ compact }: { compact?: boolean }) {
  const { ui, contact } = dictionary;

  const methods = [
    CONTACT.whatsapp && {
      label: ui.whatsapp,
      value: ui.whatsappChat,
      href: whatsappHref(CONTACT.whatsapp, ui.whatsappMessage),
      external: true,
    },
    CONTACT.phone && {
      label: ui.call,
      value: CONTACT.phone,
      href: telHref(CONTACT.phone),
    },
    CONTACT.email && {
      label: ui.email,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      label: ui.instagram,
      value: CONTACT.instagramHandle,
      title: contact.instagramDm,
      href: CONTACT.instagramDm,
      external: true,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    title?: string;
    external?: boolean;
  }[];

  return (
    <ul className={`${styles.methods} ${compact ? styles.compact : ""}`}>
      {methods.map((m, i) => (
        <li key={m.label} className="r-fade" style={delay(0.15 + i * 0.08)}>
          <a
            href={m.href}
            title={m.title}
            className={styles.method}
            {...(m.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className={styles.methodLabel}>{m.label}</span>
            <span className={styles.methodValue}>{m.value}</span>
            <Arrow className={styles.methodArrow} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Contact() {
  const { contact } = dictionary;

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
        <ContactMethods />
        <TextLink
          href="/contact"
          label={contact.enquiryCta}
          className={`${styles.enquiry} r-fade`}
          style={delay(0.5)}
        />
      </div>
    </section>
  );
}
