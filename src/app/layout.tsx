import type { Metadata, Viewport } from "next";
import { Libre_Franklin } from "next/font/google";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import { dictionary } from "@/content";
import { BRAND, SITE_URL } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.scss";

// Libre Franklin: slobodna verzija Franklin Gothic-a (pismo sa reference); varijabilna, sve težine.
const sans = Libre_Franklin({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const { meta } = dictionary;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: meta.title, template: meta.template },
  description: meta.description,
  applicationName: BRAND,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

// Bez JavaScript-a sadržaj je odmah vidljiv (bez animacija otkrivanja).
const noScriptCss =
  "[data-reveal] .line>span,[data-reveal] .r-fade,[data-reveal] .r-img,[data-reveal] .r-img img{opacity:1!important;transform:none!important;clip-path:none!important}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
        <JsonLd />
        {children}
        {/* U layout-u, a ne u SiteFrame-u: kartica ostaje otvorena (i ne animira se ponovo) pri prelasku na drugu stranu. */}
        <CookieConsent t={dictionary.cookies} />
        <Analytics />
      </body>
    </html>
  );
}
