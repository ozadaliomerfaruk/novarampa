import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";

type Props = {
  title: string;
  subtitle?: string;
  updatedAt: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
};

export function LegalLayout({
  title,
  subtitle,
  updatedAt,
  breadcrumbLabel,
  children,
}: Props) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: breadcrumbLabel }]} />

        <article className="container-wide pt-8 pb-20 max-w-3xl">
          <header className="mb-10 pb-8 border-b border-border">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Son güncelleme · {updatedAt}
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl font-heading font-bold tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>

          <div className="legal-prose space-y-6 text-foreground/85 leading-relaxed">
            {children}
          </div>

          <footer className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
            <p>
              Bu metin bilgilendirme amaçlıdır. Sorularınız için
              <a
                href="mailto:info@novarampa.com"
                className="ml-1 text-[var(--brand-orange)] hover:text-[var(--brand-orange-hover)] underline-offset-2 hover:underline"
              >
                info@novarampa.com
              </a>{" "}
              adresine yazabilirsiniz.
            </p>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
