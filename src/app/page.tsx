import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { dictionary } from "@/content";
import { pageMetadata } from "@/content/seo";

export const metadata: Metadata = pageMetadata("/", { description: dictionary.meta.description });

export default function Page() {
  return <HomePage />;
}
