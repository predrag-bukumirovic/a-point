import Link from "next/link";
import { getDictionary } from "@/content";
import { CONTACT, LEGAL_NAME, localePath, telHref, whatsappHref, type Locale } from "@/content/site";
import CookieSettingsButton from "./CookieSettingsButton";
import Logo from "./Logo";
import styles from "./Footer.module.scss";

export default function Footer({ locale }: { locale: Locale }) {
  const { footer, nav, ui, contact } = getDictionary(locale);

  const phrase = (
    <span className={styles.phrase}>
      {footer.marquee}
      <span className={styles.star} aria-hidden="true">
        ✦
      </span>
    </span>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href={localePath(locale)} aria-label={nav.home}>
            <Logo className={styles.logo} />
          </Link>
          <p className={styles.rights}>
            <bdi dir="ltr">
              © {new Date().getFullYear()} {LEGAL_NAME}
            </bdi>
            . {footer.rights}
          </p>
          <p className={styles.rights}>
            <Link href={localePath(locale, "/privacy")} className={styles.credit}>
              {footer.privacy}
            </Link>
            <span aria-hidden="true"> · </span>
            <CookieSettingsButton label={footer.cookies} className={styles.credit} />
            <span aria-hidden="true"> · </span>
            {footer.credit.label}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener" className={styles.credit}>
              {footer.credit.name}
            </a>
          </p>
        </div>

        <div className={styles.group}>
          <p className={styles.label}>{footer.menuLabel}</p>
          <ul>
            {[...nav.links, nav.contact].map((link) => (
              <li key={link.href}>
                <Link href={localePath(locale, link.href)}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.group}>
          <p className={styles.label}>{footer.followLabel}</p>
          <ul>
            <li>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                {ui.instagram}
              </a>
            </li>
            {CONTACT.whatsapp && (
              <li>
                <a href={whatsappHref(CONTACT.whatsapp, ui.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  {ui.whatsapp}
                </a>
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
            {CONTACT.phone && (
              <li>
                <a href={telHref(CONTACT.phone)} dir="ltr">
                  {CONTACT.phone}
                </a>
              </li>
            )}
            {CONTACT.email && (
              <li className={styles.lower}>
                <a href={`mailto:${CONTACT.email}`} dir="ltr">
                  {CONTACT.email}
                </a>
              </li>
            )}
            <li className={styles.postal}>
              {contact.postal.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <Link href={localePath(locale, "/contact")} className={styles.marquee} aria-label={footer.marquee}>
        <span className={styles.track} aria-hidden="true">
          {phrase}
          {phrase}
          {phrase}
          {phrase}
        </span>
      </Link>
    </footer>
  );
}
