"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { services, site } from "@/data/site";
import {
  localePath,
  switchLocalePath,
  type Dictionary,
  type Locale,
} from "@/i18n/dictionaries";

function Caret({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="8" height="5" viewBox="0 0 8 5" fill="none"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M0 0h8L4 5z" fill="currentColor" />
    </svg>
  );
}

/** Right-hand dropdowns share the mega-menu's navy panel. */
function Panel({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute right-0 top-full z-50 transition-opacity duration-200 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <ul className="whitespace-nowrap bg-navy-light px-[23px] py-[10px]">{children}</ul>
    </div>
  );
}

export default function Header({
  nav,
  serviceNames,
  lang,
}: {
  nav: Dictionary["nav"];
  serviceNames: Dictionary["services"];
  lang: Locale;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const pathname = usePathname();
  const is = (k: string) => open === k;

  const p = (path: string) => localePath(lang, path);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const mainLinks = [
    { label: nav.aboutUs, href: p("/about-us") },
    { label: nav.gallery, href: p("/gallery") },
    { label: nav.contacts, href: p("/contacts") },
    { label: nav.quote, href: p("/quote") },
  ];

  const otherLocale: Locale = lang === "en" ? "ru" : "en";

  return (
    <header className="relative z-50 mx-auto my-[35px] w-full max-w-[1440px] px-[15px]">
      <div className="flex items-center justify-between">
        <Link href={p("")} className="shrink-0" aria-label="TCS">
          <Logo />
        </Link>

        {/* Desktop nav — 14px uppercase with 10px/22px hit areas. */}
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
              {nav.services}
              <Caret open={is("services")} />
            </button>

            <div
              className={`absolute left-0 top-full w-[619px] bg-navy-light p-[30px_28px] transition-opacity duration-200 ${
                is("services") ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <ul className="grid grid-cols-[268px_270px] gap-x-[25px] gap-y-[10px]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={p(`/${s.slug}`)}
                      className="block px-[22px] py-[10px] text-[14px] uppercase leading-[21.5px] text-white transition-colors hover:text-gold-menu"
                    >
                      {serviceNames[s.slug as keyof typeof serviceNames]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-[22px] py-[10px] text-[14px] uppercase text-black transition-colors hover:text-gold-menu"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-[22px] lg:flex">
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
              {site.phones.slice(1).map((ph) => (
                <li key={ph}>
                  <a
                    href={`tel:${ph}`}
                    className="block py-[6px] text-[14px] text-white transition-colors hover:text-gold-menu"
                  >
                    {ph}
                  </a>
                </li>
              ))}
            </Panel>
          </div>

          {/* Language switcher — swaps the locale segment of the current path. */}
          <div
            className="relative"
            onMouseEnter={() => setOpen("lang")}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              className="flex items-center gap-1.5 py-[10px] text-[14px] uppercase text-black transition-colors hover:text-gold-menu"
              aria-label={nav.language}
            >
              {lang}
              <Caret open={is("lang")} />
            </button>
            <Panel open={is("lang")}>
              <li>
                <Link
                  href={switchLocalePath(pathname, otherLocale)}
                  className="block py-[6px] text-[14px] uppercase text-white transition-colors hover:text-gold-menu"
                >
                  {otherLocale}
                </Link>
              </li>
            </Panel>
          </div>

          <span className="flex items-center gap-1.5 text-[14px] uppercase text-black">
            <Image src="/images/flag-ca.svg" alt="" width={15} height={10} />
            Ca
          </span>
        </div>

        {/* Hamburger morphs into a close icon. */}
        <button
          className="relative z-[70] flex h-[24px] w-[26px] flex-col justify-center lg:hidden"
          aria-label={mobileOpen ? nav.closeMenu : nav.menu}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span
            className={`absolute h-[2px] w-full transition-all duration-300 ${
              mobileOpen ? "translate-y-0 rotate-45 bg-white" : "-translate-y-[7px] bg-navy"
            }`}
          />
          <span
            className={`absolute h-[2px] w-full bg-navy transition-all duration-200 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[2px] w-full transition-all duration-300 ${
              mobileOpen ? "translate-y-0 -rotate-45 bg-white" : "translate-y-[7px] bg-navy"
            }`}
          />
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden
      />

      {/* Slide-in drawer */}
      <div
        className={`fixed right-0 top-0 z-[65] h-[100dvh] w-[min(88vw,380px)] overflow-y-auto bg-navy-light transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col px-[30px] pb-[40px] pt-[100px]">
          {/* Services accordion */}
          <div
            className="border-b border-white/10"
            style={{ transitionDelay: mobileOpen ? "80ms" : "0ms" }}
          >
            <button
              onClick={() => setMobileServices((v) => !v)}
              className={`flex w-full items-center justify-between py-[16px] text-[16px] uppercase transition-all duration-500 ${
                mobileServices ? "text-gold-menu" : "text-white"
              } ${mobileOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
              style={{ transitionDelay: mobileOpen ? "80ms" : "0ms" }}
              aria-expanded={mobileServices}
            >
              {nav.services}
              <Caret open={mobileServices} />
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                mobileServices ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <ul className="overflow-hidden">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={p(`/${s.slug}`)}
                      onClick={() => setMobileOpen(false)}
                      className="block py-[10px] pl-[14px] text-[14px] uppercase leading-[1.4] text-white/70 transition-colors hover:text-gold-menu"
                    >
                      {serviceNames[s.slug as keyof typeof serviceNames]}
                    </Link>
                  </li>
                ))}
                <li className="pb-[12px]" />
              </ul>
            </div>
          </div>

          {/* Main links, staggered in behind the drawer */}
          {mainLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`border-b border-white/10 py-[16px] text-[16px] uppercase text-white transition-all duration-500 hover:text-gold-menu ${
                mobileOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? `${140 + i * 60}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}

          <div
            className={`mt-[30px] transition-all duration-500 ${
              mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "400ms" : "0ms" }}
          >
            <p className="mb-[10px] text-[12px] uppercase tracking-wide text-white/40">
              {nav.callUs}
            </p>
            {site.phones.map((ph) => (
              <a
                key={ph}
                href={`tel:${ph}`}
                className="block py-[4px] text-[15px] text-white transition-colors hover:text-gold-menu"
              >
                {ph}
              </a>
            ))}
          </div>

          <div
            className={`mt-[30px] flex items-center gap-[10px] transition-all duration-500 ${
              mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "460ms" : "0ms" }}
          >
            <span className="text-[12px] uppercase tracking-wide text-white/40">
              {nav.language}
            </span>
            <Link
              href={switchLocalePath(pathname, lang)}
              aria-current="true"
              className="bg-gold px-[14px] py-[6px] text-[13px] uppercase text-black"
            >
              {lang}
            </Link>
            <Link
              href={switchLocalePath(pathname, otherLocale)}
              className="px-[14px] py-[6px] text-[13px] uppercase text-white/70 ring-1 ring-white/20 transition-colors hover:text-gold-menu"
            >
              {otherLocale}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
