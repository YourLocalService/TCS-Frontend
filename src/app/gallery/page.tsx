import type { Metadata } from "next";
import GalleryCarousel from "@/components/GalleryCarousel";
import { galleryImages } from "@/data/galleryImages";

export const metadata: Metadata = {
  title: "Gallery | TCS Canada",
  description: "Photos of completed TCS construction, roofing and landscaping projects.",
};

/** Live layout: one 120/120 padded section, 48px centred title, then the slider. */
export default function Page() {
  return (
    <section className="px-[15px] py-[120px] max-lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
          Gallery
        </h1>
        <GalleryCarousel images={galleryImages} />
      </div>
    </section>
  );
}
