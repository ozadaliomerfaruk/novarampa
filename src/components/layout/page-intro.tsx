export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="container-wide py-12 sm:py-16 text-center">
      <div className="mx-auto max-w-5xl">
        {eyebrow && (
          <p className="mb-4 text-sm font-medium text-brand-orange">
            {eyebrow}
          </p>
        )}
        <h1 className="page-title">{title}</h1>
        {description && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
