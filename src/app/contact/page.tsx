import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { dictionary } from "@/content";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata("/contact", dictionary.contactPage.meta);

export default function Page() {
  return <ContactPage />;
}
