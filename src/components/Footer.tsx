import Link from "next/link";
import Logo from "./Logo";
import { footerServices, navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy-light text-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-[70px] py-14 max-lg:px-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4">
            <Logo variant="light" />
          </div>
          <p className="text-sm text-white/70">
            {site.tagline} Trusted construction contractor since {site.since}.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
            Services
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {footerServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
            TCS
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">
              Choose your country
            </p>
            <div className="flex gap-3 text-sm text-white/80">
              <span>CA</span>
              <span>USA</span>
              <span>UA</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {site.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-gold">
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
            <li className="pt-2 text-white/70">{site.address}</li>
            <li className="text-white/50">New address: {site.addressSecondary}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="mx-auto max-w-[1440px] px-[70px] text-xs text-white/50 max-lg:px-8">
          © {new Date().getFullYear()} TCS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
