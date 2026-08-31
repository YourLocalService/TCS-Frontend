import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/data/site";
import { getDictionary, hasLocale, locales } from "@/i18n/dictionaries";
import { getCanonicalUrl, getLanguageAlternates } from "@/lib/seo/canonical";
import { JsonLd, getLocalBusinessSchema } from "@/lib/seo/jsonld";

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
    // Pages built with generatePageMetadata set an absolute title, which
    // bypasses this template; anything else picks up the suffix.
    title: {
      default: dict.meta.siteTitle,
      template: `%s | ${site.name}`,
    },
    description: dict.meta.siteDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: getCanonicalUrl(lang),
      languages: getLanguageAlternates(),
    },
    robots: { index: true, follow: true },
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
      <head>
        <JsonLd data={getLocalBusinessSchema(lang, dict.meta.siteDescription)} />
      </head>
      <body className="min-h-full flex flex-col font-sans text-ink">
        <Header nav={dict.nav} serviceNames={dict.services} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer
          footer={dict.footer}
          nav={dict.nav}
          serviceNames={dict.services}
          lang={lang}
        />
      </body>
    </html>
  );
}
