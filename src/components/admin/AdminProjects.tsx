"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { admin } from "@/content/admin";
import { deleteDraft, listDrafts, type DraftProject } from "@/lib/admin/drafts";
import { Plus } from "../ui";
import ui from "./admin.module.scss";
import styles from "./AdminProjects.module.scss";

export type PublishedProject = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year?: string;
  featured: boolean;
  image: StaticImageData;
};

type Tab = "all" | "published" | "drafts";
type Draft = DraftProject & { coverUrl: string };

export default function AdminProjects({
  published,
}: {
  published: PublishedProject[];
}) {
  const t = admin.projects;
  const saved = useSearchParams().get("saved");
  const [drafts, setDrafts] = useState<Draft[] | null>(null);
  const [tab, setTab] = useState<Tab>("all");
  const [confirm, setConfirm] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let urls: string[] = [];
    listDrafts()
      .then((list) => {
        if (cancelled) return;
        urls = list.map((d) => URL.createObjectURL(d.cover));
        setDrafts(list.map((d, i) => ({ ...d, coverUrl: urls[i] })));
      })
      .catch(() => !cancelled && setDrafts([]));
    return () => {
      cancelled = true;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const remove = async (id: string) => {
    await deleteDraft(id);
    setDrafts((list) => list?.filter((d) => d.id !== id) ?? null);
    setConfirm(null);
    setDeleted(true);
  };

  const draftCount = drafts?.length ?? 0;
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: t.tabs.all, count: published.length + draftCount },
    { key: "published", label: t.tabs.published, count: published.length },
    { key: "drafts", label: t.tabs.drafts, count: draftCount },
  ];
  const message = deleted ? t.deleted : saved ? t.saved : null;
  const showDrafts = tab !== "published";
  const showPublished = tab !== "drafts";

  const meta = (p: { category: string; location: string; year?: string }) =>
    [p.category, p.location, p.year].filter(Boolean).join(" · ");

  return (
    <div className={ui.page}>
      <header className={ui.head}>
        <div className={ui.headTitle}>
          <p className="label">{admin.label}</p>
          <h1 className="heading">{t.title}</h1>
        </div>
        <Link href="/admin/projects/new" className={ui.primary}>
          {t.add}
          <Plus />
        </Link>
      </header>

      <div className={styles.tabs} role="tablist">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={styles.tab}
            onClick={() => setTab(key)}
          >
            {label}
            <span className={styles.count}>{count}</span>
          </button>
        ))}
      </div>

      {message && (
        <p className={`${ui.notice} ${styles.message}`} role="status">
          {message}
        </p>
      )}

      <ul className={styles.list}>
        {showDrafts &&
          drafts?.map((d) => (
            <li key={d.id} className={styles.row}>
              <div className={styles.thumb}>
                <Image src={d.coverUrl} alt="" fill sizes="140px" unoptimized />
              </div>
              <div className={styles.info}>
                <h2 className={styles.title}>{d.title}</h2>
                <p className={styles.meta}>{meta(d)}</p>
              </div>
              <p className={styles.status}>
                <span
                  className={`${styles.dot} ${styles.draft}`}
                  aria-hidden="true"
                />
                {t.draft}
                {d.featured && (
                  <span className={styles.featured}>{t.featured}</span>
                )}
              </p>
              <div className={styles.actions}>
                {confirm === d.id ? (
                  <>
                    <span className={styles.ask}>{t.confirm}</span>
                    <button type="button" onClick={() => remove(d.id)}>
                      {t.yes}
                    </button>
                    <button type="button" onClick={() => setConfirm(null)}>
                      {t.no}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={`/admin/projects/${d.id}`}>{t.edit}</Link>
                    <button type="button" onClick={() => setConfirm(d.id)}>
                      {t.delete}
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}

        {showPublished &&
          published.map((p) => (
            <li key={p.slug} className={styles.row}>
              <div className={styles.thumb}>
                <Image src={p.image} alt="" fill sizes="140px" />
              </div>
              <div className={styles.info}>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.meta}>{meta(p)}</p>
              </div>
              <p className={styles.status}>
                <span className={styles.dot} aria-hidden="true" />
                {t.published}
                {p.featured && (
                  <span className={styles.featured}>{t.featured}</span>
                )}
              </p>
              <div className={styles.actions}>
                <Link href={`/projects/${p.slug}`} target="_blank">
                  {t.view}
                </Link>
              </div>
            </li>
          ))}
      </ul>

      {tab === "drafts" && drafts && drafts.length === 0 && (
        <div className={styles.empty}>
          <p>{t.empty}</p>
          <Link href="/admin/projects/new" className="text-link">
            {t.emptyCta}
            <Plus />
          </Link>
        </div>
      )}
      {tab === "drafts" && !drafts && (
        <p className={styles.empty}>{t.loading}</p>
      )}

      {showDrafts && <p className={styles.note}>{t.localNote}</p>}
    </div>
  );
}
