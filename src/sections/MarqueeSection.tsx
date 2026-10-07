import React, { useRef, useEffect } from 'react'
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/portfolioData'
import { Cpu } from 'lucide-react'

// Stable static triples defined outside component to avoid reallocation
const TRIPLED_ROW_1 = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1]
const TRIPLED_ROW_2 = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2]

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isVisible = false
    let sectionTop = 0
    let ticking = false

    const updateMetrics = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        sectionTop = rect.top + window.scrollY
      }
    }

    const renderTransforms = () => {
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.35
      const row1Translate = offset * 0.8 - 400
      const row2Translate = -(offset * 1.85) - 200

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${row1Translate}px, 0, 0)`
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${row2Translate}px, 0, 0)`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!isVisible) return
      if (!ticking) {
        window.requestAnimationFrame(renderTransforms)
        ticking = true
      }
    }

    const onResize = () => {
      updateMetrics()
      if (isVisible) {
        renderTransforms()
      }
    }

    updateMetrics()
    renderTransforms()

    // IntersectionObserver halts all scroll calculations when marquee is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          updateMetrics()
          renderTransforms()
        }
      },
      { rootMargin: '250px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="relative w-full bg-[#F5F2EA] pt-16 sm:pt-24 pb-16 overflow-hidden select-none border-t border-[#171615]/10"
      aria-label="Engineering Protocols and Core Mechanisms"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#64131C] flex items-center gap-2 mb-2 font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // ARCHITECTURE &amp; PROTOCOLS</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171615] leading-tight">
            EVERY BOUNDARY. EVERY MECHANISM.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#6E6A64] font-normal max-w-md md:text-right">
          A continuous register of production mechanisms, deterministic safety gates, and low-level runtime protocols.
        </p>
      </div>

      {/* Two-Row Scroll-Reactive Marquee */}
      <div className="flex flex-col gap-3.5 sm:gap-4.5 w-full">
        {/* ROW 1: Moves RIGHT on scroll */}
        <div
          ref={row1Ref}
          className="flex gap-3.5 sm:gap-4.5 w-max will-change-transform"
          style={{ transform: 'translate3d(-400px, 0, 0)' }}
        >
          {TRIPLED_ROW_1.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="group relative w-[290px] sm:w-[350px] md:w-[390px] h-[110px] sm:h-[125px] shrink-0 rounded-2xl bg-[#FAF8F5] border border-[#171615]/8 hover:border-[#64131C]/40 p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#64131C] font-semibold">
                  Protocol {String((index % 8) + 1).padStart(2, '0')}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-600/70" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-[#171615] group-hover:text-[#64131C] transition-colors leading-snug">
                  {item.label}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono text-[#6E6A64] mt-0.5">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: Moves LEFT on scroll (Accelerated 1.85x speed) */}
        <div
          ref={row2Ref}
          className="flex gap-3.5 sm:gap-4.5 w-max will-change-transform"
          style={{ transform: 'translate3d(-200px, 0, 0)' }}
        >
          {TRIPLED_ROW_2.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="group relative w-[290px] sm:w-[350px] md:w-[390px] h-[110px] sm:h-[125px] shrink-0 rounded-2xl bg-[#FAF8F5] border border-[#171615]/8 hover:border-[#64131C]/40 p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#64131C] font-semibold">
                  Mechanism {String((index % 8) + 1).padStart(2, '0')}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#171615]/30" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-[#171615] group-hover:text-[#64131C] transition-colors leading-snug">
                  {item.label}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono text-[#6E6A64] mt-0.5">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarqueeSection
