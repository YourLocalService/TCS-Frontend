import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ru"] as const;
const defaultLocale = "en";

/** Pick the best supported locale from the Accept-Language header. */
function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  // "ru-RU,ru;q=0.9,en;q=0.8" -> [["ru-ru",1],["ru",0.9],["en",0.8]]
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        q: q ? Number.parseFloat(q.split("=")[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    const hit = locales.find((l) => l === tag || l === base);
    if (hit) return hit;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and anything with a file extension (images, fonts, etc.)
  matcher: ["/((?!_next|api|.*\\.[\\w]+$).*)"],
};
