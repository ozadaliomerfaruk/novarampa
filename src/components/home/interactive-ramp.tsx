"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Hero'nun sağında yer alan interaktif rampa profili.
 * Fareye göre 13° açısı hafif eğilir + yükselir/iner.
 * Industrial Nova kimliğinin "yaşayan" karşılığı.
 */
export function InteractiveRamp() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Fare pozisyonu (-0.5 ile 0.5 arası)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Yumuşatma — spring fizik
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  // Transform değerleri
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const translateX = useTransform(sx, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      mx.set(Math.max(-0.5, Math.min(0.5, dx)));
      my.set(Math.max(-0.5, Math.min(0.5, dy)));
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my, reduce]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[58%] max-w-[820px] aspect-square hidden lg:block"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          transformStyle: "preserve-3d",
        }}
      >
        <defs>
          <linearGradient id="ramp-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff8a3d" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <radialGradient id="ramp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <filter id="ramp-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
            <feOffset dx="0" dy="14" result="o" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.55" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Diffuse glow */}
        <circle cx="380" cy="320" r="220" fill="url(#ramp-glow)" />

        {/* Surveyor coords */}
        <g
          stroke="rgba(20,36,51,0.35)"
          strokeWidth="0.6"
          fill="none"
          strokeDasharray="2 4"
        >
          <line x1="60" y1="480" x2="540" y2="480" />
          <line x1="540" y1="60" x2="540" y2="480" />
          <circle cx="540" cy="60" r="4" fill="rgba(20,36,51,0.55)" />
          <circle cx="60" cy="480" r="4" fill="rgba(20,36,51,0.55)" />
        </g>

        {/* Angle marker */}
        <text
          x="100"
          y="450"
          fill="rgba(20,36,51,0.7)"
          fontFamily="JetBrains Mono, monospace"
          fontSize="14"
          fontWeight="500"
        >
          13°
        </text>

        {/* RAMP — main trapezoid */}
        <g filter="url(#ramp-shadow)">
          <path
            d="M 80 470 L 520 470 L 520 140 L 240 140 Z"
            fill="url(#ramp-grad)"
          />
        </g>

        {/* Top platform decklights */}
        <line
          x1="240"
          y1="120"
          x2="520"
          y2="120"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="square"
        />
        <line
          x1="290"
          y1="92"
          x2="520"
          y2="92"
          stroke="white"
          strokeWidth="4"
          strokeOpacity="0.65"
        />
        <line
          x1="340"
          y1="68"
          x2="520"
          y2="68"
          stroke="white"
          strokeWidth="3"
          strokeOpacity="0.35"
        />

        {/* Right vertical reference */}
        <line
          x1="552"
          y1="140"
          x2="552"
          y2="470"
          stroke="rgba(20,36,51,0.45)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Sparks / particles */}
        <g fill="white" opacity="0.7">
          <circle cx="280" cy="180" r="1.5">
            <animate
              attributeName="cy"
              from="180"
              to="80"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="320" cy="200" r="1">
            <animate
              attributeName="cy"
              from="200"
              to="100"
              dur="3.1s"
              begin="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.9"
              to="0"
              dur="3.1s"
              begin="0.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="380" cy="240" r="1.2">
            <animate
              attributeName="cy"
              from="240"
              to="140"
              dur="2.7s"
              begin="1.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.9"
              to="0"
              dur="2.7s"
              begin="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Caption stamps */}
        <g
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="rgba(20,36,51,0.65)"
          letterSpacing="0.18em"
          fontWeight="500"
        >
          <text x="80" y="500">REF · TRAPEZOID 13°</text>
          <text x="430" y="500">2000×2500 MM</text>
        </g>
      </motion.svg>
    </div>
  );
}
