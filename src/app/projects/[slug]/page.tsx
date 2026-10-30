import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/pages/ProjectPage";
import { PROJECT_SLUGS, getNextProject, getProject } from "@/content/projects";
import { pageMetadata } from "@/content/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const { src, alt } = project.hero;
  return pageMetadata(`/projects/${slug}`, {
    title: `${project.title} — ${project.category} in ${project.location}`,
    description: project.summary,
    image: { url: src.src, width: src.width, height: src.height, alt },
  });
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} next={getNextProject(slug)} />;
}
