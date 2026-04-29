"use client"

import { Zap, Activity, Gamepad2 } from "lucide-react"

export function SeekBar() {
  return (
    <div className="w-full max-w-4xl p-8 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col">
      <div className="flex gap-3 mb-6">
        <button className="bg-[#024379] text-white rounded-full px-6 py-2 text-sm font-medium shadow-[inset_0_0_10px_rgba(14,165,233,0.3)]">
          tDCS
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white transition-colors rounded-full px-6 py-2 text-sm font-medium">
          EEG
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white transition-colors rounded-full px-6 py-2 text-sm font-medium">
          CET
        </button>
      </div>

      <h2 className="text-3xl font-semibold text-white mb-10">
        Gentle Brain Stimulation (tDCS)
      </h2>

      <div className="relative flex items-center justify-between w-full h-14">
        <div className="absolute left-0 right-0 h-2 bg-white/20 rounded-full z-0" />
        <div className="absolute left-0 w-1/2 h-2 bg-white/40 rounded-full z-0" />
        
        <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-white shadow-lg">
          <Zap className="w-6 h-6 text-[#024379]" />
        </div>

        <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10 shadow-lg">
          <Activity className="w-6 h-6 text-white/80" />
        </div>

        <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10 shadow-lg">
          <Gamepad2 className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </div>
  )
}
