"use client";

import { motion } from "framer-motion";
import { referenceCompanies } from "@/lib/references";
import { ReferenceLogo } from "@/components/references/reference-logo";
import type { ReferenceCompany } from "@/sanity/lib/types";

type Props = {
  sanityReferences?: ReferenceCompany[] | null;
};

export function ReferencesStrip({ sanityReferences }: Props = {}) {
  const useSanity = (sanityReferences?.length ?? 0) > 0;
  const items = useSanity
    ? [
        ...(sanityReferences as ReferenceCompany[]),
        ...(sanityReferences as ReferenceCompany[]),
      ]
    : (() => {
        const list = referenceCompanies.filter((c) => c.featured).slice(0, 12);
        return [...list, ...list];
      })();

  return (
    <section className="py-20 border-y border-border bg-[var(--brand-charcoal)]/40">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="section-title">Referanslarımız</h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap py-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {items.map((c, i) =>
              useSanity ? (
                <SanityRefLogo
                  key={`${(c as ReferenceCompany)._id}-${i}`}
                  c={c as ReferenceCompany}
                />
              ) : (
                <div
                  key={`${(c as { name: string }).name}-${i}`}
                  className="text-lg sm:text-xl font-heading font-medium text-[#17212b]/70 hover:text-[#17212b] transition-colors"
                >
                  {(c as { name: string }).name.replace(/\(.*\)/, "").trim()}
                </div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SanityRefLogo({ c }: { c: ReferenceCompany }) {
  if (c.logo?.asset) {
    return <ReferenceLogo company={c} compact />;
  }
  return (
    <div className="text-lg sm:text-xl font-heading font-medium text-[#17212b]/70 hover:text-[#17212b] transition-colors shrink-0">
      {c.name.replace(/\(.*\)/, "").trim()}
    </div>
  );
}
