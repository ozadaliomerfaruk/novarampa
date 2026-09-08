import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Nova Rampa resmi logosu — Eren'in SVG'si, crop edilmiş viewBox ile.
 *
 * SVG dosyasının root viewBox'ı: "120 600 1260 380" (3.3:1 yatay ratio)
 * Bu sayede içerideki PNG image'ın merkez bandı (logo content) tam
 * alana yayılır. Padding transparent kısımları kesilir.
 *
 * Display'de h-X kullanırız, width orantısal olarak hesaplanır.
 *
 * - light bg (header): orijinal renkleriyle
 * - dark bg (footer): inverted=true → CSS filter ile beyaza dönüşür
 */
export function Logo({
  className,
  asLink = true,
  size = "default",
  inverted = false,
  /** Temaya göre otomatik: dark modda beyaz (invert), light modda orijinal. */
  autoInvert = false,
  src: srcOverride,
  alt: altOverride,
}: {
  className?: string;
  asLink?: boolean;
  size?: "default" | "small" | "large";
  inverted?: boolean;
  autoInvert?: boolean;
  withSymbol?: boolean;
  /** Sanity'den gelen logo URL'i. Boş bırakılırsa default SVG kullanılır. */
  src?: string | null;
  alt?: string;
}) {
  const heights = {
    small: "h-10",
    default: "h-14 md:h-16",
    large: "h-14 sm:h-20 md:h-24 xl:h-20 2xl:h-24",
  } as const;

  // Sanity'den URL varsa onu kullan, yoksa default SVG.
  const logoSrc = srcOverride?.trim() || "/logos/logo-novarampa.svg";
  const logoAlt = altOverride?.trim() || "Nova Rampa";

  const content = (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={1260}
        height={380}
        priority={size === "large"}
        className={cn(
          heights[size],
          "w-auto select-none",
          inverted && "brightness-0 invert",
          autoInvert && "dark:brightness-0 dark:invert",
        )}
        unoptimized
      />
    </span>
  );

  if (asLink) {
    return (
      <Link href="/" aria-label="Nova Rampa ana sayfa" className="inline-flex">
        {content}
      </Link>
    );
  }
  return content;
}
