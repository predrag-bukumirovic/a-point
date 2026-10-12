import { getDictionary } from "@/content";
import { getFeaturedProjects } from "@/content/projects";
import { localePath, type Locale } from "@/content/site";
import About from "../About";
import Contact from "../Contact";
import Hero from "../Hero";
import InstagramFeed from "../InstagramFeed";
import Projects from "../Projects";
import Services from "../Services";
import SiteFrame from "../SiteFrame";

/*
 * Redosled skrola kao na referenci:
 *  - „Studio“ prelazi preko zakačenog heroja,
 *  - „Usluge“ prelaze preko zakačenih projekata (posle kratke pauze),
 *  - „Instagram“ prelazi preko zakačenih usluga (posle kratke pauze),
 *  - ostalo je običan skrol.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const featured = getFeaturedProjects(locale).map((p) => ({
    href: localePath(locale, `/projects/${p.slug}`),
    place: p.location,
    title: p.title,
    text: p.summary,
    note: p.scope,
    caption: p.caption,
    image: p.cover,
    detail: p.detail,
  }));

  return (
    <SiteFrame locale={locale}>
      <div className="stack">
        <Hero locale={locale} />
        <About locale={locale} />
      </div>
      <div className="stack">
        <Projects
          items={featured}
          labels={{
            label: t.home.featured.label,
            lines: t.home.featured.lines,
            prev: t.ui.prevProject,
            next: t.ui.nextProject,
            view: t.ui.viewProject,
            all: { label: t.ui.allProjects, href: localePath(locale, "/projects") },
          }}
        />
        <div className="hold" aria-hidden="true" />
        <div className="stack">
          <Services locale={locale} />
          <div className="hold" aria-hidden="true" />
          <InstagramFeed locale={locale} />
        </div>
      </div>
      <Contact locale={locale} />
    </SiteFrame>
  );
}
