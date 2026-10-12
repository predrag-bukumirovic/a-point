import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/content";
import type { Project } from "@/content/projects";
import { localePath, type Locale } from "@/content/site";
import PageHero from "../PageHero";
import ProjectGallery from "../ProjectGallery";
import SiteFrame from "../SiteFrame";
import { TextLink, delay } from "../ui";
import styles from "./ProjectPage.module.scss";

export default function ProjectPage({ locale, project, next }: { locale: Locale; project: Project; next: Project }) {
  const { projectPage: t, ui } = getDictionary(locale);

  const facts = [
    ...(project.year ? [[t.year, project.year]] : []),
    [t.location, project.location],
    [t.type, project.category],
    [t.scope, project.scope],
    ...(project.credits
      ? [
          [t.client, project.credits.client],
          [t.architect, project.credits.architect],
        ]
      : []),
  ];
  // Prva slika je naslovna, galerija prikazuje ostale.
  const gallery = project.gallery.slice(1);

  return (
    <SiteFrame locale={locale}>
      <PageHero image={project.hero} label={project.category} lines={[project.title]} text={project.location} />

      <section className={styles.overview}>
        <dl className={styles.facts} data-reveal>
          {facts.map(([label, value], i) => (
            <div key={label} className="r-fade" style={delay(0.1 + i * 0.07)}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.story} data-reveal>
          <p className={`${styles.summary} r-fade`}>{project.summary}</p>
          {project.body.map((text, i) => (
            <p key={i} className="body-text r-fade" style={delay(0.2 + i * 0.1)}>
              {text}
            </p>
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className={styles.gallery} aria-label={t.gallery}>
          <ProjectGallery
            photos={gallery}
            labels={{ open: ui.openImage, close: ui.close, prev: ui.prevImage, next: ui.nextImage }}
          />
        </section>
      )}

      {project.film && (
        <section className={styles.film} data-reveal>
          <p className="label r-fade">{t.film}</p>
          <video
            className="r-fade"
            style={delay(0.15)}
            src={project.film.src}
            poster={project.film.poster}
            controls
            playsInline
            preload="none"
          />
        </section>
      )}

      <section className={styles.next}>
        <Link href={localePath(locale, `/projects/${next.slug}`)} className={styles.nextLink}>
          <div className={styles.nextImage}>
            <Image src={next.hero.src} alt={next.hero.alt} fill sizes="100vw" placeholder="blur" />
          </div>
          <div className={styles.nextContent}>
            <span className={styles.nextLabel}>{t.next}</span>
            <span className={styles.nextTitle}>{next.title}</span>
            <span className={styles.nextMeta}>{next.location}</span>
          </div>
        </Link>
        <div className={styles.back}>
          <TextLink href={localePath(locale, "/projects")} label={t.back} />
        </div>
      </section>
    </SiteFrame>
  );
}
