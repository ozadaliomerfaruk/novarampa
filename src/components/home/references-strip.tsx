"use client";

import { motion } from "framer-motion";
import { referenceCompanies } from "@/lib/references";

export function ReferencesStrip() {
  const featured = referenceCompanies.filter((c) => c.featured).slice(0, 12);
  // Sonsuz akış için listeyi 2x tekrar et
  const items = [...featured, ...featured];

  return (
    <section className="py-20 border-y border-border bg-[var(--brand-charcoal)]/40">
      <div className="container-wide">
        <div className="text-center mb-10">
          <div className="text-sm font-medium text-[var(--brand-orange)] uppercase tracking-widest">
            Birlikte İş Yaptığımız Markalardan
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-semibold">
            Türkiye'nin yükünü taşıyan firmalar bizi tercih ediyor.
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            className="flex gap-12 whitespace-nowrap py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {items.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="text-lg sm:text-xl font-heading font-medium text-foreground/50 hover:text-foreground/90 transition-colors"
              >
                {c.name.replace(/\(.*\)/, "").trim()}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
