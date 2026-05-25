import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-4xl sm:text-5xl font-heading font-bold tracking-tight leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
