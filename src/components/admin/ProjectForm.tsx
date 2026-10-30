"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { admin } from "@/content/admin";
import {
  deleteDraft,
  listDrafts,
  saveDraft,
  slugify,
  type DraftProject,
} from "@/lib/admin/drafts";
import { Arrow, Plus } from "../ui";
import ui from "./admin.module.scss";
import styles from "./ProjectForm.module.scss";

type Values = {
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  client: string;
  architect: string;
  summary: string;
  body: string;
  caption: string;
  featured: boolean;
};
type TextField = Exclude<keyof Values, "featured">;
type GalleryImage = {
  key: string;
  file: Blob;
  url: string;
  alt: string;
  portrait: boolean;
};

const EMPTY: Values = {
  title: "",
  category: "",
  location: "",
  year: "",
  scope: "",
  client: "",
  architect: "",
  summary: "",
  body: "",
  caption: "",
  featured: false,
};
const REQUIRED: TextField[] = ["title", "category", "location", "summary"];

const createUrl = (store: string[], file: Blob) => {
  const url = URL.createObjectURL(file);
  store.push(url);
  return url;
};

const isPortrait = async (file: Blob) => {
  try {
    const bitmap = await createImageBitmap(file);
    const portrait = bitmap.height > bitmap.width;
    bitmap.close();
    return portrait;
  } catch {
    return false;
  }
};

