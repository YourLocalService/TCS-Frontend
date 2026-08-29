import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceData } from "@/data/serviceContentByLocale";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";

const SLUG = "thermal";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/thermal">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const data = getServiceData(lang, SLUG);
  return { title: `${data.metaTitle} | TCS Canada`, description: data.subtitle };
}

export default async function Page({ params }: PageProps<"/[lang]/thermal">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <ServicePageTemplate data={getServiceData(lang, SLUG)} dict={dict} lang={lang} />
  );
}
