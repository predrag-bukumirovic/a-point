import Link from "next/link";
import { dictionary } from "@/content";
import SiteFrame from "../SiteFrame";
import styles from "./NotFoundView.module.scss";

export default function NotFoundView() {
  const { notFound } = dictionary;

  return (
    <SiteFrame header="solid">
      <section className={styles.page}>
        <p className={styles.code}>404</p>
        <h1 className="heading">{notFound.title}</h1>
        <p className="body-text">{notFound.text}</p>
        <Link href="/" className="text-link">
          {notFound.cta}
        </Link>
      </section>
    </SiteFrame>
  );
}
