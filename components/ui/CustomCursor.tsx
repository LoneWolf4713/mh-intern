"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Image from "next/image"

const SPRING_CONFIG = { damping: 25, stiffness: 250, restDelta: 0.001 }

export function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, SPRING_CONFIG)
  const springY = useSpring(mouseY, SPRING_CONFIG)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)")
    setIsFinePointer(mediaQuery.matches)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovered(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
    }
  }, [mouseX, mouseY])

  if (!isFinePointer) return null

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        pointerEvents: "none",
        zIndex: 9999,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovered ? 1.3 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative w-[60px] h-[40px]">
        <Image
          src="/assets/images/ease.png"
          alt="Ease Cursor"
          fill
          className="object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}
