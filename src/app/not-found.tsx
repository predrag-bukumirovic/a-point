import { locale } from "next/root-params";
import NotFoundView from "@/components/pages/NotFoundView";
import { isLocale } from "@/content/site";

export default async function NotFound() {
  const current = await locale();
  return <NotFoundView locale={current && isLocale(current) ? current : "en"} />;
}
