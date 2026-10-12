import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactPage from "@/components/pages/ContactPage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/content/seo";
import { isLocale } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale).contactPage;
  return pageMetadata(locale, "/contact", meta);
}

export default async function Page({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPage locale={locale} />;
}
