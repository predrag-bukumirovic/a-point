"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "@/content";
import { CONTACT, localePath, telHref, type Locale } from "@/content/site";
import Logo from "./Logo";
import { getLenis } from "./SmoothScroll";
import styles from "./Header.module.scss";

const noop = () => () => {};

// Izbor jezika se pamti za sledeći ulazak na „/“ (čita ga proxy.ts).
const rememberLocale = (locale: Locale) => {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
};
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/**
 * `overlay`: providan preko tamne naslovne slike, posle malo skrola dobija belu podlogu.
 * `solid`: bela podloga od početka (strane bez slike na vrhu).
 */
export default function Header({
  locale,
  nav,
  place,
  variant = "overlay",
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  /** Gradovi studija („Dubai · Limassol · Worldwide“), u dnu mobilnog menija. */
  place: string;
  variant?: "overlay" | "solid";
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Meni se renderuje u <body>: heroj je zakačen (sticky), pa bi ga inače
  // sledeće sekcije prekrile. Portal postoji tek posle hidratacije.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 24, () => false);
  const solid = variant === "solid" || scrolled;
  // Linkovi zatvorenog menija se preskaču pri navigaciji tastaturom.
  const tab = open ? 0 : -1;

  // Ista strana na drugom jeziku.
  const other: Locale = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);

  // „Home“ je aktivan samo na početnoj; ostali linkovi i na svojim podstranama (npr. projekat).
  const isActive = (href: string) =>
    href === "/" ? pathname === localePath(locale) : pathname.startsWith(localePath(locale, href));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("menu-open", open);
    if (open) getLenis()?.stop();
    else getLenis()?.start();
    return () => root.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    getLenis()?.start();
    setOpen(false);
  };

  const switchLink = (className: string, tabIndex?: number) => (
    <Link
      href={switchHref}
      hrefLang={other}
      lang={other}
      title={nav.switchTitle}
      className={className}
      onClick={() => {
        rememberLocale(other);
        close();
      }}
      tabIndex={tabIndex}
    >
      {nav.switchLabel}
    </Link>
  );

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ""}`}>
      <a href="#main" className={styles.skip}>
        {nav.skip}
      </a>
      <div className={styles.bar}>
        <Link href={localePath(locale)} className={styles.logo} aria-label={nav.home}>
          <Logo className={styles.brand} />
        </Link>
        <nav className={styles.nav} aria-label={nav.main}>
          {nav.links.map((link, i) => (
            <Link
              key={link.href}
              href={localePath(locale, link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              style={{ animationDelay: `${0.9 + i * 0.08}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          {switchLink(styles.lang)}
          <Link
            href={localePath(locale, nav.contact.href)}
            className={styles.contact}
            aria-current={isActive(nav.contact.href) ? "page" : undefined}
          >
            {nav.contact.label}
          </Link>
        </div>
        <button
          type="button"
          className={styles.toggle}
          aria-label={nav.menu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      {mounted &&
        createPortal(
          // data-lenis-prevent: na niskom ekranu meni se skroluje iako je Lenis zaustavljen.
          <div
            id="mobile-menu"
            className={`${styles.overlay} ${open ? styles.open : ""}`}
            aria-hidden={!open}
            data-lenis-prevent
          >
            <div className={styles.overlayBar}>
              <Logo className={styles.brand} />
              <button type="button" className={styles.toggle} aria-label={nav.close} onClick={close} tabIndex={tab}>
                <span className={`${styles.burger} ${styles.cross}`} aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
            </div>
            <nav className={styles.overlayNav} aria-label={nav.mobile}>
              {[...nav.links, nav.contact].map((link, i) => (
                <Link
                  key={link.href}
                  href={localePath(locale, link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={close}
                  tabIndex={tab}
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className={styles.name}>
                    <span>{link.label}</span>
                  </span>
                </Link>
              ))}
            </nav>
            <div className={styles.overlayFoot}>
              <div className={styles.reach}>
                {CONTACT.email && (
                  <a href={`mailto:${CONTACT.email}`} dir="ltr" tabIndex={tab}>
                    {CONTACT.email}
                  </a>
                )}
                {CONTACT.phone && (
                  <a href={telHref(CONTACT.phone)} dir="ltr" tabIndex={tab}>
                    {CONTACT.phone}
                  </a>
                )}
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" dir="ltr" tabIndex={tab}>
                  {CONTACT.instagramHandle}
                </a>
              </div>
              <p className={styles.place}>{place}</p>
              {switchLink(styles.overlayLang, tab)}
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
