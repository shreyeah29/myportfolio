"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { InteractiveTitle } from "@/components/shared/InteractiveTitle";
import { SectionLabel } from "@/components/shared/SectionLabel";
import RotatingText from "@/components/rotating-text/RotatingText";
import ScrambledText from "@/components/scrambled-text/ScrambledText";
import TextPressure from "@/components/text-pressure/TextPressure";
import { ABOUT_BIO, SITE } from "@/lib/constants";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Lanyard = dynamic(() => import("@/components/lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full border border-white/20" />
    </div>
  ),
});

export function About() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [showLanyard, setShowLanyard] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setShowLanyard(true), 900);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <section id="about" className="relative">
      {/* Hero intro */}
      <div className="relative min-h-screen overflow-visible px-5 pb-10 pt-28 md:px-8 md:pt-32">
        {/* React Bits Lanyard — one WebGL canvas, desktop or mobile layout */}
        {!reducedMotion && showLanyard && isDesktop && (
          <div className="pointer-events-none absolute right-0 top-20 z-30 h-[min(82vh,780px)] w-[min(44vw,480px)]">
            <div className="pointer-events-auto h-full w-full">
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                fov={18}
                frontImage="/shreya.png"
                cardVariant="shrelab"
              />
            </div>
          </div>
        )}

        <div className="relative z-10 flex min-h-[calc(100vh-8rem)] flex-col justify-between">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8 text-[10px] uppercase tracking-[0.3em] text-accent"
            >
              [ Initializing — Portfolio_2026 // Shre Lab Online ]
            </motion.p>

            <InteractiveTitle
              lines={[
                { text: "Build" },
                { text: "Bold", accent: true },
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-8 text-[11px] uppercase tracking-[0.25em] text-white/60"
            >
              Developer / Designer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-6 max-w-md text-sm leading-relaxed text-white/50"
            >
              I&apos;m Shreya — part developer, part designer, full-time
              professional overexciter. Available for freelance work.
            </motion.p>
          </div>

          {!reducedMotion && showLanyard && !isDesktop && (
            <div className="pointer-events-auto mt-10 h-[min(520px,58vh)] w-full">
              <Lanyard
                position={[0, 0, 22]}
                gravity={[0, -40, 0]}
                fov={20}
                frontImage="/shreya.png"
                cardVariant="shrelab"
              />
            </div>
          )}

        <div className="flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="space-y-1 text-[10px] uppercase tracking-[0.2em] text-muted"
          >
            <p>{SITE.coords}</p>
            <p>{SITE.role}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted"
          >
            <span className="hidden md:block">Drag &amp; swing the badge</span>
            <span className="md:hidden">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <ArrowDown size={14} />
            </motion.span>
          </motion.div>
        </div>
        </div>
      </div>

      {/* About detail */}
      <div className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel
            num="01"
            title="About"
            subtitle="The person behind the code"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 h-[clamp(200px,32vw,380px)] min-h-[180px] md:mb-20"
          >
            {reducedMotion ? (
              <h2
                className="outline-text text-[clamp(3rem,12vw,9rem)] font-bold uppercase leading-[0.9] tracking-tighter"
                aria-label="Obsessive"
              >
                Obsessive
              </h2>
            ) : (
              <TextPressure
                text="Obsessive"
                flex
                stroke
                scale
                width
                weight
                italic
                textColor="transparent"
                strokeColor="rgba(255, 255, 255, 0.9)"
                minFontSize={56}
                className="h-full"
              />
            )}
          </motion.div>

          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
                I&apos;m Shreya —{" "}
                <RotatingText
                  texts={[...ABOUT_BIO.rotatingTexts]}
                  splitBy="words"
                  mainClassName="inline-flex min-h-[1.15em] align-baseline text-accent"
                  splitLevelClassName="overflow-hidden pb-1"
                  elementLevelClassName="font-sans font-bold inline-block"
                  staggerFrom="last"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  staggerDuration={0.025}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
                <span className="text-white">.</span>
              </p>
              <p className="mt-3 font-sans text-[clamp(1.05rem,2.6vw,1.6rem)] font-normal leading-[1.35] text-white/55">
                Based in{" "}
                <span className="font-bold text-accent underline decoration-accent decoration-2 underline-offset-4">
                  Hyderabad
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              <ScrambledText
                className="about-scrambled"
                radius={120}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                {ABOUT_BIO.scrambledParagraph}
              </ScrambledText>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.16 }}
              className="font-mono text-sm leading-relaxed text-white/45 md:text-base"
            >
              {ABOUT_BIO.closing}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
