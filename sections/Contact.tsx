"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import FallingText from "@/components/falling-text/FallingText";
import { SITE } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel
          num="03"
          title="Contact"
          subtitle="Let's make something"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Status: {SITE.status}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <FallingText
            text={"Let’s build something beautiful."}
            highlightWords={["beautiful"]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="clamp(2.5rem,8vw,6rem)"
            mouseConstraintStiffness={0.9}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12"
        >
          <a
            href={`mailto:${SITE.email}`}
            className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-[1.02]"
            data-cursor="pointer"
          >
            Email Me
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
            <a
              href={`mailto:${SITE.email}`}
              className="break-all border-b border-white/30 pb-0.5 text-sm text-white/50 transition-colors hover:text-white sm:break-normal"
              data-cursor="pointer"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/30 pb-0.5 text-sm text-white/50 transition-colors hover:text-white"
              data-cursor="pointer"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/30 pb-0.5 text-sm text-white/50 transition-colors hover:text-white"
              data-cursor="pointer"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
