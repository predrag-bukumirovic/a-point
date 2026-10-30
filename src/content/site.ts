import type { StaticImageData } from "next/image";

export const BRAND = "A Point";
export const LEGAL_NAME = "A Point I.D.A";
export const FOUNDED = "2011";

export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@a-pnt.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+971 7 203 1618",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "",
  instagram: "https://www.instagram.com/apoint_ida/",
  instagramHandle: "@apoint_ida",
  instagramDm: "https://ig.me/m/apoint_ida",
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const whatsappHref = (number: string, text: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export const POSTAL = { box: "331208", city: "Ras Al Khaimah", country: "AE" };

const gaId = process.env.NEXT_PUBLIC_GA_ID || "";
export const GA_ID = /^G-[A-Z0-9]+$/.test(gaId) ? gaId : "";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.a-pnt.com"
).replace(/\/$/, "");

export const PAGES = [
  "/",
  "/about",
  "/projects",
  "/services",
  "/contact",
  "/privacy",
];

export type Img = { src: StaticImageData; alt: string };
