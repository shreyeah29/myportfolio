"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  num: string;
  title: string;
  subtitle: string;
}

export function SectionLabel({ num, title, subtitle }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 flex items-center gap-4 md:mb-16"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-accent text-[10px] text-accent">
        {num}
      </span>
      <span className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-muted">
        {title} — {subtitle}
      </span>
      <div className="section-line hidden sm:block" />
    </motion.div>
  );
}
