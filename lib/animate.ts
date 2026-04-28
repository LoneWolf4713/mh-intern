import { gsap } from './gsap'

export type AnimatePreset = 'fadeUp' | 'fadeIn' | 'blurReveal' | 'staggerFadeUp'

export function animate(
  targets: gsap.TweenTarget,
  preset: AnimatePreset,
  options?: { delay?: number; stagger?: number; trigger?: Element }
) {
  const presets: Record<AnimatePreset, gsap.TweenVars> = {
    fadeUp: { opacity: 0, y: 40 },
    fadeIn: { opacity: 0 },
    blurReveal: { opacity: 0, filter: 'blur(12px)' },
    staggerFadeUp: { opacity: 0, y: 30 },
  }

  return gsap.from(targets, {
    ...presets[preset],
    duration: 0.8,
    ease: 'power3.out',
    delay: options?.delay ?? 0,
    stagger: options?.stagger ?? 0,
    scrollTrigger: {
      trigger: options?.trigger ?? (targets as Element),
      start: 'top 85%',
      once: true,
    },
  })
}
