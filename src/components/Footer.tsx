import Link from "next/link";
import Logo from "./Logo";
import { footerServices, site } from "@/data/site";
import { localePath, type Dictionary, type Locale } from "@/i18n/dictionaries";

export default function Footer({
  footer,
  nav,
  serviceNames,
  lang,
}: {
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
  serviceNames: Dictionary["services"];
  lang: Locale;
}) {
  const p = (path: string) => localePath(lang, path);

  return (
    <footer className="bg-navy-light text-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-[70px] py-14 max-lg:px-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4">
            <Logo variant="light" />
          </div>
          <p className="text-sm text-white/70">
            {footer.tagline} {site.since}.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
            {footer.services}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {footerServices.map((s) => (
              <li key={s.slug}>
                <Link href={p(`/${s.slug}`)} className="hover:text-gold">
                  {serviceNames[s.slug as keyof typeof serviceNames] ?? s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
            {footer.tcs}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link href={p("/about-us")} className="hover:text-gold">
                {nav.aboutUs}
              </Link>
            </li>
            <li>
              <Link href={p("/gallery")} className="hover:text-gold">
                {nav.gallery}
              </Link>
            </li>
            <li>
              <Link href={p("/contacts")} className="hover:text-gold">
                {nav.contacts}
              </Link>
            </li>
            <li>
              <Link href={p("/quote")} className="hover:text-gold">
                {nav.quote}
              </Link>
            </li>
          </ul>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">
              {footer.chooseCountry}
            </p>
            <div className="flex gap-3 text-sm text-white/80">
              <span>CA</span>
              <a href="https://tcs-us.vip/" className="hover:text-gold">USA</a>
              <a href="https://tcs-ukraine.com" className="hover:text-gold">UA</a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
            {footer.contact}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`} className="hover:text-gold">
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-white/70">{site.address}</li>
            <li className="text-white/50">
              {footer.newAddress}: {site.addressSecondary}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="mx-auto max-w-[1440px] px-[70px] text-xs text-white/50 max-lg:px-8">
          © {new Date().getFullYear()} TCS. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
