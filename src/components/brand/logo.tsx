import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Nova Rampa wordmark + minimal mark (3-çizgi bauhaus geometric).
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
    default: "size-7",
    large: "size-10 md:size-12",
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
          <MinimalRampMark />
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

/**
 * Minimal 3-line ramp profile:
 *  ────         (short top platform)
 *     ╲        (orange diagonal ramp)
 *  ──────      (long ground line, faint)
 */
function MinimalRampMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
    >
      <line
        x1="26"
        y1="14"
        x2="46"
        y2="14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="6"
        y1="38"
        x2="26"
        y2="14"
        stroke="var(--brand-orange)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="2"
        y1="42"
        x2="46"
        y2="42"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
