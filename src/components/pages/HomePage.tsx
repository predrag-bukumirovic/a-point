import { dictionary } from "@/content";
import { getFeaturedProjects } from "@/content/projects";
import About from "../About";
import Contact from "../Contact";
import Hero from "../Hero";
import InstagramFeed from "../InstagramFeed";
import Projects from "../Projects";
import Services from "../Services";
import SiteFrame from "../SiteFrame";

export default function HomePage() {
  const { home, ui } = dictionary;
  const featured = getFeaturedProjects().map((p) => ({
    href: `/projects/${p.slug}`,
    place: p.location,
    title: p.title,
    text: p.summary,
    note: p.scope,
    caption: p.caption,
    image: p.cover,
  }));

  return (
    <SiteFrame>
      <Hero />
      <About />
      <Projects
        items={featured}
        labels={{
          label: home.featured.label,
          lines: home.featured.lines,
          prev: ui.prevProject,
          next: ui.nextProject,
          view: ui.viewProject,
          all: { label: ui.allProjects, href: "/projects" },
        }}
      />
      <Services />
      <InstagramFeed />
      <Contact />
    </SiteFrame>
  );
}