function Drop({
  label,
  multiple,
  onFiles,
}: {
  label: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
}) {
  const [over, setOver] = useState(false);
  const pick = (list: FileList | null) =>
    onFiles([...(list ?? [])].filter((f) => f.type.startsWith("image/")));

  return (
    <label
      className={`${styles.drop} ${over ? styles.over : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        pick(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        className={styles.file}
        onChange={(e) => {
          pick(e.target.files);
          e.target.value = "";
        }}
      />
      <Plus size={16} />
      <span>{label}</span>
    </label>
  );
}

export default function ProjectForm({
  id,
  categories,
  scopes,
  takenSlugs,
}: {
  id?: string;
  categories: string[];
  scopes: string[];
  takenSlugs: string[];
}) {
  const t = admin.form;
  const router = useRouter();
  const [values, setValues] = useState<Values>(EMPTY);
  const [cover, setCover] = useState<{ file: Blob; url: string } | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    id ? "loading" : "ready",
  );
  const [createdAt, setCreatedAt] = useState<number | null>(null);
  const [draftSlugs, setDraftSlugs] = useState<string[]>([]);
  const [invalid, setInvalid] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const urls = useRef<string[]>([]);

  const objectUrl = (file: Blob) => createUrl(urls.current, file);
  useEffect(() => {
    const list = urls.current;
    return () => list.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  useEffect(() => {
    let cancelled = false;
    listDrafts().then((list) => {
      if (cancelled) return;
      setDraftSlugs(list.filter((d) => d.id !== id).map((d) => d.slug));
      if (!id) return;
      const draft = list.find((d) => d.id === id);
      if (!draft) {
        setStatus("missing");
        return;
      }
      setValues({
        title: draft.title,
        category: draft.category,
        location: draft.location,
        year: draft.year,
        scope: draft.scope,
        client: draft.credits?.client ?? "",
        architect: draft.credits?.architect ?? "",
        summary: draft.summary,
        body: draft.body.join("\n\n"),
        caption: draft.caption,
        featured: draft.featured,
      });
      setCover({
        file: draft.cover,
        url: createUrl(urls.current, draft.cover),
      });
      setGallery(
        draft.gallery.map((g) => ({
          ...g,
          key: crypto.randomUUID(),
          url: createUrl(urls.current, g.file),
        })),
      );
      setCreatedAt(draft.createdAt);
      setStatus("ready");
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const slug = slugify(values.title);
  const slugTaken =
    Boolean(slug) && [...takenSlugs, ...draftSlugs].includes(slug);

  const change =
    (name: TextField) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setInvalid((list) =>
        list.filter((n) => n !== name && !(name === "title" && n === "slug")),
      );
      setFormError(null);
    };

  const addGallery = async (files: File[]) => {
    const items = await Promise.all(
      files.map(async (file) => ({
        key: crypto.randomUUID(),
        file,
        url: objectUrl(file),
        alt: "",
        portrait: await isPortrait(file),
      })),
    );
    setGallery((list) => [...list, ...items]);
  };

  const moveImage = (index: number, dir: -1 | 1) =>
    setGallery((list) => {
      const next = [...list];
      [next[index], next[index + dir]] = [next[index + dir], next[index]];
      return next;
    });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const missing: string[] = REQUIRED.filter((name) => !values[name].trim());
    if (!cover) missing.push("cover");
    if (slugTaken) missing.push("slug");
    setInvalid(missing);
    if (missing.length || !cover) {
      const only = missing.length === 1 ? missing[0] : null;
      setFormError(
        only === "slug"
          ? t.errors.slug
          : only === "cover"
            ? t.errors.cover
            : t.errors.required,
      );
      return;
    }

    setSaving(true);
    setFormError(null);
    const now = Date.now();
    const client = values.client.trim();
    const architect = values.architect.trim();
    const draft: DraftProject = {
      id: id ?? crypto.randomUUID(),
      slug,
      createdAt: createdAt ?? now,
      updatedAt: now,
      title: values.title.trim(),
      category: values.category.trim(),
      location: values.location.trim(),
      year: values.year.trim(),
      scope: values.scope.trim(),
      summary: values.summary.trim(),
      body: values.body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
      caption: values.caption.trim(),
      featured: values.featured,
      ...(client || architect ? { credits: { client, architect } } : {}),
      cover: cover.file,
      gallery: gallery.map(({ file, alt, portrait }) => ({
        file,
        alt: alt.trim(),
        portrait,
      })),
    };

    try {
      await saveDraft(draft);
      router.push(`/admin?saved=${draft.id}`);
    } catch {
      setSaving(false);
      setFormError(t.errors.failed);
    }
  };

  const remove = async () => {
    if (!id) return;
    await deleteDraft(id);
    router.push("/admin");
  };

  const field = (
    name: TextField,
    label: string,
    options: {
      required?: boolean;
      full?: boolean;
      textarea?: boolean;
      hint?: string;
      list?: string;
      rows?: number;
    } = {},
  ) => (
    <label
      className={[
        ui.field,
        options.full && styles.full,
        invalid.includes(name) && ui.invalid,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={ui.caption}>
        {label}
        {options.required && <span aria-hidden="true"> *</span>}
      </span>
      {options.textarea ? (
        <textarea
          name={name}
          value={values[name]}
          onChange={change(name)}
          rows={options.rows ?? 4}
          required={options.required}
        />
      ) : (
        <input
          name={name}
          value={values[name]}
          onChange={change(name)}
          list={options.list}
          required={options.required}
          {...(name === "year"
            ? { inputMode: "numeric" as const, maxLength: 4 }
            : {})}
        />
      )}
      {options.hint && <span className={ui.hint}>{options.hint}</span>}
    </label>
  );

  const section = (title: string, children: ReactNode) => (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>{children}</div>
    </section>
  );

  if (status === "missing") {
    return (
      <div className={ui.page}>
        <p className={ui.notice}>{t.notFound}</p>
        <Link href="/admin" className={`text-link ${styles.missingBack}`}>
          {t.back}
          <Plus />
        </Link>
      </div>
    );
  }

  return (
    <div className={ui.page}>
      <Link href="/admin" className={styles.back}>
        ← {t.back}
      </Link>
      <header className={ui.head}>
        <div className={ui.headTitle}>
          <p className="label">{id ? t.editLabel : t.newLabel}</p>
          <h1 className="heading">
            {id ? values.title || t.editTitle : t.newTitle}
          </h1>
        </div>
      </header>

      {status === "loading" ? null : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.main}>
            {section(
              t.sections.details,
              <>
                {field("title", t.fields.title, { required: true, full: true })}
                {field("category", t.fields.category, {
                  required: true,
                  list: "admin-categories",
                })}
                {field("location", t.fields.location, { required: true })}
                {field("year", t.fields.year)}
                {field("scope", t.fields.scope, { list: "admin-scopes" })}
                {field("client", t.fields.client)}
                {field("architect", t.fields.architect)}
              </>,
            )}

            {section(
              t.sections.description,
              <>
                {field("summary", t.fields.summary, {
                  required: true,
                  full: true,
                  textarea: true,
                  rows: 3,
                  hint: t.hints.summary,
                })}
                {field("body", t.fields.body, {
                  full: true,
                  textarea: true,
                  rows: 8,
                  hint: t.hints.body,
                })}
                {field("caption", t.fields.caption, {
                  full: true,
                  hint: t.hints.caption,
                })}
              </>,
            )}

            {section(
              t.sections.images,
              <>
                <div
                  className={`${ui.field} ${styles.full} ${invalid.includes("cover") ? ui.invalid : ""}`}
                >
                  <span className={ui.caption}>
                    {t.fields.cover}
                    <span aria-hidden="true"> *</span>
                  </span>
                  {cover ? (
                    <div className={styles.cover}>
                      <div className={styles.coverImage}>
                        <Image
                          src={cover.url}
                          alt=""
                          fill
                          sizes="(max-width: 900px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                      <div className={styles.imageActions}>
                        <label className={styles.inlineButton}>
                          <input
                            type="file"
                            accept="image/*"
                            className={styles.file}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file)
                                setCover({ file, url: objectUrl(file) });
                              e.target.value = "";
                            }}
                          />
                          {t.replace}
                        </label>
                        <button
                          type="button"
                          className={styles.inlineButton}
                          onClick={() => setCover(null)}
                        >
                          {t.remove}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Drop
                      label={t.hints.dropOne}
                      onFiles={([file]) => {
                        if (!file) return;
                        setCover({ file, url: objectUrl(file) });
                        setInvalid((list) => list.filter((n) => n !== "cover"));
                        setFormError(null);
                      }}
                    />
                  )}
                  <span className={ui.hint}>{t.hints.cover}</span>
                </div>

                <div className={`${ui.field} ${styles.full}`}>
                  <span className={ui.caption}>{t.fields.gallery}</span>
                  {gallery.length > 0 && (
                    <ul className={styles.gallery}>
                      {gallery.map((img, i) => (
                        <li key={img.key} className={styles.galleryItem}>
                          <div
                            className={`${styles.galleryImage} ${img.portrait ? styles.portrait : ""}`}
                          >
                            <Image
                              src={img.url}
                              alt=""
                              fill
                              sizes="240px"
                              unoptimized
                            />
                          </div>
                          <input
                            className={styles.alt}
                            placeholder={t.fields.alt}
                            aria-label={`${t.fields.alt} ${i + 1}`}
                            value={img.alt}
                            onChange={(e) =>
                              setGallery((list) =>
                                list.map((g) =>
                                  g.key === img.key
                                    ? { ...g, alt: e.target.value }
                                    : g,
                                ),
                              )
                            }
                          />
                          <div className={styles.imageActions}>
                            <button
                              type="button"
                              className={styles.move}
                              onClick={() => moveImage(i, -1)}
                              disabled={i === 0}
                              aria-label={t.moveEarlier}
                            >
                              <Arrow className={styles.flip} />
                            </button>
                            <button
                              type="button"
                              className={styles.move}
                              onClick={() => moveImage(i, 1)}
                              disabled={i === gallery.length - 1}
                              aria-label={t.moveLater}
                            >
                              <Arrow />
                            </button>
                            <button
                              type="button"
                              className={styles.inlineButton}
                              onClick={() =>
                                setGallery((list) =>
                                  list.filter((g) => g.key !== img.key),
                                )
                              }
                            >
                              {t.remove}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Drop label={t.hints.drop} multiple onFiles={addGallery} />
                  <span className={ui.hint}>{t.hints.gallery}</span>
                </div>
              </>,
            )}
          </div>

          <aside className={styles.side}>
            <div className={styles.card}>
              <dl className={styles.facts}>
                <div>
                  <dt>{t.status}</dt>
                  <dd>
                    <span className={styles.dot} aria-hidden="true" />
                    {admin.projects.draft}
                  </dd>
                </div>
                <div>
                  <dt>{t.address}</dt>
                  <dd
                    className={`${styles.slug} ${invalid.includes("slug") ? styles.slugTaken : ""}`}
                  >
                    /projects/{slug || "…"}
                  </dd>
                </div>
              </dl>

              <label className={styles.toggle}>
                <span>{t.featured}</span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={values.featured}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, featured: e.target.checked }))
                  }
                />
              </label>

              {formError && (
                <p className={ui.error} role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" className={ui.primary} disabled={saving}>
                {saving ? t.saving : t.save}
                {!saving && <Plus />}
              </button>
              <Link href="/admin" className={ui.secondary}>
                {t.cancel}
              </Link>
              {id && (
                <button
                  type="button"
                  className={styles.delete}
                  onClick={remove}
                >
                  {t.delete}
                </button>
              )}
            </div>
          </aside>

          <datalist id="admin-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <datalist id="admin-scopes">
            {scopes.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </form>
      )}
    </div>
  );
}
