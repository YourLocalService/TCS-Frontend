import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/features/quote";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/quote">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.quote.title} | TCS Canada` };
}

/**
 * Matches the site's inner-page rhythm: 60/120 padded section with a 48px
 * Book Antiqua title, the same measure used on about-us and contacts.
 */
export default async function Page({ params }: PageProps<"/[lang]/quote">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="px-[15px] pb-[120px] pt-[60px] max-lg:pb-16">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
          {dict.quote.title}
        </h1>
        <p className="mx-auto mt-[30px] max-w-[760px] text-center text-[18px] leading-[30.6px] text-black">
          {dict.quote.intro}{" "}
          <a
            href={`tel:${site.phones[0]}`}
            className="whitespace-nowrap underline hover:text-gold-dark"
          >
            {site.phones[0]}
          </a>
          .
        </p>

        <QuoteForm dict={dict.quote} serviceNames={dict.services} />
      </div>
    </section>
  );
}
