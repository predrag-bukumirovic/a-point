"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import type { Img } from "@/content/site";
import { Arrow, Heading, TextLink, delay } from "./ui";
import styles from "./Projects.module.scss";

export type FeaturedItem = {
  href: string;
  place: string;
  title: string;
  text: string;
  note: string;
  caption: string;
  image: Img;
};

export type FeaturedLabels = {
  label: string;
  lines: string[];
  prev: string;
  next: string;
  view: string;
  all: { label: string; href: string };
};

export default function Projects({
  items,
  labels,
}: {
  items: FeaturedItem[];
  labels: FeaturedLabels;
}) {
  const [{ index, moved }, setSlide] = useState({ index: 0, moved: false });
  const touchX = useRef<number | null>(null);
  const item = items[index];

  const goTo = (i: number) =>
    setSlide({ index: (i + items.length) % items.length, moved: true });

  return (
    <section
      className={styles.projects}
      aria-roledescription="carousel"
      aria-label={labels.lines.join(" ")}
    >
      <header className={styles.head} data-reveal>
        <div className={styles.headTitle}>
          <p className="label r-fade">{labels.label}</p>
          <Heading lines={labels.lines} />
        </div>
        <TextLink
          href={labels.all.href}
          label={labels.all.label}
          className="r-fade"
          style={delay(0.3)}
        />
      </header>

      <div
        className={styles.viewport}
        data-reveal
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div className="r-fade">
          <ul
            className={styles.track}
            style={{ "--index": index } as CSSProperties}
          >
            {items.map((p, i) => (
              <li
                key={p.href}
                className={`${styles.slide} ${i === index ? styles.current : ""}`}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${items.length}`}
                aria-hidden={i !== index}
              >
                <Link
                  href={p.href}
                  className={styles.frame}
                  tabIndex={i === index ? 0 : -1}
                  onClick={(e) => {
                    if (i === index) return;
                    e.preventDefault();
                    goTo(i);
                  }}
                >
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(max-width: 760px) 90vw, 84vw"
                    placeholder="blur"
                    priority={i === 0}
                  />
                </Link>
                <p className={styles.caption}>{p.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.foot} data-reveal>
        <div
          key={index}
          className={`${styles.info} ${moved ? styles.textEnter : ""}`}
          aria-live="polite"
        >
          <p className="label">
            {item.place}
            <span aria-hidden="true"> · </span>
            {item.note}
          </p>
          <h3 className={styles.title}>
            <Link href={item.href}>{item.title}</Link>
          </h3>
          <p className={styles.text}>{item.text}</p>
          <TextLink href={item.href} label={labels.view} />
        </div>

        <div className={`${styles.controls} r-fade`} style={delay(0.2)}>
          <div className={styles.pager}>
            {items.map((p, i) => (
              <button
                key={p.href}
                type="button"
                className={styles.bar}
                aria-label={p.title}
                aria-current={i === index ? "true" : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className={styles.arrows}>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={labels.prev}
            >
              <Arrow className={styles.flip} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={labels.next}
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
