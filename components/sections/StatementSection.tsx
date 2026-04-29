"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const textWrapperRef = useRef<HTMLDivElement>(null)

  const lines = [
    "Ease is designed to improve brain health",
    "and deliver lasting results,",
    "all in a holistic, clinically proven way",
    "across the neuro-psychiatry space."
  ]

  useEffect(() => {
    if (!sectionRef.current || !stickyContainerRef.current || !textWrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textWrapperRef.current,
        { opacity: 0, scale: 0.85, filter: "blur(24px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stickyContainerRef.current,
        },
      })

      tl.to({}, { duration: 0.5 })

      tl.to(".statement-word", {
        keyframes: [
          { opacity: 1, scale: 1, color: "#ffffff", duration: 0.2, ease: "power2.out" },
          { scale: 1.05, duration: 0.3, ease: "power2.out" }
        ],
        stagger: 0.3
      })

      tl.to({}, { duration: 0.5 })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[500vh] w-full bg-[#024379]">
      <div ref={stickyContainerRef} className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div ref={textWrapperRef} className="flex flex-col items-center justify-center text-center text-3xl md:text-4xl max-w-5xl leading-[1.1] font-medium tracking-tight gap-y-3 px-6">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex flex-wrap justify-center gap-x-3 md:gap-x-4">
              {line.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="statement-word inline-block text-white/15 origin-center">
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
