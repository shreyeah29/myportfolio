"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CAPABILITIES } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/animations/variants";

export function Skills() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section
      id="skills"
      className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel num="02" title="Skills" subtitle="Capabilities & stack" />

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="outline-text mb-12 text-[clamp(2.5rem,10vw,7rem)] font-bold uppercase leading-[0.9] tracking-tighter md:mb-16"
          aria-hidden
        >
          Stack
        </motion.h2>

        <div className="mb-4 hidden grid-cols-[60px_1fr_1fr] gap-4 border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.25em] text-muted md:grid">
          <span />
          <span>Capabilities</span>
          <span>Stack</span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="border-t border-white/10"
        >
          {CAPABILITIES.map((cap, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={cap.num}
                variants={fadeUp}
                custom={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(isActive ? null : i)}
                data-cursor="pointer"
                className={`border-b transition-colors ${
                  isActive
                    ? "border-accent/60"
                    : "border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <div className="grid grid-cols-1 items-center gap-2 py-6 md:grid-cols-[60px_1fr_1fr] md:gap-4 md:py-7">
                  <span
                    className={`text-sm ${isActive ? "text-accent" : "text-accent/70"}`}
                  >
                    {cap.num}
                  </span>
                  <h3 className="text-lg font-bold uppercase text-white md:text-2xl">
                    {cap.name}
                  </h3>
                  <p className="text-sm text-white/45">{cap.summary}</p>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mb-6 rounded-lg border border-accent/40 bg-accent-soft p-5">
                        <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-muted">
                          Tooling / Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cap.tools.map((tool, ti) => (
                            <motion.span
                              key={tool}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: ti * 0.05 }}
                              className="rounded-md border border-white/15 bg-white/[0.03] px-4 py-2 text-xs text-white/80"
                            >
                              {tool}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
