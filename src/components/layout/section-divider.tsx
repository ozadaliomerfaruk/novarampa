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
  label,
  className,
}: Props) {
  if (variant === "measure") {
    return (
      <div className={`relative py-12 ${className ?? ""}`} aria-hidden="true">
        <div className="container-wide flex items-center gap-4">
          {/* sol tick + line */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="h-3 w-px bg-[var(--brand-ink)]/30" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
              {label ?? "—"}
            </span>
          </div>
          <span className="flex-1 h-px bg-gradient-to-r from-[var(--brand-ink)]/15 via-[var(--brand-orange)]/40 to-[var(--brand-ink)]/15" />
          <span className="h-3 w-px bg-[var(--brand-ink)]/30 shrink-0" />
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
          stroke="rgba(20, 36, 51, 0.12)"
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
