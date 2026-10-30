import Image from "next/image";
import type { ReactNode } from "react";
import type { Img } from "@/content/site";
import { Heading } from "./ui";
import styles from "./PageHero.module.scss";

export default function PageHero({
  image,
  label,
  lines,
  text,
  children,
}: {
  image: Img;
  label: string;
  lines: string[];
  text?: string;
  children?: ReactNode;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <Heading as="h1" lines={lines} className={styles.title} start={0.4} />
        {(text || children) && (
          <div className={styles.bottom}>
            {text && <p>{text}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
