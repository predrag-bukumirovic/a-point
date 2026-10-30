import Image from "next/image";
import { dictionary } from "@/content";
import { heroWide } from "@/content/media";
import { CONTACT, whatsappHref } from "@/content/site";
import { Heading, TextLink, delay } from "./ui";
import styles from "./CtaBand.module.scss";

export default function CtaBand() {
  const { cta, ui } = dictionary;

  return (
    <section className={styles.band}>
      <div className={styles.bg}>
        <Image src={heroWide} alt="" fill sizes="100vw" placeholder="blur" />
      </div>
      <div className={styles.shade} />

      <div className={styles.inner} data-reveal>
        <Heading lines={cta.lines} />
        <p className="r-fade" style={delay(0.3)}>
          {cta.text}
        </p>
        <div className={styles.links}>
          <TextLink
            href={cta.button.href}
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
