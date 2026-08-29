import Image from "next/image";
import { ButtonMain } from "./Button";

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  image,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  image: string;
}) {
  return (
    <section className="relative overflow-hidden pb-[40px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="relative mx-auto max-w-[1440px] px-[70px] pb-[170px] pt-[130px] max-lg:px-8 max-lg:py-20">
        <div className="w-[645px] max-lg:w-full">
          <h1 className="font-serif text-[52px] font-bold leading-[63px] text-white max-lg:text-4xl">
            {title}
          </h1>
          <p className="mt-[28px] text-[18px] text-[#e9e9e9]">{subtitle}</p>
          <div className="mt-[60px]">
            <ButtonMain href="/contacts">{ctaLabel}</ButtonMain>
          </div>
        </div>
      </div>
    </section>
  );
}
