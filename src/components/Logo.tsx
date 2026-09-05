import Image from "next/image";

export default function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Image
      src="/images/logo-header.png"
      alt="TCS — Technological Construction Service"
      width={220}
      height={70}
      preload
      quality={95}
      sizes="(min-width: 640px) 200px, 160px"
      className={`h-auto w-[160px] sm:w-[200px] ${
        variant === "light" ? "brightness-0 invert" : ""
      } ${className}`}
    />
  );
}
