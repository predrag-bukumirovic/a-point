import Image from "next/image";
import { dictionary } from "@/content";
import CtaBand from "../CtaBand";
import PageHero from "../PageHero";
import SiteFrame from "../SiteFrame";
import { Heading, delay } from "../ui";
import styles from "./AboutPage.module.scss";

export default function AboutPage() {
  const { aboutPage: s, contact } = dictionary;

  return (
    <SiteFrame>
      <PageHero
        image={s.hero.image}
        label={s.hero.label}
        lines={s.hero.lines}
        text={s.hero.text}
      />

      <section className={styles.intro} data-reveal>
        <p className="label r-fade">{s.intro.label}</p>
        <div>
          <p className={`${styles.statement} r-fade`} style={delay(0.15)}>
            {s.intro.text}
          </p>
          <dl className={styles.facts}>
            {s.facts.map((fact, i) => (
              <div
                key={fact.label}
                className="r-fade"
                style={delay(0.3 + i * 0.1)}
              >
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.team}>
        <header data-reveal>
          <p className="label r-fade">{s.team.label}</p>
          <Heading lines={s.team.lines} />
        </header>
        <div className={styles.people}>
          {s.team.people.map((person) => (
            <article key={person.email} className={styles.person} data-reveal>
              <div className={`${styles.portrait} r-img`}>
                <Image
                  src={person.photo.src}
                  alt={person.photo.alt}
                  fill
                  sizes="(max-width: 900px) 60vw, 22vw"
                />
              </div>
              <div className={styles.name}>
                <h3 className="r-fade" style={delay(0.15)}>
                  {person.name}
                </h3>
                <p className={`${styles.role} r-fade`} style={delay(0.2)}>
                  {person.role}
                </p>
                <a
                  href={`mailto:${person.email}`}
                  className={`${styles.email} r-fade`}
                  style={delay(0.3)}
                >
                  {person.email}
                </a>
              </div>
              <div className={styles.bio}>
                {person.bio.map((text, i) => (
                  <p
                    key={i}
                    className="body-text r-fade"
                    style={delay(0.3 + i * 0.1)}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.principles}>
        <header data-reveal>
          <p className="label r-fade">{s.principles.label}</p>
          <Heading lines={s.principles.lines} />
        </header>
        <ol className={styles.principleList} data-reveal>
          {s.principles.items.map((item, i) => (
            <li
              key={item.title}
              className="r-fade"
              style={delay(0.15 + i * 0.12)}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.clients}>
        <header data-reveal>
          <p className="label r-fade">{s.clients.label}</p>
          <Heading lines={s.clients.lines} />
        </header>
        <ul className={styles.clientList} data-reveal>
          {s.clients.items.map((item, i) => (
            <li
              key={item.title}
              className="r-fade"
              style={delay(0.15 + i * 0.12)}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.approach}>
        <div className={styles.approachMedia} data-reveal>
          <div className={`${styles.frame} r-img`}>
            <Image
              src={s.approach.image.src}
              alt={s.approach.image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              placeholder="blur"
            />
          </div>
        </div>
        <div className={styles.approachText} data-reveal>
          <p className="label r-fade">{s.approach.label}</p>
          <Heading lines={s.approach.lines} />
          {s.approach.paragraphs.map((text, i) => (
            <p
              key={i}
              className="body-text r-fade"
              style={delay(0.3 + i * 0.1)}
            >
              {text}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.locations}>
        <div className={styles.locationsBg}>
          <Image
            src={s.locations.image.src}
            alt={s.locations.image.alt}
            fill
            sizes="100vw"
            placeholder="blur"
          />
        </div>
        <div className={styles.locationsInner} data-reveal>
          <p className="label r-fade">{s.locations.label}</p>
          <Heading lines={s.locations.lines} />
          <p className={`${styles.locationsText} r-fade`} style={delay(0.3)}>
            {s.locations.text}
          </p>
          <ul className={styles.studios}>
            {contact.studios.map((studio, i) => (
              <li
                key={studio.city}
                className="r-fade"
                style={delay(0.4 + i * 0.1)}
              >
                <span className={styles.city}>{studio.city}</span>
                <span className={styles.country}>{studio.country}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </SiteFrame>
  );
}
