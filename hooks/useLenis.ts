"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return lenisRef;
}
