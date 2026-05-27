"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Wrench, Layers, Container } from "lucide-react";

import { LinkButton } from "@/components/ui/link-button";
import { Magnetic } from "@/components/ui/magnetic";

/**
 * "Built for Your Facility, Designed Around Your Needs" — RonI DNA.
 *
 * Standart ürünlerden taşan, sahaya/projeye özel imalat mesajı.
 * Eren'in raporunda da var: "özel ölçü üretim sınırı yok".
 *
 * 3 örnek özel iş: gömme rampa, çift dilli teleskopik, konteynere geçiş.
 */

const cases = [
  {
    icon: Layers,
    title: "Gömme Rampa",
    description:
      "Zemine sıfır gömülü, kullanım dışı üzerinden geçilebilen özel tasarım. Mimari estetik gerektiren projeler için.",
    keywords: ["Zemine sıfır", "Projeye özel", "Mimari estetik"],
    slug: "gomme-rampa",
  },
  {
    icon: Wrench,
    title: "Çift Dilli Teleskopik",
    description:
      "60 ya da 100 cm dilli teleskopik versiyonlar. Konteyner yükleme ve farklı araç yüksekliklerinin premium çözümü.",
    keywords: ["60/100 cm dil", "Konteyner uyumlu", "Soğuk hava"],
    slug: "teleskopik-yukleme-rampasi",
  },
  {
    icon: Container,
    title: "Konteyner Geçiş Rampası",
    description:
      "Forklift veya transpaletle konteyner içine güvenli geçiş. Liman, antrepo, lojistik merkezi.",
    keywords: ["Liman", "Antrepo", "Güvenli geçiş"],
    slug: "konteyner-gecis-rampasi",
  },
];

export function CustomSolutions() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32 bg-[var(--brand-paper)]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          <div className="lg:col-span-7">
            <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
              Özel İmalat
            </div>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
              Standart bulamadın mı?
              <br />
              <span className="text-[var(--brand-orange)]">Sahaya özel üretiyoruz.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-3">
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Standart kataloglarda yer almayan ölçüler, tonajlar, montaj
              biçimleri — sahanızı dinler, mühendisimiz çizimi yapar,
              atölyemiz üretir. Tek bir parça için bile.
            </p>
            <Magnetic strength={0.2}>
              <LinkButton
                href="/teklif-al"
                size="default"
                className="mt-6 bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-white font-semibold group"
              >
                Projeni Anlat
                <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </LinkButton>
            </Magnetic>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                href={`/urunler/${c.slug}`}
                className="group block h-full p-7 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 size-48 rounded-full bg-[var(--brand-orange)]/0 group-hover:bg-[var(--brand-orange)]/10 blur-2xl transition-all duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center justify-center size-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                      <c.icon size={20} />
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      0{i + 1}
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl font-heading font-bold tracking-tight group-hover:text-[var(--brand-orange)] transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.keywords.map((k) => (
                      <span
                        key={k}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-border bg-background"
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 group-hover:text-[var(--brand-orange)] transition-colors">
                    Detayı incele
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
