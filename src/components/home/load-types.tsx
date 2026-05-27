"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Boxes,
  Container,
  Truck,
  Snowflake,
  PackageOpen,
  ShoppingCart,
  ArrowUpRight,
} from "lucide-react";

/**
 * Roni.com'un "What Are You Lifting?" DNA'sı.
 * Müşteri ürün tipinden değil, taşıdığı yükten girer — daha sezgisel ve
 * SEO'da uzun-kuyruklu aramaları yakalar (palet rampası, konteyner rampası vb.)
 */
const loadTypes = [
  {
    icon: Boxes,
    label: "Palet Yükleme",
    description: "Forklift/transpalet ile palet sevkiyatı.",
    href: "/cozumler/lojistik-depo",
    keyword: "palet rampası",
  },
  {
    icon: Container,
    label: "Konteyner Geçişi",
    description: "Liman, antrepo, lojistik merkezi.",
    href: "/urunler/konteyner-gecis-rampasi",
    keyword: "konteyner rampası",
  },
  {
    icon: Truck,
    label: "TIR / Kamyon",
    description: "Yarı römork, kapalı kasa, frigorifik.",
    href: "/urunler/teleskopik-yukleme-rampasi",
    keyword: "tır yükleme rampası",
  },
  {
    icon: Snowflake,
    label: "Soğuk Zincir",
    description: "Soğuk hava deposu, gıda, ilaç.",
    href: "/cozumler/soguk-hava-gida",
    keyword: "soğuk depo rampası",
  },
  {
    icon: PackageOpen,
    label: "Ağır Yük (10+ ton)",
    description: "Makine parçası, çelik, bobin.",
    href: "/urunler/seyyar-mobil-rampa",
    keyword: "ağır yük rampası",
  },
  {
    icon: ShoppingCart,
    label: "Süpermarket / Perakende",
    description: "Market arka kapı, küçük sevkiyat.",
    href: "/cozumler/supermarket-perakende",
    keyword: "market rampası",
  },
];

export function LoadTypes() {
  const reduce = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 bg-[var(--brand-paper)]">
      <div className="container-wide">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            Yüküne Göre Seç
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-[1.05]">
            Ne taşıyorsun,
            <br />
            <span className="text-[var(--brand-orange)]">biz biliyoruz.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">
            Ürün tipinden değil, taşıdığın yükten başla. Senin
            uygulamana en uygun rampa çözümünü bir tıkla bulalım.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {loadTypes.map((lt, i) => (
            <motion.div
              key={lt.href}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <Link
                href={lt.href}
                className="group relative block h-full p-5 md:p-7 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/40 transition-colors overflow-hidden"
              >
                <div className="absolute -top-8 -right-8 size-32 rounded-full bg-[var(--brand-orange)]/0 group-hover:bg-[var(--brand-orange)]/10 blur-2xl transition-all duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center justify-center size-11 md:size-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                      <lt.icon size={20} />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-muted-foreground group-hover:text-[var(--brand-orange)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>

                  <h3 className="mt-5 md:mt-6 text-base md:text-lg font-heading font-semibold tracking-tight group-hover:text-[var(--brand-orange)] transition-colors">
                    {lt.label}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {lt.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/cozumler"
            className="group inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-[var(--brand-orange)] transition-colors"
          >
            Tüm sektörel çözümleri gör
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
