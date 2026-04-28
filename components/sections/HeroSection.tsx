"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { EaseLogo } from "@/components/ui/EaseLogo"
import { heroEntranceTimeline } from "@/motion/hero"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const tl = heroEntranceTimeline(sectionRef)
    return () => {
      tl?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen  flex-col justify-end mx-10 px-8 py-24 pb-36 md:px-12">
      <div className="flex max-w-2xl flex-col items-start text-left">
        <div data-animate="fadeUp" className="mb-6 flex items-center gap-2 text-base md:text-lg font-medium tracking-wide text-white/80">
          <span>• Introducing</span>
          <EaseLogo />
        </div>

        <h1 data-animate="fadeUp" className="mb-6 text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[64px]">
          Breakthrough Neuro Psychiatry Care
        </h1>

        <p data-animate="fadeUp" className="mb-10 text-lg text-white/60 md:text-xl">
          With or Without Medication
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between mt-8">
        <div className="flex flex-wrap gap-4">
          <Button data-animate="fadeUp" variant="default" className="h-12 rounded-full px-6 text-base font-semibold bg-white text-black hover:bg-white/90">
            I'm a Patient
          </Button>
          <Button data-animate="fadeUp"  className="h-12 rounded-full px-6 text-base font-semibold bg-[#2A2E33] text-white border border-white/10 hover:bg-[#383d44]">
            I'm a Doctor
          </Button>
        </div>

        <Button data-animate="fadeUp"
          variant="default"
          className="h-12 rounded-full px-6 text-base font-semibold bg-white text-black shadow-2xl hover:bg-white/90"
        >
          Start experience
        </Button>
      </div>
    </section>
  )
}
