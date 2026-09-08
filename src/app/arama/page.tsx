import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageIntro } from "@/components/layout/page-intro";
import { searchSite } from "@/lib/site-search";
export const metadata: Metadata = {
  title: "Site İçinde Ara",
  robots: { index: false, follow: true },
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = (typeof params.q === "string" ? params.q : "")
    .trim()
    .slice(0, 80);
  const results = await searchSite(query);
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumb items={[{ label: "Arama" }]} />
        <PageIntro title="Site içinde ara" />
        <section className="container-wide pb-20">
          <div className="mx-auto max-w-3xl">
            <form action="/arama" className="mb-10">
              <label
                htmlFor="search-query"
                className="mb-2 block text-sm font-medium"
              >
                Ürün, yedek parça veya konu
              </label>
              <div className="flex gap-3">
                <input
                  id="search-query"
                  name="q"
                  type="search"
                  defaultValue={query}
                  minLength={2}
                  maxLength={80}
                  required
                  placeholder="Ne aramıştınız?"
                  className="field-control min-w-0"
                />
                <button
                  type="submit"
                  className="flex min-h-12 items-center gap-2 rounded-xl bg-brand-orange px-5 font-semibold text-white"
                >
                  <Search size={18} />
                  Ara
                </button>
              </div>
            </form>
            {query.length < 2 ? (
              <p className="text-muted-foreground">
                Aramak için en az iki karakter yazın.
              </p>
            ) : (
              <>
                <p className="mb-5 text-muted-foreground">
                  “{query}” için {results.length} sonuç bulundu.
                </p>
                <div className="space-y-4">
                  {results.map((result) => (
                    <Link
                      key={result.href}
                      href={result.href}
                      className="group block rounded-2xl border border-border bg-card p-6 hover:border-brand-orange"
                    >
                      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-orange">
                        {result.type}
                      </div>
                      <h2 className="flex items-center justify-between gap-4 font-heading text-xl font-semibold">
                        {result.title}
                        <ArrowUpRight size={20} className="shrink-0" />
                      </h2>
                      {result.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {result.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
                {!results.length && (
                  <p className="rounded-2xl border border-border p-6 text-muted-foreground">
                    Farklı bir kelimeyle tekrar deneyin veya{" "}
                    <Link
                      href="/iletisim"
                      className="text-brand-orange underline"
                    >
                      bize ulaşın
                    </Link>
                    .
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
