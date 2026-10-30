import { Suspense } from "react";
import AdminProjects from "@/components/admin/AdminProjects";
import { getProjects } from "@/content/projects";

export default function Page() {
  const published = getProjects().map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    location: p.location,
    year: p.year,
    featured: Boolean(p.featured),
    image: p.cover.src,
  }));

  // Suspense: spisak čita poruku iz adrese (?saved=…), što je poznato tek u pregledaču.
  return (
    <Suspense>
      <AdminProjects published={published} />
    </Suspense>
  );
}
