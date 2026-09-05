import Image from "next/image";
import { team } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries";

const photos: Record<string, string> = {
  "Maksym Ovramenko": "/images/team-maksym.jpg",
  "Denys Ovramenko": "/images/team-denys.png",
  "Inna Ovramenko": "/images/team-inna.png",
};

/** Live layout: 48px centred title, then three 440px cards with 430px photos. */
export default function TeamSection({ dict }: { dict: Dictionary["team"] }) {
  return (
    <section className="px-[15px] py-[120px] max-lg:py-16">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
          {dict.title}
        </h2>

        <div className="mt-[70px] grid grid-cols-[440px_440px_440px] justify-center gap-[40px] max-xl:grid-cols-1 max-xl:justify-items-center">
          {team.map((member) => (
            <div key={member.name} className="w-[440px] max-w-full text-center">
              <Image
                src={photos[member.name]}
                alt={member.name}
                width={440}
                height={430}
                quality={90}
                sizes="(min-width: 1280px) 440px, 100vw"
                className="h-[430px] w-[440px] object-cover max-xl:w-full"
              />
              <p className="mt-[30px] font-serif text-[24px] text-black">
                {member.name}
              </p>
              <p className="mt-[10px] text-[18px] text-black/60">
                {dict.role}
              </p>
              <a
                href={`tel:${member.phone}`}
                className="mt-[10px] inline-block text-[18px] text-black transition-colors hover:text-gold-dark"
              >
                {member.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
