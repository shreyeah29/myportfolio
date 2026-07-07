export const SITE = {
  name: "Shreya Reddy",
  lab: "SHRE LAB / ©26",
  tagline: "ENGINEER / DEVELOPER / UI",
  email: "shreyareddy.dev@gmail.com",
  github: "https://github.com/shreyeah29",
  linkedin: "https://linkedin.com/in/shreyareddy",
  location: "Hyderabad, India",
  coords: "N17.38° · HYDERABAD, IN",
  role: "FULL-STACK DEVELOPER",
  status: "AVAILABLE FOR FREELANCE WORK",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const ABOUT_BIO = {
  rotatingTexts: [
    "a part developer",
    "a part designer",
    "a full-time professional overexciter",
  ],
  scrambledParagraph:
    "I like making pretty things on the internet and getting unreasonably excited about new projects. I work fast, love impossible deadlines, and treat every project like it's my own little obsession. Give me a project today, and I'll probably send you an update before you finish your second cup of coffee.",
  closing:
    "If you've got an idea, I'm probably already opening my laptop.",
} as const;

export const CAPABILITIES = [
  {
    num: "01",
    name: "Web Design",
    summary: "Figma · brand systems · layout",
    tools: ["Figma", "Framer", "Design tokens", "Brand systems", "Wireframes"],
  },
  {
    num: "02",
    name: "Frontend Dev",
    summary: "React · Vite · Tailwind",
    tools: ["React", "Vite", "Tailwind", "TypeScript", "Next.js"],
  },
  {
    num: "03",
    name: "Motion / Interaction",
    summary: "GSAP · Framer Motion · Lenis",
    tools: ["GSAP", "ScrollTrigger", "Framer Motion", "Lenis"],
  },
  {
    num: "04",
    name: "Creative Dev",
    summary: "Three.js · Canvas · WebGL",
    tools: ["Three.js", "React Three Fiber", "Canvas", "WebGL", "Shaders"],
  },
] as const;
