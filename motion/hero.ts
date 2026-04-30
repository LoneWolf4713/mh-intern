import { stagger } from "framer-motion"

const EASE_OUT = [0.16, 1, 0.3, 1]

export const heroSequence = [
  [".hero-text, .hero-btn-group", { x: -50, opacity: 0, filter: "blur(16px)" }, { duration: 0 }],
  [".hero-btn-start", { x: 50, opacity: 0, filter: "blur(16px)" }, { duration: 0 }],
  [".hero-art-hand", { y: "80vh", opacity: 0, rotate: 2 }, { duration: 0 }],
  [".hero-art-device", { scale: 0.95, opacity: 0, filter: "blur(60px)", y: 0 }, { duration: 0 }],
  [
    ".hero-text, .hero-btn-group",
    { x: 0, opacity: 1, filter: "blur(0px)" },
    { duration: 1.4, ease: EASE_OUT, delay: stagger(0.2), at: 0 },
  ],
  [".hero-btn-start", { x: 0, opacity: 1, filter: "blur(0px)" }, { duration: 1.4, ease: EASE_OUT, at: 0 }],
  [".hero-art-hand", { y: "50vh", opacity: 1, rotate: 0 }, { duration: 1.5, ease: EASE_OUT, at: 0.4 }],
  [
    ".hero-art-device",
    { y: "10vh", scale: 1, opacity: 1, filter: "blur(0px)" },
    { duration: 2.5, ease: EASE_OUT, at: 1.5 },
  ],
]
