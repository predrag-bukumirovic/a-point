"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { GA_ID } from "@/content/site";
import { useConsent } from "@/lib/consent";

const clearGaCookies = () => {
  const names = document.cookie
    .split("; ")
    .map((cookie) => cookie.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  const parts = location.hostname.split(".");
  const domains = parts
    .map((_, i) => parts.slice(i).join("."))
    .filter((domain) => domain.includes("."));
  for (const name of names) {
    document.cookie = `${name}=; path=/; max-age=0`;
    for (const domain of domains)
      document.cookie = `${name}=; path=/; domain=${domain}; max-age=0`;
  }
};

export default function Analytics() {
  const consent = useConsent();
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || consent === undefined) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] =
      !consent;
    if (!consent) clearGaCookies();
  }, [consent]);

  // Rad u adminu se ne meri.
  if (!GA_ID || !consent || pathname.startsWith("/admin")) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
