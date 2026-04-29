"use client"

import { useEffect, useRef } from "react"
import { EaseLogo } from "@/components/ui/EaseLogo"
import { ConditionCard } from "@/components/ui/ConditionCard"
import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(ScrollTrigger, Draggable)

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
  const carouselWrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !carouselWrapperRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".condition-card-wrapper", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        },
        y: 50,
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "back.out(1.5)"
      })

      Draggable.create(trackRef.current, {
        type: "x",
        edgeResistance: 0.8,
        dragResistance: 0.1,
        onPress: function(e) {
          const target = (e.target as Element).closest('.condition-card-wrapper')
          if (target) gsap.to(target, { scale: 1.05, zIndex: 50, duration: 0.2, ease: "power2.out" })
        },
        onRelease: function(e) {
          const target = (e.target as Element).closest('.condition-card-wrapper')
          if (target) gsap.to(target, { scale: 1, zIndex: 1, duration: 0.4, ease: "back.out(1.5)" })
        },
        onDragStart: function() {
          gsap.to(".condition-card-wrapper", { rotation: () => gsap.utils.random(-3, 3), duration: 0.3, overwrite: "auto" })
        },
        onDragEnd: function() {
          gsap.to(".condition-card-wrapper", { rotation: 0, duration: 0.5, ease: "back.out(1.5)", overwrite: "auto" })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#024379] flex flex-col items-center pt-32 md:pt-48 overflow-hidden">
      <div className="flex flex-col items-center z-10 w-full px-6">
        <div className="flex items-center justify-center gap-x-3 md:gap-x-5">
          <div className="h-10 md:h-14 flex items-center justify-center">
            <EaseLogo />
          </div>
          <span className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white">
            is for Everyone
          </span>
        </div>
        <p className="text-xl md:text-3xl text-white/80 font-light text-center mt-4">
          Works across multiple Neuro-Psychiatric conditions
        </p>
      </div>

      <div ref={carouselWrapperRef} className="relative w-full flex-1 mt-8 md:mt-12 flex items-center justify-center overflow-visible py-16 md:py-24">
        <div ref={trackRef} className="flex items-center justify-center gap-x-12 md:gap-x-24 cursor-grab active:cursor-grabbing w-max px-[10vw]">
          {infiniteConditions.map((condition, index) => (
            <div key={`${condition.title}-${index}`} className="condition-card-wrapper shrink-0">
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
