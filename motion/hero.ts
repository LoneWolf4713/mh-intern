import { gsap } from "@/lib/gsap"

export const heroEntranceTimeline = (containerRef: React.RefObject<HTMLElement>) => {
  if (!containerRef.current) return null

  const container = containerRef.current
  const textElements = container.querySelectorAll('[data-hero="text"]')
  const btnGroup = container.querySelector('[data-hero="btn-group"]')
  const btnStart = container.querySelector('[data-hero="btn-start"]')

  const tl = gsap.timeline()

  const leftSideTargets = [...Array.from(textElements), btnGroup]

  gsap.set(leftSideTargets, {
    x: -50,
    opacity: 0,
    filter: "blur(16px)",
  })

  gsap.set(btnStart, {
    x: 50,
    opacity: 0,
    filter: "blur(16px)",
  })

  tl.to(leftSideTargets, {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1,
    ease: "power3.out",
    stagger: 0.25,
  }).to(
    btnStart,
    {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    },
    "-=0.8"
  )

  return tl
}
