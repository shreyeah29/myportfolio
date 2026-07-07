"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { LoaderIcon } from "@/components/shared/LoaderIcon";
import { SITE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STATUS_LINES = [
  "POLISHING PIXELS..",
  "LOADING ASSETS..",
  "INITIALIZING SHRE LAB..",
  "CALIBRATING MOTION..",
] as const;

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  const finish = useCallback(() => {
    document.body.style.overflow = "";
    setDone(true);
    window.setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (reducedMotion) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const statusTimer = window.setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 900);

    const interval = window.setInterval(() => {
      setProgress((p) => {
        const step = p < 60 ? 4 : p < 85 ? 2.5 : 1.2;
        const next = Math.min(p + step, 100);
        if (next >= 100) {
          window.clearInterval(interval);
          window.setTimeout(finish, 400);
        }
        return next;
      });
    }, 80);

    return () => {
      document.body.style.overflow = "";
      window.clearInterval(interval);
      window.clearInterval(statusTimer);
    };
  }, [mounted, reducedMotion, onComplete, finish]);

  if (!mounted || reducedMotion) return null;

  const displayProgress = Math.round(progress);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col bg-black"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* top bar */}
          <div className="flex items-start justify-between px-6 pt-8 md:px-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/80">
              Portfolio{" "}
              <span className="text-accent">2026</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
              {SITE.lab}
            </p>
          </div>

          {/* center */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <LoaderIcon />

            <div className="mb-6 flex items-end justify-center gap-1">
              <span
                className="text-[clamp(3rem,16vw,9rem)] font-bold leading-none tracking-tighter text-white"
                suppressHydrationWarning
              >
                {displayProgress}
              </span>
              <span className="mb-2 text-2xl text-white/35 md:mb-5 md:text-5xl">
                %
              </span>
            </div>

            <h1 className="max-w-[16rem] text-xl font-bold uppercase leading-tight tracking-wide text-white sm:max-w-none sm:text-2xl md:text-4xl">
              Welcome to{" "}
              <span className="whitespace-nowrap text-accent">Shre Lab</span>
            </h1>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted">
              Where premium websites get built
            </p>
          </div>

          {/* bottom */}
          <div className="px-6 pb-8 md:px-10">
            <div className="mb-6 h-px w-full bg-white/15">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
              <span className="text-muted">{SITE.name}</span>
              <motion.span
                key={statusIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-accent"
              >
                {STATUS_LINES[statusIndex]}
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
