import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/components/pages/AboutPage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/content/seo";
import { isLocale } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale).aboutPage;
  return pageMetadata(locale, "/about", meta);
}

export default async function Page({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <AboutPage locale={locale} />;
}
