"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Scene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero3D() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;
  return (
    <div className="pointer-events-none absolute inset-0 opacity-60">
      <Scene />
    </div>
  );
}
