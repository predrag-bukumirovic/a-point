import type { Metadata } from "next";
import { getDictionary } from ".";
import { BRAND, LOCALES, localePath, type Locale } from "./site";

type Image = { url: string; width: number; height: number; alt: string };

/** Metapodaci strane: naslov, opis, kanonski URL, hreflang verzije i slika za deljenje. */
export function pageMetadata(
  locale: Locale,
  path: string,
  { title, description, image }: { title?: string; description: string; image?: Image },
): Metadata {
  const t = getDictionary(locale);
  const url = localePath(locale, path);
  const languages = Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)]));

  return {
    title: title ?? { absolute: t.meta.title },
    description,
    alternates: { canonical: url, languages: { ...languages, "x-default": localePath("en", path) } },
    openGraph: {
      type: "website",
      siteName: BRAND,
      locale: t.meta.ogLocale,
      url,
      title: title ? `${title} — ${BRAND}` : t.meta.title,
      description,
      images: [image ?? { url: "/media/og.jpg", width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image" },
  };
}
