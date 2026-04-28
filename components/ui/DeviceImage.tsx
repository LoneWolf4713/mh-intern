"use client"

import { useRef } from "react"
import Image from "next/image"
import useFloatAnimation from "@/hooks/useFloatAnimation"

export function DeviceImage() {
  const floatRef = useRef<HTMLDivElement>(null)
  useFloatAnimation(floatRef)

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-full flex flex-col justify-end items-center">
        <div data-hero="art-device" className="relative z-10 -mb-20">
          <div ref={floatRef}>
            <Image
              src="/assets/images/hero/ease.png"
              alt="EASE Device"
              width={600}
              height={600}
              className="w-auto h-auto max-w-[80%] md:max-w-full drop-shadow-[0_0_40px_rgba(14,165,233,0.4)]"
              priority
            />
          </div>
        </div>
        <div data-hero="art-hand" className="relative z-0 scale-[3] translate-y-[70%] origin-bottom">
          <Image
            src="/assets/images/hero/hand.png"
            alt="Hand"
            width={1200}
            height={1200}
            className="w-auto h-auto max-w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
