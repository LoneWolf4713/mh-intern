"use client"

import { useRef } from "react"
import Image from "next/image"
import useFloatAnimation from "@/hooks/useFloatAnimation"

export function SeekDevice() {
  const floatRef = useRef<HTMLDivElement>(null)
  useFloatAnimation(floatRef)

  return (
    <div className="relative flex w-full max-w-3xl items-center justify-center z-10">
      <div ref={floatRef}>
        <Image
          src="/assets/images/hero/ease.png"
          alt="EASE Device"
          width={800}
          height={800}
          className="object-contain drop-shadow-[0_0_40px_rgba(14,165,233,0.4)]"
          priority
        />
      </div>
    </div>
  )
}
