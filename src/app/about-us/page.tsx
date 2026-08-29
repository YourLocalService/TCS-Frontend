import type { Metadata } from "next";
import Image from "next/image";
import { aboutBlocks, aboutImage } from "@/data/aboutContent";

export const metadata: Metadata = {
  title: "About us | TCS Canada",
  description:
    "TCS — Technological Construction Service. A reliable construction contractor and partner operating since 1998.",
};

/**
 * Live layout: a single 60/120 padded section holding a 770px column —
 * 48px page title, 18px body copy, one full-width photo, then 24px
 * sub-headings each followed by body copy.
 */
export default function Page() {
  // the photo sits after the opening title + intro paragraph
  const lead = aboutBlocks.slice(0, 2);
  const rest = aboutBlocks.slice(2);

  return (
    <section className="px-[15px] pb-[120px] pt-[60px] max-lg:pb-16">
      <div className="mx-auto w-[800px] max-w-full px-[15px] max-lg:w-full max-lg:px-0">
        {lead.map((b, i) => (
          <div
            key={i}
            className={
              b.kind === "title"
                ? "font-serif text-[48px] font-normal leading-[1.24] text-black max-lg:text-4xl"
                : "mt-[30px] whitespace-pre-line text-[18px] leading-[1.6] text-black"
            }
          >
            {b.text}
          </div>
        ))}

        {aboutImage && (
          <Image
            src={aboutImage}
            alt=""
            width={770}
            height={274}
            className="mt-[70px] h-[274px] w-[770px] object-cover max-lg:h-auto max-lg:w-full"
          />
        )}

        {rest.map((b, i) => (
          <div
            key={i}
            className={
              b.kind === "subtitle"
                ? "mt-[70px] font-serif text-[24px] font-normal text-black"
                : "mt-[30px] whitespace-pre-line text-[18px] leading-[1.6] text-black"
            }
          >
            {b.text}
          </div>
        ))}
      </div>
    </section>
  );
}
