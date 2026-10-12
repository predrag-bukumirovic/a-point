import Image from "next/image";
import { getDictionary } from "@/content";
import { localePath, type Locale } from "@/content/site";
import { Heading, TextLink, delay } from "./ui";
import styles from "./Services.module.scss";

export default function Services({ locale }: { locale: Locale }) {
  const { services } = getDictionary(locale).home;

  return (
    <section className={`${styles.services} pin`} data-pin>
      <div className={styles.bg}>
        <Image src={services.background.src} alt={services.background.alt} fill sizes="100vw" placeholder="blur" />
      </div>
      <div className={styles.overlay} />

      <div className={styles.intro} data-reveal>
        <p className="label r-fade">{services.label}</p>
        <Heading lines={services.lines} />
        <p className={`${styles.text} r-fade`} style={delay(0.35)}>
          {services.text}
        </p>
        <TextLink
          href={localePath(locale, services.cta.href)}
          label={services.cta.label}
          className="r-fade"
          style={delay(0.5)}
        />
      </div>

      <ul className={styles.cards} data-reveal>
        {services.items.map((item, i) => (
          <li key={item.title} className={`${styles.card} r-fade`} style={delay(0.15 + i * 0.1)} tabIndex={0}>
            <div className={styles.image}>
              <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 900px) 40vw, 11vw" />
            </div>
            <div className={styles.cardText}>
              <h3>{item.title}</h3>
              <div className={styles.desc}>
                <p>{item.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.note} data-reveal>
        <span className="r-fade" style={delay(0.6)}>
          {services.note}
        </span>
      </p>
    </section>
  );
}
