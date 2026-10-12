import type { Metadata } from "next";
import { Geist, Noto_Serif_Display } from "next/font/google";
import Link from "next/link";
import Logo from "@/components/Logo";
import styles from "./global-not-found.module.scss";
import "./globals.scss";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const serif = Noto_Serif_Display({ variable: "--font-serif", subsets: ["latin"], axes: ["wdth"] });

export const metadata: Metadata = {
  title: "404 — A Point",
  description: "The page you are looking for does not exist or has moved.",
};

/** 404 za adrese van /en i /ar — dvojezično, jer jezik nije poznat. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <main className={styles.page}>
          <Link href="/en" className={styles.logo} aria-label="A Point">
            <Logo />
          </Link>
          <p className={styles.code}>404</p>
          <h1 className="heading">Page not found</h1>
          <p className="body-text">The page you are looking for does not exist or has moved.</p>
          <p className={styles.ar} lang="ar" dir="rtl">
            الصفحة غير موجودة
          </p>
          <div className={styles.links}>
            <Link href="/en" className="text-link">
              Home
            </Link>
            <Link href="/ar" className="text-link" lang="ar" dir="rtl">
              الصفحة الرئيسية
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
