import { getImageProps } from "next/image";
import { getDictionary } from "@/content";
import { localePath, type Locale } from "@/content/site";
import { Heading, TextLink } from "./ui";
import styles from "./Hero.module.scss";

export default function Hero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale).home;
  // Široka slika za desktop, uska (portret) za telefon.
  const common = { alt: hero.image.alt, sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: hero.image.wide });
  const { props: { srcSet: tall, ...img } } = getImageProps({ ...common, src: hero.image.tall });

  return (
    <section className={`${styles.hero} pin`} data-pin>
      <picture className={styles.media}>
        <source media="(min-width: 768px) and (min-aspect-ratio: 1/1)" srcSet={wide} />
        <source srcSet={tall} />
        <img {...img} alt={hero.image.alt} />
      </picture>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <Heading as="h1" lines={hero.lines} className={styles.title} />
        <div className={styles.bottom}>
          <p>{hero.text}</p>
          <TextLink href={localePath(locale, hero.cta.href)} label={hero.cta.label} />
        </div>
      </div>
    </section>
  );
}
