import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GalleryCarousel from "@/components/GalleryCarousel";
import { galleryImages } from "@/data/galleryImages";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { generatePageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return generatePageMetadata({
    lang,
    title: dict.pages.gallery,
    description: dict.meta.siteDescription,
    path: "/gallery",
  });
}

/** Live layout: one 120/120 padded section, 48px centred title, then the slider. */
export default async function Page({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="px-[15px] py-[120px] max-lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
          {dict.pages.gallery}
        </h1>
        <GalleryCarousel images={galleryImages} />
      </div>
    </section>
  );
}
