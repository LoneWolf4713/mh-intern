"use client"

import { Zap, Activity, Gamepad2 } from "lucide-react"

export function SeekBar() {
  return (
    <div data-seek="seekbar" className="w-[95%] max-w-5xl p-8 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col">
      <div className="flex gap-3 mb-6">
        <button className="bg-[#024379] text-white rounded-full px-6 py-2 text-sm font-medium shadow-[inset_0_0_10px_rgba(14,165,233,0.3)]">
          tDCS
        </button>
        <button data-seek="pill-eeg" className="bg-white/20 hover:bg-white/30 text-white transition-colors rounded-full px-6 py-2 text-sm font-medium">
          EEG
        </button>
        <button data-seek="pill-cet" className="bg-white/20 hover:bg-white/30 text-white transition-colors rounded-full px-6 py-2 text-sm font-medium">
          CET
        </button>
      </div>

      <h2 className="text-3xl font-semibold text-white mb-10">
        Gentle Brain Stimulation (tDCS)
      </h2>

      <div className="relative flex items-center w-full h-14">
        <div className="relative z-10 w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white shadow-lg">
          <Zap className="w-6 h-6 text-[#024379]" />
        </div>

        <div className="flex-1 h-1.5 bg-white/10 mx-2 rounded-full overflow-hidden relative">
          <div data-seek="progress-1" className="absolute left-0 top-0 bottom-0 w-full bg-white/60 origin-left scale-x-0" />
        </div>

        <div className="relative z-10 w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10 shadow-lg">
          <Activity className="w-6 h-6 text-white/80" />
        </div>

        <div className="flex-1 h-1.5 bg-white/10 mx-2 rounded-full overflow-hidden relative">
          <div data-seek="progress-2" className="absolute left-0 top-0 bottom-0 w-full bg-white/60 origin-left scale-x-0" />
        </div>

        <div className="relative z-10 w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10 shadow-lg">
          <Gamepad2 className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </div>
  )
}
