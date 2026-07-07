"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import TrueFocus from "@/components/true-focus/TrueFocus";
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
      <div className="relative min-h-[100dvh] overflow-x-clip px-5 pb-10 pt-24 md:px-8 md:pt-32">
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

        <div className="relative z-10 flex min-h-[calc(100dvh-7rem)] flex-col gap-8 md:min-h-[calc(100vh-8rem)] md:justify-between md:gap-0">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6 max-w-xs text-[9px] uppercase leading-relaxed tracking-[0.22em] text-accent sm:mb-8 sm:max-w-none sm:text-[10px] sm:tracking-[0.3em]"
            >
              [ Initializing — Portfolio_2026 // Shre Lab Online ]
            </motion.p>

            {reducedMotion ? (
              <h1 className="font-sans text-[clamp(2.1rem,9.5vw,8rem)] font-bold uppercase leading-[0.88] tracking-tighter text-white">
                <span className="block">Design.</span>
                <span className="block">Develop.</span>
                <span className="block text-accent">Deliver.</span>
              </h1>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <TrueFocus
                  sentence="Design. Develop. Deliver."
                  accentWords={["Deliver"]}
                  blurAmount={5}
                  borderColor="#c3f53c"
                  glowColor="rgba(195, 245, 60, 0.55)"
                  animationDuration={0.6}
                  pauseBetweenAnimations={1.2}
                  className="focus-container--hero"
                />
              </motion.div>
            )}

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
            <div className="pointer-events-auto -mx-2 h-[min(440px,52dvh)] w-[calc(100%+1rem)] sm:mx-0 sm:h-[min(480px,55dvh)] sm:w-full">
              <Lanyard
                position={[0, 0, 13]}
                gravity={[0, -40, 0]}
                fov={28}
                frontImage="/shreya.png"
                cardVariant="shrelab"
              />
            </div>
          )}

        <div className="mt-auto flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
      <div
        id="about-details"
        className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32"
      >
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
            className="mb-10 h-[clamp(120px,24vw,380px)] min-h-[100px] md:mb-20 md:min-h-[180px]"
          >
            {reducedMotion || !isDesktop ? (
              <h2
                className="outline-text text-[clamp(2.75rem,14vw,9rem)] font-bold uppercase leading-[0.9] tracking-tighter"
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
              <p className="font-sans text-[clamp(1.35rem,5.5vw,3rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
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
