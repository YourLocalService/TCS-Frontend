import type { MetadataRoute } from "next";
import { services } from "@/data/site";
import { getCanonicalUrl, getLanguageAlternates } from "@/lib/seo/canonical";

/**
 * Bump when page content meaningfully changes.
 *
 * Deliberately a fixed date rather than `new Date()`: stamping "now" on every
 * URL at every build tells crawlers the whole site changed on each deploy,
 * which turns a useful freshness signal into noise.
 */
const CONTENT_UPDATED = new Date("2026-08-30");

type Entry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

const routes: Entry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/quote", priority: 0.9, changeFrequency: "monthly" },
  ...services.map((s) => ({
    path: `/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/side", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contacts", priority: 0.6, changeFrequency: "yearly" },
];

/**
 * One entry per English URL, each carrying hreflang alternates for both
 * locales. Next emits these as `xhtml:link` elements.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: getCanonicalUrl("en", path),
    lastModified: CONTENT_UPDATED,
    changeFrequency,
    priority,
    alternates: { languages: getLanguageAlternates(path) },
  }));
}
