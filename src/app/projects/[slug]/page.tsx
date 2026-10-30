import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/pages/ProjectPage";
import { PROJECT_SLUGS, getNextProject, getProject } from "@/content/projects";
import { pageMetadata } from "@/content/seo";
import { isLocale } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};
  const { src, alt } = project.hero;
  return pageMetadata(locale, `/projects/${slug}`, {
    title: project.title,
    description: project.summary,
    image: { url: src.src, width: src.width, height: src.height, alt },
  });
}

export default async function Page({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(locale, slug);
  if (!project) notFound();
  return <ProjectPage locale={locale} project={project} next={getNextProject(locale, slug)} />;
}
