import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceData } from "@/data/serviceContentByLocale";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

const SLUG = "landscaping-and-interlocking";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/landscaping-and-interlocking">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const data = getServiceData(lang, SLUG);
  return { title: `${data.metaTitle} | TCS Canada`, description: data.subtitle };
}

export default async function Page({ params }: PageProps<"/[lang]/landscaping-and-interlocking">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <ServicePageTemplate data={getServiceData(lang, SLUG)} dict={dict} lang={lang} />
  );
}
