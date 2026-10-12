import type { StaticImageData } from "next/image";

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);
export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Putanja za dati jezik: localePath("ar", "/projects") → "/ar/projects". */
export const localePath = (locale: Locale, path = "/") => `/${locale}${path === "/" ? "" : path}`;

export const BRAND = "A Point";
/** Puni naziv firme (sa starog sajta a-pnt.com: „© 2011 by A Point I.D.A“). */
export const LEGAL_NAME = "A Point I.D.A";
export const FOUNDED = "2011";

/*
 * Kontakt podaci studija (sa starog sajta a-pnt.com). Prazno polje se ne prikazuje:
 * čim se upiše vrednost (ovde ili u .env.local), pojavi se na sajtu.
 */
export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@a-pnt.com",
  // Međunarodni format
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+971 7 203 1618",
  // Samo cifre sa pozivnim brojem, npr. "971500000000" — fiksni broj ne radi na WhatsApp-u
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "",
  instagram: "https://www.instagram.com/apoint_ida/",
  instagramHandle: "@apoint_ida",
  instagramDm: "https://ig.me/m/apoint_ida",
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const whatsappHref = (number: string, text: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

/** Poštanska adresa (sa starog sajta). */
export const POSTAL = { box: "331208", city: "Ras Al Khaimah", country: "AE" };

/** Domen sajta (SEO, sitemap, deljenje linkova); može se promeniti preko NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.a-pnt.com").replace(/\/$/, "");

/** Strane sajta (bez projekata), za sitemap. */
export const PAGES = ["/", "/about", "/projects", "/services", "/contact", "/privacy"];

export type Img = { src: StaticImageData; alt: string };
