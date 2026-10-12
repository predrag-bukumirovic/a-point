import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "ar"];

/**
 * Adrese bez jezika (/, /contact…) vode na jezik posetioca:
 * sačuvan izbor (kolačić), pa jezik pregledača, pa engleski.
 */
export function proxy(request: NextRequest) {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  const preferred = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().slice(0, 2));
  const locale = saved && LOCALES.includes(saved) ? saved : (preferred.find((l) => LOCALES.includes(l)) ?? "en");

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Sve osim /en, /ar, Next.js fajlova, /media i fajlova sa ekstenzijom (sitemap.xml, icon.svg…).
  matcher: ["/((?!_next|en/|en$|ar/|ar$|media/|.*\\.).*)"],
};
