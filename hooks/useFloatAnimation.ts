import { useEffect } from "react"
import { animate } from "framer-motion"

export default function useFloatAnimation(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return

    const controls = animate(
      ref.current,
      { y: [-15, 0], x: [-12, 0] },
      { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
    )

    return () => {
      controls.stop()
    }
  }, [ref])
}
