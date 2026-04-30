"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { statementEntrance } from "@/motion/statement"

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1])
  const scale = useTransform(progress, range, [1, 1.05])
  
  return (
    <motion.span style={{ opacity, scale }} className="inline-block origin-center text-white">
      {children}
    </motion.span>
  )
}

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const lines = [
    "Ease is designed to improve brain health",
    "and deliver lasting results,",
    "all in a holistic, clinically proven way",
    "across the neuro-psychiatry space."
  ]

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end bottom"] })
  
  const wordsByLine = lines.map(line => line.split(" "))
  const totalWords = wordsByLine.flat().length
  
  let currentGlobalIndex = 0
  const processedLines = wordsByLine.map(words => 
    words.map(word => ({
      text: word,
      index: currentGlobalIndex++
    }))
  )

  return (
    <section ref={sectionRef} className="relative h-[500vh] w-full bg-gradient-to-b from-[#024379] from-0% via-[#024379] via-55% via-[#023f72] via-72% via-[#023a66] via-86% to-[#012f52] to-100%">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div 
          variants={statementEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-25%" }}
          className="flex flex-col items-center justify-center text-center text-3xl md:text-4xl max-w-5xl leading-[1.1] font-medium tracking-tight gap-y-3 px-6"
        >
          {processedLines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex flex-wrap justify-center gap-x-3 md:gap-x-4">
              {line.map((wordObj) => {
                const SCROLL_START = 0.15
                const SCROLL_END = 0.85
                const availableSpace = SCROLL_END - SCROLL_START
                const step = availableSpace / totalWords
                const start = SCROLL_START + (wordObj.index * step)
                const end = start + (step * 2.5)
                const range: [number, number] = [start, end]
                
                return (
                  <Word key={wordObj.index} progress={scrollYProgress} range={range}>
                    {wordObj.text}
                  </Word>
                )
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
