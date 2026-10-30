import type { MetadataRoute } from "next";
import { PROJECT_SLUGS } from "@/content/projects";
import { PAGES, SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PAGES, ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`)];
  return paths.map((path) => ({
    url: SITE_URL + (path === "/" ? "" : path),
    lastModified: new Date(),
    priority: path === "/" ? 1 : 0.7,
  }));
}
