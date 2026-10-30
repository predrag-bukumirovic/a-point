import Link from "next/link";
import { dictionary } from "@/content";
import { CONTACT, LEGAL_NAME, telHref, whatsappHref } from "@/content/site";
import CookieSettingsButton from "./CookieSettingsButton";
import Logo from "./Logo";
import { TextLink } from "./ui";
import styles from "./Footer.module.scss";

export default function Footer() {
  const { footer, nav, ui, contact } = dictionary;

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link href="/" aria-label={nav.home} className={styles.logoLink}>
          <Logo className={styles.logo} />
        </Link>

        <div className={styles.columns}>
          <nav className={styles.group} aria-label={footer.menuLabel}>
            <p className={styles.label}>{footer.menuLabel}</p>
            <ul>
              {[...nav.links, nav.contact].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.group}>
            <p className={styles.label}>{footer.followLabel}</p>
            <ul>
              <li>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ui.instagram}
                </a>
              </li>
              {CONTACT.whatsapp && (
                <li>
                  <a
                    href={whatsappHref(CONTACT.whatsapp, ui.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ui.whatsapp}
                  </a>
                </li>
              )}
              {CONTACT.phone && (
                <li>
                  <a href={telHref(CONTACT.phone)}>{CONTACT.phone}</a>
                </li>
              )}
              {CONTACT.email && (
                <li className={styles.lower}>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.group}>
            <p className={styles.label}>{footer.contactLabel}</p>
            <ul>
              {contact.studios.map((studio) => (
                <li key={studio.city}>
                  {studio.city}
                  <span className={styles.country}>{studio.country}</span>
                </li>
              ))}
              <li className={styles.postal}>
                {contact.postal.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </li>
            </ul>
          </div>

          <TextLink
            href="/contact"
            label={footer.marquee}
            className={styles.talk}
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} {LEGAL_NAME}. {footer.rights}
        </p>
        <p className={styles.legal}>
          <Link href="/privacy">{footer.privacy}</Link>
          <CookieSettingsButton label={footer.cookies} />
          <span>
            {footer.credit.label}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener">
              {footer.credit.name}
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
