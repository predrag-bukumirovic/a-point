"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "@/content";
import * as media from "@/content/media";
import { CONTACT, telHref } from "@/content/site";
import Logo from "./Logo";
import { getLenis } from "./SmoothScroll";
import styles from "./Header.module.scss";

export type MenuItem = {
  href: string;
  title: string;
  image: StaticImageData;
};
type Tab = "pages" | "projects" | "services";

const noop = () => () => {};

function PlusIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

const pageImages: Record<string, StaticImageData> = {
  "/": media.heroWide,
  "/about": media.studioHero,
  "/projects": media.archive04,
  "/services": media.servicesHero,
  "/contact": media.contactImage,
};

export default function Header({
  nav,
  labels,
  projects,
  services,
  variant = "overlay",
}: {
  nav: Dictionary["nav"];
  labels: {
    allProjects: string;
    allServices: string;
    instagram: string;
    email: string;
    call: string;
  };
  projects: MenuItem[];
  services: MenuItem[];
  variant?: "overlay" | "solid";
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("pages");

  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const id = useId();
  const closeButton = useRef<HTMLButtonElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 60,
    () => false,
  );
  const solid = variant === "solid" || scrolled;

  const images: [string, StaticImageData][] = [
    ...Object.entries(pageImages),
    ...[...projects, ...services].map((p): [string, StaticImageData] => [
      p.href,
      p.image,
    ]),
  ];
  const tabs: {
    key: Tab;
    label: string;
    items: { href: string; label: string }[];
    all?: { href: string; label: string };
  }[] = [
    {
      key: "pages",
      label: nav.tabs.pages,
      items: [...nav.links, nav.contact],
    },
    {
      key: "projects",
      label: nav.tabs.projects,
      items: projects.map((p) => ({ href: p.href, label: p.title })),
      all: { href: "/projects", label: labels.allProjects },
    },
    {
      key: "services",
      label: nav.tabs.services,
      items: services.map((s) => ({ href: s.href, label: s.title })),
      all: { href: "/services", label: labels.allServices },
    },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("menu-open", open);

    if (open) {
      getLenis()?.stop();
      closeButton.current?.focus({ preventScroll: true });
    } else {
      getLenis()?.start();
      if (wasOpen.current) toggle.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
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
    setHovered(null);
  };

  const choose = (next: Tab) => {
    setTab(next);
    setHovered(null);
  };

  const item = (href: string, label: string, i: number) => (
    <li key={href} style={{ "--i": i } as CSSProperties}>
      <Link
        href={href}
        className={styles.link}
        aria-current={isActive(href) ? "page" : undefined}
        onClick={close}
        onMouseEnter={() => setHovered(href)}
        onFocus={() => setHovered(href)}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ""}`}>
      <a href="#main" className={styles.skip}>
        {nav.skip}
      </a>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label={nav.home}>
          <Logo className={styles.brand} />
        </Link>
        <button
          ref={toggle}
          type="button"
          className={styles.toggle}
          aria-label={nav.menu}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <PlusIcon className={styles.plus} />
          <span className={styles.frame} aria-hidden="true" />
        </button>
      </div>

      {mounted &&
        createPortal(
          <>
            <div
              className={`${styles.scrim} ${open ? styles.open : ""}`}
              onClick={close}
              aria-hidden="true"
            />

            <div
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label={nav.main}
              inert={!open}
              className={`${styles.panel} ${open ? styles.open : ""}`}
              data-lenis-prevent
            >
              <div className={styles.panelTop}>
                <div className={styles.tabs} role="tablist">
                  {tabs.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      id={`${id}-${key}-tab`}
                      aria-selected={tab === key}
                      aria-controls={`${id}-${key}`}
                      className={styles.tab}
                      onClick={() => choose(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  ref={closeButton}
                  type="button"
                  className={styles.close}
                  aria-label={nav.close}
                  onClick={close}
                >
                  <PlusIcon className={`${styles.plus} ${styles.cross}`} />
                </button>
              </div>

              <nav className={styles.panes} aria-label={nav.main}>
                {tabs.map(({ key, items, all }) => (
                  <div
                    key={key}
                    id={`${id}-${key}`}
                    role="tabpanel"
                    aria-labelledby={`${id}-${key}-tab`}
                    className={`${styles.pane} ${tab === key ? styles.active : ""}`}
                    inert={tab !== key}
                  >
                    <ul>
                      {items.map((link, i) => item(link.href, link.label, i))}
                      {all && (
                        <li style={{ "--i": items.length } as CSSProperties}>
                          <Link
                            href={all.href}
                            className={styles.all}
                            aria-current={
                              pathname === all.href ? "page" : undefined
                            }
                            onClick={close}
                          >
                            {all.label}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className={styles.panelFoot}>
                <div className={styles.thumb} aria-hidden="true">
                  {images.map(([href, src]) => (
                    <Image
                      key={href}
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 520px) 90vw, 380px"
                      className={href === hovered ? styles.shown : undefined}
                    />
                  ))}
                </div>
                <div className={styles.reach}>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {labels.instagram}
                  </a>
                  {CONTACT.email && (
                    <a href={`mailto:${CONTACT.email}`}>{labels.email}</a>
                  )}
                  {CONTACT.phone && (
                    <a href={telHref(CONTACT.phone)}>{labels.call}</a>
                  )}
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
