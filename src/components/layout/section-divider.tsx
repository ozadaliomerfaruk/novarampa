/**
 * Section'lar arasına yerleştirilen subtle dekoratif kesik.
 * variant:
 *  - 'diagonal'   : ince diagonal hairline + ortada turuncu nokta
 *  - 'measure'    : surveyor-style ölçü çizgisi (uçlarda tick mark)
 *  - 'minimal'    : sadece ortada büyütülmüş orange chip
 */
type Props = {
  variant?: "diagonal" | "measure" | "minimal";
  label?: string;
  className?: string;
};

export function SectionDivider({
  variant = "diagonal",
  className,
}: Props) {
  if (variant === "measure") {
    // Belirgin ayraç çizgisi — etiketsiz, ortada turuncu vurgu.
    return (
      <div className={`relative py-10 ${className ?? ""}`} aria-hidden="true">
        <div className="container-wide">
          <div className="relative h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-[var(--brand-orange)]/70 to-transparent">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-16 rounded-full bg-[var(--brand-orange)]" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`relative py-8 ${className ?? ""}`} aria-hidden="true">
        <div className="container-wide flex justify-center">
          <span className="size-2 rounded-full bg-[var(--brand-orange)] shadow-[0_0_0_4px_rgba(249,115,22,0.18)]" />
        </div>
      </div>
    );
  }

  // diagonal (default)
  return (
    <div
      className={`relative py-10 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-12"
      >
        <line
          x1="0"
          y1="58"
          x2="1440"
          y2="2"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="58"
          x2="720"
          y2="30"
          stroke="var(--brand-orange)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <circle cx="720" cy="30" r="3.5" fill="var(--brand-orange)" />
      </svg>
    </div>
  );
}
