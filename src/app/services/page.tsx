import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { dictionary } from "@/content";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata("/services", dictionary.servicesPage.meta);

export default function Page() {
  return <ServicesPage />;
}
