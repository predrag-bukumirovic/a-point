import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivacyPage from "@/components/pages/PrivacyPage";
import { getDictionary } from "@/content";
import { pageMetadata } from "@/content/seo";
import { isLocale } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale).privacyPage;
  return pageMetadata(locale, "/privacy", meta);
}

export default async function Page({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PrivacyPage locale={locale} />;
}
