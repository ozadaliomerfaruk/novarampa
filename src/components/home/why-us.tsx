"use client";

import { motion } from "framer-motion";
import { Award, Clock, Truck, Wrench } from "lucide-react";

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
      "İmalat hatalarına karşı tam kapsam. Garanti süresi boyunca yedek parça desteği.",
  },
  {
    icon: Truck,
    title: "Türkiye Geneli Sevkiyat",
    description:
      "Marmara öncelikli, ancak ürünlerimiz Türkiye'nin her noktasına ulaşır.",
  },
  {
    icon: Wrench,
    title: "Yedek Parça ve Servis",
    description:
      "Saha ekipleri ve yedek parça stoğu ile uzun ömürlü kullanım garantisi.",
  },
];

export function WhyUs() {
  return (
    <section className="py-24">
      <div className="container-wide">
        <div className="max-w-2xl mb-12">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            Neden Nova Rampa
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl font-heading font-bold tracking-tight">
            Yirmi yılın getirdiği güven, yeni neslin getirdiği netlik.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
