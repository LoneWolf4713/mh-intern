"use client"

import { useEffect } from "react"
import { useAnimate, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { EaseLogo } from "@/components/ui/EaseLogo"
import { DeviceImage } from "@/components/ui/DeviceImage"
import { heroSequence } from "@/motion/hero"

export function HeroSection() {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (isInView) {
      animate(heroSequence)
    }
  }, [isInView, animate])

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen w-[80%] flex-col justify-end mx-auto px-8 py-24 pb-36 md:px-12"
    >
      <DeviceImage />
      <div className="relative z-10 flex max-w-2xl flex-col items-start text-left">
        <div className="mb-6 flex flex-row items-start gap-2">
          <span className="hero-text text-lg md:text-xl font-medium tracking-wide text-white/80">
            • Introducing
          </span>
          <div className="hero-text">
            <EaseLogo />
          </div>
        </div>

        <h1 className="hero-text mb-6 text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[64px]">
          Breakthrough Neuro Psychiatry Care
        </h1>

        <p className="hero-text mb-10 text-lg text-white/60 md:text-xl">
          With or Without Medication
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-wrap items-center justify-between mt-8">
        <div className="hero-btn-group flex flex-wrap gap-4">
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
            variant="default"
            className="hero-btn-start h-12 rounded-full px-6 text-base font-semibold bg-white text-black shadow-2xl hover:bg-white/90"
          >
            Start experience
          </Button>
        </div>
      </div>
    </section>
  )
}
