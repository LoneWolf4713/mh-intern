"use client"

import { Zap, Activity, Gamepad2 } from "lucide-react"

export function SeekBar() {
  return (
    <div className="seek-seekbar w-[95%] max-w-8xl p-8 rounded-[2rem] bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col">
      <div className="flex gap-3 mb-6">
        <button className="bg-gradient-to-r from-[#010F18] from-30% to-[#3187BF] to-70% text-white rounded-full px-6 py-2 text-sm font-medium shadow-[inset_0_0_10px_rgba(14,165,233,0.3)]">
          tDCS
        </button>
        <button className="seek-pill-eeg bg-white/20 text-white/50 rounded-full px-6 py-2 text-sm font-medium">
          EEG
        </button>
        <button className="seek-pill-cet bg-white/20 text-white/50 rounded-full px-6 py-2 text-sm font-medium">
          CET
        </button>
      </div>

      <h2 className="text-3xl font-semibold text-white mb-10">
        Gentle Brain Stimulation (tDCS)
      </h2>

      <div className="relative flex items-center w-full h-14">
        <div className="seek-icon-wrap-zap relative z-10 w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-[#E3F5FF] shadow-lg">
          <Zap className="seek-icon-zap w-6 h-6 text-[#4CA2D1]" />
        </div>

        <div className="flex-1 h-1.5 bg-white/10 mx-2 rounded-full overflow-hidden relative">
          <div className="seek-progress-1 absolute left-0 top-0 bottom-0 w-full bg-white/60 origin-left" />
        </div>

        <div className="seek-icon-wrap-activity relative z-10 w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10 shadow-lg">
          <Activity className="seek-icon-activity w-6 h-6 text-white/60" />
        </div>

        <div className="flex-1 h-1.5 bg-white/10 mx-2 rounded-full overflow-hidden relative">
          <div className="seek-progress-2 absolute left-0 top-0 bottom-0 w-full bg-white/60 origin-left" />
        </div>

        <div className="seek-icon-wrap-gamepad relative z-10 w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-md border border-white/10 shadow-lg">
          <Gamepad2 className="seek-icon-gamepad w-6 h-6 text-white/60" />
        </div>
      </div>
    </div>
  )
}
