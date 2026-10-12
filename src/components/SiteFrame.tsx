import type { ReactNode } from "react";
import { getDictionary } from "@/content";
import type { Locale } from "@/content/site";
import Footer from "./Footer";
import Header from "./Header";
import SmoothScroll from "./SmoothScroll";
import WhatsAppButton from "./WhatsAppButton";

/** Zajednički okvir svake strane: glatki skrol, meni, sadržaj, futer i WhatsApp dugme. */
export default function SiteFrame({
  locale,
  header = "overlay",
  children,
}: {
  locale: Locale;
  header?: "overlay" | "solid";
  children: ReactNode;
}) {
  const { nav, footer } = getDictionary(locale);

  return (
    <>
      <SmoothScroll />
      <Header locale={locale} nav={nav} place={footer.location} variant={header} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </>
  );
}
