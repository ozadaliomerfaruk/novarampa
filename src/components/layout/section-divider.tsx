type Props = {
  variant?: "diagonal" | "measure" | "minimal";
  label?: string;
  className?: string;
};
export function SectionDivider({ className = "" }: Props) {
  return (
    <div className={"py-8 sm:py-10 " + className} aria-hidden="true">
      <div className="container-wide">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-orange/70 to-transparent" />
      </div>
    </div>
  );
}
