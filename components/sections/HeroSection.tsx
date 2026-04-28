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
    <section
  ref={sectionRef}
  className="relative flex min-h-screen w-[80%] flex-col justify-end mx-auto px-8 py-24 pb-36 md:px-12"
>
  <div className="flex max-w-2xl flex-col items-start text-left">
    <div className="mb-6 flex flex-row items-start gap-2">
          <span data-hero="text" className="text-lg md:text-xl font-medium tracking-wide text-white/80">
            • Introducing
          </span>
          <div data-hero="text" >
            <EaseLogo />
          </div>
        </div>

        <h1 data-hero="text" className="mb-6 text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[64px]">
          Breakthrough Neuro Psychiatry Care
        </h1>

        <p data-hero="text" className="mb-10 text-lg text-white/60 md:text-xl">
          With or Without Medication
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between mt-8">
        <div data-hero="btn-group" className="flex flex-wrap gap-4">
          <div className="overflow-hidden pb-4 -mb-4">
            <Button variant="default" className="h-12 rounded-full px-6 text-base font-semibold bg-white text-black hover:bg-white/90">
              I'm a Patient
            </Button>
          </div>
          <div className="overflow-hidden pb-4 -mb-4">
            <Button className="h-12 rounded-full px-6 text-base font-semibold bg-[#2A2E33] text-white border border-white/10 hover:bg-[#383d44]">
              I'm a Doctor
            </Button>
          </div>
        </div>

        <div className="overflow-hidden pb-4 -mb-4">
          <Button
            data-hero="btn-start"
            variant="default"
            className="h-12 rounded-full px-6 text-base font-semibold bg-white text-black shadow-2xl hover:bg-white/90"
          >
            Start experience
          </Button>
        </div>
      </div>
    </section>
  )
}
