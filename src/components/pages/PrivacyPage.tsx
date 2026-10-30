import { dictionary } from "@/content";
import SiteFrame from "../SiteFrame";
import styles from "./PrivacyPage.module.scss";

export default function PrivacyPage() {
  const { privacyPage: p } = dictionary;

  return (
    <SiteFrame header="solid">
      <article className={styles.page}>
        <h1 className="heading">{p.title}</h1>
        <p className={styles.updated}>{p.updated}</p>
        {p.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </article>
    </SiteFrame>
  );
}
