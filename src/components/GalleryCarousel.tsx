"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Mirrors the live gallery: a 1050x550 main stage inside a 1400px track,
 * with a 100px thumbnail strip beneath it.
 */
export default function GalleryCarousel({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const strip = useRef<HTMLDivElement>(null);

  const go = (next: number) => {
    const i = (next + images.length) % images.length;
    setActive(i);
    strip.current
      ?.querySelectorAll("button")
      [i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  if (images.length === 0) return null;

  return (
    <div className="mt-[40px]">
      <div className="relative mx-auto h-[550px] w-[1400px] max-w-full">
        <Image
          key={images[active]}
          src={images[active]}
          alt=""
          width={1050}
          height={550}
          quality={90}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1080px) 1050px, 100vw"
          className="mx-auto h-[550px] w-[1050px] max-w-full object-cover"
        />

        <button
          onClick={() => go(active - 1)}
          aria-label="Previous image"
          className="absolute left-0 top-1/2 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center bg-navy-light text-white transition-colors hover:bg-navy"
        >
          ‹
        </button>
        <button
          onClick={() => go(active + 1)}
          aria-label="Next image"
          className="absolute right-0 top-1/2 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center bg-navy-light text-white transition-colors hover:bg-navy"
        >
          ›
        </button>
      </div>

      <div
        ref={strip}
        className="mx-auto mt-[20px] flex h-[100px] w-[1050px] max-w-full gap-[10px] overflow-x-auto"
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => go(i)}
            aria-label={`Show image ${i + 1}`}
            className={`h-[100px] w-[150px] shrink-0 overflow-hidden transition-opacity ${
              i === active ? "opacity-100" : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={src}
              alt=""
              width={150}
              height={100}
              quality={90}
              sizes="150px"
              className="h-[100px] w-[150px] object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
