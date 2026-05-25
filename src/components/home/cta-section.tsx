"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { LinkButton, ExternalLinkButton } from "@/components/ui/link-button";
import { company } from "@/lib/site-config";

export function CtaSection() {
  const reduce = useReducedMotion();
  return (
    <section className="py-24">
      <div className="container-wide">
        <motion.div
          initial={reduce ? false : { y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[var(--brand-charcoal)] to-background p-12 sm:p-16 text-center"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--brand-orange)] rounded-full opacity-[0.06] blur-[120px]" />

          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight max-w-2xl mx-auto">
              Projeniz için doğru rampayı birlikte seçelim.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Birkaç dakikalık form, ihtiyacınıza özel teklif. Soracaklarınızı
              WhatsApp'tan da iletebilirsiniz.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <LinkButton
                href="/teklif-al"
                size="lg"
                className="h-14 px-8 text-base bg-[var(--brand-orange)] hover:bg-[var(--brand-orange-hover)] text-[var(--brand-black)] font-semibold group"
              >
                Teklif Al
                <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
              </LinkButton>
              <ExternalLinkButton
                href={company.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base border-border bg-background/40"
              >
                <MessageCircle className="mr-1" />
                {company.contact.phoneDisplay}
              </ExternalLinkButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
