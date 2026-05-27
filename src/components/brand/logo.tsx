import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Nova Rampa resmi logosu.
 *
 * Eren'in verdiği yüksek-çözünürlüklü SVG (gri/siyah gradient sembol +
 * NOVARAMPA wordmark) — /public/logos/logo-novarampa.svg
 *
 * - light bg (header): orijinal renkleriyle
 * - dark bg (footer): inverted=true → CSS filter ile beyaza dönüşür
 *
 * SVG kare aspect ratio'ya sahip (içeride sembol+wordmark ortalanmış).
 * Display'i height + w-auto ile yapıyoruz; container `overflow-hidden`
 * gerekmiyor çünkü içerik dosya içinde zaten doğru ortalanmış.
 */
export function Logo({
  className,
  asLink = true,
  size = "default",
  inverted = false,
  /** withSymbol backward-compat — logo zaten sembol+wordmark birlikte. */
  withSymbol: _withSymbol = false,
}: {
  className?: string;
  asLink?: boolean;
  size?: "default" | "small" | "large";
  inverted?: boolean;
  withSymbol?: boolean;
}) {
  // Display height per size; SVG kare olduğu için w da bu kadar olur,
  // ama Next.js next/image src=svg'de width/height intrinsic alır.
  const heights = {
    small: "h-10",
    default: "h-12 md:h-14",
    large: "h-20 md:h-24",
  } as const;

  // SVG'nin doğal oranı 1:1 (1500×1500) ama içerik yatay-ortalanmış,
  // bu yüzden Image'a tam karelik intrinsic boyut veriyoruz.
  const content = (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logos/logo-novarampa.svg"
        alt="Nova Rampa"
        width={1500}
        height={1500}
        priority={size === "large"}
        className={cn(
          heights[size],
          "w-auto select-none object-contain",
          // Dark fonda CSS filter ile beyaza dönüştür
          inverted && "brightness-0 invert"
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
