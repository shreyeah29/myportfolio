"use client";

import { motion } from "framer-motion";

export function LoaderIcon() {
  return (
    <div className="relative mb-6 h-20 w-20">
      <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden>
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <line
          x1="14"
          y1="66"
          x2="66"
          y2="14"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <g>
          <motion.g
            animate={{ x: [0, 14, 0, -14, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ellipse cx="40" cy="44" rx="7" ry="9" fill="white" />
            <circle cx="44" cy="36" r="5" fill="white" />
            <motion.ellipse
              cx="36"
              cy="54"
              rx="3"
              ry="5"
              fill="white"
              animate={{ rotate: [20, -20, 20] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              style={{ transformOrigin: "36px 50px" }}
            />
            <motion.ellipse
              cx="44"
              cy="54"
              rx="3"
              ry="5"
              fill="white"
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              style={{ transformOrigin: "44px 50px" }}
            />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
