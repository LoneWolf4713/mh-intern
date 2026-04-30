"use client"

import { useRef, useMemo } from "react"
import { motion, useScroll, useTransform, MotionValue, useInView } from "framer-motion"
import { statementEntrance } from "@/motion/statement"

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1])
  const scale = useTransform(progress, range, [0.95, 1])

  return (
    <motion.span
      style={{ opacity, scale }}
      className="inline-block origin-center text-white"
    >
      {children}
    </motion.span>
  )
}

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const entranceRef = useRef<HTMLDivElement>(null)
 const isEntranceInView = useInView(entranceRef, { once: true, margin: "0px 0px -5% 0px" })

  const lines = useMemo(() => [
    "Ease is designed to improve brain health",
    "and deliver lasting results,",
    "all in a holistic, clinically proven way",
    "across the neuro-psychiatry space."
  ], [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const processedLines = useMemo(() => {
    const wordsByLine = lines.map(line => line.split(" "))
    const totalWords = wordsByLine.flat().length

    const rangeStart = 0.1
    const rangeEnd = 0.6
    const usableRange = rangeEnd - rangeStart

    let globalIndex = 0
    return wordsByLine.map(words =>
      words.map(word => {
        const mappedStart = rangeStart + (globalIndex / totalWords) * usableRange
        const mappedEnd = rangeStart + ((globalIndex + 2) / totalWords) * usableRange
        const range: [number, number] = [mappedStart, Math.min(rangeEnd, mappedEnd)]
        globalIndex++
        return { text: word, index: globalIndex - 1, range }
      })
    )
  }, [lines])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#024379] from-0% via-[#024379] via-55% via-[#023f72] via-72% via-[#023a66] via-86% to-[#012f52] to-100%"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          ref={entranceRef}
          variants={statementEntrance}
          initial="hidden"
          animate={isEntranceInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-center text-center text-3xl md:text-4xl max-w-5xl leading-[1.1] font-medium tracking-tight gap-y-3 px-6"
        >
          <div className="flex flex-col items-center justify-center gap-y-3">
            {processedLines.map((line, lineIndex) => (
              <div key={lineIndex} className="flex flex-wrap justify-center gap-x-3 md:gap-x-4">
                {line.map((wordObj) => (
                  <Word
                    key={wordObj.index}
                    progress={scrollYProgress}
                    range={wordObj.range}
                  >
                    {wordObj.text}
                  </Word>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}