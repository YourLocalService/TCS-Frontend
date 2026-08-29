import type { Metadata } from "next";
import { QuoteForm } from "@/features/quote";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Get a Free Consultation | TCS Canada",
  description:
    "Tell us about your project and TCS will come back with a free, no-obligation quote.",
};

/**
 * Matches the site's inner-page rhythm: 60/120 padded section with a 48px
 * Book Antiqua title, the same measure used on about-us and contacts.
 */
export default function Page() {
  return (
    <section className="px-[15px] pb-[120px] pt-[60px] max-lg:pb-16">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
          Get a Free Consultation
        </h1>
        <p className="mx-auto mt-[30px] max-w-[760px] text-center text-[18px] leading-[30.6px] text-black">
          Tell us what you need and we&apos;ll come back with a free,
          no-obligation quote. Prefer to talk it through? Call us on{" "}
          <a href={`tel:${site.phones[0]}`} className="whitespace-nowrap underline hover:text-gold-dark">
            {site.phones[0]}
          </a>
          .
        </p>

        <QuoteForm />
      </div>
    </section>
  );
}
