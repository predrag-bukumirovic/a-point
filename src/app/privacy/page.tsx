import type { Metadata } from "next";
import PrivacyPage from "@/components/pages/PrivacyPage";
import { dictionary } from "@/content";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata("/privacy", dictionary.privacyPage.meta);

export default function Page() {
  return <PrivacyPage />;
}
