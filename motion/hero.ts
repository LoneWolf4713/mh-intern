import { gsap } from "@/lib/gsap"

export const heroEntranceTimeline = (containerRef: React.RefObject<HTMLElement>) => {
  if (!containerRef.current) return null

  const targets = containerRef.current.querySelectorAll('[data-animate="fadeUp"]')
  
  const tl = gsap.timeline()

  tl.fromTo(
    targets,
    {
      y: 40,
      opacity: 0,
      filter: "blur(12px)",
      scale: 0.98,
    },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 1.4,
      ease: "power4.out",
      stagger: 0.15,
    }
  )

  return tl
}
