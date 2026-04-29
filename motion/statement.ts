import { gsap } from "@/lib/gsap"

export const statementTimeline = (containerRef: React.RefObject<HTMLElement>) => {
  if (!containerRef.current) return null

  const container = containerRef.current
  const words = container.querySelectorAll('[data-statement="word"]')
  const glows = container.querySelectorAll('[data-statement="glow"]')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 75%",
      end: "bottom 75%",
      scrub: 1,
    },
  })

  tl.to(words, {
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: "none",
  }).to(
    glows,
    {
      backgroundColor: "rgba(34, 211, 238, 0.4)",
      scale: 1.2,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    },
    "<0.5"
  )

  return tl
}
