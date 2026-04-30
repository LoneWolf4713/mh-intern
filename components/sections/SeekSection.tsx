"use client"

import { useEffect, useRef } from "react"
import { useAnimate, useInView } from "framer-motion"
import { SeekDevice } from "@/components/ui/SeekDevice"
import { SeekBar } from "@/components/ui/SeekBar"
import useFloatAnimation from "@/hooks/useFloatAnimation"
import { TextRoll } from "@/components/motion-primitives/text-roll"
import { seekSequence } from "@/motion/seek"

export function SeekSection() {

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { margin: "-100px", once: true })
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)

  useFloatAnimation(leftTextRef as any)
  useFloatAnimation(rightTextRef as any)

  useEffect(() => {
    if (isInView) {
      animate(seekSequence as any)
    }
  }, [isInView, animate])

  return (
    <section 
      id="seek-section"
      ref={scope} 
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-gradient-to-b from-black from-0% via-[#001a2e] via-18% via-[#01365f] via-45% to-[#024379] to-100%"
    >
      <div ref={leftTextRef} className="absolute top-[40%] left-8 md:left-16 lg:left-24 z-10 w-full max-w-[280px]">
        <div className="relative w-full h-full">
          <div className="seek-text-l1 absolute inset-0 text-left text-lg md:text-xl text-white/90 font-medium">
            Unlock your brain's potential<br />with simple daily excercises.
          </div>
          <div className="seek-text-l2 absolute inset-0 opacity-0 text-left text-lg md:text-xl text-white/90 font-medium">
            Enhanced cognitive control<br />through neural refinement.
          </div>
        </div>
      </div>

      <div ref={rightTextRef} className="absolute top-[40%] right-8 md:right-16 lg:right-24 z-10 w-full max-w-[280px]">
        <div className="relative w-full h-full">
          <div className="seek-text-r1 absolute inset-0 text-right text-lg md:text-xl text-white/90 font-medium">
            Clinically proven technology<br />for safe and effective care.
          </div>
          <div className="seek-text-r2 absolute inset-0 opacity-0 text-right text-lg md:text-xl text-white/90 font-medium">
            Targeted neural pathways<br />optimized for performance.
          </div>
        </div>
      </div>

      <div className="relative w-[80%] mx-auto min-h-screen flex flex-col items-center">
        <div className="absolute top-18 left-0 w-full text-center z-0 pointer-events-none select-none overflow-hidden">
          <h2 className="seek-bg-text text-white/10 uppercase whitespace-nowrap font-oswald font-semibold  text-[9vw]">
            <TextRoll>Train Your Brain</TextRoll>
          </h2>
        </div>

        <div className="seek-device relative z-20 flex flex-1 w-full items-center justify-center mt-20">
          <SeekDevice />
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[90%] max-w-8xl z-50">
          <SeekBar />
        </div>
      </div>
    </section>
  )
}
