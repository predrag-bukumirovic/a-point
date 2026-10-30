import Image from "next/image";
import { dictionary } from "@/content";
import { Heading, TextLink, delay } from "./ui";
import styles from "./About.module.scss";

export default function About() {
  const { about } = dictionary.home;
  const [big, small] = about.images;

  return (
    <section className={styles.about}>
      <div className={styles.top}>
        <div className={styles.statement} data-reveal>
          <p className="label r-fade">{about.label}</p>
          <Heading lines={about.lines} />
        </div>
        <div className={styles.text} data-reveal>
          <p className="body-text r-fade" style={delay(0.3)}>
            {about.text}
          </p>
          <TextLink
            href={about.cta.href}
            label={about.cta.label}
            className="r-fade"
            style={delay(0.45)}
          />
        </div>
      </div>

      <div className={styles.images} data-reveal>
        <div className={`${styles.small} r-img`} style={delay(0.25)}>
          <Image
            src={small.src}
            alt={small.alt}
            fill
            sizes="(max-width: 760px) 50vw, 28vw"
            placeholder="blur"
          />
        </div>
        <div className={`${styles.big} r-img`}>
          <Image
            src={big.src}
            alt={big.alt}
            fill
            sizes="(max-width: 760px) 100vw, 58vw"
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
