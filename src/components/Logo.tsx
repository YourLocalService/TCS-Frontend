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
      priority
      className={`h-auto w-[160px] sm:w-[200px] ${
        variant === "light" ? "brightness-0 invert" : ""
      } ${className}`}
    />
  );
}
