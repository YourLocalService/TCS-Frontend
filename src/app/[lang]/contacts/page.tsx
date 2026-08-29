import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contacts">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.pages.contacts} | TCS Canada`,
    description: `${site.address} — ${site.phones[0]}, ${site.email}`,
  };
}

/**
 * Live layout: 60/120 padded section, 48px title, a 1400x600 embedded map,
 * then a flex row of four blocks (24px heading + 14px detail).
 */
export default async function Page({ params }: PageProps<"/[lang]/contacts">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const blocks: { title: string; body: React.ReactNode; width: string }[] = [
    {
      title: dict.contacts.address,
      width: "w-[310px]",
      body: <>{site.address}</>,
    },
    {
      title: dict.contacts.phones,
      width: "w-[193px]",
      body: (
        <div className="flex flex-col gap-1">
          {site.phones.map((p) => (
            <a key={p} href={`tel:${p}`} className="hover:text-gold-dark">
              {p}
            </a>
          ))}
        </div>
      ),
    },
    {
      title: dict.contacts.hours,
      width: "w-[167px]",
      body: <>{site.hours}</>,
    },
    {
      title: dict.contacts.social,
      width: "w-[136px]",
      body: (
        <a href={`mailto:${site.email}`} className="hover:text-gold-dark">
          {site.email}
        </a>
      ),
    },
  ];

  return (
    <section className="px-[15px] pb-[120px] pt-[60px] max-lg:pb-16">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="font-serif text-[48px] font-normal text-black max-lg:text-4xl">
          {dict.pages.contacts}
        </h1>

        <div className="mt-[50px] h-[600px] w-full max-lg:h-[400px]">
          <iframe
            src="https://snazzymaps.com/embed/349348"
            title={dict.contacts.mapTitle}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>

        <div className="mt-[40px] flex flex-wrap justify-between gap-y-8 max-lg:gap-8">
          {blocks.map((b) => (
            <div key={b.title} className={`${b.width} max-lg:w-full`}>
              <div className="font-serif text-[24px] font-normal text-black">
                {b.title}
              </div>
              <div className="mt-[20px] text-[14px] leading-[1.7] text-black">
                {b.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
