import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary, hasLocale, locales } from "@/i18n/dictionaries";

/** Pre-render both locales at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans text-ink">
        <Header nav={dict.nav} serviceNames={dict.services} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer footer={dict.footer} nav={dict.nav} serviceNames={dict.services} lang={lang} />
      </body>
    </html>
  );
}
