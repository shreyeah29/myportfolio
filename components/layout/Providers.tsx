"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { GridBackground } from "@/components/shared/GridBackground";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Skills } from "@/sections/Skills";

export function Providers({ children }: { children?: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handleLoadComplete} />
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmoothScroll>
              <CustomCursor />
              <GridBackground />
              <NoiseOverlay />
              <Navbar />
              <main className="relative z-10">
                <About />
                <Skills />
                <Contact />
              </main>
              <Footer />
              {children}
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
