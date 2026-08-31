import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import { getServiceData } from "@/data/serviceContentByLocale";
import { getDictionary, hasLocale } from "@/i18n/dictionaries";
import { generatePageMetadata } from "@/lib/seo/metadata";

const SLUG = "deck";
const PATH = "/deck";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/deck">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const data = getServiceData(lang, SLUG);

  return generatePageMetadata({
    lang,
    title: data.metaTitle,
    description: data.subtitle,
    path: PATH,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/deck">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <ServicePageTemplate
      data={getServiceData(lang, SLUG)}
      dict={dict}
      lang={lang}
      path={PATH}
    />
  );
}
