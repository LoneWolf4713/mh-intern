import type { Variants } from "framer-motion"

export const statementEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(24px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}