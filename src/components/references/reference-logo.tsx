import { SanityImage } from "@/components/sanity/sanity-image";
import { cn } from "@/lib/utils";
import type { ReferenceCompany } from "@/sanity/lib/types";

type Props = {
  company: Pick<
    ReferenceCompany,
    "name" | "logo" | "logoBackground" | "logoDimensions" | "logoScale"
  >;
  compact?: boolean;
  className?: string;
};

export function ReferenceLogo({ company, compact = false, className }: Props) {
  const crop = company.logo?.crop;
  const dimensions = company.logoDimensions;
  const ratio = dimensions
    ? (dimensions.width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))) /
      (dimensions.height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0)))
    : 3;
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 3;
  const scale = Math.min(1.4, Math.max(0.6, (company.logoScale ?? 100) / 100));
  // Balance visible area: square marks must not dwarf narrow wordmarks.
  const width =
    Math.min(190, 72 * safeRatio, Math.sqrt(5900 * safeRatio)) * scale;
  const height = width / safeRatio;

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-white",
        compact ? "h-24 w-48 shrink-0 px-5" : "h-28 w-full px-3 sm:px-4",
        className,
      )}
    >
      {company.logo?.asset ? (
        <div
          className={cn(
            "relative max-w-full",
            company.logoBackground === "dark" && "rounded-md bg-[#182433] p-2",
          )}
          style={{ width, height: Math.min(100, height), flexShrink: 1 }}
        >
          <SanityImage
            image={company.logo}
            alt={company.name + " logosu"}
            fill
            sizes="(max-width: 640px) 140px, 200px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="text-center text-sm font-heading font-semibold text-[#17212b]">
          {company.name.replace(/\(.*\)/, "").trim()}
        </span>
      )}
    </div>
  );
}
