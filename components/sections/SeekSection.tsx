"use client"

import { useEffect, useRef } from "react"
import { SeekDevice } from "@/components/ui/SeekDevice"
import { SeekBar } from "@/components/ui/SeekBar"
import useFloatAnimation from "@/hooks/useFloatAnimation"
import { seekTimeline } from "@/motion/seek"

export function SeekSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)

  useFloatAnimation(leftTextRef)
  useFloatAnimation(rightTextRef)

  useEffect(() => {
    const tl = seekTimeline(sectionRef)
    return () => {
      tl?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#000000] from-0% via-[#024379] via-20% to-[#024379] to-100%">
      <div className="absolute top-32 left-0 w-full text-center z-0 pointer-events-none select-none overflow-hidden">
        <h2 data-seek="bg-text" className="text-[11vw] font-black leading-none tracking-tighter text-white/5 uppercase whitespace-nowrap">
          Train Your Brain
        </h2>
      </div>

      <div ref={leftTextRef} className="absolute top-[40%] left-8 md:left-16 lg:left-24 z-10 w-full max-w-[280px]">
        <div className="relative w-full h-full">
          <div data-seek="text-l1" className="absolute inset-0 text-left text-lg md:text-xl text-white/90 font-medium">
            Unlock your brain's potential<br />with simple daily excercises.
          </div>
          <div data-seek="text-l2" className="absolute inset-0 opacity-0 text-left text-lg md:text-xl text-white/90 font-medium">
            Enhanced cognitive control<br />through neural refinement.
          </div>
        </div>
      </div>

      <div ref={rightTextRef} className="absolute top-[40%] right-8 md:right-16 lg:right-24 z-10 w-full max-w-[280px]">
        <div className="relative w-full h-full">
          <div data-seek="text-r1" className="absolute inset-0 text-right text-lg md:text-xl text-white/90 font-medium">
            Clinically proven technology<br />for safe and effective care.
          </div>
          <div data-seek="text-r2" className="absolute inset-0 opacity-0 text-right text-lg md:text-xl text-white/90 font-medium">
            Targeted neural pathways<br />optimized for performance.
          </div>
        </div>
      </div>

      <div data-seek="device" className="relative z-20 flex flex-1 w-full items-center justify-center mt-20">
        <SeekDevice />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
        <SeekBar />
      </div>
    </section>
  )
}
