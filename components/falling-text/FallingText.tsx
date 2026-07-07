"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Matter from "matter-js";
import "./FallingText.css";

export type FallingTextTrigger = "click" | "hover" | "auto" | "scroll";

export interface FallingTextProps {
  className?: string;
  text: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: FallingTextTrigger;
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  wordSpacing?: string;
}

export default function FallingText({
  className = "",
  text,
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "click",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 0.9,
  mouseConstraintStiffness = 0.2,
  fontSize = "clamp(2.5rem, 8vw, 6rem)",
  wordSpacing = "0.12em",
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [effectStarted, setEffectStarted] = useState(trigger === "auto");

  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean), [text]);

  useEffect(() => {
    if (!textRef.current) return;
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().startsWith(hw.toLowerCase())
        );
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
    textRef.current.innerHTML = newHTML;
  }, [words, highlightWords, highlightClass]);

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;
    if (!containerRef.current || !textRef.current || !canvasContainerRef.current) return;

    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
      Body,
    } = Matter;

    const container = containerRef.current;
    const canvasHost = canvasContainerRef.current;
    const target = textRef.current;

    const containerRect = container.getBoundingClientRect();
    const width = Math.max(1, Math.floor(containerRect.width));
    const height = Math.max(1, Math.floor(containerRect.height));

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasHost,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
        pixelRatio: Math.min(2, window.devicePixelRatio || 1),
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    } as const;

    const floor = Bodies.rectangle(width / 2, height + 25, width + 200, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height + 200, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height + 200, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width + 200, 50, boundaryOptions);

    // Measure word spans *before* changing their position.
    const wordSpans = Array.from(target.querySelectorAll<HTMLSpanElement>(".word"));
    const measured = wordSpans
      .map((elem) => {
        const rect = elem.getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        if (!Number.isFinite(x) || !Number.isFinite(y) || rect.width <= 0 || rect.height <= 0) {
          return null;
        }
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          render: { fillStyle: "transparent" },
          restitution: 0.8,
          frictionAir: 0.02,
          friction: 0.2,
        });
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 0 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        return { elem, body };
      })
      .filter(Boolean) as Array<{ elem: HTMLSpanElement; body: Matter.Body }>;

    // Absolutely position words so we can animate them.
    target.style.position = "relative";
    wordSpans.forEach((elem) => {
      elem.style.position = "absolute";
      elem.style.left = "0px";
      elem.style.top = "0px";
      elem.style.transform = "translate(-50%, -50%)";
    });

    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...measured.map((m) => m.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      measured.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      rafRef.current = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;

      Render.stop(render);
      Runner.stop(runner);

      World.clear(engine.world, false);
      Engine.clear(engine);

      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (effectStarted) return;
    if (trigger === "click" || trigger === "hover") setEffectStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`.trim()}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      style={{
        minHeight: "clamp(220px, 26vw, 360px)",
      }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={
          {
            fontSize,
            lineHeight: 1.02,
            ["--word-spacing" as string]: wordSpacing,
          } as React.CSSProperties
        }
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  );
}

