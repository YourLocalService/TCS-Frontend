import { serviceContent, type ServicePageData } from "./serviceContent";
import { serviceContentRu } from "./serviceContent.ru";
import type { Locale } from "@/i18n/dictionaries";

/**
 * Russian copy where the live site has it, English otherwise. The English
 * entry is always the fallback so a missing translation degrades to readable
 * content rather than a blank page.
 */
export function getServiceData(lang: Locale, slug: string): ServicePageData {
  if (lang === "ru") {
    const ru = serviceContentRu[slug];
    if (ru) return ru;
  }
  return serviceContent[slug];
}
