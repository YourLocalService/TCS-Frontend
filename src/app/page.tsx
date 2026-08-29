import Image from "next/image";
import { ButtonMain } from "@/components/Button";
import Hero from "@/components/Hero";
import PriceBanner from "@/components/PriceBanner";
import ServiceTiles from "@/components/ServiceTiles";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero
        title={site.tagline}
        subtitle="Trust the Professionals: Reliable Construction, Repair, and Maintenance Services for Your Projects"
        ctaLabel="Get a Free Consultation"
        image="/images/hero-home.jpg"
      />

      {/* "Construct" block: centred 48px title, then a 792px image beside a
          528px text column with the gold CTA. */}
      <section className="px-[15px] py-[120px] max-lg:py-20">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-center font-serif text-[48px] font-normal text-black max-lg:text-4xl">
            TCS: Reliable Construction Contractor and Partner!
          </h2>

          <div className="mt-[85px] flex items-center justify-between gap-[110px] max-lg:flex-col max-lg:gap-10">
            <Image
              src="/images/about-construct.png"
              alt=""
              width={792}
              height={545}
              className="h-[545px] w-[792px] object-cover max-lg:h-auto max-lg:w-full"
            />
            <div className="w-[528px] max-lg:w-full">
              <p className="text-[18px] leading-[1.5] text-black">
                TCS has been successfully operating in the construction industry
                since {site.since}. We take pride in being a reliable and
                professional partner for clients in Canada, the United States,
                Israel, and Ukraine. With a strong workforce and over{" "}
                {site.yearsExperience} years of experience, we effectively tackle
                project and production challenges of any complexity.
              </p>
              <div className="mt-[60px]">
                <ButtonMain href="/about-us">About the Company</ButtonMain>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceTiles />

      <PriceBanner />
    </>
  );
}
