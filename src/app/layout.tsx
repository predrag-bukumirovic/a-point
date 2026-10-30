import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Geist, Noto_Naskh_Arabic, Noto_Serif_Display } from "next/font/google";
import { notFound } from "next/navigation";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/content";
import { BRAND, LOCALES, SITE_URL, dirOf, isLocale } from "@/content/site";
import "lenis/dist/lenis.css";
import "../globals.scss";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const serif = Noto_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

// Arapski fontovi se ne učitavaju unapred: engleske strane ih ne koriste.
const sansAr = IBM_Plex_Sans_Arabic({
  variable: "--font-sans-ar",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  preload: false,
});

const serifAr = Noto_Naskh_Arabic({
  variable: "--font-serif-ar",
  subsets: ["arabic"],
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: meta.template },
    description: meta.description,
    applicationName: BRAND,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#1c1b19",
};

// Bez JavaScript-a sadržaj je odmah vidljiv (bez animacija otkrivanja).
const noScriptCss =
  "[data-reveal] .line>span,[data-reveal] .r-fade,[data-reveal] .r-img,[data-reveal] .r-img img{opacity:1!important;transform:none!important;clip-path:none!important}";

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${sans.variable} ${serif.variable} ${sansAr.variable} ${serifAr.variable}`}
    >
      <body>
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
        <JsonLd locale={locale} />
        {children}
        {/* U layout-u, a ne u SiteFrame-u: kartica ostaje otvorena (i ne animira se ponovo) pri prelasku na drugu stranu. */}
        <CookieConsent locale={locale} t={getDictionary(locale).cookies} />
        <Analytics />
      </body>
    </html>
  );
}
