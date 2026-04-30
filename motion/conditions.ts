import { gsap, ScrollTrigger, Draggable } from "@/lib/gsap"

gsap.registerPlugin(ScrollTrigger, Draggable)

export function conditionsTimeline(
  sectionRef: React.RefObject<HTMLElement>,
  trackRef: React.RefObject<HTMLDivElement>
) {
  const ctx = gsap.context(() => {
    if (!sectionRef.current || !trackRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    })

    tl.from('[data-conditions="heading-reveal"]', {
      yPercent: 100,
      duration: 1,
      ease: "power4.out",
    })
      .from(
        '[data-conditions="subheading-reveal"]',
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.7"
      )
      .fromTo(
        '[data-conditions="card"]',
        {
          x: "80vw",
          rotation: () => gsap.utils.random(10, 20),
          opacity: 0,
          filter: "blur(16px)",
        },
        {
          x: "0",
          opacity: 1,
          filter: "blur(0px)",
          rotation: 0,
          duration: 2,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "-=1"
      )

    Draggable.create(trackRef.current, {
      type: "x",
      edgeResistance: 0.8,
      dragResistance: 0.1,
      onPress: function (e) {
        const target = (e.target as Element).closest(".condition-card-wrapper")
        if (target) {
          gsap.to(target, {
            scale: 1.05,
            zIndex: 50,
            duration: 0.2,
            ease: "power2.out",
          })
        }
      },
      onRelease: function (e) {
        const target = (e.target as Element).closest(".condition-card-wrapper")
        if (target) {
          gsap.to(target, {
            scale: 1,
            zIndex: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
          })
        }
      },
      onDragStart: function () {
        gsap.to(".condition-card-wrapper", {
          rotation: () => gsap.utils.random(-3, 3),
          duration: 0.3,
          overwrite: "auto",
        })
      },
      onDragEnd: function () {
        gsap.to(".condition-card-wrapper", {
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.5)",
          overwrite: "auto",
        })
      },
    })
  }, sectionRef)

  return ctx
}
