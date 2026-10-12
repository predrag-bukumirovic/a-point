import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/pages/HomePage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/content/seo";
import { isLocale } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "/", { description: getDictionary(locale).meta.description });
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
