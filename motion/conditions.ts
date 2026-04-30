import { stagger } from "framer-motion"

const POWER4_OUT = [0.16, 1, 0.3, 1]
const BACK_OUT = [0.34, 1.2, 0.64, 1]

export const conditionsSequence = [
  [".conditions-heading", { y: "100%" }, { duration: 0 }],
  [".conditions-subheading", { y: "100%" }, { duration: 0 }],
  [".conditions-card", { x: "100vw", rotate: 15, opacity: 0, filter: "blur(16px)" }, { duration: 0 }],
  [".conditions-heading", { y: "0%" }, { duration: 1.0, ease: POWER4_OUT, at: 0 }],
  [".conditions-subheading", { y: "0%" }, { duration: 1.0, ease: POWER4_OUT, at: 0.3 }],
  [
    ".conditions-card",
    { x: "0vw", rotate: 0, opacity: 1, filter: "blur(0px)" },
    { duration: 1.8, delay: stagger(0.15), ease: BACK_OUT, at: 0.8 },
  ],
]
