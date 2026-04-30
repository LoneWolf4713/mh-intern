const EXPO_OUT = [0.16, 1, 0.3, 1]
const BACK_OUT = [0.34, 1.56, 0.64, 1]
const POWER3_OUT = [0.19, 1, 0.22, 1]

export const seekSequence = [
  [".seek-bg-text", { y: "100%" }, { duration: 0 }],
  [".seek-device", { scale: 0.8, opacity: 0, filter: "blur(20px)" }, { duration: 0 }],
  [".seek-seekbar", { y: 100, opacity: 0 }, { duration: 0 }],
  [".seek-text-l1, .seek-text-r1", { y: 20, opacity: 0, filter: "blur(10px)" }, { duration: 0 }],
  [".seek-text-l2, .seek-text-r2", { y: 20, opacity: 0 }, { duration: 0 }],
  [".seek-progress-1, .seek-progress-2", { scaleX: 0, transformOrigin: "left" }, { duration: 0 }],
  [".seek-bg-text", { y: "0%" }, { duration: 1.2, ease: EXPO_OUT, at: 0 }],
  [".seek-device", { scale: 0.9, opacity: 1, filter: "blur(0px)" }, { duration: 1.5, ease: BACK_OUT, at: 0.4 }],
  [".seek-seekbar", { y: 0, opacity: 1 }, { duration: 1.0, ease: POWER3_OUT, at: 0.9 }],
  [".seek-progress-1", { scaleX: 1 }, { duration: 3.0, ease: "linear", at: 1.9 }],
  [".seek-text-l1", { y: 0, opacity: 1, filter: "blur(0px)" }, { duration: 0.8, at: 2.1 }],
  [".seek-text-r1", { y: 0, opacity: 1, filter: "blur(0px)" }, { duration: 0.8, at: 3.4 }],
  [".seek-icon-wrap-activity", { backgroundColor: "#FCE5FF" }, { duration: 0.4, at: 4.9 }],
  [".seek-icon-activity", { color: "#B434C4" }, { duration: 0.4, at: 4.9 }],
  [
    ".seek-pill-eeg",
    { backgroundImage: "linear-gradient(to right, #180110 30%, #B72E87 70%)", color: "#fff" },
    { duration: 0.4, at: 4.9 },
  ],
  [".seek-text-l1, .seek-text-r1", { y: -20, opacity: 0 }, { duration: 0.5, at: 4.9 }],
  [".seek-text-l2", { y: 0, opacity: 1 }, { duration: 0.8, at: 5.2 }],
  [".seek-progress-2", { scaleX: 1 }, { duration: 3.0, ease: "linear", at: 6.0 }],
  [".seek-text-r2", { y: 0, opacity: 1 }, { duration: 0.8, at: 7.5 }],
  [".seek-icon-wrap-gamepad", { backgroundColor: "#DBFFD2" }, { duration: 0.4, at: 9.0 }],
  [".seek-icon-gamepad", { color: "#67CF4D" }, { duration: 0.4, at: 9.0 }],
  [
    ".seek-pill-cet",
    { backgroundImage: "linear-gradient(to right, #01180A 30%, #21A454 70%)", color: "#fff" },
    { duration: 0.4, at: 9.0 },
  ],
]
