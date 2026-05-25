"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Sayfa scroll progress'i — header'ın hemen altında ince turuncu çizgi.
 * Sayfanın ne kadar okunduğunu gösterir; modern editorial his.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-16 md:top-20 h-[2px] w-full origin-left bg-[var(--brand-orange)] z-[60] pointer-events-none"
    />
  );
}
