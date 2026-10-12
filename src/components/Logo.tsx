import type { CSSProperties } from "react";
import logo08 from "@/assets/logo/LOGO08.png";
import { BRAND } from "@/content/site";
import styles from "./Logo.module.scss";

/**
 * Logo sa starog sajta (LOGO08, original 600×122 sa providnom pozadinom).
 * Koristi se kao maska, pa uzima boju teksta: belo preko slike, tamno na svetloj podlozi.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span
      className={className ? `${styles.logo} ${className}` : styles.logo}
      role="img"
      aria-label={BRAND}
      style={{ "--logo": `url(${logo08.src})` } as CSSProperties}
    />
  );
}
