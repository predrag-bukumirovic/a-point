import type { Metadata } from "next";
import NotFoundView from "@/components/pages/NotFoundView";
import { dictionary } from "@/content";

export const metadata: Metadata = {
  title: dictionary.notFound.title,
  description: dictionary.notFound.text,
};

export default function NotFound() {
  return <NotFoundView />;
}
