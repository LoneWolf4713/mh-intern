"use client"

import { Button } from "@/components/ui/button"
import { EaseLogo } from "@/components/ui/EaseLogo"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-end mx-10 px-8 py-24 pb-36 md:px-12 ">
      <div className="flex max-w-2xl flex-col items-start text-left">
        <div data-animate="fadeUp" className="mb-6 flex items-center gap-2 text-2xl font-medium tracking-wide text-white/80">
          <span>• Introducing</span>
          <EaseLogo />
        </div>

        <h1 data-animate="fadeUp" className="mb-6 text-4xl font-bold leading-[1.1] text-white md:text-3xl lg:text-5xl">
          Breakthrough Neuro Psychiatry Care
        </h1>

        <p data-animate="fadeUp" className="mb-10 text-xl text-white/60 md:text-2xl">
          With or Without Medication
        </p>

        <div data-animate="fadeUp" className="flex flex-wrap gap-4">
          <Button variant="default" className="h-14 rounded-full px-8 text-lg font-semibold bg-white text-black hover:bg-white/90">
            I'm a Patient
          </Button>
          <Button variant="outline" className="h-14 rounded-full px-8 text-lg font-semibold border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10">
            I'm a Doctor
          </Button>
        </div>
      </div>

      <Button
        variant="default"
        className="fixed bottom-10 right-10 h-14 rounded-full px-8 text-lg font-semibold bg-white text-black shadow-2xl hover:bg-white/90"
      >
        Start experience
      </Button>
    </section>
  )
}
