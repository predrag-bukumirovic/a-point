import Link from "next/link";
import { getDictionary } from "@/content";
import { localePath, type Locale } from "@/content/site";
import SiteFrame from "../SiteFrame";
import styles from "./NotFoundView.module.scss";

export default function NotFoundView({ locale }: { locale: Locale }) {
  const { notFound } = getDictionary(locale);

  return (
    <SiteFrame locale={locale} header="solid">
      <section className={styles.page}>
        <p className={styles.code}>404</p>
        <h1 className="heading">{notFound.title}</h1>
        <p className="body-text">{notFound.text}</p>
        <Link href={localePath(locale)} className="text-link">
          {notFound.cta}
        </Link>
      </section>
    </SiteFrame>
  );
}
