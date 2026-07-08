"use client";

import { motion } from "framer-motion";
import { referenceCompanies } from "@/lib/references";
import { SanityImage } from "@/components/sanity/sanity-image";
import type { ReferenceCompany } from "@/sanity/lib/types";

type Props = {
  sanityReferences?: ReferenceCompany[] | null;
};

export function ReferencesStrip({ sanityReferences }: Props = {}) {
  const useSanity = (sanityReferences?.length ?? 0) > 0;
  const items = useSanity
    ? [...(sanityReferences as ReferenceCompany[]), ...(sanityReferences as ReferenceCompany[])]
    : (() => {
        const list = referenceCompanies.filter((c) => c.featured).slice(0, 12);
        return [...list, ...list];
      })();

  return (
    <section className="py-20 border-y border-border bg-[var(--brand-charcoal)]/40">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
            Referanslarımız
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            className="flex items-center gap-12 whitespace-nowrap py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {items.map((c, i) =>
              useSanity ? (
                <SanityRefLogo key={`${(c as ReferenceCompany)._id}-${i}`} c={c as ReferenceCompany} />
              ) : (
                <div
                  key={`${(c as { name: string }).name}-${i}`}
                  className="text-lg sm:text-xl font-heading font-medium text-foreground/50 hover:text-foreground/90 transition-colors"
                >
                  {(c as { name: string }).name.replace(/\(.*\)/, "").trim()}
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SanityRefLogo({ c }: { c: ReferenceCompany }) {
  if (c.logo) {
    return (
      <div className="relative h-12 w-32 shrink-0">
        <SanityImage
          image={c.logo}
          fill
          sizes="160px"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity"
        />
      </div>
    );
  }
  return (
    <div className="text-lg sm:text-xl font-heading font-medium text-foreground/50 hover:text-foreground/90 transition-colors shrink-0">
      {c.name.replace(/\(.*\)/, "").trim()}
    </div>
  );
}
