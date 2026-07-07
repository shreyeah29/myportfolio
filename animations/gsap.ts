import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function createParallax(
  element: HTMLElement,
  speed = 0.3,
  reducedMotion = false
) {
  if (reducedMotion) return () => {};

  registerGsap();
  const tween = gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  return () => tween.kill();
}

export function revealOnScroll(
  elements: HTMLElement | HTMLElement[],
  reducedMotion = false
) {
  if (reducedMotion) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return () => {};
  }

  registerGsap();
  const tween = gsap.from(elements, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elements,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });

  return () => tween.kill();
}

export { gsap, ScrollTrigger };
