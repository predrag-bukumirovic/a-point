import type { Metadata } from "next";
import { dictionary } from ".";
import { BRAND } from "./site";

type Image = { url: string; width: number; height: number; alt: string };

export function pageMetadata(
  path: string,
  {
    title,
    description,
    image,
  }: { title?: string; description: string; image?: Image },
): Metadata {
  const { meta } = dictionary;

  return {
    title: title ?? { absolute: meta.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: BRAND,
      locale: meta.ogLocale,
      url: path,
      title: title ? `${title} | ${BRAND}` : meta.title,
      description,
      images: [
        image ?? {
          url: "/media/og.jpg",
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}
