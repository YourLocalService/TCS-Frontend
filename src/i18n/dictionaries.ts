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

/** Swap the locale segment of a path: /ru/gallery -> /en/gallery */
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && hasLocale(parts[0])) {
    parts[0] = next;
  } else {
    parts.unshift(next);
  }
  return `/${parts.join("/")}`;
}
