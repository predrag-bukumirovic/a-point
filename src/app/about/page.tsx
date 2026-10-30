import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { dictionary } from "@/content";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata("/about", dictionary.aboutPage.meta);

export default function Page() {
  return <AboutPage />;
}
