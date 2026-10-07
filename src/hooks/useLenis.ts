import { useEffect } from 'react'
import Lenis from 'lenis'

export const useLenis = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Respect user accessibility preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // 2. Capability-aware detection:
    // On touch/mobile devices (pointer: coarse), native OS compositor momentum scrolling
    // runs at 60-120 FPS directly on the GPU without main-thread latency or input lock.
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window && window.innerWidth < 1024)
    if (isTouchDevice) return

    // 3. Desktop with fine pointer: Preserve the signature cinematic inertia
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 0, // Never hijack touch input
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}

export default useLenis
