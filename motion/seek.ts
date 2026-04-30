import { gsap } from "@/lib/gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const seekTimeline = (containerRef: React.RefObject<HTMLElement>) => {
  if (!containerRef.current) return null

  const container = containerRef.current
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 60%",
    }
  })

  gsap.set(container.querySelector('[data-seek="bg-text"]'), { y: "100%" })
  gsap.set(container.querySelector('[data-seek="device"]'), { scale: 0.8, opacity: 0, filter: "blur(20px)" })
  gsap.set(container.querySelector('[data-seek="seekbar"]'), { y: 100, opacity: 0 })
  gsap.set([container.querySelector('[data-seek="text-l1"]'), container.querySelector('[data-seek="text-r1"]')], { 
    y: 20, 
    opacity: 0, 
    filter: "blur(10px)" 
  })
  gsap.set([container.querySelector('[data-seek="progress-1"]'), container.querySelector('[data-seek="progress-2"]')], { 
    scaleX: 0 
  })

  tl.to(container.querySelector('[data-seek="bg-text"]'), { 
    y: "0%", 
    duration: 1.2, 
    ease: "expo.out" 
  })
  .to(container.querySelector('[data-seek="device"]'), {
      
    scale: 0.9, 
    opacity: 1, 
    filter: "blur(0px)", 
    duration: 1.5, 
    ease: "back.out(1.5)" 
  }, "-=0.8")
  .to(container.querySelector('[data-seek="seekbar"]'), { 
    y: 0, 
    opacity: 1, 
    duration: 1, 
    ease: "power3.out" 
  }, "-=1")
  .add("startSeek")
  .to(container.querySelector('[data-seek="progress-1"]'), { 
    scaleX: 1, 
    duration: 3, 
    ease: "none" 
  }, "startSeek")
  .to(container.querySelector('[data-seek="text-l1"]'), { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    duration: 0.8 
  }, "startSeek+=0.2")
  .to(container.querySelector('[data-seek="text-r1"]'), { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    duration: 0.8 
  }, "startSeek+=1.5")
  .add("midpoint")
  .to(container.querySelector('[data-seek="icon-wrap-activity"]'), { 
    backgroundColor: "#FCE5FF", 
    duration: 0.4 
  }, "midpoint")
  .to(container.querySelector('[data-seek="icon-activity"]'), { 
    color: "#B434C4", 
    duration: 0.4 
  }, "midpoint")
  .to(container.querySelector('[data-seek="pill-eeg"]'), { 
    background: "linear-gradient(to right, #180110 30%, #B72E87 70%)", 
    color: "#fff", 
    duration: 0.4 
  }, "midpoint")
  .to([container.querySelector('[data-seek="text-l1"]'), container.querySelector('[data-seek="text-r1"]')], { 
    y: -20, 
    opacity: 0, 
    duration: 0.5 
  }, "midpoint")
  .to(container.querySelector('[data-seek="text-l2"]'), { 
    y: 0, 
    opacity: 1, 
    duration: 0.8 
  }, "midpoint+=0.3")
  .add("startTrack2")
  .to(container.querySelector('[data-seek="progress-2"]'), { 
    scaleX: 1, 
    duration: 3, 
    ease: "none" 
  }, "startTrack2")
  .to(container.querySelector('[data-seek="text-r2"]'), { 
    y: 0, 
    opacity: 1, 
    duration: 0.8 
  }, "startTrack2+=1.5")
  .add("endpoint")
  .to(container.querySelector('[data-seek="icon-wrap-gamepad"]'), { 
    backgroundColor: "#DBFFD2", 
    duration: 0.4 
  }, "endpoint")
  .to(container.querySelector('[data-seek="icon-gamepad"]'), { 
    color: "#67CF4D", 
    duration: 0.4 
  }, "endpoint")
  .to(container.querySelector('[data-seek="pill-cet"]'), { 
    background: "linear-gradient(to right, #01180A 30%, #21A454 70%)", 
    color: "#fff", 
    duration: 0.4 
  }, "endpoint")

  return tl
}
