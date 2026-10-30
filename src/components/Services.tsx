import Image from "next/image";
import { dictionary } from "@/content";
import { Heading, TextLink, delay } from "./ui";
import styles from "./Services.module.scss";

export default function Services() {
  const { services } = dictionary.home;

  return (
    <section className={styles.services}>
      <div className={styles.banner}>
        <div className={styles.bg}>
          <Image
            src={services.background.src}
            alt={services.background.alt}
            fill
            sizes="100vw"
            placeholder="blur"
          />
        </div>
        <div className={styles.shade} />

        <div className={styles.intro} data-reveal>
          <p className={`${styles.label} r-fade`}>{services.label}</p>
          <Heading lines={services.lines} />
          <p className={`${styles.text} r-fade`} style={delay(0.35)}>
            {services.text}
          </p>
          <TextLink
            href={services.cta.href}
            label={services.cta.label}
            className="r-fade"
            style={delay(0.5)}
          />
        </div>
      </div>

      <ol className={styles.list} data-reveal>
        {services.items.map((item, i) => (
          <li
            key={item.title}
            className={`${styles.item} r-fade`}
            style={delay(0.1 + i * 0.1)}
          >
            <div className={styles.image}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 760px) 50vw, 24vw"
              />
            </div>
            <div className={styles.row}>
              <h3>{item.title}</h3>
            </div>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>

      <p className={`label ${styles.note}`}>{services.note}</p>
    </section>
  );
}
