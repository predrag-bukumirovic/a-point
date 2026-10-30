import Image from "next/image";
import Link from "next/link";
import { dictionary } from "@/content";
import { getProjects } from "@/content/projects";
import CtaBand from "../CtaBand";
import ProjectGallery from "../ProjectGallery";
import SiteFrame from "../SiteFrame";
import { Arrow, Heading, delay } from "../ui";
import styles from "./ProjectsPage.module.scss";

export default function ProjectsPage() {
  const { projectsPage: p, ui } = dictionary;
  const { archive } = p;
  const projects = getProjects();

  return (
    <SiteFrame header="solid">
      <section className={styles.head}>
        <div data-reveal>
          <p className="label r-fade">{p.label}</p>
          <Heading as="h1" lines={p.lines} />
        </div>
        <p className={`body-text ${styles.text}`} data-reveal>
          <span className="r-fade" style={delay(0.3)}>
            {p.text}
          </span>
        </p>
      </section>

      <ul className={styles.grid}>
        {projects.map((project, i) => (
          <li key={project.slug} className={styles.item} data-reveal>
            <Link href={`/projects/${project.slug}`} className={styles.card}>
              <div className={`${styles.image} r-img`}>
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 46vw"
                  placeholder="blur"
                  priority={i < 2}
                />
              </div>
              <div className={`${styles.meta} r-fade`} style={delay(0.2)}>
                <span>{project.category}</span>
                <span>
                  {project.location}
                  {project.year && ` — ${project.year}`}
                </span>
              </div>
              <h2 className={`${styles.title} r-fade`} style={delay(0.28)}>
                {project.title}
              </h2>
              <span className={`${styles.more} r-fade`} style={delay(0.34)}>
                {ui.viewProject}
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className={styles.archive}>
        <div className={styles.archiveHead} data-reveal>
          <div>
            <p className="label r-fade">{archive.label}</p>
            <Heading lines={archive.lines} />
          </div>
          <p className="body-text r-fade" style={delay(0.3)}>
            {archive.text}
          </p>
        </div>
        <ProjectGallery
          photos={archive.images}
          layout="grid"
          labels={{
            open: ui.openImage,
            close: ui.close,
            prev: ui.prevImage,
            next: ui.nextImage,
          }}
        />
      </section>

      <CtaBand />
    </SiteFrame>
  );
}
