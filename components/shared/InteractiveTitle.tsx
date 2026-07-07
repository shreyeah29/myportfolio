"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface InteractiveTitleProps {
  lines: { text: string; accent?: boolean }[];
}

export function InteractiveTitle({ lines }: InteractiveTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 18,
  });
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), {
    stiffness: 120,
    damping: 18,
  });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
      className="inline-block"
    >
      <motion.h1
        style={
          reducedMotion
            ? undefined
            : { rotateX: rx, rotateY: ry, x: tx, y: ty, transformStyle: "preserve-3d" }
        }
        className="select-none text-[clamp(3.5rem,14vw,11rem)] font-bold uppercase leading-[0.82] tracking-tighter"
      >
        {lines.map((line, i) => (
          <span key={line.text} className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 1,
                delay: 0.4 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`block ${line.accent ? "text-accent" : "text-white"}`}
            >
              {line.text}
            </motion.span>
          </span>
        ))}
      </motion.h1>
    </div>
  );
}
