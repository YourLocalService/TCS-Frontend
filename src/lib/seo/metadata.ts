import type { Metadata } from "next";
import { site } from "@/data/site";
import { locales, type Locale } from "@/i18n/dictionaries";
import { getCanonicalUrl, getLanguageAlternates, OG_LOCALE } from "./canonical";

interface MetadataOptions {
  lang: Locale;
  /** Page title without the site suffix; omit for the bare site name. */
  title?: string;
  description?: string;
  /** Locale-less route, e.g. "/mounting". */
  path?: string;
  noIndex?: boolean;
}

/**
 * Build page metadata: canonical, reciprocal hreflang, OpenGraph and Twitter.
 *
 * Every page gets `alternates.languages` for both locales plus x-default, so
 * Google pairs the EN and RU versions instead of treating them as duplicates.
 */
export function generatePageMetadata({
  lang,
  title,
  description,
  path = "",
  noIndex = false,
}: MetadataOptions): Metadata {
  const finalTitle = title ? `${title} | ${site.name}` : site.name;
  const canonical = getCanonicalUrl(lang, path);
  const ogImage = `${site.url}${site.ogImage}`;

  return {
    // `absolute` stops the root layout's `%s | TCS` template being applied on
    // top of a title that already carries the site name.
    title: { absolute: finalTitle },
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title: finalTitle,
      description,
      url: canonical,
      siteName: site.fullName,
      type: "website",
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.fullName }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
