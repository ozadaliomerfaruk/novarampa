import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  asLink = true,
  size = "default",
}: {
  className?: string;
  asLink?: boolean;
  size?: "default" | "small" | "large";
}) {
  const sizes = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl md:text-5xl",
  };

  const content = (
    <span className={cn("inline-flex items-baseline gap-0.5 font-heading font-bold tracking-tight", sizes[size], className)}>
      <span className="text-foreground">NOVA</span>
      <span className="text-[var(--brand-orange)]">RAMPA</span>
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
