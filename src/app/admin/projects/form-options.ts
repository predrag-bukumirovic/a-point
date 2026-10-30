import { getProjects } from "@/content/projects";

/** Predlozi za formu (kategorije i obimi postojećih projekata) i adrese koje su već zauzete. */
export function formOptions() {
  const projects = getProjects();
  const unique = (values: string[]) => [...new Set(values)].sort();
  return {
    categories: unique(projects.map((p) => p.category)),
    scopes: unique(projects.map((p) => p.scope)),
    takenSlugs: projects.map((p) => p.slug),
  };
}
