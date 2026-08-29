import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "btn-shine inline-block text-[18px] font-medium uppercase tracking-normal transition-colors duration-200";

export function ButtonMain({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${base} bg-gold px-[60px] py-[22px] text-black hover:bg-gold-dark ${className}`}
    >
      {children}
    </Link>
  );
}

export function ButtonDark({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${base} bg-navy px-[60px] py-[22px] text-white hover:bg-navy-light ${className}`}
    >
      {children}
    </Link>
  );
}
