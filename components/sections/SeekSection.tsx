import { SeekDevice } from "@/components/ui/SeekDevice"
import { SeekBar } from "@/components/ui/SeekBar"

export function SeekSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-gradient-to-b from-[#000000] to-[#024379]">
      <div className="absolute top-32 left-0 w-full text-center z-0 pointer-events-none select-none">
        <h2 className="text-[12vw] font-black leading-none tracking-tighter text-white/5 uppercase">
          Train Your Brain
        </h2>
      </div>
      <div className="flex flex-1 w-full items-center justify-center mt-20">
        <SeekDevice />
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
        <SeekBar />
      </div>
    </section>
  )
}
