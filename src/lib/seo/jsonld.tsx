import { site } from "@/data/site";
import type { Locale } from "@/i18n/dictionaries";
import { getCanonicalUrl } from "./canonical";

/**
 * One stable identity for the business, shared by every page and both
 * locales. (The sibling sites reuse the homepage URL as `@id` on every
 * location page, which makes distinct pages all claim the same entity.)
 */
export const BUSINESS_ID = `${site.url}/#business`;

/**
 * schema.org GeneralContractor — a construction-specific subtype of
 * LocalBusiness, which describes TCS more precisely than the generic type.
 */
export function getLocalBusinessSchema(lang: Locale, description?: string) {
  const { postalAddress: addr } = site;

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": BUSINESS_ID,
    name: site.fullName,
    alternateName: site.name,
    description,
    url: getCanonicalUrl(lang),
    telephone: site.phones[0],
    email: site.email,
    foundingDate: String(site.since),
    address: {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      addressLocality: addr.city,
      addressRegion: addr.region,
      postalCode: addr.postalCode,
      addressCountry: addr.countryCode,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
    // Mon-Fri only, straight from config — no invented weekend hours.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openingDays,
      },
    ],
    image: `${site.url}${site.ogImage}`,
    sameAs: Object.values(site.socials).filter(Boolean),
  };
}

/** Service offered, tied back to the single business entity by reference. */
export function getServiceSchema(
  lang: Locale,
  serviceName: string,
  description: string,
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    url: getCanonicalUrl(lang, path),
    serviceType: serviceName,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
  };
}

/**
 * Breadcrumb trail. Only emit URLs that actually resolve — the sibling sites
 * list `/ca` and `/ca/on` ancestors that 404, which invalidates the crumb.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
