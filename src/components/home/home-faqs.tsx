import { ChevronDown } from "lucide-react";
import type { HomeFaqItem } from "@/sanity/lib/types";

/**
 * Anasayfa SSS bölümü — Sanity'den gelen sorular & cevaplar.
 *
 * Aynı veri FaqJsonLd (structured-data.tsx) tarafından da basılır
 * → AI motorları + Google rich snippet'i için çift kaynak.
 *
 * Sanity'de hiç soru yoksa hiç render edilmez.
 */
export function HomeFaqs({ faqs }: { faqs?: HomeFaqItem[] | null }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      aria-labelledby="anasayfa-sss-baslik"
      className="container-wide py-20 md:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sol kolon: başlık + tagline */}
        <div className="lg:col-span-4">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            SSS
          </div>
          <h2
            id="anasayfa-sss-baslik"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-[1.1]"
          >
            Aklındaki ilk sorular,
            <br />
            <span className="text-gradient-orange">net cevaplar.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">
            Müşterilerimizin en çok sorduğu sorular. Aradığını bulamazsan
            tek tıkla iletişime geçebilirsin.
          </p>
        </div>

        {/* Sağ kolon: accordion */}
        <div className="lg:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5 sm:py-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="text-base sm:text-lg font-heading font-semibold leading-snug pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className="mt-0.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-foreground/80 leading-relaxed max-w-2xl">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
