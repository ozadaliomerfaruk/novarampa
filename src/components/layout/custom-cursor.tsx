"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Sade industrial cursor:
 * - Küçük turuncu dot (fareyi sıkı takip eder)
 * - Daha büyük outline ring (yumuşatılmış spring)
 * - Link/button/role=button üzerinde dot büyür + outline çevreyi sarar
 *
 * Touch cihazları, prefers-reduced-motion ve mobile'da KAPALI.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  // Hassas dot — neredeyse anlık
  const dx = useMotionValue(-100);
  const dy = useMotionValue(-100);

  // Outline ring — yumuşak
  const rx = useMotionValue(-100);
  const ry = useMotionValue(-100);
  const sx = useSpring(rx, { stiffness: 220, damping: 24, mass: 0.6 });
  const sy = useSpring(ry, { stiffness: 220, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    // Pointer fine? Sadece mouse (touch değil)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      dx.set(e.clientX);
      dy.set(e.clientY);
      rx.set(e.clientX);
      ry.set(e.clientY);
    };

    const interactiveSel =
      'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor="hover"]';

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest(interactiveSel)) setActive(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest(interactiveSel)) setActive(false);
    };
    const onLeave = () => {
      dx.set(-100);
      dy.set(-100);
      rx.set(-100);
      ry.set(-100);
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [dx, dy, rx, ry, reduce]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: active ? 56 : 32,
            height: active ? 56 : 32,
            opacity: active ? 0.9 : 0.45,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="rounded-full border border-white"
        />
      </motion.div>

      {/* Center dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101]"
        style={{
          x: dx,
          y: dy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: active ? 6 : 8,
            height: active ? 6 : 8,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="rounded-full bg-[var(--brand-orange)]"
        />
      </motion.div>
    </>
  );
}
