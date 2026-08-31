import Image from "next/image";
import Hero from "./Hero";
import PriceBanner from "./PriceBanner";
import TeamSection from "./TeamSection";
import { heroImages, site } from "@/data/site";
import type { ServicePageData } from "@/data/serviceContent";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { getCanonicalUrl } from "@/lib/seo/canonical";
import { JsonLd, getBreadcrumbSchema, getServiceSchema } from "@/lib/seo/jsonld";

/**
 * Live service-page anatomy:
 *   hero → alternating image/text rows → captioned image grid → offer → team
 * Rows sit in a 60/120 padded section; the grid is three 453px columns with
 * an 80px row gap and a 20px column gap.
 */
export default function ServicePageTemplate({
  data,
  dict,
  lang,
  path,
}: {
  data: ServicePageData;
  dict: Dictionary;
  lang: Locale;
  /** Locale-less route for this service, e.g. "/mounting". */
  path: string;
}) {
  const gallery = data.bullets?.images ?? [];
  const serviceName =
    dict.services[data.slug as keyof typeof dict.services] ?? data.h1;

  // Two crumbs, both of which resolve — no phantom ancestor URLs.
  const breadcrumbs = [
    { name: site.name, url: getCanonicalUrl(lang) },
    { name: serviceName, url: getCanonicalUrl(lang, path) },
  ];

  return (
    <>
      <JsonLd
        data={getServiceSchema(lang, serviceName, data.subtitle, path)}
      />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      <Hero
        title={data.h1}
        subtitle={data.subtitle}
        ctaLabel={data.ctaLabel}
        image={heroImages[data.slug]}
        lang={lang}
      />

      <section className="px-[15px] pb-[120px] pt-[60px] max-lg:pb-16">
        <div className="mx-auto max-w-[1440px]">
          {data.intro.map((block, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-[20px] max-lg:flex-col max-lg:gap-8 ${
                i % 2 === 1 ? "flex-row-reverse" : ""
              } ${i > 0 ? "mt-[60px]" : ""}`}
            >
              <div className="w-[630px] max-lg:w-full">
                {block.heading && (
                  <h2 className="font-serif text-[32px] font-normal leading-[39.36px] text-black">
                    {block.heading}
                  </h2>
                )}
                <p
                  className={`max-w-[570px] whitespace-pre-line text-[18px] leading-[30.6px] text-black max-lg:max-w-full ${
                    block.heading ? "mt-[20px]" : ""
                  }`}
                >
                  {block.body}
                </p>
              </div>

              {block.image && (
                <Image
                  src={block.image}
                  alt=""
                  width={750}
                  height={457}
                  className="w-[750px] shrink-0 object-cover max-lg:w-full"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {data.bullets && (
        <section className="px-[15px] pb-[120px] max-lg:pb-16">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
              {data.bullets.heading}
            </h2>

            {gallery.length > 0 ? (
              <div className="mt-[65px] grid grid-cols-[453px_453px_453px] justify-center gap-x-[20px] gap-y-[80px] max-xl:grid-cols-1 max-xl:justify-items-center">
                {data.bullets.items.map((item, i) => (
                  <div key={`${item}-${i}`} className="w-[453px] max-w-full text-center">
                    {gallery[i] && (
                      <Image
                        src={gallery[i]}
                        alt={item}
                        width={453}
                        height={317}
                        className="h-[317px] w-[453px] object-cover max-xl:h-auto max-xl:w-full"
                      />
                    )}
                    <span className="mt-[30px] block text-[18px] text-black">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mx-auto mt-[65px] grid max-w-[960px] grid-cols-2 gap-x-[40px] gap-y-[18px] max-lg:grid-cols-1">
                {data.bullets.items.map((item, i) => (
                  <li key={`${item}-${i}`} className="flex items-start gap-3 text-[18px] leading-[30.6px] text-black">
                    <span className="mt-[13px] h-[6px] w-[6px] shrink-0 rounded-full bg-gold-dark" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <PriceBanner dict={dict.price} lang={lang} ctaLabel={data.ctaLabel} />
      <TeamSection dict={dict.team} />
    </>
  );
}
