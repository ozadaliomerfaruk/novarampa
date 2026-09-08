"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Clock, Wrench } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "CE, TSE ve EN 1398 Uyumlu",
    description:
      "Her ürün, uluslararası güvenlik standartlarına göre üretilir ve test edilir.",
  },
  {
    icon: Clock,
    title: "İki Yıl Garanti",
    description:
      "Tüm Novarampa ürünleri imalat hatalarına karşı 2 yıl garanti altındadır.",
  },
  {
    icon: Wrench,
    title: "Yedek Parça ve Servis",
    description:
      "Saha ekipleri ve yedek parça stoğu ile uzun ömürlü kullanım sunar.",
  },
];

export function WhyUs() {
  const reduce = useReducedMotion();
  return (
    <section className="py-24">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-title">Neden Novarampa</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { y: 12 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-[var(--brand-orange)]/30 transition-colors"
            >
              <div className="inline-flex items-center justify-center size-12 rounded-xl bg-[var(--brand-orange)]/10 text-[var(--brand-orange)]">
                <item.icon size={22} />
              </div>
              <h3 className="mt-5 text-base font-heading font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
