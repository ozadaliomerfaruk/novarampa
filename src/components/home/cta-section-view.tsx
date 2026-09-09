"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { Magnetic } from "@/components/ui/magnetic";
import type { SiteCopy } from "@/lib/site-copy";
import type { MergedContact } from "@/lib/site-data";

export function CtaSectionView({
  copy,
  contact,
}: {
  copy: SiteCopy["sharedCta"];
  contact: MergedContact;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="py-24">
      <div className="container-wide">
        <motion.div
          initial={reduce ? false : { y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-navy-dark)] p-6 sm:p-12 text-center"
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-orange)] rounded-full opacity-[0.18] blur-[120px]" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight max-w-2xl mx-auto text-white">
              {copy.title}
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Magnetic strength={0.22}>
                <LinkButton
                  href="/teklif-al"
                  size="lg"
                  className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-primary-foreground font-semibold group shadow-[0_0_0_0_var(--brand-orange)] hover:shadow-[0_12px_36px_-8px_var(--brand-orange)] transition-all"
                >
                  {copy.buttonLabel}
                  <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                </LinkButton>
              </Magnetic>
              <ExternalLinkButton
                href={contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <MessageCircle className="mr-1" />
                {contact.phoneDisplay}
              </ExternalLinkButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
