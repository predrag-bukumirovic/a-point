import Image from "next/image";
import { getDictionary } from "@/content";
import { localePath, type Locale } from "@/content/site";
import CtaBand from "../CtaBand";
import PageHero from "../PageHero";
import SiteFrame from "../SiteFrame";
import { Heading, TextLink, delay } from "../ui";
import styles from "./ServicesPage.module.scss";

export default function ServicesPage({ locale }: { locale: Locale }) {
  const { servicesPage: s, ui } = getDictionary(locale);

  return (
    <SiteFrame locale={locale}>
      <PageHero image={s.hero.image} label={s.hero.label} lines={s.hero.lines} text={s.hero.text} />

      <div className={styles.list}>
        {s.items.map((item, i) => (
          <article key={item.id} id={item.id} className={`${styles.service} ${i % 2 ? styles.reverse : ""}`}>
            <div className={styles.media} data-reveal>
              <div className={`${styles.frame} r-img`}>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className={styles.body} data-reveal>
              <Heading lines={[item.title]} className={styles.title} />
              <p className="body-text r-fade" style={delay(0.25)}>
                {item.text}
              </p>
              <p className={`label ${styles.includesLabel} r-fade`} style={delay(0.35)}>
                {s.includesLabel}
              </p>
              <ul className={`${styles.includes} r-fade`} style={delay(0.4)}>
                {item.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              {item.note && (
                <div className={`${styles.note} r-fade`} style={delay(0.5)}>
                  <p>{item.note}</p>
                  <TextLink href={localePath(locale, "/projects/central-park-plaza")} label={ui.viewProject} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <section className={styles.process}>
        <header data-reveal>
          <p className="label r-fade">{s.process.label}</p>
          <Heading lines={s.process.lines} />
        </header>
        <ol className={styles.steps} data-reveal>
          {s.process.steps.map((step, i) => (
            <li key={step.title} className="r-fade" style={delay(0.1 + i * 0.08)}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand locale={locale} />
    </SiteFrame>
  );
}
