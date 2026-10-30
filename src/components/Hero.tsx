import { dictionary } from "@/content";
import HeroVideo from "./HeroVideo";
import { Heading, TextLink } from "./ui";
import styles from "./Hero.module.scss";

const VIDEO = { src: "/media/apoint.mp4", poster: "/media/apoint-poster.jpg" };

export default function Hero() {
  const { home, ui } = dictionary;
  const { hero } = home;

  return (
    <section className={styles.hero}>
      <HeroVideo
        src={VIDEO.src}
        poster={VIDEO.poster}
        className={styles.video}
        buttonClassName={styles.pause}
        labels={{ pause: ui.pauseVideo, play: ui.playVideo }}
      />
      <div className={styles.shade} />

      <div className={styles.content}>
        <Heading as="p" lines={hero.lines} className={styles.title} />
        <div className={styles.side}>
          <h1 className={styles.text}>{hero.text}</h1>
          <TextLink href={hero.cta.href} label={hero.cta.label} />
        </div>
      </div>
    </section>
  );
}
