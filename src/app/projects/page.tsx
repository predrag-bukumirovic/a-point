import type { Metadata } from "next";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { dictionary } from "@/content";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata("/projects", dictionary.projectsPage.meta);

export default function Page() {
  return <ProjectsPage />;
}
