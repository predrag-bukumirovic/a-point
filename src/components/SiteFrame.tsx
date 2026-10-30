import type { ReactNode } from "react";
import { dictionary } from "@/content";
import { getProjects } from "@/content/projects";
import Footer from "./Footer";
import Header from "./Header";
import SmoothScroll from "./SmoothScroll";
import WhatsAppButton from "./WhatsAppButton";

export default function SiteFrame({
  header = "overlay",
  children,
}: {
  header?: "overlay" | "solid";
  children: ReactNode;
}) {
  const { nav, ui, servicesPage } = dictionary;
  const projects = getProjects().map((p) => ({
    href: `/projects/${p.slug}`,
    title: p.title,
    image: p.cover.src,
  }));
  const services = servicesPage.items.map((s) => ({
    href: `/services#${s.id}`,
    title: s.title,
    image: s.image.src,
  }));

  return (
    <>
      <SmoothScroll />
      <Header
        nav={nav}
        labels={{
          allProjects: ui.allProjects,
          allServices: ui.allServices,
          instagram: ui.instagram,
          email: ui.email,
          call: ui.call,
        }}
        projects={projects}
        services={services}
        variant={header}
      />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
