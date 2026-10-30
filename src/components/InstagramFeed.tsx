import Image from "next/image";
import { dictionary } from "@/content";
import { Arrow, Heading, TextLink, delay } from "./ui";
import styles from "./InstagramFeed.module.scss";

export default function InstagramFeed() {
  const { instagram } = dictionary.home;

  return (
    <section className={styles.instagram}>
      <header className={styles.head} data-reveal>
        <div className={styles.headTitle}>
          <p className="label r-fade">{instagram.label}</p>
          <Heading lines={instagram.lines} />
        </div>
        <TextLink
          href={instagram.cta.href}
          label={instagram.cta.label}
          className="r-fade"
          style={delay(0.3)}
          external
        />
      </header>

      <ul className={styles.grid} data-reveal>
        {instagram.items.map((item, i) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.item}
            >
              <div
                className={`${styles.image} r-img`}
                style={delay(0.1 + i * 0.12)}
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 760px) 50vw, 25vw"
                />
                <div className={styles.hover}>
                  <p>{item.text}</p>
                  <span className={styles.more}>
                    {instagram.more}
                    <Arrow />
                  </span>
                </div>
              </div>
              <p
                className={`${styles.title} r-fade`}
                style={delay(0.4 + i * 0.12)}
              >
                {item.title}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
