import { dictionary } from "@/content";
import { CONTACT, whatsappHref } from "@/content/site";
import styles from "./WhatsAppButton.module.scss";

export default function WhatsAppButton() {
  if (!CONTACT.whatsapp) return null;
  const { ui } = dictionary;

  return (
    <a
      className={styles.button}
      href={whatsappHref(CONTACT.whatsapp, ui.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.whatsappChat}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3.2c-4.9 0-8.8 3.6-8.8 8.1 0 2.3 1 4.3 2.7 5.8L5.2 21l4.2-2.1c.8.2 1.7.3 2.6.3 4.9 0 8.8-3.6 8.8-8.1S16.9 3.2 12 3.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="8.6" cy="11.3" r="1" fill="currentColor" />
        <circle cx="12" cy="11.3" r="1" fill="currentColor" />
        <circle cx="15.4" cy="11.3" r="1" fill="currentColor" />
      </svg>
      <span className={styles.label}>{ui.whatsapp}</span>
    </a>
  );
}
