import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Nova Rampa resmi logosu — Eren'in marka çiziminden yeniden vektörleştirilmiş.
 *
 * - Sembol: iki katmanlı geometric rampa profili (önde solid, arkada soluk gri)
 * - Wordmark: NOVARAMPA bold sans-serif uppercase
 * - currentColor inheritance ile inverted dark mode otomatik beyaza döner
 *
 * Sembol gerçek SVG path olduğu için her boyutta keskin kalır
 * (retina, 4K, print). Image dosyası yok.
 */
export function Logo({
  className,
  asLink = true,
  size = "default",
  inverted = false,
  /** withSymbol backward-compat. Resmi logo zaten sembol+wordmark birlikte. */
  withSymbol: _withSymbol = false,
}: {
  className?: string;
  asLink?: boolean;
  size?: "default" | "small" | "large";
  inverted?: boolean;
  withSymbol?: boolean;
}) {
  const sizes = {
    small: {
      wordmark: "text-lg",
      symbol: "h-6 w-[28px]",
      gap: "gap-2",
    },
    default: {
      wordmark: "text-xl md:text-2xl",
      symbol: "h-8 w-[40px] md:h-9 md:w-[44px]",
      gap: "gap-2.5",
    },
    large: {
      wordmark: "text-3xl md:text-5xl",
      symbol: "h-12 w-[60px] md:h-16 md:w-[80px]",
      gap: "gap-3 md:gap-4",
    },
  } as const;

  const s = sizes[size];

  const content = (
    <span
      className={cn(
        "inline-flex items-center select-none",
        s.gap,
        inverted ? "text-white" : "text-foreground",
        className
      )}
    >
      <RampSymbol className={s.symbol} />
      <span
        className={cn(
          "font-heading font-extrabold tracking-[-0.02em] leading-none",
          s.wordmark
        )}
      >
        NOVA<span className="opacity-100">RAMPA</span>
      </span>
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

/**
 * Resmi logodan vektörleştirilmiş iki katmanlı sembol.
 *  - Arka katman: soluk gri (currentColor @ %25 opacity), üst sağa offset
 *  - Ön katman: tam currentColor, keskin trapezoid (rampa profili)
 *
 * Path geometrisi:
 *   Sol kenar 26° eğimli (yumuşak ramp incline)
 *   Sağ kenar dikey (platform yüksekliği)
 *   Alt kenar yatay (yer)
 *   Üst kenar yatay (kısa platform üstü)
 */
function RampSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Arka katman — soluk gri (offset rampa silüeti) */}
      <path
        d="M 18 56 L 96 56 L 96 6 L 50 6 Z"
        fill="currentColor"
        opacity="0.22"
      />
      {/* Ön katman — solid navy/white (ana rampa silüeti) */}
      <path d="M 4 64 L 82 64 L 82 14 L 36 14 Z" fill="currentColor" />
    </svg>
  );
}
