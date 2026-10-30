import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/content/seo";
import { isLocale } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale).projectsPage;
  return pageMetadata(locale, "/projects", meta);
}

export default async function Page({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProjectsPage locale={locale} />;
}
