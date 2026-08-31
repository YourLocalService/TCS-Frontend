import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Locale URL mapping.
 *
 * The app tree lives under `app/[lang]`, but English is served on unprefixed
 * URLs so the paths match the old tcs-canada.ca site (making its eventual
 * retirement a 1:1 redirect map). Russian keeps its `/ru` prefix.
 *
 *   /mounting      -> rewrite to /en/mounting   (URL stays clean)
 *   /ru/mounting   -> passes through
 *   /en/mounting   -> 308 to /mounting          (one canonical URL per page)
 *
 * There is deliberately no Accept-Language redirect: `/` always serves English
 * and visitors switch via the header/drawer toggle. That keeps one URL per
 * page, avoids a redirect hop on every cold visit, and means crawlers and
 * people are served the same thing.
 */
const PREFIXED = "ru";
const DEFAULT = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Russian is already in its final shape.
  if (pathname === `/${PREFIXED}` || pathname.startsWith(`/${PREFIXED}/`)) {
    return;
  }

  // Collapse the explicit English prefix onto the canonical unprefixed URL.
  if (pathname === `/${DEFAULT}` || pathname.startsWith(`/${DEFAULT}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${DEFAULT}`.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Everything else is English: serve the /en tree without showing it.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, and anything with a file extension.
  matcher: ["/((?!_next|api|.*\\.[\\w]+$).*)"],
};
