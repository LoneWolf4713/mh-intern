import { useEffect } from "react"
import { gsap } from "@/lib/gsap"

export default function useFloatAnimation(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return

    const tween = gsap.to(ref.current, {
      y: -15,
      x: -12,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [ref])
}
