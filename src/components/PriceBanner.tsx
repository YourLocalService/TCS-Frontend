import { ButtonMain } from "./Button";

/**
 * Full-bleed banner from the live site: 215px/155px vertical padding over a
 * background graphic, with a 48px heading and 24px Book Antiqua body copy.
 */
export default function PriceBanner({
  heading = "Best Price Guaranteed!",
  body = "We guarantee competitive prices on materials and services without compromising quality! Don't wait, make the right choice and contact us today!",
  ctaLabel = "Get a Free Consultation",
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
}) {
  return (
    <section
      className="bg-navy bg-cover bg-center bg-no-repeat px-[15px] pb-[155px] pt-[215px] max-lg:py-20"
      style={{ backgroundImage: "url('/images/price-banner-bg.png')" }}
    >
      <div className="mx-auto max-w-[1440px] text-center">
        <h2 className="font-serif text-[48px] font-normal text-white max-lg:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-[35px] max-w-[960px] font-serif text-[24px] leading-[37.92px] text-white">
          {body}
        </p>
        <div className="mt-[92px] flex justify-center">
          <ButtonMain href="/quote">{ctaLabel}</ButtonMain>
        </div>
      </div>
    </section>
  );
}
