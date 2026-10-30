"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { dictionary } from "@/content";
import { admin } from "@/content/admin";
import { studioHero } from "@/content/media";
import { DEMO_LOGIN, signIn } from "@/lib/admin/session";
import Logo from "../Logo";
import { Plus } from "../ui";
import ui from "./admin.module.scss";
import styles from "./AdminLogin.module.scss";

export default function AdminLogin() {
  const t = admin.login;
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const id = useId();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPending(true);
    setError(false);
    const { ok } = await signIn(
      String(data.get("email") ?? ""),
      String(data.get("password") ?? ""),
    );
    if (ok) router.replace("/admin");
    else {
      setPending(false);
      setError(true);
    }
  };

  return (
    <main className={styles.login}>
      <div className={styles.media}>
        <Image
          src={studioHero}
          alt=""
          fill
          priority
          sizes="60vw"
          placeholder="blur"
        />
        <Link
          href="/"
          className={styles.mediaLogo}
          aria-label={dictionary.nav.home}
        >
          <Logo className={styles.logo} />
        </Link>
        <p className={styles.quote}>
          {dictionary.home.hero.lines.map((line, i) => (
            <span key={line}>
              {i > 0 && " "}
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className={styles.panel}>
        <Link
          href="/"
          className={styles.panelLogo}
          aria-label={dictionary.nav.home}
        >
          <Logo className={styles.logo} />
        </Link>

        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.title}>
            <p className="label">{admin.label}</p>
            <h1 className="heading">{t.title}</h1>
            <p className="body-text">{t.text}</p>
          </div>

          <label className={`${ui.field} ${error ? ui.invalid : ""}`}>
            <span className={ui.caption}>{t.email}</span>
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              autoFocus
            />
          </label>
          <div className={`${ui.field} ${error ? ui.invalid : ""}`}>
            <label htmlFor={`${id}-password`} className={ui.caption}>
              {t.password}
            </label>
            <div className={styles.password}>
              <input
                id={`${id}-password`}
                name="password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.reveal}
                onClick={() => setVisible((v) => !v)}
              >
                {visible ? t.hide : t.show}
              </button>
            </div>
          </div>

          {error && (
            <p className={ui.error} role="alert">
              {t.error}
            </p>
          )}

          <button type="submit" className={ui.primary} disabled={pending}>
            {pending ? t.pending : t.submit}
            {!pending && <Plus />}
          </button>

          {process.env.NODE_ENV === "development" && (
            <p className={ui.notice}>
              {t.demo}: {DEMO_LOGIN.email} / {DEMO_LOGIN.password}
            </p>
          )}
        </form>

        <Link href="/" className={styles.back}>
          ← {t.back}
        </Link>
      </div>
    </main>
  );
}
