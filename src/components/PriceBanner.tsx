import { ButtonMain } from "./Button";
import { localePath, type Dictionary, type Locale } from "@/i18n/dictionaries";

/**
 * Full-bleed banner from the live site: 215px/155px vertical padding over a
 * background graphic, with a 48px heading and 24px Book Antiqua body copy.
 */
export default function PriceBanner({
  dict,
  lang,
  ctaLabel,
}: {
  dict: Dictionary["price"];
  lang: Locale;
  /** Service pages override the CTA with their own wording. */
  ctaLabel?: string;
}) {
  return (
    <section
      className="bg-navy bg-cover bg-center bg-no-repeat px-[15px] pb-[155px] pt-[215px] max-lg:py-20"
      style={{ backgroundImage: "url('/images/price-banner-bg.png')" }}
    >
      <div className="mx-auto max-w-[1440px] text-center">
        <h2 className="font-serif text-[48px] font-normal text-white max-lg:text-4xl">
          {dict.heading}
        </h2>
        <p className="mx-auto mt-[35px] max-w-[960px] font-serif text-[24px] leading-[37.92px] text-white">
          {dict.body}
        </p>
        <div className="mt-[92px] flex justify-center">
          <ButtonMain href={localePath(lang, "/quote")}>{ctaLabel ?? dict.cta}</ButtonMain>
        </div>
      </div>
    </section>
  );
}
