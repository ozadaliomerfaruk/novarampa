import { SanityImage } from "@/components/sanity/sanity-image";
import { cn } from "@/lib/utils";
import type { ReferenceCompany } from "@/sanity/lib/types";

type Props = {
  company: Pick<ReferenceCompany, "name" | "logo" | "logoBackground">;
  compact?: boolean;
  className?: string;
};

export function ReferenceLogo({ company, compact = false, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-xl",
        company.logoBackground === "dark" ? "bg-[#182433]" : "bg-white",
        compact ? "h-20 w-44 shrink-0 p-4" : "h-28 p-4 sm:h-36 sm:p-6",
        className,
      )}
    >
      {company.logo?.asset ? (
        <div className="relative h-full w-full">
          <SanityImage
            image={company.logo}
            alt={company.name + " logosu"}
            fill
            sizes={
              compact
                ? "144px"
                : "(max-width: 640px) 40vw, (max-width: 1024px) 26vw, 280px"
            }
            className="object-contain"
          />
        </div>
      ) : (
        <span
          className={cn(
            "text-center text-sm font-heading font-semibold",
            company.logoBackground === "dark" ? "text-white" : "text-slate-700",
          )}
        >
          {company.name.replace(/\(.*\)/, "").trim()}
        </span>
      )}
    </div>
  );
}
