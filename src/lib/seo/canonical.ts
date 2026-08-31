import { site } from "@/data/site";
import { localePath, type Locale } from "@/i18n/dictionaries";

/** hreflang codes. `en-CA` keeps this site targeted at Canada rather than
 *  competing with tcs-us.vip for US searchers; Russian stays region-neutral. */
export const HREFLANG: Record<Locale, string> = {
  en: "en-CA",
  ru: "ru",
};

/** OpenGraph locale codes, which use a different separator to hreflang. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_CA",
  ru: "ru_RU",
};

/** Leading slash, no trailing slash, empty string for the root. */
function normalize(path = ""): string {
  if (!path || path === "/") return "";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/$/, "");
}

/** Absolute URL for a route in a given locale. */
export function getCanonicalUrl(lang: Locale, path = ""): string {
  const p = localePath(lang, normalize(path));
  return `${site.url}${p === "/" ? "" : p}`;
}

/**
 * Reciprocal hreflang map for a route. Every page carries an entry for both
 * locales plus x-default, and each locale's page points at the same set.
 */
export function getLanguageAlternates(path = ""): Record<string, string> {
  return {
    [HREFLANG.en]: getCanonicalUrl("en", path),
    [HREFLANG.ru]: getCanonicalUrl("ru", path),
    "x-default": getCanonicalUrl("en", path),
  };
}
