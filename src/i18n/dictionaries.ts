import type en from "./en.json";

/**
 * Locale dictionaries. Loaded with dynamic imports so only the requested
 * locale's JSON is pulled into the server bundle for a given request.
 */
const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  ru: () => import("./ru.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

/** `en.json` is the source of truth for the dictionary shape. */
export type Dictionary = typeof en;

export const locales = Object.keys(dictionaries) as Locale[];

export const defaultLocale: Locale = "en";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

/**
 * Build an internal link for a locale.
 *
 * English is served on unprefixed URLs (`/mounting`) and Russian under a
 * prefix (`/ru/mounting`), so the old tcs-canada.ca paths keep working and the
 * eventual cross-domain redirect stays a 1:1 path map. The proxy rewrites the
 * unprefixed URLs onto the `/en` tree internally.
 *
 * This is the single source of truth for internal hrefs — don't hand-build
 * `/${lang}${path}` anywhere.
 */
export function localePath(lang: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  if (lang === defaultLocale) return clean || "/";
  return `/${lang}${clean}`;
}

/** Strip a leading locale segment: /ru/gallery -> /gallery */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && hasLocale(parts[0])) parts.shift();
  return parts.length ? `/${parts.join("/")}` : "";
}

/** Same page, other locale: /ru/gallery -> /gallery */
export function switchLocalePath(pathname: string, next: Locale): string {
  return localePath(next, stripLocale(pathname));
}
