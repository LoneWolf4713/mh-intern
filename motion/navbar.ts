import { gsap } from "@/lib/gsap"

export function setupDropdownMotion(dropdownRef: React.RefObject<HTMLDivElement>) {
  return {
    init: () => {
      gsap.set(dropdownRef.current, {
        opacity: 0,
        y: 10,
        visibility: "hidden",
        pointerEvents: "none",
      })
    },
    enter: () => {
      if (!dropdownRef.current) return
      gsap.to(dropdownRef.current, {
        opacity: 1,
        y: 0,
        visibility: "visible",
        pointerEvents: "auto",
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      })

      const listItems = dropdownRef.current.querySelectorAll("li")
      if (listItems.length) {
        gsap.to(listItems, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.2,
          overwrite: true,
        })
      }
    },
    leave: () => {
      if (!dropdownRef.current) return
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: 5,
        duration: 0.15,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          gsap.set(dropdownRef.current, {
            visibility: "hidden",
            pointerEvents: "none",
          })
        },
      })

      const listItems = dropdownRef.current.querySelectorAll("li")
      if (listItems.length) {
        gsap.set(listItems, {
          opacity: 0,
          y: 2,
        })
      }
    },
  }
}
