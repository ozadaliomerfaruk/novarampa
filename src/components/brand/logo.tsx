import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Nova Rampa wordmark.
 *
 * Reusable text-based logo: NOVA (foreground) + RAMPA (orange).
 * `inverted` koyu (dark) surface üzerinde beyaz NOVA göstermek için.
 */
export function Logo({
  className,
  asLink = true,
  size = "default",
  withSymbol = false,
  inverted = false,
}: {
  className?: string;
  asLink?: boolean;
  size?: "default" | "small" | "large";
  withSymbol?: boolean;
  inverted?: boolean;
}) {
  const sizes = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl md:text-5xl",
  } as const;

  const symbolSizes = {
    small: "size-5",
    default: "size-6",
    large: "size-9 md:size-11",
  } as const;

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        inverted ? "text-white" : "text-foreground",
        className
      )}
    >
      {withSymbol && (
        <span
          aria-hidden="true"
          className={cn("inline-block shrink-0", symbolSizes[size])}
        >
          <RampSymbol />
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-baseline gap-0 font-heading font-bold tracking-tight",
          sizes[size]
        )}
      >
        <span>NOVA</span>
        <span className="text-[var(--brand-orange)]">RAMPA</span>
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

function RampSymbol() {
  return (
    <svg
      viewBox="0 0 144 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
    >
      <path d="M 14 120 L 126 120 L 126 36 L 60 36 Z" fill="var(--brand-orange)" />
      <line
        x1="60"
        y1="26"
        x2="126"
        y2="26"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.95"
      />
      <line
        x1="76"
        y1="16"
        x2="126"
        y2="16"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.55"
      />
    </svg>
  );
}
