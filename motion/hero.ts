import { gsap } from "@/lib/gsap"

export const heroEntranceTimeline = (containerRef: React.RefObject<HTMLElement>) => {
  if (!containerRef.current) return null

  const container = containerRef.current
  const textElements = container.querySelectorAll('[data-hero="text"]')
  const btnGroup = container.querySelector('[data-hero="btn-group"]')
  const btnStart = container.querySelector('[data-hero="btn-start"]')
  const artHand = container.querySelector('[data-hero="art-hand"]')
  const artDevice = container.querySelector('[data-hero="art-device"]')

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

  gsap.set([artHand, artDevice], {
    y: "80vh",
    opacity: 0,
    rotation: 2,
  })

  tl.to(leftSideTargets, {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.4,
    ease: "power3.out",
    stagger: 0.25,
  })
    .to(
      btnStart,
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
      },
      "-=0.8"
    )
    .to(
      artHand,
      {
        y: "50vh",
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      "<"
    )
    .to(
      artDevice,
      {
        y: "10vh",
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      "<0.25"
    )

  return tl
}
