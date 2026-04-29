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

  gsap.set(artHand, {
    y: "80vh",
    opacity: 0,
    rotation: 2,
  })

  gsap.set(artDevice, {
    scale: 0.95,
    opacity: 0,
    filter: "blur(60px)",
    y: 0,
  })

  tl.to(leftSideTargets, {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.4,
    ease: "power3.out",
    stagger: 0.2,
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
      0
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
      0.4
    )
    .to(
      artDevice,
      {
         y: "10vh",
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2.5,
        ease: "power3.out",
      },
      "-=0.4"
    )

  return tl
}
