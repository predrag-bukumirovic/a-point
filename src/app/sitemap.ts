import type { MetadataRoute } from "next";
import { PROJECT_SLUGS } from "@/content/projects";
import { LOCALES, PAGES, SITE_URL, localePath } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PAGES, ...PROJECT_SLUGS.map((slug) => `/projects/${slug}`)];
  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: SITE_URL + localePath(locale, path),
      lastModified: new Date(),
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, SITE_URL + localePath(l, path)])),
      },
    })),
  );
}
