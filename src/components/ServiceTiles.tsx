import Image from "next/image";
import Link from "next/link";
import { homeTiles } from "@/data/site";

/**
 * Home page "Our services" grid — matches the live layout: two 670px columns
 * with a 60px gap, images rendered 670x493, and 28px uppercase Book Antiqua
 * captions sitting 40px below each image.
 */
export default function ServiceTiles() {
  return (
    <section className="pb-[120px] pt-[60px]">
      <div className="mx-auto w-full max-w-[1440px] px-[15px]">
        <h2 className="text-center font-serif text-[48px] font-normal text-ink">
          Our services
        </h2>

        <div className="mt-[60px] grid grid-cols-[670px_670px] justify-center gap-[60px] max-xl:grid-cols-1 max-xl:justify-items-center">
          {homeTiles.map((tile) => (
            <Link key={tile.href} href={tile.href} className="group block">
              <Image
                src={tile.image}
                alt={tile.title}
                width={670}
                height={493}
                className="h-[493px] w-[670px] object-cover max-xl:h-auto max-xl:w-full"
              />
              <div className="mt-[40px] text-center font-serif text-[28px] uppercase text-black transition-colors group-hover:text-navy">
                {tile.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
