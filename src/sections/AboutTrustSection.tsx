import React from 'react'
import { FadeIn } from '../components/FadeIn'
import { AnimatedText } from '../components/AnimatedText'
import { useDraggableInfiniteReel } from '../hooks/useDraggableInfiniteReel'
import { PHILOSOPHY_STATEMENT, PHILOSOPHY_STANDARDS } from '../data/portfolioData'
import { ArrowUpRight } from 'lucide-react'

interface AboutTrustSectionProps {
  onOpenContact: () => void
}

export const AboutTrustSection: React.FC<AboutTrustSectionProps> = ({ onOpenContact }) => {
  // Autonomous continuous Left-to-Right conveyor flow (direction: 'right')
  const {
    viewportRef,
    trackRef,
    singleSetRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    justDraggedRef,
  } = useDraggableInfiniteReel({
    direction: 'right',
    speedDesktop: 22,
    speedMobile: 16,
    gapFallback: 24,
  })

  // Double the 4 pillars to ensure continuous modulo loop without gaps
  const standardsItems = [...PHILOSOPHY_STANDARDS, ...PHILOSOPHY_STANDARDS]

  // Render an open editorial plate (less "card UI", more architectural monograph)
  const renderStandard = (
    pillar: (typeof PHILOSOPHY_STANDARDS)[0],
    idx: number,
    keyPrefix: string
  ) => {
    return (
      <div
        key={`${keyPrefix}-${pillar.title}-${idx}`}
        className="w-[84vw] sm:w-[360px] md:w-[390px] lg:w-[410px] shrink-0"
      >
        <div
          onClick={() => {
            if (justDraggedRef.current) return
            onOpenContact()
          }}
          className="group relative h-full pt-4 pb-5 px-5 sm:px-6 border-t-2 border-[#171615] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-all duration-300 flex flex-col justify-between select-none cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#171615]/8">
              <span className="font-mono text-xs font-black text-[#64131C] tracking-widest">
                STANDARD {pillar.number}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#171615]/40 group-hover:text-[#64131C] transition-colors" />
            </div>

            <h3 className="text-sm font-bold uppercase tracking-tight text-[#171615] mt-3 group-hover:text-[#64131C] transition-colors leading-snug">
              {pillar.title}
            </h3>

            <p className="text-xs text-[#6E6A64] font-normal leading-relaxed mt-2">
              {pillar.desc}
            </p>
          </div>

          <div className="mt-4 pt-2 border-t border-[#171615]/8 flex items-center justify-between text-[10px] font-mono text-[#6E6A64]/60">
            <span>OPERATING INVARIANT</span>
            <span className="text-[#171615] font-semibold">VERIFIED</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="philosophy"
      className="relative w-full bg-[#FAF8F5] text-[#171615] py-14 sm:py-18 md:py-20 overflow-hidden select-none border-t border-[#171615]/8"
      aria-label="Engineering Philosophy and Operating Standards"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center px-5 sm:px-8 md:px-12">
        {/* Section Header Pill */}
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#171615]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-5 shadow-sm">
            <span>03 // HOW I BUILD</span>
          </div>
        </FadeIn>

        {/* Display Headline with Prominent Serif Italic reality */}
        <FadeIn delay={0.1} y={25} className="w-full max-w-5xl text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.08] text-[#171615]">
            I BUILD SYSTEMS THAT <br className="hidden sm:inline" />
            SURVIVE CONTACT WITH{' '}
            <span className="font-serif italic font-normal text-[#64131C] text-[1.12em] tracking-normal inline-block lowercase">
              reality.
            </span>
          </h2>
        </FadeIn>

        {/* Scroll-Driven Animated Text */}
        <div className="mt-6 sm:mt-8 max-w-3xl text-center">
          <AnimatedText
            text={PHILOSOPHY_STATEMENT}
            className="text-[#171615] font-semibold text-center leading-relaxed text-base sm:text-lg md:text-xl"
          />
        </div>
      </div>

      {/* Infinite Draggable Horizontal Reel Viewport */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden mt-8 sm:mt-12 py-1 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Engineering standards carousel (Left to Right)"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 will-change-transform w-max items-stretch"
        >
          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {standardsItems.map((pillar, idx) => renderStandard(pillar, idx % 4, 'set0'))}
          </div>

          <div ref={singleSetRef} className="flex gap-4 sm:gap-6 shrink-0 items-stretch">
            {standardsItems.map((pillar, idx) => renderStandard(pillar, idx % 4, 'set1'))}
          </div>

          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {standardsItems.map((pillar, idx) => renderStandard(pillar, idx % 4, 'set2'))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTrustSection
