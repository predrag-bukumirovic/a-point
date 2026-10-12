"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Img } from "@/content/site";
import { getLenis } from "./SmoothScroll";
import { Arrow } from "./ui";
import styles from "./ProjectGallery.module.scss";

type Photo = Img & { portrait?: boolean };
type Labels = { open: string; close: string; prev: string; next: string };

/**
 * Redovi galerije: jedna široka slika, pa par, pa opet široka…; uspravne slike idu u parove na kraju.
 * Raspored „grid“ (arhiva) slaže sve slike u jednake redove po tri.
 */
function toRows(photos: Photo[], layout: "rows" | "grid") {
  if (layout === "grid") {
    let i = 0;
    const rows: Photo[][] = [];
    for (let k = 0; k < photos.length; k += 3) rows.push(photos.slice(k, k + 3));
    return rows.map((row) => row.map((photo) => ({ photo, i: i++ })));
  }
  const land = photos.filter((p) => !p.portrait);
  const port = photos.filter((p) => p.portrait);
  const rows: Photo[][] = [];
  for (let k = 0; k < land.length; ) {
    const pair = rows.length % 2 === 1 && k + 1 < land.length;
    rows.push(land.slice(k, k + (pair ? 2 : 1)));
    k += pair ? 2 : 1;
  }
  for (let k = 0; k < port.length; k += 2) rows.push(port.slice(k, k + 2));
  // Redni broj svake slike (redosled u uvećanom prikazu prati raspored na strani).
  let i = 0;
  return rows.map((row) => row.map((photo) => ({ photo, i: i++ })));
}

export default function ProjectGallery({
  photos,
  labels,
  layout = "rows",
}: {
  photos: Photo[];
  labels: Labels;
  layout?: "rows" | "grid";
}) {
  const rows = toRows(photos, layout);
  const ordered = rows.flat().map(({ photo }) => photo);
  const [current, setCurrent] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const open = current !== null;

  const step = (dir: 1 | -1) =>
    setCurrent((c) => (c === null ? c : (c + dir + ordered.length) % ordered.length));

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.classList.toggle("menu-open", open);
    if (open) getLenis()?.stop();
    else getLenis()?.start();
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  // Strelice na tastaturi; na arapskom „sledeća“ je levo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const photo = open ? ordered[current] : null;

  return (
    <>
      <div className={styles.grid}>
        {rows.map((row, r) => (
          <div
            key={r}
            className={`${styles.row} ${layout === "grid" ? styles.triple : row.length > 1 ? styles.pair : ""} ${row[0].photo.portrait ? styles.portrait : ""}`}
            data-reveal
          >
            {row.map(({ photo: p, i }) => (
              <button
                key={i}
                type="button"
                className={`${styles.thumb} r-img`}
                onClick={() => setCurrent(i)}
                aria-label={`${labels.open}: ${p.alt}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  placeholder="blur"
                  sizes={layout === "grid" ? "(max-width: 700px) 100vw, 33vw" : row.length > 1 ? "(max-width: 700px) 100vw, 50vw" : "100vw"}
                  {...(row.length > 1 || layout === "grid" ? { fill: true } : {})}
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label={photo?.alt}
        onClose={() => setCurrent(null)}
        onClick={(e) => e.target === e.currentTarget && setCurrent(null)}
      >
        {photo && (
          <>
            <figure className={styles.figure}>
              <div className={styles.frame}>
                <Image key={current} src={photo.src} alt={photo.alt} fill sizes="100vw" className={styles.full} />
              </div>
              <figcaption className={styles.caption}>{photo.alt}</figcaption>
            </figure>
            <button type="button" className={styles.close} onClick={() => setCurrent(null)}>
              {labels.close}
            </button>
            {ordered.length > 1 && (
              <>
                <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => step(-1)} aria-label={labels.prev}>
                  <Arrow className={styles.flip} />
                </button>
                <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => step(1)} aria-label={labels.next}>
                  <Arrow />
                </button>
              </>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
