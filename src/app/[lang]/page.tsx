import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonMain } from "@/components/Button";
import Hero from "@/components/Hero";
import PriceBanner from "@/components/PriceBanner";
import ServiceTiles from "@/components/ServiceTiles";
import { getDictionary, hasLocale, localePath } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero
        title={dict.home.heroTitle}
        subtitle={dict.home.heroSubtitle}
        ctaLabel={dict.home.heroCta}
        image="/images/hero-home.jpg"
        lang={lang}
      />

      {/* "Construct" block: centred 48px title, then a 792px image beside a
          528px text column with the gold CTA. */}
      <section className="px-[15px] py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
            {dict.home.aboutTitle}
          </h2>

          <div className="mt-[85px] flex items-center justify-between gap-[110px] max-lg:flex-col max-lg:gap-10">
            <Image
              src="/images/about-construct.png"
              alt=""
              width={792}
              height={545}
              className="h-[545px] w-[792px] object-cover max-lg:h-auto max-lg:w-full"
            />
            <div className="w-[528px] max-lg:w-full">
              <p className="whitespace-pre-line text-[18px] leading-[1.5] text-black">
                {dict.home.aboutBody}
              </p>
              <div className="mt-[60px]">
                <ButtonMain href={localePath(lang, "/about-us")}>
                  {dict.home.aboutCta}
                </ButtonMain>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceTiles
        title={dict.home.servicesTitle}
        tileNames={dict.tiles}
        lang={lang}
      />

      <PriceBanner dict={dict.price} lang={lang} />
    </>
  );
}
