"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const paragraph = root.querySelector("p");
    if (!paragraph) return;

    const split = SplitText.create(paragraph, {
      type: "words,chars",
      wordsClass: "scramble-word",
      charsClass: "char",
    });

    split.chars.forEach((char) => {
      const el = char as HTMLElement;
      gsap.set(el, {
        display: "inline-block",
        attr: { "data-content": el.innerHTML },
      });
    });

    const handleMove = (e: PointerEvent) => {
      split.chars.forEach((char) => {
        const el = char as HTMLElement;
        const { left, top, width, height } = el.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(el, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: el.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    root.addEventListener("pointermove", handleMove);

    return () => {
      root.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
}
