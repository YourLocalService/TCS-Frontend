"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { navLinks, services, site } from "@/data/site";

function Caret({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M0 0h8L4 5z" fill="currentColor" />
    </svg>
  );
}

/** Right-hand dropdowns share the mega-menu's navy panel and 10px/23px padding. */
function Panel({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute right-0 top-full z-50 transition-opacity duration-200 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <ul className="whitespace-nowrap bg-navy-light px-[23px] py-[10px]">
        {children}
      </ul>
    </div>
  );
}

const countries = [
  { code: "USA", flag: "/images/flag-usa.svg", href: "https://tcs-us.vip/" },
  { code: "UA", flag: "/images/flag-ua.svg", href: "https://tcs-ukraine.com" },
];

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const is = (k: string) => open === k;

  return (
    <header className="relative z-50 mx-auto my-[35px] w-full max-w-[1440px] px-[15px]">
      <div className="flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Nav items are 14px uppercase on the live site, with 10px/22px hit areas. */}
        <nav className="hidden items-center lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setOpen("services")}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              className={`flex items-center gap-1.5 px-[22px] py-[10px] text-[14px] uppercase transition-colors ${
                is("services")
                  ? "bg-navy-light text-gold-menu"
                  : "text-black hover:text-gold-menu"
              }`}
            >
              Services
              <Caret open={is("services")} />
            </button>

            {/* Mega-menu: 619px wide, flush under the tab, two columns. */}
            <div
              className={`absolute left-0 top-full w-[619px] bg-navy-light p-[30px_28px] transition-opacity duration-200 ${
                is("services") ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <ul className="grid grid-cols-[268px_270px] gap-x-[25px] gap-y-[10px]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      className="block px-[22px] py-[10px] text-[14px] uppercase leading-[21.5px] text-white transition-colors hover:text-gold-menu"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-[22px] py-[10px] text-[14px] uppercase text-black transition-colors hover:text-gold-menu"
            >
              {l.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-[22px] lg:flex">
          {/* Phone: first number is the trigger, the other two drop down. */}
          <div
            className="relative"
            onMouseEnter={() => setOpen("phone")}
            onMouseLeave={() => setOpen(null)}
          >
            <a
              href={`tel:${site.phones[0]}`}
              className="flex items-center gap-1.5 py-[10px] text-[14px] text-black transition-colors hover:text-gold-menu"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 2.9 3 2.4 3.4 2 4 2h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
                  fill="currentColor"
                />
              </svg>
              {site.phones[0]}
              <Caret open={is("phone")} />
            </a>
            <Panel open={is("phone")}>
              {site.phones.slice(1).map((p) => (
                <li key={p}>
                  <a
                    href={`tel:${p}`}
                    className="block py-[6px] text-[14px] text-white transition-colors hover:text-gold-menu"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </Panel>
          </div>

          {/* Language: EN is current, RU lives on the site's /ru tree. */}
          <div
            className="relative"
            onMouseEnter={() => setOpen("lang")}
            onMouseLeave={() => setOpen(null)}
          >
            <button className="flex items-center gap-1.5 py-[10px] text-[14px] uppercase text-black transition-colors hover:text-gold-menu">
              En
              <Caret open={is("lang")} />
            </button>
            <Panel open={is("lang")}>
              <li>
                <a
                  href="https://tcs-canada.ca/ru/"
                  className="block py-[6px] text-[14px] uppercase text-white transition-colors hover:text-gold-menu"
                >
                  Ru
                </a>
              </li>
            </Panel>
          </div>

          <span className="text-[14px] uppercase text-black/30">Country</span>

          {/* Country: CA is current; USA and UA are separate TCS sites. */}
          <div
            className="relative"
            onMouseEnter={() => setOpen("country")}
            onMouseLeave={() => setOpen(null)}
          >
            <button className="flex items-center gap-1.5 py-[10px] text-[14px] uppercase text-black transition-colors hover:text-gold-menu">
              <Image src="/images/flag-ca.svg" alt="" width={15} height={10} />
              Ca
              <Caret open={is("country")} />
            </button>
            <Panel open={is("country")}>
              {countries.map((c) => (
                <li key={c.code}>
                  <a
                    href={c.href}
                    className="flex items-center gap-1.5 py-[6px] text-[14px] uppercase text-white transition-colors hover:text-gold-menu"
                  >
                    <Image src={c.flag} alt="" width={15} height={10} />
                    {c.code}
                  </a>
                </li>
              ))}
            </Panel>
          </div>
        </div>

        <button
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="h-0.5 w-6 bg-navy" />
          <span className="h-0.5 w-6 bg-navy" />
          <span className="h-0.5 w-6 bg-navy" />
        </button>
      </div>

      {mobileOpen && (
        <div className="mt-4 bg-navy-light px-6 py-6 lg:hidden">
          <p className="mb-3 text-[14px] uppercase text-gold-menu">Services</p>
          <ul className="mb-5 space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}`}
                  className="block text-[14px] uppercase text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 border-t border-white/10 pt-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block text-[14px] uppercase text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
            {site.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p}`}
                className="block text-[14px] text-white"
              >
                {p}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
