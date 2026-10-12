import { getDictionary } from "@/content";
import { CONTACT, localePath, whatsappHref, type Locale } from "@/content/site";
import { Heading, TextLink, delay } from "./ui";
import styles from "./CtaBand.module.scss";

/** Tamna traka sa pozivom na kontakt (dno unutrašnjih strana). */
export default function CtaBand({ locale }: { locale: Locale }) {
  const { cta, ui } = getDictionary(locale);

  return (
    <section className={styles.band} data-reveal>
      <Heading lines={cta.lines} />
      <div className={styles.side}>
        <p className="r-fade" style={delay(0.3)}>
          {cta.text}
        </p>
        <div className={styles.links}>
          <TextLink
            href={localePath(locale, cta.button.href)}
            label={cta.button.label}
            className="r-fade"
            style={delay(0.4)}
          />
          {CONTACT.whatsapp && (
            <TextLink
              href={whatsappHref(CONTACT.whatsapp, ui.whatsappMessage)}
              label={ui.whatsappChat}
              className="r-fade"
              style={delay(0.5)}
              external
            />
          )}
        </div>
      </div>
    </section>
  );
}
