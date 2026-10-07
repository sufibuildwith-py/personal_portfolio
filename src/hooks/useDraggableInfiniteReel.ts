import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from './useReducedMotion'

export interface UseDraggableInfiniteReelOptions {
  /**
   * Direction of autonomous infinite movement:
   * - 'right': Left-to-right flow (positive velocity)
   * - 'left':  Right-to-left flow (negative velocity)
   */
  direction?: 'left' | 'right'
  /** Desktop autonomous base speed in pixels per second. Default: 55 */
  speedDesktop?: number
  /** Mobile autonomous base speed in pixels per second. Default: 44 */
  speedMobile?: number
  /** Fallback column gap if computed style fails. Default: 24 */
  gapFallback?: number
}

export function useDraggableInfiniteReel({
  direction = 'left',
  speedDesktop = 55,
  speedMobile = 42,
  gapFallback = 24,
}: UseDraggableInfiniteReelOptions = {}) {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // High-performance animation loop refs (0 React re-renders during motion)
  const initialBaseSpeed = direction === 'right' ? speedDesktop : -speedDesktop
  const xRef = useRef<number>(0)
  const baseSpeedRef = useRef<number>(initialBaseSpeed)
  const velocityRef = useRef<number>(initialBaseSpeed)
  const isDraggingRef = useRef<boolean>(false)
  const isIntersectingRef = useRef<boolean>(true)
  const singleSetWidthRef = useRef<number>(0)
  const lastPointerXRef = useRef<number>(0)
  const lastPointerTimeRef = useRef<number>(0)
  const pointerDeltaHistoryRef = useRef<{ dx: number; dt: number }[]>([])
  const hasDraggedRef = useRef<boolean>(false)
  const justDraggedRef = useRef<boolean>(false)

  // 1. Measure single set stride (width of 1 complete set + gap)
  const measureStride = useCallback(() => {
    if (!singleSetRef.current || !trackRef.current) return
    const computedStyle = window.getComputedStyle(trackRef.current)
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap) || gapFallback
    const setWidth = singleSetRef.current.offsetWidth
    const stride = setWidth + gap
    singleSetWidthRef.current = stride

    // Position initial set so Set 1 aligns at screen origin, with Set 0 as left buffer
    if (xRef.current === 0 && stride > 0) {
      xRef.current = -stride
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }
  }, [gapFallback])

  // 2. Resize observer & speed calibration
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 768
    const targetSpeed = isMobile ? speedMobile : speedDesktop
    const signedSpeed = direction === 'right' ? targetSpeed : -targetSpeed
    baseSpeedRef.current = prefersReducedMotion ? 0 : signedSpeed
    velocityRef.current = baseSpeedRef.current
    measureStride()

    const resizeObserver = new ResizeObserver(() => {
      measureStride()
    })
    if (singleSetRef.current) {
      resizeObserver.observe(singleSetRef.current)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [direction, gapFallback, measureStride, prefersReducedMotion, speedDesktop, speedMobile])

  // 3. Continuous autoplay & momentum physics (Unified GSAP Ticker)
  useEffect(() => {
    if (typeof window === 'undefined') return
    let isTickerActive = false

    const updateTicker = (_time: number, deltaTime: number) => {
      const stride = singleSetWidthRef.current
      if (stride <= 0) return
      const dt = Math.min(deltaTime / 1000, 0.1) // clamp delta time against frame drops

      if (!isDraggingRef.current) {
        const baseSpeed = prefersReducedMotion ? 0 : baseSpeedRef.current
        // Exponential relaxation of release momentum back to base velocity
        velocityRef.current += (baseSpeed - velocityRef.current) * (1 - Math.exp(-3.5 * dt))
        xRef.current += velocityRef.current * dt
      }

      // Mathematical Modulo Infinite Wrapping: zero teleport, zero gaps
      while (xRef.current <= -2 * stride) {
        xRef.current += stride
      }
      while (xRef.current >= 0) {
        xRef.current -= stride
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }

    const startTicker = () => {
      if (!isTickerActive) {
        isTickerActive = true
        gsap.ticker.add(updateTicker)
      }
    }

    const stopTicker = () => {
      if (isTickerActive) {
        isTickerActive = false
        gsap.ticker.remove(updateTicker)
      }
    }

    // Detach ticker when offscreen to save battery and GPU
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startTicker()
        } else {
          stopTicker()
        }
      },
      { rootMargin: '250px 0px' }
    )

    const targetElement = sectionRef.current || viewportRef.current
    if (targetElement) {
      intersectionObserver.observe(targetElement)
    } else {
      startTicker()
    }

    return () => {
      stopTicker()
      intersectionObserver.disconnect()
    }
  }, [prefersReducedMotion])

  const isPointerDownRef = useRef<boolean>(false)
  const pointerDownPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // 4. Pointer and touch drag system
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    isPointerDownRef.current = true
    hasDraggedRef.current = false
    isDraggingRef.current = false
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY }
    lastPointerXRef.current = e.clientX
    lastPointerTimeRef.current = performance.now()
    pointerDeltaHistoryRef.current = []
    // NOTE: Defer pointer capture until movement exceeds threshold
    // so clicks/taps on child items can fire reliably without being hijacked.
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return
    const now = performance.now()
    const totalDist = Math.hypot(
      e.clientX - pointerDownPosRef.current.x,
      e.clientY - pointerDownPosRef.current.y
    )

    // Only engage drag and capture pointer if the user has moved past the threshold (5px)
    if (!hasDraggedRef.current) {
      if (totalDist > 5) {
        hasDraggedRef.current = true
        isDraggingRef.current = true
        setIsDragging(true)
        try {
          e.currentTarget.setPointerCapture(e.pointerId)
        } catch {
          // Fallback
        }
        lastPointerXRef.current = e.clientX
        lastPointerTimeRef.current = now
      } else {
        return
      }
    }

    const dx = e.clientX - lastPointerXRef.current
    const dt = (now - lastPointerTimeRef.current) / 1000

    if (Math.abs(dx) > 0) {
      xRef.current += dx

      if (dt > 0.001) {
        const instantaneousVelocity = dx / dt
        pointerDeltaHistoryRef.current.push({ dx, dt })
        if (pointerDeltaHistoryRef.current.length > 5) {
          pointerDeltaHistoryRef.current.shift()
        }
        velocityRef.current = instantaneousVelocity
      }

      lastPointerXRef.current = e.clientX
      lastPointerTimeRef.current = now

      // Wrap during active drag as well
      const stride = singleSetWidthRef.current
      if (stride > 0) {
        while (xRef.current <= -2 * stride) {
          xRef.current += stride
        }
        while (xRef.current >= 0) {
          xRef.current -= stride
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return
    isPointerDownRef.current = false

    if (hasDraggedRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)

      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        // Fallback
      }

      // Weighted release momentum
      if (pointerDeltaHistoryRef.current.length > 0) {
        const totalDx = pointerDeltaHistoryRef.current.reduce((sum, item) => sum + item.dx, 0)
        const totalDt = pointerDeltaHistoryRef.current.reduce((sum, item) => sum + item.dt, 0)
        if (totalDt > 0.005) {
          const avgVelocity = totalDx / totalDt
          velocityRef.current = Math.max(-1200, Math.min(1200, avgVelocity))
        }
      }

      // Suppress child click triggers when user was actively dragging
      justDraggedRef.current = true
      setTimeout(() => {
        justDraggedRef.current = false
      }, 90)
    } else {
      // User clicked or tapped without dragging
      isDraggingRef.current = false
      setIsDragging(false)
      justDraggedRef.current = false
    }
  }

  return {
    sectionRef,
    viewportRef,
    trackRef,
    singleSetRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    justDraggedRef,
  }
}

export default useDraggableInfiniteReel
