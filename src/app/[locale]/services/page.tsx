import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesPage from "@/components/pages/ServicesPage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/content/seo";
import { isLocale } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale).servicesPage;
  return pageMetadata(locale, "/services", meta);
}

export default async function Page({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ServicesPage locale={locale} />;
}
