"use client"

import { useEffect, useRef } from "react"
import { EaseLogo } from "@/components/ui/EaseLogo"
import { ConditionCard } from "@/components/ui/ConditionCard"
import { conditionsTimeline } from "@/motion/conditions"

const flipWords = ["Everyone", "Depression", "ADHD", "Chronic Pain", "Addiction", "Anxiety"]

const conditions = [
  { title: "DEPRESSION", metric: "63.8%", description: "reduction in symptoms of depression", imageSrc: "/assets/images/carousel/depression.png", rotate: "-rotate-6" },
  { title: "ADHD", metric: "34%", description: "boost in cognitive performance", imageSrc: "/assets/images/carousel/adhd.png", rotate: "rotate-3" },
  { title: "CHRONIC PAIN", metric: "62%", description: "reduction in pain intensity after 15-20 seconds", imageSrc: "/assets/images/carousel/chronic_pain.png", rotate: "-rotate-2" },
  { title: "ADDICTION", metric: "50%", description: "reduction in craving intensity in just 20 sessions", imageSrc: "/assets/images/carousel/addiction.png", rotate: "rotate-6" },
  { title: "ANXIETY", metric: "46% +", description: "Improvement in anxiety scores within 3 weeks", imageSrc: "/assets/images/carousel/anxiety.png", rotate: "-rotate-3" }
]

const infiniteConditions = [...conditions, ...conditions, ...conditions]

export function ConditionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = conditionsTimeline(sectionRef, trackRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col items-center pt-32 md:pt-48 overflow-hidden bg-gradient-to-b from-[#012f52] from-0% via-[#01365f] via-45% via-[#014070] via-75% to-[#024379] to-100%">
      <div className="flex flex-col items-center z-10 w-full px-6">
        <div className="overflow-hidden">
          <div data-conditions="heading-reveal" className="flex items-center justify-center gap-x-3 md:gap-x-5 text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white">
            <div className="flex items-center justify-center text-[0.75em]">
              <EaseLogo />
            </div>
            <span>is for</span>
            <div data-conditions="flip-wrapper" className="relative flex items-center h-[1.2em] ml-3 overflow-visible">
              {flipWords.map((word) => (
                <div key={word} data-conditions="flip-word" className="absolute left-0 whitespace-nowrap">
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-hidden mt-4">
          <p data-conditions="subheading-reveal" className="text-xl md:text-3xl text-white/80 font-light text-center">
            Works across multiple Neuro-Psychiatric conditions
          </p>
        </div>
      </div>

      <div className="relative w-full flex-1 mt-8 md:mt-12 flex items-center justify-center overflow-visible py-16 md:py-24">
        <div ref={trackRef} className="flex items-center justify-center gap-x-12 md:gap-x-24 cursor-grab active:cursor-grabbing w-max px-[10vw]">
          {infiniteConditions.map((condition, index) => (
            <div key={`${condition.title}-${index}`} data-conditions="card" className="condition-card-wrapper shrink-0">
              <div className={condition.rotate}>
                <ConditionCard
                  title={condition.title}
                  metric={condition.metric}
                  description={condition.description}
                  imageSrc={condition.imageSrc}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
