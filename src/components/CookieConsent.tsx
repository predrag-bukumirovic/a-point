"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { Dictionary } from "@/content";
import { localePath, type Locale } from "@/content/site";
import { OPEN_SETTINGS, saveConsent, useConsent } from "@/lib/consent";
import styles from "./CookieConsent.module.scss";

/**
 * Kartica za kolačiće u donjem uglu. Prvo kratko objašnjenje sa izborom „sve“ ili „samo neophodni“;
 * u podešavanjima se analitika uključuje posebno. Futer je ponovo otvara (openCookieSettings).
 */
export default function CookieConsent({ locale, t }: { locale: Locale; t: Dictionary["cookies"] }) {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const [settings, setSettings] = useState(false);
  // null: prekidač prati sačuvani izbor dok ga posetilac ne pomeri.
  const [analytics, setAnalytics] = useState<boolean | null>(null);
  const [leaving, setLeaving] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const id = useId();

  useEffect(() => {
    const open = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      setAnalytics(null);
      setSettings(true);
      setLeaving(false);
      setReopened(true);
    };
    window.addEventListener(OPEN_SETTINGS, open);
    return () => window.removeEventListener(OPEN_SETTINGS, open);
  }, []);

  // Kad posetilac sam otvori podešavanja, fokus prelazi u karticu (bitno za tastaturu i čitače ekrana).
  useEffect(() => {
    if (settings || reopened) panel.current?.focus({ preventScroll: true });
  }, [settings, reopened]);

  const checked = analytics ?? consent === true;

  const choose = (allow: boolean) => {
    saveConsent(allow);
    setReopened(false);
    setLeaving(true);
    returnTo.current?.focus({ preventScroll: true });
    returnTo.current = null;
  };

  if (consent === undefined || (consent !== null && !reopened && !leaving)) return null;

  return (
    <div
      ref={panel}
      role="dialog"
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      className={[styles.panel, reopened && styles.now, leaving && styles.leaving].filter(Boolean).join(" ")}
      onAnimationEnd={(e) => {
        if (leaving && e.target === e.currentTarget) setLeaving(false);
      }}
      data-lenis-prevent
    >
      {settings ? (
        <div key="settings" className={styles.view}>
          <h2 id={`${id}-title`} className={styles.title}>
            {t.settingsTitle}
          </h2>
          <ul className={styles.list}>
            <li>
              <div className={styles.row}>
                <h3>{t.necessary.title}</h3>
                <span className={styles.always}>{t.necessary.status}</span>
              </div>
              <p>{t.necessary.text}</p>
            </li>
            <li>
              <div className={styles.row}>
                <h3 id={`${id}-analytics`}>{t.analytics.title}</h3>
                <button
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  aria-labelledby={`${id}-analytics`}
                  className={styles.switch}
                  onClick={() => setAnalytics(!checked)}
                >
                  <span />
                </button>
              </div>
              <p>{t.analytics.text}</p>
            </li>
          </ul>
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={() => choose(checked)}>
              {t.save}
            </button>
            <button type="button" className={styles.primary} onClick={() => choose(true)}>
              {t.acceptAll}
            </button>
          </div>
        </div>
      ) : (
        <div key="intro" className={styles.view}>
          <h2 id={`${id}-title`} className={styles.title}>
            {t.title}
          </h2>
          <p className={styles.text}>
            {t.policy.text} <Link href={localePath(locale, "/privacy")}>{t.policy.link}</Link>.
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={() => choose(true)}>
              {t.acceptAll}
            </button>
            <button type="button" className={styles.secondary} onClick={() => choose(false)}>
              {t.necessaryOnly}
            </button>
          </div>
          <button type="button" className={styles.more} onClick={() => setSettings(true)}>
            {t.settings}
          </button>
        </div>
      )}
    </div>
  );
}
