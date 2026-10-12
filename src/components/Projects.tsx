"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
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
  detail: Img;
};

export type FeaturedLabels = {
  label: string;
  lines: string[];
  prev: string;
  next: string;
  view: string;
  all: { label: string; href: string };
};

/** Izdvojeni projekti na početnoj: velika slika, opis, detalj i strelice. */
export default function Projects({ items, labels }: { items: FeaturedItem[]; labels: FeaturedLabels }) {
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: 0 });
  const touchX = useRef<number | null>(null);
  const changed = index !== prev;
  const item = items[index];

  const go = (dir: 1 | -1) =>
    setSlide((s) => ({ index: (s.index + dir + items.length) % items.length, prev: s.index }));

  // Sve slike su u DOM-u (pa se učitaju unapred); vidljive su trenutna i prethodna.
  const layerClass = (i: number) =>
    [
      styles.layer,
      i === index && styles.current,
      i === index && changed && styles.enter,
      i === prev && changed && styles.previous,
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <section className={`${styles.projects} pin`} data-pin aria-roledescription="carousel">
      <header className={styles.head} data-reveal>
        <div className={styles.headTitle}>
          <p className="label r-fade">{labels.label}</p>
          <Heading lines={labels.lines} />
        </div>
        <TextLink href={labels.all.href} label={labels.all.label} className={`${styles.all} r-fade`} style={delay(0.3)} />
      </header>

      <div className={styles.slider} data-reveal>
        <div
          className={`${styles.main} r-img`}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            const rtl = document.documentElement.dir === "rtl";
            if (Math.abs(dx) > 40) go((dx < 0) !== rtl ? 1 : -1);
            touchX.current = null;
          }}
        >
          {items.map((p, i) => (
            <Link key={p.href} href={p.href} className={layerClass(i)} tabIndex={i === index ? 0 : -1} aria-hidden={i !== index}>
              <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 900px) 100vw, 38vw" placeholder="blur" />
            </Link>
          ))}
        </div>

        <div className={`${styles.info} r-fade`} style={delay(0.3)} aria-live="polite">
          <div key={index} className={changed ? styles.textEnter : undefined}>
            <p className={styles.place}>{item.place}</p>
            <h3 className={styles.title}>
              <Link href={item.href}>{item.title}</Link>
            </h3>
            <p className={styles.text}>{item.text}</p>
          </div>
          <div key={`n${index}`} className={changed ? styles.textEnter : undefined}>
            <p className={styles.note}>{item.note}</p>
            <TextLink href={item.href} label={labels.view} className={styles.view} />
          </div>
        </div>

        <div className={`${styles.side} r-fade`} style={delay(0.45)}>
          <div className={styles.detail}>
            {items.map((p, i) => (
              <div key={p.href} className={layerClass(i)}>
                <Image src={p.detail.src} alt={p.detail.alt} fill sizes="(max-width: 900px) 40vw, 14vw" />
              </div>
            ))}
          </div>
          <p key={index} className={`${styles.caption} ${changed ? styles.textEnter : ""}`}>
            {item.caption}
          </p>
          <div className={styles.arrows}>
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev}>
              <Arrow className={styles.flip} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={labels.next}>
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
